import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_PRISMA_URL: z.string().url(),
    DATABASE_URL_NON_POOLING: z.string().url().optional(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    // NEXTAUTH_SECRET:
    //   process.env.NODE_ENV === "production"
    //     ? z.string().min(1)
    //     : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    SESSION_MAXAGE: z.preprocess(
      // If SESSION_MAXAGE is not set, set it to 30 days
      (str) => (str ? +str : 30 * 24 * 60 * 60),
      z.number().int().positive(),
    ),
    // Add ` on ID and SECRET if you want to make sure they're not empty
    UPLOADTHING_SECRET: z.string(),
    UPLOADTHING_APP_ID: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_PRISMA_URL: process.env.DATABASE_PRISMA_URL,
    DATABASE_URL_NON_POOLING:
      process.env.DATABASE_URL_NON_POOLING ?? process.env.DATABASE_PRISMA_URL,
    NODE_ENV: process.env.NODE_ENV,
    // NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    // NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    SESSION_MAXAGE: process.env.SESSION_MAXAGE,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
});
