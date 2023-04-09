import { useEffect, useState } from "react";
import {
  LOGO_LIGHT,
  SUN,
  MOON,
  SUN_ALT,
  MOON_ALT,
  LOGO_DARK,
} from "./constants";
import headerStyles from "./header.module.scss";
import Link from "next/link";

export const Header = (): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const newTheme = isDarkMode ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
    window.localStorage.setItem("theme", "dark");
  }, [isDarkMode]);

  return (
    <header
      className={`${headerStyles.header} ${headerStyles.header_with_shadow}`}
    >
      <div className={headerStyles.header__container}>
        <div className={headerStyles.header_level_top}>
          <img
            src={isDarkMode ? LOGO_DARK : LOGO_LIGHT}
            className={headerStyles.logo}
            alt="website logo"
          />
          <Link href="/" className={headerStyles.link}>Home</Link>
          <Link href="/about" className={headerStyles.link}>
            About Me
          </Link>
          <button
            onClick={() => setIsDarkMode((prevState) => !prevState)}
            className={headerStyles.button}
          >
            <img
              src={isDarkMode ? SUN : MOON}
              className={headerStyles.logo}
              alt={isDarkMode ? SUN_ALT : MOON_ALT}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
