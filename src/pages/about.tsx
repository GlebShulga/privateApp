import styles from "@component/styles/about.module.scss";

export default function About() {
  return (
      <section className={styles.container}>
        <h1>Hi, I&apos;m Gleb</h1>
        <figure><img className={styles.photo} src="/assets/portrait_about.jpg" alt="portrait of the author"/></figure>
        <div>
          <p>
            I&apos;m a Full Stack developer with a primary focus on{" "}
            <strong>React</strong> and <strong>NodeJS</strong>, and I enjoy
            creating things that live on the internet. During my career,
            I&apos;ve had the opportunity to work on a variety of exciting
            projects that have helped me hone my skills and gain valuable
            experience.
          </p>
          <p>
            My area of expertise as a Full Stack developer lies in optimizing
            website performance and improving user experience. Through various
            projects, I have honed my skills in optimizing Webpack bundle sizes,
            resulting in faster page load times and improved website
            performance. I have also developed custom booking forms for hotels,
            which has significantly improved website navigation. My commitment
            to accessibility is strong, and I have conducted audits and
            adaptations for e-commerce platforms to ensure A11y compliance,
            making websites more accessible for users with disabilities. I have
            also used Tailwind to fix responsiveness issues, ensuring that
            websites are fully functional on all devices.
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
  );
}
