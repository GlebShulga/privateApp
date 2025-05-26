"use client";

import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "./Tooltip";
import { headerLinks } from "../constants/headerLinks";
import {
  LOGO_LIGHT,
  SUN,
  MOON,
  SUN_ALT,
  MOON_ALT,
  LOGO_DARK,
} from "../constants/icons";
import styles from "../styles/header.module.scss";
import { useTheme } from "../ThemeContext";
import { motion } from "framer-motion";

export const Header = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const logoSrc = isDarkMode ? LOGO_LIGHT : LOGO_DARK;
  const buttonSrc = isDarkMode ? MOON : SUN;

  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <>
      {/* Skip Navigation Link */}
      <a href="#main-content" className={styles.skip_link}>
        Skip to main content
      </a>

      <motion.header
        className={styles.container}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        role="banner"
      >
        {" "}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Tooltip text="Main page">
            <Link href="/" className={styles.logo} aria-label="Go to homepage">
              <Image
                src={logoSrc}
                alt="Gleb Shulga website logo"
                width={48}
                height={48}
                priority
              />
            </Link>
          </Tooltip>
        </motion.div>
        <nav
          className={styles.links}
          role="navigation"
          aria-label="Main navigation"
        >
          {headerLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
            >
              <Link
                href={link.url}
                className={styles.link}
                target={link?.target}
                rel={link?.rel}
                aria-label={
                  link?.target === "_blank"
                    ? `${link.title} (opens in new tab)`
                    : link.title
                }
              >
                {link.title}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Tooltip text="Toggle theme">
              <motion.button
                onClick={handleThemeChange}
                className={styles.button}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                aria-label={`Switch to ${
                  isDarkMode ? "light" : "dark"
                } mode`}
                aria-pressed={isDarkMode}
              >
                <Image
                  src={buttonSrc}
                  className={styles.buttonIcon}
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden="true"
                />
              </motion.button>
            </Tooltip>
          </motion.div>
        </nav>
      </motion.header>
    </>
  );
};
