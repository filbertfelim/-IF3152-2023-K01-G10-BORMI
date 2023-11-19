import { OtherHouses } from "@mui/icons-material";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const transactionRouter = createTRPCRouter({
  getTransactions: protectedProcedure
    .input(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        page: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.transaction.findMany({
        where: {
          date: {
            gte: input.startDate ? new Date(input.startDate) : undefined,
            lte: input.endDate ? new Date(input.endDate) : undefined,
          },
        },
        include: {
          CartItem: true,
        },
        take: 10,
        skip: (input.page - 1) * 10,
        orderBy: {
          date: "desc",
        },
      });

      const count = await ctx.db.transaction.count({
        where: {
          date: {
            gte: input.startDate ? input.startDate : undefined,
            lte: input.endDate ? input.endDate : undefined,
          },
        },
      });

      return {
        data,
        totalPage: Math.ceil(count / 10),
      };
    }),

  addTransactions: publicProcedure
    .input(
      z.object({
        userId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let transaction;

      const cart = await ctx.db.cartItem.findMany({
        where: {
          userId: input.userId,
          isPurchased: false,
        },
      });

      try {
        transaction = await ctx.db.transaction.create({
          data: {
            userId: input.userId,
            date: new Date(),
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add transaction",
        });
      }

      try {
        await ctx.db.cartItem.updateMany({
          where: {
            userId: input.userId,
            isPurchased: false,
          },
          data: {
            isPurchased: true,
            transactionId: transaction.id,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update cart item",
        });
      }

      for (const item of cart) {
        const product = await ctx.db.product.findFirst({
          where: {
            id: item.productId,
          },
        });

        // update stock
        if (product !== null) {
          await ctx.db.product.updateMany({
            where: {
              id: item.productId,
            },
            data: {
              stock: product.stock - item.quantity,
            },
          });
        }
      }

      for (const item of cart) {
        const updatedProduct = await ctx.db.product.findFirst({
          where: {
            id: item.productId,
          },
        });

        if (updatedProduct !== null) {
          // if stock jadi habis
          if (updatedProduct.stock === 0) {
            await ctx.db.cartItem.deleteMany({
              where: {
                productId: item.productId,
                isPurchased: false,
              },
            });
            // quantity di cart > stock
          } else {
            await ctx.db.cartItem.updateMany({
              where: {
                id: item.id,
                isPurchased: false,
              },
              data: {
                quantity:
                  item.quantity > updatedProduct.stock
                    ? updatedProduct.stock
                    : item.quantity,
              },
            });
          }
        }
      }

      return {
        message: "Checkout successful",
      };
    }),
});
