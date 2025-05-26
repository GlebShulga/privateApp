export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  duration: string;
  description: string[];
  technologies?: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  summary: string;
}

export interface Skills {
  core: string[];
  topSkills: string[];
  languages: {
    language: string;
    proficiency: string;
  }[];
}

export const personalInfo: PersonalInfo = {
  name: "Gleb Shulga",
  title: "Front-end Developer | React | Next | Node",
  location: "Spain",
  email: "shulga_gleb@hotmail.com",
  linkedin: "http://www.linkedin.com/in/gleb-shulga",
  summary:
    "Front-end developer with 5 years of experience, primarily focused on React, Next.js, and building high-performance web applications. I enjoy creating things that live on the internet and are accessible to everyone.",
};

export const skills: Skills = {
  core: [
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Redux Toolkit",
    "SCSS",
    "Tailwind CSS",
    "Material UI",
    "CMS (AEM, ContentStack, Storyblok)",
    "Jest",
    "E2E Testing",
    "REST APIs",
    "Git",
    "HTML5",
    "Semantic HTML",
    "Responsive Design",
    "Accessibility (A11y)",
    "SPA SEO",
    "Performance Monitoring (Web Vitals)",
    "Node.js",
    "Express",
  ],
  topSkills: ["Bitbucket", "GitHub", "Algolia"],
  languages: [
    {
      language: "Russian",
      proficiency: "Native or Bilingual",
    },
    {
      language: "English",
      proficiency: "Professional Working",
    },
    {
      language: "Spanish",
      proficiency: "Novice",
    },
  ],
};

export const experience: Experience[] = [
  {
    company: "IMMIGRANT INVEST",
    position: "Frontend Developer",
    location: "Tbilisi, Georgia",
    startDate: "September 2024",
    endDate: "Present",
    duration: "9 months",
    description: [
      "Lead development and maintenance responsive, high-performance frontend applications using Typescript, React, and Next.js.",
      "Leverage the project's Design System and UI-kit to build consistent, scalable, and user-friendly interfaces, directly enhancing customer satisfaction.",
      "Build and enhance web applications utilizing the Next.js app directory for optimal performance and SEO.",
      "Apply performance optimization techniques, reducing TTFB by 20% through code splitting and asset optimization.",
      "Lead the development team, ensuring alignment of frontend work with broader project objectives and goals.",
      "Managed an NX Monorepo to unify development workflows across multiple sites.",
      "Write comprehensive unit and E2E tests to maintain code quality.",
      "Collaborate closely with product manager and designer and business owner to deliver seamless, user-centric solutions.",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "NX Monorepo",
      "Design System",
      "Performance Optimization",
    ],
  },
  {
    company: "EPAM Systems",
    position: "Frontend Developer",
    location: "Moscow, Russia / Georgia",
    startDate: "October 2021",
    endDate: "September 2024",
    duration: "3 years",
    description: [
      "Successfully built and launched a new enterprise-level React application from scratch, which received positive feedback from stakeholders and end-users.",
      "Significantly contributed to extending an enterprise e-commerce project, leveraging an existing code base to develop three additional websites with distinct styles.",
      "Implemented new features and bug fixes in accordance with business logic, resulting in improved user experience and increased customer satisfaction.",
      "Wrote extensive unit and integration tests using Jest and Testing Library to maintain 80%+ code coverage.",
      "Integrated third-party services such as TrueFit and Google reCAPTCHA seamlessly into the application, enhancing its functionality and security measures.",
      "Contributed to a project that required internationalization (i18n) for more than 100 locales, ensuring the application supported multiple languages and regions effectively.",
      "Created components in Storybook and leveraged it as a design system to showcase and document UI components for seamless collaboration across teams.",
      "Set up components in CMS (AEM and ContentStack) to enable efficient content management and streamline the process of updating and maintaining website content.",
      "Collaborated closely with cross-functional teams to identify and address technical issues, ensuring timely delivery of high-quality code.",
      "Transitioned between Moscow and Georgia offices while maintaining consistent high-quality development standards and project continuity.",
    ],
    technologies: [
      "React",
      "Jest",
      "Testing Library",
      "Storybook",
      "i18n",
      "AEM",
      "ContentStack",
      "TrueFit",
      "Google reCAPTCHA",
    ],
  },
  {
    company: "Upwork",
    position: "Web Developer",
    location: "Remote",
    startDate: "June 2020",
    endDate: "September 2021",
    duration: "1 year 4 months",
    description: [
      "Optimized Webpack bundle sizes, resulting in faster page load times and improved website performance.",
      "Developed custom booking forms with client-side validation and RESTful API integration.",
      "Conducted audits and adaptations for e-commerce platforms to ensure A11y compliance, making the websites more accessible for users with disabilities.",
      "Applied CSS Grid and Flexbox for complex layout requirements across various screen sizes.",
      "Fixed responsive design issues using Tailwind CSS and mobile-first approaches.",
      "Built RESTful APIs using Express and Node, creating robust and scalable solutions for clients.",
    ],
    technologies: [
      "Webpack",
      "React",
      "Express",
      "Node.js",
      "Tailwind CSS",
      "A11y",
      "RESTful APIs",
    ],
  },
];

export const totalExperience = {
  years: 5,
  months: 9,
  description: "5 years of experience in frontend development",
};
