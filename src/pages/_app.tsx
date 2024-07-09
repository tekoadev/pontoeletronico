import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@/styles/styles.css";
import GlobalStyles from "@/styles/GlobalStyles";
import { CompanyProvider } from "@/context/companyContext";
import { GeneralProvider } from "@/context/generalContext";
import { UserProvider } from "@/context/userContext";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GeneralProvider>
      <CompanyProvider>
        <GlobalStyles />
        <UserProvider>
          <Head>
          <title>ClockIn</title>
          </Head>
          <Component {...pageProps} />
        </UserProvider>
      </CompanyProvider>
    </GeneralProvider>
  );
}
