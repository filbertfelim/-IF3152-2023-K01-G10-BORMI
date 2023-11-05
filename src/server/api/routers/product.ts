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
            contains: input.searchQuery ? input.searchQuery: undefined,
          },
          category: input.category ? input.category: undefined,
        },
        take: 12,
        skip: (input.page - 1) * 12,
      });

      const count = await ctx.db.product.count({
        where: {
          name: {
            contains: input.searchQuery ? input.searchQuery: undefined,
          },
          category: input.category ? input.category: undefined,
        },
      });

      return {
        data,
        totalPage: Math.ceil(count / 12),
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

    deleteProduct: protectedProcedure
    .input(
      z.object({
        productid: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.product.delete({
          where: {
            id: input.productid
          }
        });
        return {
          message: "Product deleted successfully",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create product",
        });
      }
    }),

    editProduct: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).optional(),
        category: z.string().optional(),
        stock: z.number().min(0).optional(),
        price: z.number().min(0).optional(),
        image: z.string().optional(),
        imageKey: z.string().optional(),
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
        await ctx.db.product.update({
          where : {
            name : input.name,
          },
          data: {
            name: input.name ? input.name: undefined,
            category: input.category ? input.category: undefined,
            stock: input.stock ? input.stock: undefined,
            price: input.price ? input.price: undefined,
            image: input.image ? input.image: undefined,
            imageKey: input.imageKey ? input.imageKey: undefined,
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
