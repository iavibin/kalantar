import React from 'react';
import styles from './Exhibitions.module.css';
import { Exhibition, Tradition } from '../../data/types';
import { PlayIcon, SparklesIcon } from '../common/Icons';

interface ExhibitionsProps {
  exhibitions: Exhibition[];
  traditions: Tradition[];
  onPlayTradition: (tradition: Tradition) => void;
}

export const Exhibitions: React.FC<ExhibitionsProps> = ({
  exhibitions,
  traditions,
  onPlayTradition
}) => {
  return (
    <section className={styles.exhibitionsSection} id="curated-exhibitions-section">
      <div className="container">
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: 6 }}>
            Curated <span className="text-gold">Soundscape Exhibitions</span>
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            Story-driven thematic audio journeys illuminating cross-cutting currents of Indian oral philosophy, female epic resistance, nomadic strings, and sacred forest ecologies.
          </p>
        </div>

        <div className={styles.exhibitionsGrid}>
          {exhibitions.map((exhib) => {
            const includedTraditions = traditions.filter((t) =>
              exhib.traditionIds.includes(t.id)
            );

            return (
              <div key={exhib.id} className={styles.exhibitionCard}>
                <div>
                  <div className={styles.exhibTagRow}>
                    <span className={styles.exhibTag}>
                      <SparklesIcon size={12} /> Thematic Exhibition
                    </span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {includedTraditions.length} Field Soundscapes
                    </span>
                  </div>

                  <h3 className={styles.exhibTitle}>{exhib.title}</h3>
                  <div className={styles.exhibSubtitle}>{exhib.subtitle}</div>

                  <div className={styles.curatorBox}>
                    <div className={styles.curatorLabel}>Curator’s Field Perspective</div>
                    <p className={styles.curatorText}>{exhib.curatorNote}</p>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: 8 }}>
                    Featured Oral Epics:
                  </div>

                  <div className={styles.featuredTraditionsList}>
                    {includedTraditions.map((t) => (
                      <div key={t.id} className={styles.featuredItem}>
                        <div>
                          <strong>{t.title}</strong>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: 6 }}>
                            ({t.dialect})
                          </span>
                        </div>
                        <button
                          style={{ color: 'var(--text-gold)', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.76rem', fontWeight: 600 }}
                          onClick={() => onPlayTradition(t)}
                        >
                          <PlayIcon size={12} /> Play
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.exhibActions}>
                  <button
                    className={styles.playExhibBtn}
                    onClick={() => {
                      if (includedTraditions.length > 0) {
                        onPlayTradition(includedTraditions[0]);
                      }
                    }}
                  >
                    <PlayIcon size={16} />
                    <span>Launch Exhibition Soundscape</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
