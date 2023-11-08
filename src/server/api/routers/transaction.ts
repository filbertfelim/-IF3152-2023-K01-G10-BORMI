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
            gte: input.startDate ? input.startDate : undefined,
            lte: input.endDate ? input.endDate : undefined,
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

      if (data.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No transaction data available",
        });
      }

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

      return {
        message: "Checkout successful",
      };
    }),
});
