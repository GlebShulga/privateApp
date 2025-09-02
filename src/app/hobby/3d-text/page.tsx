import { Metadata } from "next";
import ThreeDTextClient from "./ThreeDTextClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "3D Text - Interactive Three.js Experience | Gleb Shulga",
  description: "Explore interactive 3D typography with WebGL rendering, orbital controls, and dynamic lighting. Built with Three.js and modern web technologies.",
  keywords: [
    "3D Text",
    "Three.js",
    "WebGL",
    "Interactive Typography",
    "3D Graphics",
    "JavaScript Animation",
    "Frontend Development",
    "Creative Coding",
    "Canvas",
    "Orbital Controls",
  ],
  openGraph: {
    title: "3D Text - Interactive Three.js Experience",
    description: "Explore interactive 3D typography with WebGL rendering, orbital controls, and dynamic lighting. Built with Three.js and modern web technologies.",
    url: "https://shulga.vercel.app/hobby/3d-text",
    images: [
      {
        url: "/assets/logo-light-bg.png",
        width: 1024,
        height: 1024,
        alt: "3D Text Interactive Experience with Three.js",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Text - Interactive Three.js Experience",
    description: "Explore interactive 3D typography with WebGL rendering, orbital controls, and dynamic lighting.",
    images: ["/assets/logo-light-bg.png"],
  },
};

export default function ThreeDTextPage() {
  return <ThreeDTextClient />;
}