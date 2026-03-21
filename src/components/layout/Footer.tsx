import React from 'react';
import styles from './Footer.module.scss';
import { useTranslation } from 'react-i18next';
import { Icon } from '../ui/Icons';
import { siteConfig } from '../../data/config';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontSize: '1.5rem', opacity: 0.7, transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = '1'} onMouseOut={e => e.currentTarget.style.opacity = '0.7'}>
            <Icon name="github" />
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontSize: '1.5rem', opacity: 0.7, transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = '1'} onMouseOut={e => e.currentTarget.style.opacity = '0.7'}>
            <Icon name="linkedin" />
          </a>
        </div>
        <p className={styles.text}>
          &copy; {new Date().getFullYear()} Samuel. <span className={styles.accent}>{t('footer.ready')}</span>
        </p>
      </div>
    </footer>
  );
};

