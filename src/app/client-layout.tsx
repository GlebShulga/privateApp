"use client";

import { Footer } from "@component/components/Footer";
import { Header } from "@component/components/Header";
import { ThemeProvider } from "@component/components/ThemeProvider";
import styles from "@component/styles/app.module.scss";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
