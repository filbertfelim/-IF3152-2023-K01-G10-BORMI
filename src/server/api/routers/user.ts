import { UserRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    getUser: protectedProcedure
        .input(
            z.object({
                page: z.number(),
            })
        )
        .query(async ({ ctx, input}) => {
            const data = await ctx.db.user.findMany({
                take: 10,
                skip : (input.page - 1) * 10,
            });

            const count = await ctx.db.user.count();

            return {
                data,
                totalPage : Math.ceil(count / 10),
            };
        }),
    
    addUser: protectedProcedure
        .input(
            z.object({
                username: z.string().min(1),
                role: z.nativeEnum(UserRole),
                password: z.string().min(1),
            }),
        )
        .mutation(async ({ ctx, input}) => {
            const pastUser = await ctx.db.user.findUnique({
                where: {
                    username : input.username
                },
            });

            if (pastUser !== null){
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User already exist",
                });
            }

            try{
                await ctx.db.user.create({
                    data: {
                        username: input.username,
                        role: input.role,
                        password: input.password,
                    },
                });

                return {
                    message: "User created successfully",
                };
            } catch (error){
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create product",
                });
            }
        }),
    
    deleteUser: protectedProcedure
        .input(
            z.object({
                id: z.number(),
            }),
        )
        .mutation(async ({ ctx, input}) => {
            const existingUser = await ctx.db.user.findUnique({
                where: {
                    id : input.id,
                },
            });

            if (!existingUser) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            try{
                await ctx.db.user.delete({
                    where: {
                        id : input.id,
                    },
                });

                return {
                    message: "User deleted successfully",
                };
            } catch (error){
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
                username: z.string().min(1).optional(),
                password: z.string().min(1).optional(),
                role: z.nativeEnum(UserRole).optional(),
            }),
        )
        .mutation(async({ ctx, input}) => {
            const existingUser = await ctx.db.user.findUnique({
                where: {
                    id : input.id,
                },
            });

            if (existingUser !== null) {
                throw new TRPCError ({
                    code: "NOT_FOUND",
                    message: "User already exist",
                });
            }

            try {
                await ctx.db.user.update({
                  where : {
                    id : input.id,
                  },
                  data: {
                    id: input.id,
                    username: input.username ? input.username: undefined,
                    password: input.password ? input.password: undefined,
                    role: input.role ? input.role: undefined,
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