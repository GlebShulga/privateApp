import { socialLinks } from "../../constants/socialLinks";
import styles from "@component/styles/main.module.scss";

export const Main = (): JSX.Element => {
  return (
    <div className={`${styles.hero} ${styles.grid}`}>
      <figure className={styles.figure} />
      <div className={styles.home_text}>
        <h1 className={styles.text}>
          Hello World
          <span>My name is Gleb</span>
        </h1>
        <p className={styles.text_thin}>and I&apos;m a web developer</p>
        <ul className={styles.link_bar}>
          {socialLinks.map((link) => (
            <li className={styles.link} key={link.name}>
              <a href={link.url} target="_blank">
                <figure>
                  <img src={link.iconSrc} alt={`${link.name} icon`} />
                  <figcaption className={styles.tooltip}>
                    {link.name}
                  </figcaption>
                </figure>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
