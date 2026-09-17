import React, { useState, useMemo } from 'react';
import styles from './Gallery.module.css';
import { Tradition } from '../../data/types';
import { ImageIcon, VideoIcon, GraphIcon, BookOpenIcon } from '../common/Icons';

interface MediaItemWithTradition {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption?: string;
  tradition: Tradition;
}

interface GalleryProps {
  traditions: Tradition[];
  onOpenDossier: (tradition: Tradition) => void;
  onOpenGraphNode: (traditionId: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({
  traditions,
  onOpenDossier,
  onOpenGraphNode
}) => {
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  // Flatten media items across all traditions
  const allMediaItems = useMemo<MediaItemWithTradition[]>(() => {
    const items: MediaItemWithTradition[] = [];
    traditions.forEach((tradition) => {
      if (tradition.mediaGallery && tradition.mediaGallery.length > 0) {
        tradition.mediaGallery.forEach((item, index) => {
          items.push({
            id: `${tradition.id}-media-${index}`,
            type: item.type,
            url: item.url,
            caption: item.caption,
            tradition
          });
        });
      }
    });
    return items;
  }, [traditions]);

  // Extract unique states for filtering
  const states = useMemo(() => {
    const unique = new Set<string>();
    allMediaItems.forEach((item) => {
      if (item.tradition.state) unique.add(item.tradition.state);
    });
    return Array.from(unique).sort();
  }, [allMediaItems]);

  // Apply filters
  const filteredItems = useMemo(() => {
    return allMediaItems.filter((item) => {
      if (mediaTypeFilter !== 'all' && item.type !== mediaTypeFilter) {
        return false;
      }
      if (selectedState !== 'all' && item.tradition.state !== selectedState) {
        return false;
      }
      return true;
    });
  }, [allMediaItems, mediaTypeFilter, selectedState]);

  const handleImageError = (id: string) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className={styles.gallerySection} id="living-visual-gallery">
      <div className={styles.galleryHeader}>
        <div className={styles.headerTop}>
          <div>
            <h2 className={styles.title}>
              Living Visual <span className={styles.titleHighlight}>Archive</span>
            </h2>
            <p className={styles.subtitle}>
              Photographic and visual documentation of India's living bardic traditions, sacred instruments,
              and ritual performance art captured across remote cultural zones.
            </p>
          </div>
          <div className={styles.countBadge}>
            <ImageIcon size={14} />
            <span>{filteredItems.length} Documented Artifacts</span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className={styles.filterRow}>
          <button
            className={`${styles.filterBtn} ${mediaTypeFilter === 'all' && selectedState === 'all' ? styles.filterBtnActive : ''}`}
            onClick={() => {
              setMediaTypeFilter('all');
              setSelectedState('all');
            }}
          >
            All Media ({allMediaItems.length})
          </button>
          <button
            className={`${styles.filterBtn} ${mediaTypeFilter === 'image' ? styles.filterBtnActive : ''}`}
            onClick={() => setMediaTypeFilter(mediaTypeFilter === 'image' ? 'all' : 'image')}
          >
            <ImageIcon size={13} />
            Photographs
          </button>
          <button
            className={`${styles.filterBtn} ${mediaTypeFilter === 'video' ? styles.filterBtnActive : ''}`}
            onClick={() => setMediaTypeFilter(mediaTypeFilter === 'video' ? 'all' : 'video')}
          >
            <VideoIcon size={13} />
            Videos
          </button>

          {states.map((st) => (
            <button
              key={st}
              className={`${styles.filterBtn} ${selectedState === st ? styles.filterBtnActive : ''}`}
              onClick={() => setSelectedState(selectedState === st ? 'all' : st)}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      {filteredItems.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <ImageIcon size={36} />
          </div>
          <h3>No Visual Artifacts Found</h3>
          <p>No media artifacts match the selected filters. Clear the filters to view all entries.</p>
        </div>
      ) : (
        <div className={styles.galleryGrid}>
          {filteredItems.map(({ id, type, url, caption, tradition }) => {
            const isBroken = brokenImages[id];

            return (
              <article
                key={id}
                className={styles.mediaCard}
                onClick={() => onOpenDossier(tradition)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenDossier(tradition);
                  }
                }}
                aria-label={`View dossier for ${tradition.title}: ${caption || 'Visual artifact'}`}
              >
                <div className={styles.mediaWrapper}>
                  {!isBroken ? (
                    type === 'video' ? (
                      <video
                        src={url}
                        className={styles.mediaImg}
                        controls
                        preload="metadata"
                        onError={() => handleImageError(id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <img
                        src={url}
                        alt={caption || tradition.title}
                        className={styles.mediaImg}
                        loading="lazy"
                        onError={() => handleImageError(id)}
                      />
                    )
                  ) : (
                    <div className={styles.mediaFallback}>
                      {type === 'video' ? <VideoIcon size={28} /> : <ImageIcon size={28} />}
                      <span>Archival Visual Record</span>
                    </div>
                  )}

                  <div className={styles.mediaTypeBadge}>
                    {type === 'video' ? (
                      <>
                        <VideoIcon size={12} />
                        <span>Video</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon size={12} />
                        <span>Photo</span>
                      </>
                    )}
                  </div>

                  <div className={styles.regionBadge}>
                    {tradition.dialect}
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <div>
                    <h3 className={styles.caption}>
                      {caption || tradition.title}
                    </h3>

                    <div className={styles.traditionInfo}>
                      <div className={styles.traditionTitle}>
                        <span>{tradition.title}</span>
                        {tradition.vernacularTitle && (
                          <span className={styles.vernacularLabel}>
                            • {tradition.vernacularTitle.split('—')[0].trim()}
                          </span>
                        )}
                      </div>
                      <div className={styles.performerLineage}>
                        {tradition.performerLineage.leadPerformer} ({tradition.state})
                      </div>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <span className={styles.dossierLink}>
                      <BookOpenIcon size={13} />
                      <span>Open Lore Dossier</span>
                    </span>

                    <button
                      className={styles.graphBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenGraphNode(tradition.id);
                      }}
                      title="View this tradition in Thematic Knowledge Graph"
                      aria-label={`View ${tradition.title} in Knowledge Graph`}
                    >
                      <GraphIcon size={13} />
                      <span>View in Knowledge Graph</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Gallery;
