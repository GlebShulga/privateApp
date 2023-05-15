import footerStyles from "@component/styles/footer.module.scss";

export const Footer = (): JSX.Element => {
  return (
    <footer
      className={footerStyles.container}
    >
      © 2023 Gleb Shulga |{" "}
      <a href="mailto:shulga_gleb@hotmail.com?subject=Hello There!&amp;body=Hi Gleb, so I was looking at your website and...">
        <span>Get in touch</span>
      </a>
    </footer>
  );
};
