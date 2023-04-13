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
import headerStyles from "./header.module.scss";

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
      <img
            src={isDarkMode ? LOGO_DARK : LOGO_LIGHT}
            className={headerStyles.logo}
            alt="website logo"
          />
        <div className={headerStyles.header__links}>
          {headerLinks.map((link) => (
            <Link
              href={link.url}
              className={headerStyles.link}
              key={link.title}
            >
              {link.title}
            </Link>
          ))}
          <Tooltip text="Page theme toggle">
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
          </Tooltip>
        </div>
      </div>
    </header>
  );
};
