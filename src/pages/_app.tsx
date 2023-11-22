import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { CacheProvider } from "@emotion/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import "@uploadthing/react/styles.css";
import createEmotionCache from "../../createEmotionCache";

const cache = createEmotionCache();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }, 
}) => {
  return (
    <>
      <CacheProvider value={cache}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </CacheProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
