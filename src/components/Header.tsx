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
    <motion.header
      className={styles.container}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {" "}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Tooltip text="Main page">
          <Link href="/" className={styles.logo}>
            <Image
              src={logoSrc}
              alt="Website logo"
              width={48}
              height={48}
              priority
            />
          </Link>
        </Tooltip>
      </motion.div>
      <div className={styles.links}>
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
            >
              {" "}
              <Image
                src={buttonSrc}
                className={styles.buttonIcon}
                alt={isDarkMode ? MOON_ALT : SUN_ALT}
                width={20}
                height={20}
              />
            </motion.button>
          </Tooltip>
        </motion.div>
      </div>
    </motion.header>
  );
};
