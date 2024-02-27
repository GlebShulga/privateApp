import { useTheme } from "../ThemeContext";
import Image from "next/image";
import { LOGO_LIGHT, LOGO_DARK } from "../constants/icons";
import footerStyles from "@component/styles/footer.module.scss";
import { socialLinks } from "../constants/socialLinks";

export const Footer = (): JSX.Element => {
  const { theme } = useTheme();

  const isDarkMode = theme === "dark";
  const logoSrc = isDarkMode ? LOGO_LIGHT : LOGO_DARK;

  const linkedInUrl = socialLinks[1].url;

  const currentYear = new Date().getFullYear();
  return (
    <footer className={footerStyles.container}>
      <Image src={logoSrc} alt="Website logo" width={40} height={40} priority />{" "}
      <div>
        {currentYear} Gleb Shulga |{" "}
        <a href={linkedInUrl} target="_blank">
          <span>Get in touch</span>
        </a>
      </div>
    </footer>
  );
};
