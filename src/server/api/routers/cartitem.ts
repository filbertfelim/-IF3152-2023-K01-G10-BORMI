import { CartItem } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const cartItemRouter = createTRPCRouter({
  getCartItem: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        page: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const findFirst = await ctx.db.cartItem.findFirst({
        where: {
          userId: ctx.session?.user.id,
        },
      });

      if (!findFirst) {
        return {
          data: [],
          totalPage: undefined,
          totalPrice: undefined,
        };
      }
      const data = await ctx.db.cartItem.findMany({
        where: {
          userId: input.userId,
          isPurchased: false,
        },
        include: {
          product: true,
        },
        take: 10,
        skip: (input.page - 1) * 10,
      });

      const count = await ctx.db.cartItem.count({
        where: {
          userId: input.userId,
          isPurchased: false,
        },
      });

      let totalPrice = 0;
      for (const cart of data) {
        const price = await ctx.db.product.findUnique({
          where: {
            id: cart.productId,
          },
          select: { price: true },
        });
        if (price !== null) {
          totalPrice += price.price * cart.quantity;
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to find cart item",
          });
        }
      }

      return {
        data,
        totalPage: Math.ceil(count / 10),
        totalPrice,
      };
    }),

  deleteCartItem: publicProcedure
    .input(
      z.object({
        cartId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.cartItem.delete({
          where: {
            id: input.cartId,
          },
        });

        return {
          message: "Cart item deleted successfully",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete cart item",
        });
      }
    }),

  editCartItemQuantity: publicProcedure
    .input(
      z.object({
        cartId: z.number(),
        quantity: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.cartItem.update({
          where: {
            id: input.cartId,
          },
          data: {
            quantity: input.quantity,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add / substract cart item quantity",
        });
      }
    }),

  addNewCartItem: protectedProcedure
    .input(
      z.object({
        productId: z.number(),
        userId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.cartItem.create({
          data: {
            productId: input.productId,
            quantity: 1,
            userId: input.userId,
          },
        });

        return {
          message: "Cart item added successfully",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add cart item",
        });
      }
    }),
});
