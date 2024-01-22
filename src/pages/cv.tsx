import { calculateYearsAndMonths } from "@component/helpers/calculateYearsAndMonths";
import styles from "@component/styles/cv.module.scss";

export default function Cv() {
  const periodOnLastJob = calculateYearsAndMonths(new Date(2021, 10));

  const periodInEpam =
    periodOnLastJob.months === 0
      ? `Oct 2021 - Present · ${periodOnLastJob.years} yr`
      : `Oct 2021 - Present · ${periodOnLastJob.years} yr ${periodOnLastJob.months} mos`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Experience</h1>
        <a
          href="/cv/gleb_shulga_cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.downloadCVButton}
        >
          Download CV
        </a>
      </div>
      <div className={styles.line}>
        <div className={styles.point} />
      </div>
      <h2>EPAM Systems</h2>
      <p>Frontend Developer</p>
      <p>{periodInEpam}</p>
      <ul>
        <li>
          Successfully built and launched a new enterprise-level React
          application from scratch, which received positive feedback from
          stakeholders and end-users.
        </li>
        <li>
          Significantly contributed to extending an enterprise e-commerce
          project, leveraging an existing code base to develop three additional
          websites with distinct styles.
        </li>
        <li>
          Implemented new features and bug fixes in accordance with business
          logic, resulting in improved user experience and increased customer
          satisfaction.
        </li>
        <li>
          Wrote comprehensive unit and integration tests for various components,
          functions, and API endpoints to maintain high code quality and prevent
          bugs and regressions.
        </li>
        <li>
          Created components in Storybook and leveraged it as a design system to
          showcase and document UI components for seamless collaboration across
          teams.
        </li>
        <li>
          Set up components in CMS (AEM and ContentStack) to enable efficient
          content management and streamline the process of updating and
          maintaining website content..
        </li>
        <li>
          Collaborated closely with cross-functional teams to identify and
          address technical issues, ensuring timely delivery of high-quality
          code.
        </li>
      </ul>
      <h2>Freelance</h2>
      <p>FullStack Developer</p>
      <p>Jun 2020 - Sep 2021 · 1 yr 4 mos</p>
      <ul>
        <li>
          Optimized Webpack bundle sizes, resulting in faster page load times
          and improved website performance.
        </li>
        <li>Developed custom booking forms for hotels.</li>
        <li>
          Implemented infinite scroll functionality, improving website
          navigation.
        </li>
        <li>
          Conducted audits and adaptations for e-commerce platforms to ensure
          A11y compliance, making the websites more accessible for users with
          disabilities.
        </li>
        <li>
          Fixed responsiveness issues using Tailwind, ensuring that websites are
          fully functional on all devices.
        </li>
        <li>
          Built RESTful APIs using Express and Node, creating robust and
          scalable solutions for clients.
        </li>
      </ul>
    </div>
  );
}
