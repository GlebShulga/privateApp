"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import Link from "next/link";
import styles from "@component/styles/portfolio.module.scss";

export const dynamic = "force-static";

export default function HobbyPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect if device supports touch
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

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

  const hobbyItems = [
    {
      title: "3D Text Animation",
      description: "Interactive 3D floating molecules created using Three.js. Features dynamic optimization and material effects.\nBest experienced on desktop.",
      technologies: ["Three.js", "WebGL", "JavaScript"],
      demoPath: "/hobby/3d-text",
      type: "interactive",
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
        <h1 className={styles.title}>Hobby</h1>
        <p className={styles.subtitle}>
          Interactive hobby projects
        </p>
      </motion.div>

      <motion.div className={styles.examples_grid} variants={containerVariants}>
        {hobbyItems.map((example, index) => (
          <motion.div
            key={index}
            className={styles.example_card}
            variants={itemVariants}
          >
            <div className={styles.card_content}>
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
                <Link href={example.demoPath} className={styles.demo_link}>
                  <Eye size={16} />
                  View Demo
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}