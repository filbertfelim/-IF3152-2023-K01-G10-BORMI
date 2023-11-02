import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getProducts: protectedProcedure
    .input(
      z.object({
        category: z.string().optional(),
        searchQuery: z.string().optional(),
        page: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.product.findMany({
        where: {
          name: {
            contains: input.searchQuery,
          },
          category: input.category,
        },
        take: 10,
        skip: (input.page - 1) * 10,
      });

      const count = await ctx.db.product.count({
        where: {
          name: {
            contains: input.searchQuery,
          },
          category: input.category,
        },
      });

      return {
        data,
        totalPage: Math.ceil(count / 10),
      };
    }),

  addProduct: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        category: z.string(),
        stock: z.number().min(0),
        price: z.number().min(0),
        image: z.string(),
        imageKey: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const pastProduct = await ctx.db.product.findUnique({
        where: {
          name: input.name,
        },
      });

      if (pastProduct !== null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Product already exist",
        });
      }

      try {
        await ctx.db.product.create({
          data: {
            name: input.name,
            category: input.category,
            stock: input.stock,
            price: input.price,
            image: input.image,
            imageKey: input.imageKey,
          },
        });

        return {
          message: "Product created successfully",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create product",
        });
      }
    }),
});
