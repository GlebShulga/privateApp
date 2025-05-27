import type { Metadata } from "next";

export const metadata: Metadata = {  title: "Professional Experience - Gleb Shulga | Frontend Developer",
  description:
    "Explore my 5+ years of professional experience as a Frontend Developer at IMMIGRANT INVEST and EPAM Systems. Detailed expertise with React, Next.js, TypeScript, performance optimization, and enterprise-level applications.",
  keywords: [
    "Frontend Developer experience",
    "IMMIGRANT INVEST developer",
    "EPAM Systems career",
    "React development experience",
    "Next.js projects",
    "TypeScript enterprise",
    "Performance optimization expertise",
    "NX Monorepo management",
    "CMS development AEM ContentStack", 
    "Design System implementation",
    "E2E testing Jest",
    "Accessibility A11y compliance",
    "5 years experience",
    "Enterprise applications",
    "Upwork freelancer",
  ],
  openGraph: {
    title: "Professional Experience - Gleb Shulga",
    description:
      "Explore my professional journey as a Full Stack Developer with detailed experience in modern web technologies.",
    url: "https://shulga.vercel.app/experience",
    images: [
      {
        url: "/assets/portrait_light.jpg",
        width: 1200,
        height: 630,
        alt: "Gleb Shulga - Professional Experience",
      },
    ],
  },
  twitter: {
    title: "Professional Experience - Gleb Shulga",
    description:
      "Explore my professional journey as a Full Stack Developer with detailed experience in modern web technologies.",
    images: ["/assets/portrait_light.jpg"],
  },
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
