import type { Metadata } from "next";
import "@component/styles/globals.scss";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Gleb Shulga - Full Stack Developer | React & Node.js Expert",
  description:
    "Experienced Full Stack Developer specializing in React, Node.js, TypeScript, and modern web technologies. Building exceptional digital experiences with performance optimization and accessibility in mind.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
