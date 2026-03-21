import React from 'react';
import { motion } from 'framer-motion';
import styles from './Skills.module.scss';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { skills } from '../../data/skills';
import { Icon } from '../ui/Icons';

export const Skills: React.FC = () => {
  const { t } = useTranslation();
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

  const pillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  // Helper to translate notes that are in the JSON
  const getTranslatedNote = (skillName: string, defaultNote: string) => {
    const key = skillName.toLowerCase().replace(/\s+/g, '_');
    const translated = t(`skills.notes.${key}`, { defaultValue: '' });
    if (translated) return translated;
    
    // Fallback for common Spanish terms that I already know are there
    if (defaultNote === 'Tipado estricto, Interfaces') return t('skills.notes.tipado');
    if (defaultNote === 'Semántico, Accesibilidad') return t('skills.notes.semantico');
    if (defaultNote === 'Control de versiones') return t('skills.notes.cv');
    if (defaultNote === 'Gestión ágil, Scrum') return t('skills.notes.agile');
    
    return defaultNote;
  };

  return (
    <section id="habilidades" className={styles.skillsSection} ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className={styles.container}
      >
        <motion.h2 variants={itemVariants} className={styles.title}>{t('skills.title')}</motion.h2>

        <div className={styles.categories}>
          {categories.map((category) => (
            <motion.div key={category} variants={itemVariants} className={styles.category}>
              <h3 className={styles.categoryTitle}># {t(`skills.categories.${category}`)}</h3>
              <motion.div 
                className={styles.grid}
                variants={{
                  visible: { transition: { staggerChildren: 0.08 } },
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
                      <div className={styles.tooltip}>
                        {getTranslatedNote(skill.name, skill.note)}
                      </div>
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

