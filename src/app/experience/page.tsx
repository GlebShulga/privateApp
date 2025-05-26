"use client";

import { experience, personalInfo } from "../../constants/cvData";
import styles from "../../styles/experience.module.scss";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, Award, Code, Users, Zap } from "lucide-react";

export default function ExperiencePage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const achievements = [
    { icon: <Award />, text: "Enterprise React Application from Scratch" },
    {
      icon: <Code />,
      text: "Performance Optimization & Bundle Size Reduction",
    },
    { icon: <Users />, text: "Cross-functional Team Collaboration" },
    { icon: <Zap />, text: "A11y Compliance & Accessibility Audits" },
  ];

  return (
    <motion.div
      className={styles.container}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div className={styles.header} variants={itemVariants}>
        <h1 className={styles.title}>Professional Experience</h1>
        <p className={styles.subtitle}>
          Building exceptional web experiences with modern technologies
        </p>
      </motion.div>

      <div className={styles.timeline}>
        {experience.map((job, index) => (
          <motion.div
            key={index}
            className={styles.experience_card}
            variants={itemVariants}
          >
            {" "}
            <div className={styles.card_header}>
              <div className={styles.company_info}>
                <h2 className={styles.company}>{job.company}</h2>
                <div className={styles.role_info}>
                  <h3 className={styles.role}>{job.position}</h3>{" "}
                  <div className={styles.meta}>
                    <span className={styles.meta_item}>
                      <Calendar size={16} />
                      {job.startDate} - {job.endDate} · {job.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {index === 0 && (
              <motion.div
                className={styles.achievements_grid}
                variants={containerVariants}
              >
                {achievements.map((achievement, achIndex) => (
                  <motion.div
                    key={achIndex}
                    className={styles.achievement_item}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.achievement_icon}>
                      {achievement.icon}
                    </div>
                    <span>{achievement.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
            <motion.div
              className={styles.responsibilities}
              variants={itemVariants}
            >
              <h4>Key Responsibilities & Achievements</h4>
              <ul className={styles.responsibility_list}>
                {job.description.map((responsibility, respIndex) => (
                  <motion.li key={respIndex} variants={itemVariants}>
                    {responsibility}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            {job.technologies && (
              <motion.div className={styles.tech_used} variants={itemVariants}>
                <h4>Technologies Used</h4>
                <div className={styles.tech_tags}>
                  {job.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className={styles.tech_tag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
