import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";
import "@/styles/styles.css"
import GlobalStyles from "@/styles/GlobalStyles";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <GlobalStyles/>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
