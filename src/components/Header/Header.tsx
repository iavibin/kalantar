import React from 'react';
import styles from './Header.module.css';
import { SearchIcon, GraphIcon, SparklesIcon, MicIcon } from '../common/Icons';

export type ActiveTab = 'search' | 'graph' | 'exhibitions' | 'recorder';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenContribute: () => void;
  onOpenAbout: () => void;
  onOpenAuth: () => void;
  totalTraditions: number;
  totalDialects: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenContribute,
  onOpenAbout,
  onOpenAuth,
  totalTraditions,
  totalDialects
}) => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        {/* Brand Group */}
        <div className={styles.brandGroup} onClick={() => onTabChange('search')}>
          <div className={styles.emblem}>
            <span className={styles.emblemContent}>க</span>
          </div>
          <div className={styles.brandText}>
            <div className={styles.brandTitle}>
              KALANTAR
              <span className={styles.vernacularBadge}>காலாந்தர்</span>
            </div>
            <span className={styles.brandSubtitle}>National Digital Archive for India's Oral Traditions</span>
          </div>
        </div>

        {/* Navigation Tabs — 4 tabs, no Cultural Atlas */}
        <nav className={styles.navTabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'search' ? styles.tabBtnActive : ''}`}
            onClick={() => onTabChange('search')}
            id="nav-tab-search"
          >
            <SearchIcon size={15} />
            <span>Orality Search</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'graph' ? styles.tabBtnActive : ''}`}
            onClick={() => onTabChange('graph')}
            id="nav-tab-graph"
          >
            <GraphIcon size={15} />
            <span>Knowledge Graph</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'exhibitions' ? styles.tabBtnActive : ''}`}
            onClick={() => onTabChange('exhibitions')}
            id="nav-tab-soundscapes"
          >
            <SparklesIcon size={15} />
            <span>Soundscapes</span>
          </button>
          <button
            className={`${styles.tabBtn} ${styles.tabBtnRecorder} ${activeTab === 'recorder' ? styles.tabBtnActive : ''}`}
            onClick={() => onTabChange('recorder')}
            id="nav-tab-recorder"
          >
            <MicIcon size={15} />
            <span>Field Recorder</span>
          </button>
        </nav>

        {/* Header Actions */}
        <div className={styles.headerActions}>
          <div className={styles.statsIndicator}>
            <span className={styles.pulseDot} />
            <span>{totalDialects} Dialects · {totalTraditions} Epics</span>
          </div>

          {/* About Us */}
          <button
            className={styles.aboutBtn}
            onClick={onOpenAbout}
            id="btn-about"
            title="About Kalantar"
          >
            About Us
          </button>

          {/* Login */}
          <button
            className={styles.loginBtn}
            onClick={onOpenAuth}
            id="btn-login"
            title="Volunteer registration or staff login"
          >
            Login
          </button>

          {/* Contribute Oral Lore */}
          <button
            className={styles.contributeBtn}
            onClick={onOpenContribute}
            id="btn-contribute-lore"
          >
            <MicIcon size={15} />
            <span>Contribute</span>
          </button>
        </div>
      </div>
    </header>
  );
};
