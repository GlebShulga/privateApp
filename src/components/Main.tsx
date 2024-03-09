import { socialLinks } from "../constants/socialLinks";
import styles from "@component/styles/main.module.scss";

export const Main = (): JSX.Element => {
  return (
    <div>
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
                <a href={link.url} target="_blank" rel="noopener noreferrer">
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
      <section className={styles.container}>
        <div>
          <p>
            I&apos;m a Full Stack developer with a primary focus on{" "}
            <strong>React</strong> and <strong>NodeJS</strong>, and I enjoy
            creating things that live on the Internet.
          </p>
          <p>
            During my career, I&apos;ve had the opportunity to work on a variety
            of exciting projects that have helped me hone my skills and gain
            valuable experience.
          </p>
          <p>
            My area of expertise as a Full Stack developer lies in optimizing
            website performance and improving user experience. Through various
            projects, I have honed my skills in optimizing Webpack bundle sizes,
            resulting in faster page load times and improved website
            performance. My commitment to accessibility is strong, and I have
            conducted audits and adaptations for e-commerce platforms to ensure
            A11y compliance, making websites more accessible for users with
            disabilities.
          </p>{" "}
          <p>
            In addition to my front-end expertise, I have built robust and
            scalable RESTful APIs using Express and Node. One of my major
            accomplishments as a Full Stack developer was building and launching
            an enterprise-level React application from scratch. The application
            received positive feedback from both stakeholders and end-users,
            demonstrating my ability to create successful solutions that meet
            the needs of all parties involved.
          </p>
          <p>
            Interested in both frontend and backend development and working on
            ambitious projects with collaborative and supportive teams.
          </p>
          <p>
            Thanks for stopping by my site, and don&apos;t hesitate to{" "}
            <a href="mailto:shulga_gleb@hotmail.com?subject=Hello There!&amp;body=Hi Gleb, so I was looking at your website and...">
              reach out!
            </a>
            😊
          </p>
        </div>
      </section>
    </div>
  );
};
