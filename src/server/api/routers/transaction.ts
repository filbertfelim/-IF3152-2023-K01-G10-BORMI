import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const transactionRouter = createTRPCRouter({
    getTransactions: protectedProcedure
        .input(
            z.object({
                startDate: z.string().optional(),
                endDate: z.string().optional(),
                page: z.number(),
            })
        )
        .query(async ({ ctx, input}) => {
            const data = await ctx.db.transaction.findMany({
                where: {
                    date: {
                        gte: input.startDate,
                        lte: input.endDate,
                    },
                },
                take: 10,
                skip: (input.page - 1) * 10,
                orderBy: {
                    date: 'desc',
                },
            });

            const count = await ctx.db.transaction.count({
                where: {
                    date: {
                        gte: input.startDate,
                        lte: input.endDate,
                    },
                },
            });

            return {
                data,
                totalPage: Math.ceil(count / 10),
            };
        }),
});