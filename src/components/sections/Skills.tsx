import React from 'react';
import { motion } from 'framer-motion';
import styles from './Skills.module.scss';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { skills } from '../../data/skills';
import { Icon } from '../ui/Icons';

export const Skills: React.FC = () => {
  const [ref, controls] = useScrollReveal();

  const categories = ['Frontend', 'Backend', 'Herramientas'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Ensure pills animate one after another
  const pillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <section id="habilidades" className={styles.skillsSection} ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className={styles.container}
      >
        <motion.h2 variants={itemVariants} className={styles.title}>02. / Stack</motion.h2>

        <div className={styles.categories}>
          {categories.map((category) => (
            <motion.div key={category} variants={itemVariants} className={styles.category}>
              <h3 className={styles.categoryTitle}># {category}</h3>
              <motion.div 
                className={styles.grid}
                variants={{
                  visible: { transition: { staggerChildren: 0.08 } }, // 80ms stagger
                  hidden: {}
                }}
              >
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={pillVariants}
                      className={styles.skillPill}
                    >
                      <Icon name={skill.icon} className={styles.skillIcon} />
                      <span className={styles.skillName}>{skill.name}</span>
                      <div className={styles.tooltip}>{skill.note}</div>
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
