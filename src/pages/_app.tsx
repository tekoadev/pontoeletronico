import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";
import "@/styles/styles.css";
import GlobalStyles from "@/styles/GlobalStyles";
import { CompanyProvider } from "@/context/companyContext";
import { GeneralProvider } from "@/context/generalContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <GeneralProvider>
        <CompanyProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </CompanyProvider>
      </GeneralProvider>
    </SessionProvider>
  );
};

export default MyApp;
