import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@/styles/styles.css";
import GlobalStyles from "@/styles/GlobalStyles";
import { CompanyProvider } from "@/context/companyContext";
import { GeneralProvider } from "@/context/generalContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GeneralProvider>
      <CompanyProvider>
        <Component {...pageProps} />
      </CompanyProvider>
    </GeneralProvider>
  );
}
