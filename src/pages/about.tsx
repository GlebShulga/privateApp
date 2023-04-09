import styles from "@component/styles/about.module.scss";

export default function About() {
  return (
    <main>
      <section className={styles.about}>
        <h1>Hi, I&apos;m Gleb</h1>
        <div>
          <p>
            I&apos;m a Full Stack developer with a primary focus on{" "}
            <strong>React</strong> and <strong>NodeJS</strong>, and I&apos;ve
            been working in the field for 3 years now. During my career,
            I&apos;ve had the opportunity to work on a variety of exciting
            projects that have helped me hone my skills and gain valuable
            experience.
          </p>
          <p>
            My expertise lies in optimizing website performance and user
            experience. I&apos;ve worked on several projects where I&apos;ve
            optimized Webpack bundle sizes, resulting in faster page load times
            and improved website performance. Additionally, I&apos;ve developed
            custom booking forms for hotels and implemented infinite scroll
            functionality, which has significantly improved website navigation.
          </p>
          <p>
            I have a strong commitment to accessibility, and I&apos;ve conducted
            audits and adaptations for e-commerce platforms to ensure A11y
            compliance, making the websites more accessible for users with
            disabilities. I&apos;ve also used Tailwind to fix responsiveness
            issues, ensuring that websites are fully functional on all devices.
          </p>
          <p>
            As a Full Stack developer, I&apos;ve also built RESTful APIs using
            Express and Node, creating robust and scalable solutions for
            clients. One of my major achievements is building and launching a
            new enterprise-level React application from scratch that received
            positive feedback from stakeholders and end-users.
          </p>
          <p>
            In my work, I collaborate closely with cross-functional teams to
            identify and address technical issues, ensuring timely delivery of
            high-quality code. I&apos;m passionate about solving complex
            problems, and I always strive to implement new features and bug
            fixes in accordance with business logic, resulting in improved user
            experience and increased customer satisfaction.
          </p>
          <p>
            Thanks for stopping by my site, and don&apos;t hesitate to
            <a href="mailto:shulga_gleb@hotmail.com?subject=Hello There!&amp;body=Hi Gleb, so I was looking at your website and...">
              reach out!
            </a>
            😊
          </p>
        </div>
      </section>
    </main>
  );
}
