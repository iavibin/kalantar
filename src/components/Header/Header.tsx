import React from 'react';
import styles from './Header.module.css';
import { SearchIcon, GraphIcon, SparklesIcon, MicIcon, ShieldCheckIcon } from '../common/Icons';
import { useAuth } from '../../context/AuthContext';

export type ActiveTab = 'search' | 'graph' | 'exhibitions' | 'recorder';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenAbout: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenAbout,
  onOpenAuth
}) => {
  const { userRole, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
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
            id="nav-tab-contribute"
          >
            <MicIcon size={15} />
            <span>Contribute</span>
          </button>
        </nav>

        <div className={styles.headerActions}>
          <button
            className={styles.aboutBtn}
            onClick={onOpenAbout}
            id="btn-about"
            title="About Kalantar"
          >
            About Us
          </button>

          {userRole === 'admin' ? (
            <div className={styles.adminGroup}>
              <div className={styles.adminBadge} id="badge-admin-mode">
                <ShieldCheckIcon size={13} />
                <span>Admin Mode</span>
              </div>
              <button
                className={styles.logoutBtn}
                onClick={logout}
                id="btn-logout"
                title="Sign out of Admin Mode"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className={styles.loginBtn}
              onClick={onOpenAuth}
              id="btn-login"
              title="Volunteer registration or staff login"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
