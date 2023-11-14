/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { getServerSession, type Session } from "next-auth";
import { authOptions } from ".";
import { type UserRole } from "@prisma/client";

type AuthType = UserRole | "AUTHENTICATED" | "NOT_REQUIRED";

type WithSessionParams<T extends AuthType> = {
  type?: T;
  handler?: (
    ctx: GetServerSidePropsContext,
    session: T extends true ? Session : Session | null,
  ) => Promise<GetServerSidePropsResult<object>>;
};

export function withSession<T extends AuthType>({
  type = "NOT_REQUIRED" as T,
  handler,
}: WithSessionParams<T> = {}): GetServerSideProps {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);

    if (!session && type !== "NOT_REQUIRED") {
      return {
        redirect: {
          destination: `/login${
            ctx.req.url ? "?callbackUrl=" + ctx.req.url : ""
          }`,
          permanent: false,
        },
      };
    } else if (session && type !== "NOT_REQUIRED" && type !== "AUTHENTICATED") {
      if (type !== session.user.role) {
        return {
          redirect: {
            destination: "/403",
            permanent: false,
          },
        };
      }
    }

    if (handler) {
      const result = await handler(ctx, session!);

      if ("props" in result) {
        const props = await result.props;
        return {
          ...result,
          props: {
            session,
            ...props,
          },
        };
      } else return result;
    }

    return { props: { session } };
  };
}
