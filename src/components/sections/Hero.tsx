import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Hero.module.scss';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useTypewriter } from '../../hooks/useTypewriter';
import { siteConfig } from '../../data/config';
import { useTranslation } from 'react-i18next';

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const PHRASES: string[] = t('hero.phrases', { returnObjects: true }) as string[];
  
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [ref] = useScrollReveal();
  const [offsetY, setOffsetY] = useState(0);
  const { displayed, done } = useTypewriter('Samuel Melero', 100);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % PHRASES.length);
    }, 2500);
    
    // Parallax effect on background
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(phraseInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [PHRASES.length]);

  return (
    <section id="hero" className={styles.hero} ref={ref}>
      {/* Background Parallax Code Line */}
      <div 
        className={styles.bgCode}
        style={{ transform: `translate(-50%, calc(-50% + ${offsetY * 0.4}px))` }}
      >
        const samuel = new Developer(&#123; skills: ['React', 'Angular', 'Node.js'] &#125;)
      </div>

      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.greeting}>&gt; init_user</div>
        
        <h1 className={styles.title}>
          {displayed}
          <span className={`${styles.cursor} ${done ? styles.blink : ''}`}>|</span>
        </h1>
        <h2 className={styles.subtitle}>{t('hero.role')}</h2>

        <div className={styles.roleContainer}>
          <span className={styles.terminalPrompt}>&gt;</span>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPhrase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={styles.dynamicPhrase}
            >
              {PHRASES[currentPhrase]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className={styles.actions}>
          <a 
            href="#proyectos" 
            className={styles.primaryBtn}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#proyectos')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className={styles.bracket}>[</span> {t('hero.cta')} <span className={styles.bracket}>]</span>
          </a>
          <a href={siteConfig.cvUrl} className={styles.secondaryBtn} download="CvSamuelMeleroDev.pdf">
            {t('hero.cv')}
          </a>
        </div>
      </motion.div>

      <motion.div 
        className={styles.scrollIndicator}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className={styles.mouse}></span>
        <span className={styles.arrow}>{t('hero.scroll')}</span>
      </motion.div>
    </section>
  );
};

