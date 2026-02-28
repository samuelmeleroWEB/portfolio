import React from 'react';
import { motion } from 'framer-motion';
import styles from './Projects.module.scss';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { projects } from '../../data/projects';

export const Projects: React.FC = () => {
  const [ref, controls] = useScrollReveal(0.1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="proyectos" className={styles.projectsSection} ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className={styles.container}
      >
        <h2 className={styles.title}>03. / Proyectos</h2>
        <div className={styles.grid}>
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants} className={styles.card}>
              {project.image && (
                <div className={styles.cardBg} style={{ backgroundImage: `url(${project.image})` }} />
              )}
              <div className={styles.cardContent}>
                {project.badge && (
                  <div className={`${styles.developmentBanner} ${project.badgeType ? styles[project.badgeType] : ''}`.trim()}>
                    <span>{project.badge}</span>
                  </div>
                )}
                <div className={styles.cardNumber}>{project.number}</div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>{project.description}</p>
                <div className={styles.tags}>
                  {project.stack.map(tech => (
                    <span key={tech} className={styles.tag}>{tech}</span>
                  ))}
                </div>
              </div>
              <div className={styles.overlay}>
                <div className={styles.actions}>
                  <a href={project.demoUrl} className={styles.actionBtn} target="_blank" rel="noopener noreferrer" style={project.demoUrl === '#' ? { opacity: 0.4, cursor: 'not-allowed', pointerEvents: 'none' } : {}}>Ver demo</a>
                  <a href={project.githubUrl} className={styles.actionBtn} target="_blank" rel="noopener noreferrer" style={project.githubUrl === '#' ? { opacity: 0.4, cursor: 'not-allowed', pointerEvents: 'none' } : {}}>GitHub</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};