import React from 'react';
import styles from './TraditionCard.module.css';
import { Tradition } from '../../data/types';
import { calculateEndangermentScore, getEndangermentLevel } from '../../data/endangermentScore';
import { PlayIcon, PauseIcon, BookOpenIcon, GraphIcon, EditIcon, TrashIcon } from '../common/Icons';
import { useAuth } from '../../context/AuthContext';

interface TraditionCardProps {
  tradition: Tradition;
  isPlaying: boolean;
  onPlayToggle: (tradition: Tradition) => void;
  onOpenDossier: (tradition: Tradition) => void;
  onOpenGraphNode?: (traditionId: string) => void;
  onEdit?: (tradition: Tradition) => void;
  onDelete?: (traditionId: string) => void;
}

export const TraditionCard: React.FC<TraditionCardProps> = ({
  tradition,
  isPlaying,
  onPlayToggle,
  onOpenDossier,
  onOpenGraphNode,
  onEdit,
  onDelete
}) => {
  const { userRole } = useAuth();
  const score = calculateEndangermentScore(tradition);
  const level = getEndangermentLevel(score);

  const getStatusBadge = () => {
    switch (level) {
      case 'Critical':
        return <span className="badge badge-critical">Critical • {score}</span>;
      case 'At Risk':
        return <span className="badge badge-at-risk">At Risk • {score}</span>;
      case 'Stable':
        return <span className="badge badge-stable">Stable • {score}</span>;
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <article className={styles.card}>
      <div>
        <div className={styles.cardHeader}>
          <span className={styles.zoneBadge}>{tradition.culturalZone}</span>
          <div className={styles.headerRightArea}>
            {getStatusBadge()}
            {userRole === 'admin' && (
              <div className={styles.adminCardToolbar}>
                <button
                  className={styles.adminActionBtn}
                  onClick={() => onEdit?.(tradition)}
                  title="Edit Tradition"
                  aria-label="Edit Tradition"
                >
                  <EditIcon size={13} />
                  <span>Edit</span>
                </button>
                <button
                  className={`${styles.adminActionBtn} ${styles.adminDeleteBtn}`}
                  onClick={() => {
                    if (window.confirm(`Permanently delete "${tradition.title}" from the archive?`)) {
                      onDelete?.(tradition.id);
                    }
                  }}
                  title="Delete Tradition"
                  aria-label="Delete Tradition"
                >
                  <TrashIcon size={13} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Title Area */}
        <div className={styles.titleArea}>
          <h3 className={styles.cardTitle}>{tradition.title}</h3>
          <div className={styles.vernacularTitle}>{tradition.vernacularTitle}</div>
          <div className={styles.dialectInfo}>
            <span>{tradition.state}</span>
            <span className={styles.dialectDot} />
            <span className="text-gold">{tradition.dialect}</span>
          </div>
        </div>

        {/* Narrative Summary */}
        <p className={styles.summary}>{tradition.summary}</p>

        {/* Bard & Lineage Info */}
        <div className={styles.lineageInfo}>
          <div className={styles.lineageLabel}>Hereditary Lineage & Performer</div>
          <div className={styles.lineagePerformer}>{tradition.performerLineage.leadPerformer}</div>
          <div className={styles.lineageClan}>{tradition.performerLineage.communityLineage}</div>
        </div>

        {/* Motifs & Tags */}
        <div className={styles.tagsContainer}>
          <span className={styles.tagItem}>
            🔥 {tradition.tagMetadata.theme}
          </span>
          <span className={styles.tagItem}>
            🎵 {tradition.tagMetadata.instruments[0] || tradition.instruments[0]}
          </span>
        </div>
      </div>

      {/* Audio Teaser & Actions */}
      <div>
        <div className={styles.audioSnippetBar}>
          <button
            className={`${styles.audioPlayBtn} ${isPlaying ? styles.audioPlaying : ''}`}
            onClick={() => onPlayToggle(tradition)}
            aria-label={isPlaying ? 'Pause track' : 'Play track'}
          >
            {isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
          </button>

          <div className={styles.audioDetails}>
            <div className={styles.audioTitle}>{tradition.audioTrack.title}</div>
            <div className={styles.audioSub}>
              <span>{formatDuration(tradition.audioTrack.durationSeconds)}</span>
              <span>•</span>
              <span>{tradition.audioTrack.scaleOrRaga || 'Field Recording'}</span>
            </div>
          </div>

          <div className={styles.miniWaveform}>
            {tradition.audioTrack.waveformPeaks.slice(0, 8).map((peak, idx) => (
              <span
                key={idx}
                className={`${styles.miniWaveBar} ${isPlaying ? styles.miniWaveActive : ''}`}
                style={{
                  height: isPlaying ? `${Math.max(6, peak * 22)}px` : `${Math.max(4, peak * 14)}px`,
                  animationDelay: `${idx * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className={styles.cardActions}>
          <button
            className={styles.exploreDossierBtn}
            onClick={() => onOpenDossier(tradition)}
          >
            <BookOpenIcon size={16} />
            <span>Open Archival Dossier</span>
          </button>

          {onOpenGraphNode && (
            <button
              className={styles.graphBtn}
              onClick={() => onOpenGraphNode(tradition.id)}
              title="Locate in Knowledge Graph"
            >
              <GraphIcon size={16} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
