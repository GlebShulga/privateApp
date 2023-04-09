import { Header } from "@component/components/header/header";
import "@component/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header /> <Component {...pageProps} />
    </>
  );
}
