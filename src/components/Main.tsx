"use client";

import { socialLinks } from "../constants/socialLinks";
import { personalInfo, skills, totalExperience } from "../constants/cvData";
import { useTheme } from "../ThemeContext";
import { NEXTJS_LIGHT, NEXTJS_DARK } from "../constants/icons";
import styles from "../styles/main.module.scss";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ChevronDown,
  Code,
  Palette,
  Zap,
  MapPin,
  Mail,
  Calendar,
  Triangle,
} from "lucide-react";
import Image from "next/image";

export const Main = (): JSX.Element => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isDarkMode = theme === "dark";
  const nextjsIconSrc = isDarkMode ? NEXTJS_DARK : NEXTJS_LIGHT;

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

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.div
        className={`${styles.hero} ${styles.grid}`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.figure
          className={styles.figure}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />{" "}
        <div className={styles.home_text}>
          <motion.h1 className={styles.text} variants={itemVariants}>
            <motion.span
              className={styles.greeting}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Hello World 👋
            </motion.span>
            <motion.span
              className={styles.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              I&apos;m {personalInfo.name}
            </motion.span>
          </motion.h1>
          <motion.div className={styles.role_container} variants={itemVariants}>
            <p className={styles.text_thin}>{personalInfo.title}</p>
            <div className={styles.location_info}>
              <span className={styles.location}>
                <MapPin size={16} />
                {personalInfo.location}
              </span>
              <span className={styles.experience}>
                <Calendar size={16} />
                {totalExperience.description}
              </span>
            </div>{" "}
            <div className={styles.specialties}>
              <span className={styles.specialty}>
                <Code size={16} />
                JavaScript/TypeScript
              </span>{" "}
              <span className={styles.specialty}>
                <Image
                  src={nextjsIconSrc}
                  alt="Next.js"
                  width={16}
                  height={16}
                />
                React & Next.js
              </span>
              <span className={styles.specialty}>
                <Zap size={16} />
                Performance
              </span>
            </div>
          </motion.div>
          <motion.ul className={styles.link_bar} variants={itemVariants}>
            {socialLinks.map((link, index) => (
              <motion.li
                className={styles.link}
                key={link.name}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <figure>
                    <Image
                      src={link.iconSrc}
                      alt={`${link.name} icon`}
                      width={24}
                      height={24}
                    />
                    <figcaption className={styles.tooltip}>
                      {link.name}
                    </figcaption>
                  </figure>
                </a>
              </motion.li>
            ))}
          </motion.ul>
          <motion.button
            className={styles.scroll_indicator}
            onClick={scrollToAbout}
            variants={itemVariants}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            aria-label="Scroll to about section"
          >
            <ChevronDown size={24} />
          </motion.button>
        </div>
      </motion.div>

      {/* About Section */}
      <motion.section
        id="about"
        className={styles.container}
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <h2 className={styles.section_title}>About Me</h2>{" "}
          <div className={styles.about_grid}>
            <div className={styles.about_text}>
              <motion.p variants={itemVariants}>
                {personalInfo.summary}
              </motion.p>
              <motion.p variants={itemVariants}>
                With over 4 years of experience in frontend development, I have
                worked on enterprise-level React applications, e-commerce
                platforms, and international projects supporting 100+ locales. I
                specialize in building high-performance, accessible web
                applications that deliver exceptional user experiences.
              </motion.p>
              <motion.p variants={itemVariants}>
                My expertise includes performance optimization, reducing TTFB by
                20% through code splitting and asset optimization, and
                maintaining 80%+ code coverage with comprehensive testing using
                Jest and Testing Library.
              </motion.p>
              <motion.p variants={itemVariants}>
                I have experience leading development teams, managing NX
                Monorepos, and working with modern technologies including
                TypeScript, React, Next.js, and various CMS platforms like AEM
                and ContentStack.
              </motion.p>
              <motion.p variants={itemVariants}>
                I&apos;m always excited about new challenges and love
                collaborating with passionate teams on ambitious projects.
                <motion.a
                  href={`mailto:${personalInfo.email}?subject=Hello There!&body=Hi Gleb, so I was looking at your website and...`}
                  className={styles.contact_link}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let&apos;s connect and build something amazing together! 🚀
                </motion.a>
              </motion.p>
            </div>{" "}
            <motion.div
              className={styles.skills_highlight}
              variants={itemVariants}
            >
              <h3>Core Technologies</h3>
              <div className={styles.tech_stack}>
                {skills.core.slice(0, 12).map((skill, index) => (
                  <motion.span
                    key={skill}
                    className={styles.tech_item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
              <div className={styles.languages_section}>
                <h4>Languages</h4>
                <div className={styles.languages_list}>
                  {skills.languages.map((lang, index) => (
                    <span key={lang.language} className={styles.language_item}>
                      <strong>{lang.language}</strong> - {lang.proficiency}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};
