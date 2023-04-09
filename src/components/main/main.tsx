import Image from "next/image";
import { socialLinks } from "./socialLinks";
import mainStyles from "./main.module.scss";

export const Main = (): JSX.Element => {
  return (
    <div className={`${mainStyles.hero} ${mainStyles.grid}`}>
      <div className={mainStyles.center}>
        <Image
          className={mainStyles.img}
          src="/next.svg"
          alt="Gleb's photo"
          priority
        />
      </div>
      <div className={mainStyles.home_text}>
        <h1 className={mainStyles.text}>
          Hello World
          <span>My name is Gleb</span>
        </h1>
        <p className={mainStyles.text_thin}>and I&apos;m a web developer</p>
        <ul className={mainStyles.link_bar}>
          {socialLinks.map((link) => (
            <li className={mainStyles.link} key={link.name}>
              <a href={link.url} target="_blank">
                <img src={link.iconSrc} alt={`${link.name} icon`} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
