import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import styles from './Certifications.module.scss';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { certifications } from '../../data/certifications';
import { Certification } from '../../types';

export const Certifications: React.FC = () => {
  const [ref, controls] = useScrollReveal(0.1);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  // Sort by date (descending - most recent first)
  const sortedCertifications = [...certifications].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section id="certificaciones" className={styles.certsSection} ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className={styles.container}
      >
        <h2 className={styles.title}>04. / Certificaciones</h2>
        
        <div className={styles.grid}>
          {sortedCertifications.map((cert) => (
            <motion.div key={cert.id} variants={itemVariants} className={styles.card}>
              <div className={styles.imageContainer} onClick={() => setSelectedCert(cert)}>
                {cert.image && (
                  <img src={cert.image} alt={cert.title} className={styles.certImage} />
                )}
                <div className={styles.overlay}>
                   <button className={styles.viewBtn}>
                    Ver Certificado
                  </button>
                </div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.certTitle}>{cert.title}</h3>
                <div className={styles.meta}>
                  <span className={styles.issuer}>{cert.issuer}</span>
                  <span className={styles.date}>{new Date(cert.date).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div 
              className={styles.modalContent}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setSelectedCert(null)}>×</button>
              <img src={selectedCert.image} alt={selectedCert.title} />
              <div className={styles.modalInfo}>
                <h3>{selectedCert.title}</h3>
                <p>{selectedCert.issuer} • {new Date(selectedCert.date).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
