import React from 'react';
import styles from './Footer.module.css';
import { ActiveTab } from '../Header/Header';
import { ShieldCheckIcon } from '../common/Icons';

interface FooterProps {
  onTabChange: (tab: ActiveTab) => void;
  onOpenContribute: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange, onOpenContribute }) => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        {/* Brand Info */}
        <div className={styles.brandCol}>
          <div className={styles.footerTitle}>
            KALANTAR <span style={{ fontFamily: 'var(--font-devanagari)', fontSize: '0.9rem', color: 'var(--text-gold)' }}>கலந்தர்</span>
          </div>
          <p className={styles.footerDesc}>
            A living, open-access national digital archive dedicated to documenting, transcribing, and safeguarding India's endangered oral traditions, epic ballads, and bardic memory.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#5eead4' }}>
            <ShieldCheckIcon size={14} />
            <span>Open Access Cultural Heritage Protocol</span>
          </div>
        </div>

        {/* Portals */}
        <div>
          <div className={styles.colHeading}>Archive Modules</div>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}><button onClick={() => onTabChange('search')}>Orality Search Portal</button></li>
            <li className={styles.linkItem}><button onClick={() => onTabChange('graph')}>Thematic Knowledge Graph</button></li>
            <li className={styles.linkItem}><button onClick={() => onTabChange('exhibitions')}>Curated Soundscapes</button></li>
            <li className={styles.linkItem}><button onClick={() => onTabChange('recorder')}>Field Recorder</button></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <div className={styles.colHeading}>Living Traditions</div>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}><button onClick={() => onTabChange('search')}>Villu Paatu (Tamil Nadu)</button></li>
            <li className={styles.linkItem}><button onClick={() => onTabChange('search')}>Theyyam Thottam (Kerala)</button></li>
            <li className={styles.linkItem}><button onClick={() => onTabChange('search')}>Tenkutittu Yakshagana (Karnataka)</button></li>
            <li className={styles.linkItem}><button onClick={() => onTabChange('search')}>Burrakatha (Andhra Pradesh)</button></li>
            <li className={styles.linkItem}><button onClick={() => onTabChange('search')}>Oggu Katha (Telangana)</button></li>
          </ul>
        </div>

        {/* Institutional Collaborations */}
        <div>
          <div className={styles.colHeading}>Community & Archival</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 12 }}>
            Field recordings preserved in alignment with UNESCO Intangible Cultural Heritage standards and Sangeet Natak Akademi guidelines.
          </p>
          <button
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(217, 107, 39, 0.2)',
              border: '1px solid rgba(217, 107, 39, 0.5)',
              color: 'var(--text-saffron)',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
            onClick={onOpenContribute}
          >
            + Propose Oral Lore Archive
          </button>
        </div>
      </div>

      <div className={`container ${styles.bottomBar}`}>
        <span>© {new Date().getFullYear()} Kalantar Digital Orality Preservation Mission. Dedicated to the hereditary bards of India.</span>
        <span>Zero External Backends • Self-Contained High Fidelity Repository</span>
      </div>
    </footer>
  );
};
