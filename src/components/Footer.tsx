import { useTheme } from "../ThemeContext";
import Image from "next/image";
import { LOGO_LIGHT, LOGO_DARK } from "../constants/icons";
import footerStyles from "@component/styles/footer.module.scss";
import { socialLinks } from "../constants/socialLinks";
import { personalInfo } from "../constants/cvData";
import { motion } from "framer-motion";
import { Heart, Mail, ExternalLink } from "lucide-react";

export const Footer = (): JSX.Element => {
  const { theme } = useTheme();

  const isDarkMode = theme === "dark";
  const logoSrc = isDarkMode ? LOGO_LIGHT : LOGO_DARK;

  const linkedInUrl = socialLinks[1].url;
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className={footerStyles.container}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className={footerStyles.content}>
        <div className={footerStyles.main_section}>
          <motion.div
            className={footerStyles.brand}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={logoSrc}
              alt="Gleb Shulga Logo"
              width={48}
              height={48}
              priority
              className={footerStyles.logo}
            />
            <div className={footerStyles.brand_text}>
              <h3>Gleb Shulga</h3>
              <p>Full Stack Developer</p>
            </div>
          </motion.div>

          <div className={footerStyles.quick_links}>
            <h4>Connect</h4>
            <div className={footerStyles.social_links}>
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerStyles.social_link}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  aria-label={`Visit my ${link.name} profile`}
                >
                  <Image
                    src={link.iconSrc}
                    alt={`${link.name} icon`}
                    width={20}
                    height={20}
                  />
                  <span>{link.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div className={footerStyles.contact_section}>
            <h4>Get In Touch</h4>
            <motion.a
              href="mailto:shulga_gleb@hotmail.com?subject=Hello There!&body=Hi Gleb, so I was looking at your website and..."
              className={footerStyles.contact_link}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={18} />
              <span>Let&apos;s work together</span>
              <ExternalLink size={14} />
            </motion.a>
          </div>
        </div>

        <div className={footerStyles.divider}></div>

        <div className={footerStyles.bottom_section}>
          <div className={footerStyles.copyright}>
            <span>© {currentYear} Gleb Shulga. All rights reserved.</span>
          </div>

          <motion.div
            className={footerStyles.made_with}
            whileHover={{ scale: 1.05 }}
          >
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Heart size={16} fill="currentColor" />
            </motion.div>
            <span>and Next.JS</span>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};
