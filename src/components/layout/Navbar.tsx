import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const NAV_LINKS = [
  { key: 'about', href: '#sobre-mi' },
  { key: 'skills', href: '#habilidades' },
  { key: 'projects', href: '#proyectos' },
  { key: 'certifications', href: '#certificaciones' },
  { key: 'contact', href: '#contacto' },
];

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const currentLanguage = i18n.language.split('-')[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['hero', 'sobre-mi', 'habilidades', 'proyectos', 'certificaciones', 'contacto'];
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <a href="#hero">SM<span className={styles.dot}>.</span></a>
        </div>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ul className={styles.desktopMenu}>
            {NAV_LINKS.map(link => (
              <li key={link.key}>
                <a 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={activeSection === link.href.substring(1) ? styles.active : ''}
                >
                  {t(`nav.${link.key}`)}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.langSwitcher}>
            <button 
              className={currentLanguage === 'es' ? styles.active : ''} 
              onClick={() => changeLanguage('es')}
            >
              ES
            </button>
            <button 
              className={currentLanguage === 'en' ? styles.active : ''} 
              onClick={() => changeLanguage('en')}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Icon */}
        <button 
          className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
            >
              <ul>
                {NAV_LINKS.map((link, i) => (
                  <motion.li 
                    key={link.key}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    <a 
                      href={link.href} 
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={activeSection === link.href.substring(1) ? styles.active : ''}
                    >
                      {t(`nav.${link.key}`)}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

