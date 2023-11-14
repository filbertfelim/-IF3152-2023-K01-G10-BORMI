import { productRouter } from "./routers/product";
import { createTRPCRouter } from "~/server/api/trpc";
import { cartItemRouter } from "./routers/cartitem";
import { userRouter } from "./routers/user";
import { transactionRouter } from "./routers/transaction";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  cartItem: cartItemRouter,
  user: userRouter,
  transaction: transactionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
