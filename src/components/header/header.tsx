import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Tooltip } from "../tooltip/tooltip";
import { headerLinks } from "../../constants/headerLinks";
import {
  LOGO_LIGHT,
  SUN,
  MOON,
  SUN_ALT,
  MOON_ALT,
  LOGO_DARK,
} from "../../constants/icons";
import styles from "@component/styles/header.module.scss";

export const Header = (): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    document.body.setAttribute("data-theme", savedTheme ?? "dark");
    savedTheme && setIsDarkMode(savedTheme === "dark");
  }, []);

  const handleThemeChange = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const newTheme = isDarkMode ? "dark" : "light";
    document.body.setAttribute("data-theme", newTheme);
    window.localStorage.setItem("theme", newTheme);

    // Trigger a reflow
    void document.body.offsetHeight;
  }, [isDarkMode]);

  return (
    <header className={styles.container}>
      <Link href="/">
        <img
          src={isDarkMode ? LOGO_LIGHT : LOGO_DARK}
          className={styles.logo}
          alt="website logo"
        />
      </Link>
      <div className={styles.links}>
        {headerLinks.map((link) => (
          <Link
            href={link.url}
            className={styles.link}
            key={link.title}
            target={link?.target}
            rel={link?.rel}
          >
            {link.title}
          </Link>
        ))}
        <Tooltip text="Page theme toggle">
          <button onClick={handleThemeChange} className={styles.button}>
            <img
              src={isDarkMode ? MOON : SUN}
              className={styles.logo}
              alt={isDarkMode ? MOON_ALT : SUN_ALT}
            />
          </button>
        </Tooltip>
      </div>
    </header>
  );
};
