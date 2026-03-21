import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Contact.module.scss';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Icon } from '../ui/Icons';
import emailjs from '@emailjs/browser';
import { siteConfig } from '../../data/config';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [ref, controls] = useScrollReveal(0.2);
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const email = siteConfig.email;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Error copying to clipboard: ', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formState.name.trim()) newErrors.name = t('contact.required');
    if (!formState.email.trim()) {
      newErrors.email = t('contact.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = t('contact.invalid_email');
    }
    if (!formState.message.trim()) newErrors.message = t('contact.required');
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    setSubmitStatus('loading');
    
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
      e.target as HTMLFormElement,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
    )
    .then(() => {
      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 4000);
    })
    .catch((err) => {
      console.error(err);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <section id="contacto" className={styles.contactSection} ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className={styles.container}
      >
        <motion.h2 variants={itemVariants} className={styles.title}>
          {t('contact.title')}
        </motion.h2>

        <motion.div variants={itemVariants} className={styles.emailContainer}>
          <button className={styles.emailBtn} onClick={handleCopyEmail}>
            <span className={styles.email}>{email}</span>
            <span className={styles.copyIcon}>📋</span>
          </button>
          <div className={`${styles.tooltip} ${copied ? styles.show : ''}`}>
            {t('contact.copied')}
          </div>
        </motion.div>

        <div className={styles.content}>
          <motion.form variants={itemVariants} className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                id="name" 
                name="name"
                placeholder=" " 
                value={formState.name}
                onChange={handleChange}
                className={errors.name ? styles.errorInput : ''}
              />
              <label htmlFor="name">{t('contact.name')}</label>
              {errors.name && <span className={styles.errorText}>*{errors.name}</span>}
            </div>
            
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                id="email" 
                name="email"
                placeholder=" " 
                value={formState.email}
                onChange={handleChange}
                className={errors.email ? styles.errorInput : ''}
              />
              <label htmlFor="email">{t('contact.email')}</label>
              {errors.email && <span className={styles.errorText}>*{errors.email}</span>}
            </div>
            
            <div className={styles.inputGroup}>
              <textarea 
                id="message" 
                name="message"
                rows={4} 
                placeholder=" " 
                value={formState.message}
                onChange={handleChange}
                className={errors.message ? styles.errorInput : ''}
              ></textarea>
              <label htmlFor="message">{t('contact.message')}</label>
              {errors.message && <span className={styles.errorText}>*{errors.message}</span>}
            </div>
            
            <button type="submit" className={styles.submitBtn} disabled={submitStatus === 'loading'}>
              {submitStatus === 'loading' ? t('contact.sending') : t('contact.send')}<span className={styles.blink}>_</span>
            </button>

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div 
                  className={styles.successMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  &gt; {t('contact.success')}
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div 
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ color: '#ff4c4c', marginTop: '1rem', fontFamily: 'monospace' }}
                >
                  &gt; {t('contact.error')}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          <motion.div variants={itemVariants} className={styles.socials}>
            <p className={styles.socialTitle}>{t('contact.links')}</p>
            <div className={styles.socialLinks}>
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Icon name="github" className={styles.socialIcon} />
                <span>GitHub</span>
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Icon name="linkedin" className={styles.socialIcon} />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

