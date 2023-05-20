import { useEffect, useState } from "react";
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
    const newTheme = isDarkMode ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
    window.localStorage.setItem("theme", "dark");
  }, [isDarkMode]);

  return (
    <header className={styles.container}>
      <Link href="/">
        <img
          src={isDarkMode ? LOGO_DARK : LOGO_LIGHT}
          className={styles.logo}
          alt="website logo"
        />
      </Link>
      <div className={styles.links}>
        {headerLinks.map((link) => (
          <Link href={link.url} className={styles.link} key={link.title}>
            {link.title}
          </Link>
        ))}
        <Tooltip text="Page theme toggle">
          <button
            onClick={() => setIsDarkMode((prevState) => !prevState)}
            className={styles.button}
          >
            <img
              src={isDarkMode ? SUN : MOON}
              className={styles.logo}
              alt={isDarkMode ? SUN_ALT : MOON_ALT}
            />
          </button>
        </Tooltip>
      </div>
    </header>
  );
};
