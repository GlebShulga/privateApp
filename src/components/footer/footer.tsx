import footerStyles from "@component/styles/footer.module.scss";

export const Footer = (): JSX.Element => {
  return (
    <footer
      className={footerStyles.container}
    >
      © 2023 Gleb Shulga |{" "}
      <a href="https://www.linkedin.com/in/gleb-shulga/" target="_blank">
        <span>Get in touch</span>
      </a>
    </footer>
  );
};
