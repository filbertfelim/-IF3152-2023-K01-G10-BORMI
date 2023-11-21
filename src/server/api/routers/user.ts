import { hash } from "bcrypt";
import { UserRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(
      z.object({
        page: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.user.findMany({
        take: 10,
        skip: (input.page - 1) * 10,
      });

      const count = await ctx.db.user.count();

      return {
        data,
        totalPage: Math.ceil(count / 10),
      };
    }),

  getUserbyId: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  addUser: protectedProcedure
    .input(
      z.object({
        username: z.string().min(1),
        role: z.nativeEnum(UserRole),
        password: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const pastUser = await ctx.db.user.findUnique({
        where: {
          username: input.username.trim().toLowerCase(),
        },
      });

      if (pastUser !== null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exist",
        });
      }
      input.password = await hash(input.password, 10);

      try {
        await ctx.db.user.create({
          data: {
            username: input.username.trim().toLowerCase(),
            role: input.role,
            password: input.password,
          },
        });

        return {
          message: "User created successfully",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user",
        });
      }
    }),

  deleteUser: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.user.delete({
          where: {
            id: input.id,
          },
        });
        return {
          message: "User deleted successfully",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete user",
        });
      }
    }),

  editUser: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        username: z.string().min(1),
        password: z.string().min(1),
        role: z.nativeEnum(UserRole),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findFirst({
        where: {
          NOT: {
            id: input.id,
          },
        },
        select: {
          username: true,
        },
      });

      if (existingUser?.username === input.username.trim().toLowerCase()) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User already exist",
        });
      }
      input.password = await hash(input.password, 10);
      try {
        await ctx.db.user.update({
          where: {
            id: input.id,
          },
          data: {
            id: input.id,
            username: input.username.trim().toLowerCase(),
            password: input.password,
            role: input.role,
          },
        });
        return {
          message: "User updated successfully",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update user",
        });
      }
    }),
});
