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
import styles from "@component/styles/header.module.scss";
import { useTheme } from "../ThemeContext";

export const Header = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const logoSrc = isDarkMode ? LOGO_LIGHT : LOGO_DARK;
  const buttonSrc = isDarkMode ? MOON : SUN;

  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <header className={styles.container}>
      <Link href="/">
        <Image
          src={logoSrc}
          alt="Website logo"
          width={48}
          height={48}
          priority
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
              src={buttonSrc}
              className={styles.button}
              alt={isDarkMode ? MOON_ALT : SUN_ALT}
            />
          </button>
        </Tooltip>
      </div>
    </header>
  );
};
