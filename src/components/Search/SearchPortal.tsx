import React, { useState } from 'react';
import styles from './SearchPortal.module.css';
import { Tradition, FacetFilterState } from '../../data/types';
import { calculateEndangermentScore, getEndangermentLevel } from '../../data/endangermentScore';
import { TraditionCard } from '../TraditionCard/TraditionCard';
import { ChevronDownIcon, CloseIcon, LayersIcon, PlayIcon } from '../common/Icons';

interface SearchPortalProps {
  traditions: Tradition[];
  activeFilters: FacetFilterState;
  onFilterChange: (filters: FacetFilterState) => void;
  onResetFilters: () => void;
  facetOptions: {
    categories: string[];
    culturalZones: string[];
    dialects: string[];
    instruments: string[];
    motifs: string[];
  };
  activePlayingId: string | null;
  onPlayToggle: (tradition: Tradition) => void;
  onOpenDossier: (tradition: Tradition) => void;
  onOpenGraphNode?: (traditionId: string) => void;
  onEditTradition?: (tradition: Tradition) => void;
  onDeleteTradition?: (traditionId: string) => void;
}

export const SearchPortal: React.FC<SearchPortalProps> = ({
  traditions,
  activeFilters,
  onFilterChange,
  onResetFilters,
  facetOptions,
  activePlayingId,
  onPlayToggle,
  onOpenDossier,
  onOpenGraphNode,
  onEditTradition,
  onDeleteTradition
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const handleEndangermentClick = (level: 'Critical' | 'At Risk' | 'Stable' | 'all') => {
    onFilterChange({
      ...activeFilters,
      endangermentLevel: level
    });
  };

  const handleZoneSelect = (zone: string) => {
    onFilterChange({
      ...activeFilters,
      culturalZone: zone
    });
  };

  const handleCategorySelect = (cat: string) => {
    onFilterChange({
      ...activeFilters,
      category: cat
    });
  };

  const handleSortSelect = (sort: 'score' | 'alphabetical' | 'recency' | 'recommended') => {
    onFilterChange({
      ...activeFilters,
      sortBy: sort
    });
  };

  const removeFilter = (key: keyof FacetFilterState) => {
    const updated = { ...activeFilters };
    delete updated[key];
    onFilterChange(updated);
  };

  const activeFilterList = [
    activeFilters.endangermentLevel && activeFilters.endangermentLevel !== 'all' && {
      key: 'endangermentLevel' as const,
      label: `Level: ${activeFilters.endangermentLevel}`
    },
    activeFilters.culturalZone && activeFilters.culturalZone !== 'all' && {
      key: 'culturalZone' as const,
      label: `Zone: ${activeFilters.culturalZone}`
    },
    activeFilters.category && activeFilters.category !== 'all' && {
      key: 'category' as const,
      label: `Genre: ${activeFilters.category}`
    },
    activeFilters.dialect && activeFilters.dialect !== 'all' && {
      key: 'dialect' as const,
      label: `Dialect: ${activeFilters.dialect}`
    }
  ].filter(Boolean) as { key: keyof FacetFilterState; label: string }[];

  return (
    <section className={styles.portalSection} id="search-portal">
      <div className="container">
        {/* Facet Controls Bar */}
        <div className={styles.controlsBar}>
          {/* Primary Filters */}
          <div className={styles.primaryFilters}>
            {/* Endangerment Level Filter Pills */}
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Endangerment:</span>
              <div className={styles.statusFilterGroup}>
                <button
                  className={`${styles.statusBtn} ${!activeFilters.endangermentLevel || activeFilters.endangermentLevel === 'all' ? styles.statusBtnActive : ''}`}
                  onClick={() => handleEndangermentClick('all')}
                >
                  All (15)
                </button>
                <button
                  className={`${styles.statusBtn} ${activeFilters.endangermentLevel === 'Critical' ? styles.statusBtnActive : ''}`}
                  style={{ borderColor: activeFilters.endangermentLevel === 'Critical' ? 'var(--status-critical)' : undefined }}
                  onClick={() => handleEndangermentClick('Critical')}
                >
                  Critical (7)
                </button>
                <button
                  className={`${styles.statusBtn} ${activeFilters.endangermentLevel === 'At Risk' ? styles.statusBtnActive : ''}`}
                  style={{ borderColor: activeFilters.endangermentLevel === 'At Risk' ? 'var(--status-at-risk)' : undefined }}
                  onClick={() => handleEndangermentClick('At Risk')}
                >
                  At Risk (4)
                </button>
                <button
                  className={`${styles.statusBtn} ${activeFilters.endangermentLevel === 'Stable' ? styles.statusBtnActive : ''}`}
                  style={{ borderColor: activeFilters.endangermentLevel === 'Stable' ? 'var(--status-stable)' : undefined }}
                  onClick={() => handleEndangermentClick('Stable')}
                >
                  Stable (4)
                </button>
              </div>
            </div>

            {/* Cultural Zone Dropdown */}
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Zone:</span>
              <div className={styles.selectWrapper}>
                <select
                  className={styles.filterSelect}
                  value={activeFilters.culturalZone || 'all'}
                  onChange={(e) => handleZoneSelect(e.target.value)}
                >
                  <option value="all">All Cultural Zones</option>
                  {facetOptions.culturalZones.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon size={14} className={styles.selectIcon} />
              </div>
            </div>

            {/* Genre Category Dropdown */}
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Genre:</span>
              <div className={styles.selectWrapper}>
                <select
                  className={styles.filterSelect}
                  value={activeFilters.category || 'all'}
                  onChange={(e) => handleCategorySelect(e.target.value)}
                >
                  <option value="all">All Genres</option>
                  {facetOptions.categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon size={14} className={styles.selectIcon} />
              </div>
            </div>
          </div>

          {/* Secondary Filter & Sort/View Controls */}
          <div className={styles.secondaryFilters}>
            {/* Active filter badges */}
            <div className={styles.activeFiltersList}>
              {activeFilterList.length > 0 ? (
                <>
                  <span className={styles.filterLabel}>Active:</span>
                  {activeFilterList.map((item) => (
                    <span key={item.key} className={styles.activeFilterPill}>
                      <span>{item.label}</span>
                      <span
                        className={styles.pillRemoveBtn}
                        onClick={() => removeFilter(item.key)}
                      >
                        <CloseIcon size={12} />
                      </span>
                    </span>
                  ))}
                  <button className={styles.clearAllBtn} onClick={onResetFilters}>
                    Reset all
                  </button>
                </>
              ) : (
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Showing all South Indian documented oral traditions
                </span>
              )}
            </div>

            {/* Sort & View Mode */}
            <div className={styles.viewAndSortGroup}>
              <div className={styles.selectWrapper}>
                <select
                  className={styles.filterSelect}
                  value={activeFilters.sortBy || 'score'}
                  onChange={(e) => handleSortSelect(e.target.value as any)}
                >
                  <option value="score">Sort: Endangerment Score (High → Low)</option>
                  <option value="alphabetical">Sort: Alphabetical (A → Z)</option>
                  <option value="recency">Sort: Recent Recording Year</option>
                  <option value="recommended">Sort: Curated</option>
                </select>
                <ChevronDownIcon size={14} className={styles.selectIcon} />
              </div>

              <div className={styles.viewModeToggle}>
                <button
                  className={`${styles.viewModeBtn} ${viewMode === 'grid' ? styles.viewModeBtnActive : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid Cards View"
                >
                  <LayersIcon size={15} />
                  <span>Cards</span>
                </button>
                <button
                  className={`${styles.viewModeBtn} ${viewMode === 'table' ? styles.viewModeBtnActive : ''}`}
                  onClick={() => setViewMode('table')}
                  title="Archival Dossier Table"
                >
                  <span>Dossiers</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className={styles.resultsHeader}>
          <div className={styles.resultsCount}>
            Preserved Records: <strong>{traditions.length} traditions</strong>
          </div>
        </div>

        {/* Content View */}
        {traditions.length === 0 ? (
          <div className={styles.emptyState}>
            <h4 className={styles.emptyTitle}>No Oral Traditions Found</h4>
            <p className={styles.emptyDesc}>
              No preserved traditions match your active search and facet criteria. Try clearing your filters or searching by a different dialect or instrument.
            </p>
            <button className={styles.resetFiltersBtn} onClick={onResetFilters}>
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className={styles.gridContainer}>
            {traditions.map((tradition) => (
              <TraditionCard
                key={tradition.id}
                tradition={tradition}
                isPlaying={activePlayingId === tradition.id}
                onPlayToggle={onPlayToggle}
                onOpenDossier={onOpenDossier}
                onOpenGraphNode={onOpenGraphNode}
                onEdit={onEditTradition}
                onDelete={onDeleteTradition}
              />
            ))}
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.dossierTable}>
              <thead>
                <tr>
                  <th>Oral Tradition</th>
                  <th>Dialect & State</th>
                  <th>Endangerment Score</th>
                  <th>Lead Performer / Clan</th>
                  <th>Key Instruments</th>
                  <th>Audio Preview</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {traditions.map((t) => {
                  const score = calculateEndangermentScore(t);
                  const level = getEndangermentLevel(score);
                  return (
                    <tr key={t.id}>
                      <td>
                        <div className={styles.tableTitle}>{t.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-saffron)' }}>
                          {t.vernacularTitle}
                        </div>
                      </td>
                      <td>
                        <div style={{ color: 'var(--text-gold)', fontWeight: 600 }}>{t.dialect}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.state}</div>
                      </td>
                      <td>
                        {level === 'Critical' && (
                          <span className="badge badge-critical">Critical • {score}</span>
                        )}
                        {level === 'At Risk' && (
                          <span className="badge badge-at-risk">At Risk • {score}</span>
                        )}
                        {level === 'Stable' && (
                          <span className="badge badge-stable">Stable • {score}</span>
                        )}
                      </td>
                      <td>
                        <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{t.performerLineage.leadPerformer}</div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{t.performerLineage.communityLineage}</div>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.8rem' }}>{t.instruments[0] || 'Acoustic'}</div>
                      </td>
                      <td>
                        <button
                          className={styles.statusBtn}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(217,107,39,0.15)', color: 'var(--text-gold)' }}
                          onClick={() => onPlayToggle(t)}
                        >
                          <PlayIcon size={12} />
                          <span>{Math.floor(t.audioTrack.durationSeconds / 60)}m</span>
                        </button>
                      </td>
                      <td>
                        <button
                          className={styles.statusBtn}
                          style={{ background: 'var(--bg-surface-3)', color: 'var(--text-primary)' }}
                          onClick={() => onOpenDossier(t)}
                        >
                          Inspect Dossier
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
