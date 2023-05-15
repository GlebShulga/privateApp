import { useEffect, useState } from "react";
import { Footer } from "@component/components/footer/footer";
import { Header } from "@component/components/header/header";
import type { AppProps } from "next/app";
import "@component/styles/globals.scss";


export default function App({ Component, pageProps }: AppProps) {

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const newTheme = isDarkMode ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
    window.localStorage.setItem("theme", "dark");
  }, [isDarkMode]);

  return (
    <>
      <Header /> <Component {...pageProps} /> <Footer />
    </>
  );
}
