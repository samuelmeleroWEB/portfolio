import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.scss';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const About: React.FC = () => {
  const [ref, controls] = useScrollReveal();
  const [imgError, setImgError] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const childVariants = {
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
          <h2 className={styles.title}>01. / Sobre Mí</h2>
          <div className={styles.description}>
            <p>
              Soy Samuel Melero, un <span className={styles.highlight}>Desarrollador Full Stack</span> apasionado
              por construir experiencias digitales sólidas desde los cimientos hasta la interfaz. 
            </p>
            <p>
              Me encanta el equilibrio perfecto entre el diseño creativo y el código estructurado. Mi enfoque se centra en crear
              soluciones escalables, manteniendo siempre el diseño limpio y el rendimiento óptimo, ya sea optimizando bases de datos o puliendo micro-interacciones.
            </p>
          </div>
          
          <div className={styles.stats}>
            <p className={styles.statLine}>&gt; <span className={styles.key}>experiencia</span>: <span className={styles.value}>+3 años</span></p>
            <p className={styles.statLine}>&gt; <span className={styles.key}>proyectos</span>: <span className={styles.value}>6+</span></p>
            <p className={styles.statLine}>&gt; <span className={styles.key}>tecnologías</span>: <span className={styles.value}>15+</span></p>
          </div>
        </motion.div>

        <motion.div variants={childVariants} className={styles.visualContent}>
          <div className={styles.imageWrapper}>
            {!imgError ? (
              <img 
                src="/src/assets/images/samuel.jpg" 
                alt="Samuel Melero" 
                className={styles.profileImg} 
                onError={() => setImgError(true)}
              />
            ) : (
              <div className={styles.asciiArt}>
                <pre>
{`   _____      
  /     \\     
 | () () |    
  \\  ^  /     
   |||||      
  /|___|\\     
 /       \\    `}
                </pre>
              </div>
            )}
            <div className={styles.imageBorder}></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
