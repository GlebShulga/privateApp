import Head from "next/head";
import { Footer } from "@component/components/Footer";
import { Header } from "@component/components/Header";
import { ThemeProvider } from "../components/ThemeProvider";
import type { AppProps } from "next/app";
import "@component/styles/globals.scss";
import styles from "@component/styles/app.module.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div className={styles.container}>
        <Head>
          <title>Gleb Shulga - developer</title>
        </Head>
        <Header /> <Component {...pageProps} /> <Footer />
      </div>
    </ThemeProvider>
  );
}
