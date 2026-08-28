import React from 'react';
import styles from './Hero.module.css';
import { SearchIcon, CloseIcon, SparklesIcon } from '../common/Icons';
import { PreservationStats } from '../../data/types';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: () => void;
  onQuickChipClick: (motif: string) => void;
  stats: PreservationStats;
}

const TRENDING_SEARCH_CHIPS = [
  'Villu Paatu',
  'Theyyam Thottam',
  'Kaniyan Koothu',
  'Tenkutittu Yakshagana',
  'Vadakkan Pattukal',
  'Burrakatha',
  'Oggu Katha',
  'Critical Endangerment'
];

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onQuickChipClick,
  stats
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroGlow} />

      <div className={`container ${styles.heroContent}`}>
        {/* Motto Pill */}
        <div className={styles.mottoPill}>
          <SparklesIcon size={14} color="var(--gold-400)" />
          <span>காலாந்தர் • Preserving India's Endangered Oral Traditions</span>
        </div>

        {/* Hero Title */}
        <h1 className={styles.heroTitle}>
          Preserving India's <span className={styles.heroGradientText}>Living Oral Heritage</span>
        </h1>

        {/* Subtitle */}
        <p className={styles.heroSubtitle}>
          Discover, listen, and decipher heroic ballads, temple chants, martial epics, and bardic traditions across southern India's endangered linguistic communities.
        </p>

        {/* Unified Search Bar */}
        <div className={styles.searchContainer}>
          <div className={styles.searchBarWrapper}>
            <SearchIcon size={22} className={styles.searchIcon} />
            <input
              type="text"
              id="hero-search-input"
              className={styles.searchInput}
              placeholder="Search by oral tradition, dialect (e.g. Nellai Tamil, Malabar Malayalam, Tulu-Kannada), or instruments..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {searchQuery && (
              <button
                className={styles.clearSearchBtn}
                onClick={() => onSearchChange('')}
                aria-label="Clear search query"
              >
                <CloseIcon size={18} />
              </button>
            )}
            <button className={styles.searchSubmitBtn} onClick={onSearchSubmit}>
              Explore Archive
            </button>
          </div>
        </div>

        {/* Trending Chips */}
        <div className={styles.trendingChips}>
          <span className={styles.trendingLabel}>Explore:</span>
          {TRENDING_SEARCH_CHIPS.map((chip) => (
            <button
              key={chip}
              className={styles.chip}
              onClick={() => onQuickChipClick(chip)}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Live Archival Metrics */}
        <div className={styles.heroMetricsBar}>
          <div className={styles.metricItem}>
            <span className={styles.metricValue}>{stats.totalAudioHours}h</span>
            <span className={styles.metricLabel}>Field Audio Recorded</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricValue}>{stats.totalDialects}</span>
            <span className={styles.metricLabel}>Dialects Documented</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricValue}>{stats.endangeredDocumented}</span>
            <span className={styles.metricLabel}>Urgent Priority</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricValue}>{stats.hereditaryLineages}</span>
            <span className={styles.metricLabel}>Hereditary Bard Clans</span>
          </div>
        </div>
      </div>
    </section>
  );
};
