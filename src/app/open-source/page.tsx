"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Eye } from "lucide-react";
import Link from "next/link";
import styles from "@component/styles/portfolio.module.scss";

function ScreenshotCarousel({ screenshots, title }: { screenshots: string[]; title: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.screenshot_carousel}>
      <img
        src={screenshots[active]}
        alt={`${title} screenshot ${active + 1}`}
        className={styles.screenshot_img}
      />
      <button
        className={`${styles.screenshot_nav} ${styles.screenshot_nav_prev}`}
        onClick={() => setActive(i => (i - 1 + screenshots.length) % screenshots.length)}
        aria-label="Previous screenshot"
      >
        ‹
      </button>
      <button
        className={`${styles.screenshot_nav} ${styles.screenshot_nav_next}`}
        onClick={() => setActive(i => (i + 1) % screenshots.length)}
        aria-label="Next screenshot"
      >
        ›
      </button>
      <div className={styles.screenshot_dots}>
        {screenshots.map((_, i) => (
          <button
            key={i}
            className={`${styles.screenshot_dot} ${i === active ? styles.screenshot_dot_active : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Screenshot ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export const dynamic = "force-static";

export default function OpenSourcePage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const openSourceItems = [
    {
      title: "MolViewer",
      description:
        "Open-source browser-based molecular viewer built with React Three Fiber and WebGL2. Features GPU-accelerated surfaces, custom GLSL sphere impostors, cartoon ribbon rendering, and adaptive LOD — maintaining 60fps from 100 to 15,000+ atoms.\nLoad any protein by PDB ID (e.g. 4HHB) or upload a file.",
      technologies: [
        "Three.js",
        "React Three Fiber",
        "WebGL2",
        "GLSL",
        "Marching Cubes",
        "React 19",
        "TypeScript",
        "Zustand",
      ],
      demoPath: "https://molviewer.bio/",
      githubPath: "https://github.com/GlebShulga/molviewer",
      screenshots: [
        "/screenshots/molviewer/ribbon.webp",
        "/screenshots/molviewer/surface.webp",
        "/screenshots/molviewer/backbone.webp",
      ],
      type: "scientific",
      isExternal: true,
    },
  ];

  return (
    <motion.div
      className={styles.container}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div className={styles.header} variants={itemVariants}>
        <h1 className={styles.title}>Open Source</h1>
        <p className={styles.subtitle}>
          Open source projects
        </p>
      </motion.div>

      <motion.div className={styles.examples_grid} variants={containerVariants}>
        {openSourceItems.map((example, index) => (
          <motion.div
            key={index}
            className={styles.example_card}
            variants={itemVariants}
          >
            <div className={styles.card_content}>
              {example.screenshots && (
                <ScreenshotCarousel screenshots={example.screenshots} title={example.title} />
              )}
              <div className={styles.example_header}>
                <h3 className={styles.example_title}>{example.title}</h3>
                <span className={styles.example_type}>{example.type}</span>
              </div>

              <p className={styles.example_description}>
                {example.description.split('\n').map((line, index, array) => (
                  <span key={index}>
                    {line}
                    {index < array.length - 1 && <br />}
                  </span>
                ))}
              </p>

              <div className={styles.tech_stack}>
                {example.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className={styles.tech_tag}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className={styles.example_actions}>
                {example.isExternal ? (
                  <a
                    href={example.demoPath}
                    className={styles.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Eye size={16} />
                    Open App
                  </a>
                ) : (
                  <Link href={example.demoPath} className={styles.demo_link}>
                    <Eye size={16} />
                    Open App
                  </Link>
                )}
                {example.githubPath && (
                  <a
                    href={example.githubPath}
                    className={styles.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
