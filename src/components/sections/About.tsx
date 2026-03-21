import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './About.module.scss';
import { useTranslation, Trans } from 'react-i18next';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import profileImg from '../../assets/images/projects/imgprofile.jpg';

export const About: React.FC = () => {
  const { t } = useTranslation();
  const [ref, controls] = useScrollReveal();
  const [imgError, setImgError] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="sobre-mi" className={styles.about} ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className={styles.container}
      >
        <motion.div variants={childVariants} className={styles.textContent}>
          <h2 className={styles.title}>{t('about.title')}</h2>
          <div className={styles.description}>
            <p>
              <Trans 
                i18nKey="about.p1"
                components={{ highlight: <span className={styles.highlight} /> }}
              >
                Soy Samuel Melero, un <span className={styles.highlight}>Desarrollador Full Stack</span> apasionado
                por construir experiencias digitales sólidas desde los cimientos hasta la interfaz.
              </Trans>
            </p>
            <p>{t('about.p2')}</p>
          </div>
          
          <div className={styles.stats}>
            <p className={styles.statLine}>&gt; <span className={styles.key}>{t('about.stats.experience')}</span>: <span className={styles.value}>{t('about.stats.years')}</span></p>
            <p className={styles.statLine}>&gt; <span className={styles.key}>{t('about.stats.projects')}</span>: <span className={styles.value}>6+</span></p>
            <p className={styles.statLine}>&gt; <span className={styles.key}>{t('about.stats.technologies')}</span>: <span className={styles.value}>15+</span></p>
          </div>
        </motion.div>

        <motion.div variants={childVariants} className={styles.visualContent}>
          <div className={styles.imageWrapper}>
            {!imgError ? (
              <img 
                src={profileImg} 
                alt="Samuel Melero" 
                className={styles.profileImg} 
                onError={() => setImgError(true)}
              />
            ) : (
              <div className={styles.fallbackAvatar}>
                <span>SM</span>
              </div>
            )}
            <div className={styles.imageBorder}></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

