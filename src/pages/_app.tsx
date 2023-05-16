import { Footer } from "@component/components/footer/footer";
import { Header } from "@component/components/header/header";
import type { AppProps } from "next/app";
import "@component/styles/globals.scss";
import styles from "@component/styles/app.module.scss";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <div className={styles.container}>
      <Header /> <Component {...pageProps} /> <Footer />
    </div>
  );
}
