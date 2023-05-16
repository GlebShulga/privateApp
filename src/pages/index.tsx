import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@component/styles/home.module.scss";
import { Main } from "../components/main/main";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Gleb Shulga - developer</title>
        <meta
          name="description"
          content="I am a skilled software developer with expertise in React and NodeJS. I offer software development services. Contact me to learn how I can help bring your software development project to life."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/logo-light-bg.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <Main />
        </div>
      </main>
    </>
  );
}
