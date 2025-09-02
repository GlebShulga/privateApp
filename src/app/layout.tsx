import type { Metadata } from "next";
import "@component/styles/globals.scss";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://shulga.vercel.app"),
  title: "Gleb Shulga - Frontend Developer | React & Next.js Expert",
  description:
    "Frontend Developer with 5+ years of experience specializing in React, Next.js, TypeScript, and performance optimization. Currently at IMMIGRANT INVEST, previously at EPAM Systems. Expert in responsive design, accessibility, and modern web technologies.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "SCSS",
    "Tailwind CSS",
    "Material UI",
    "Redux Toolkit",
    "Performance Optimization",
    "Web Vitals",
    "Accessibility A11y",
    "SEO Optimization",
    "Responsive Design",
    "CMS Development",
    "AEM ContentStack",
    "Storyblok",
    "Jest Testing",
    "E2E Testing",
    "NX Monorepo",
    "Design System",
    "IMMIGRANT INVEST",
    "EPAM Systems",
    "Spain Developer",
    "Portfolio",
  ],
  authors: [{ name: "Gleb Shulga" }],
  creator: "Gleb Shulga",
  publisher: "Gleb Shulga",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shulga.vercel.app",
    title: "Gleb Shulga - Frontend Developer | React & Next.js Expert",
    description:
      "Frontend Developer with 5+ years of experience specializing in React, Next.js, TypeScript, and performance optimization. Currently at IMMIGRANT INVEST, previously at EPAM Systems.",
    siteName: "Gleb Shulga",
    images: [
      {
        url: "/assets/portrait_light.jpg",
        width: 990,
        height: 1024,
        alt: "Gleb Shulga - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gleb Shulga - Frontend Developer | React & Next.js Expert",
    description:
      "Frontend Developer with 5+ years of experience specializing in React, Next.js, TypeScript, and performance optimization.",
    images: ["/assets/portrait_light.jpg"],
    creator: "@GlebShulga",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/favicon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://shulga.vercel.app",
  },
  verification: {
    google: "your-google-verification-code", // Add your actual verification code
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://shulga.vercel.app" />
        <meta name="theme-color" content="#0369a1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Gleb Shulga",
              url: "https://shulga.vercel.app",
              image: "https://shulga.vercel.app/assets/portrait_light.jpg",
              sameAs: [
                "https://www.linkedin.com/in/gleb-shulga/",
                "https://github.com/GlebShulga",
              ],
              jobTitle: "Frontend Developer",
              worksFor: {
                "@type": "Organization",
                name: "IMMIGRANT INVEST",
              },
              knowsAbout: [
                "JavaScript",
                "TypeScript",
                "React.js",
                "Next.js",
                "SCSS",
                "Tailwind CSS",
                "Material UI",
                "Redux Toolkit",
                "Performance Optimization",
                "Accessibility",
                "CMS Development",
                "AEM",
                "ContentStack",
                "Jest Testing",
                "E2E Testing",
                "NX Monorepo",
                "Design Systems",
              ],
              description:
                "Frontend Developer with 5+ years of experience specializing in React, Next.js, TypeScript, and performance optimization. Currently at IMMIGRANT INVEST, previously at EPAM Systems.",
            }),
          }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
