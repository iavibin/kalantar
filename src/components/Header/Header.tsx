import React from 'react';
import styles from './Header.module.css';
import { SearchIcon, GraphIcon, MapIcon, SparklesIcon, MicIcon } from '../common/Icons';

export type ActiveTab = 'search' | 'graph' | 'atlas' | 'exhibitions';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenContribute: () => void;
  totalTraditions: number;
  totalDialects: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenContribute,
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

        {/* Navigation Tabs */}
        <nav className={styles.navTabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'search' ? styles.tabBtnActive : ''}`}
            onClick={() => onTabChange('search')}
          >
            <SearchIcon size={16} />
            <span>Orality Search Portal</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'graph' ? styles.tabBtnActive : ''}`}
            onClick={() => onTabChange('graph')}
          >
            <GraphIcon size={16} />
            <span>Knowledge Graph</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'atlas' ? styles.tabBtnActive : ''}`}
            onClick={() => onTabChange('atlas')}
          >
            <MapIcon size={16} />
            <span>Cultural Atlas</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'exhibitions' ? styles.tabBtnActive : ''}`}
            onClick={() => onTabChange('exhibitions')}
          >
            <SparklesIcon size={16} />
            <span>Curated Soundscapes</span>
          </button>
        </nav>

        {/* Header Actions */}
        <div className={styles.headerActions}>
          <div className={styles.statsIndicator}>
            <span className={styles.pulseDot} />
            <span>{totalDialects} Living Dialects • {totalTraditions} Epics</span>
          </div>

          <button className={styles.contributeBtn} onClick={onOpenContribute}>
            <MicIcon size={16} />
            <span>Contribute Oral Lore</span>
          </button>
        </div>
      </div>
    </header>
  );
};
