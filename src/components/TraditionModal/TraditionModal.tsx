import React, { useState } from 'react';
import styles from './TraditionModal.module.css';
import { Tradition } from '../../data/types';
import { CloseIcon, PlayIcon, ShieldCheckIcon, MicIcon, BookOpenIcon, UserTreeIcon, WaveformIcon } from '../common/Icons';

interface TraditionModalProps {
  tradition: Tradition | null;
  onClose: () => void;
  onPlay: (tradition: Tradition) => void;
  onOpenAnnotate: (tradition: Tradition) => void;
}

export const TraditionModal: React.FC<TraditionModalProps> = ({
  tradition,
  onClose,
  onPlay,
  onOpenAnnotate
}) => {
  const [activeTab, setActiveTab] = useState<'transcripts' | 'lineage' | 'musicology' | 'context'>('transcripts');

  if (!tradition) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close Dossier">
            <CloseIcon size={20} />
          </button>

          <div className={styles.topBadges}>
            <span className="badge" style={{ background: 'rgba(217,107,39,0.2)', color: 'var(--text-saffron)', border: '1px solid rgba(217,107,39,0.4)' }}>
              {tradition.culturalZone}
            </span>
            <span className="badge" style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--text-gold)', border: '1px solid rgba(212,175,55,0.3)' }}>
              {tradition.category}
            </span>
            {tradition.vulnerabilityStatus === 'critical' && <span className="badge badge-critical">UNESCO Critical</span>}
            {tradition.vulnerabilityStatus === 'endangered' && <span className="badge badge-endangered">Endangered</span>}
            {tradition.vulnerabilityStatus === 'vulnerable' && <span className="badge badge-vulnerable">Vulnerable</span>}
            {tradition.vulnerabilityStatus === 'thriving' && <span className="badge badge-thriving">Living Heritage</span>}
          </div>

          <h2 className={styles.modalTitle}>{tradition.title}</h2>
          <div className={styles.modalVernacular}>{tradition.vernacularTitle}</div>

          <div className={styles.modalMetaRow}>
            <span><strong>Dialect:</strong> {tradition.dialect} ({tradition.languageFamily})</span>
            <span>•</span>
            <span><strong>Region:</strong> {tradition.performerLineage.district}, {tradition.state}</span>
            <span>•</span>
            <span><strong>Archival ID:</strong> {tradition.id}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={styles.modalTabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'transcripts' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('transcripts')}
          >
            📜 Oral Verses & Transcripts ({tradition.verses.length})
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'lineage' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('lineage')}
          >
            🌳 Bard Lineage & Guru Parampara
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'musicology' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('musicology')}
          >
            🎵 Ethnomusicology & Organology
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'context' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('context')}
          >
            🏛️ Anthropological Context & UNESCO
          </button>
        </div>

        {/* Modal Body Content */}
        <div className={styles.modalBody}>
          {activeTab === 'transcripts' && (
            <div>
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>
                  <BookOpenIcon size={16} color="var(--gold-400)" />
                  <span>Field Recording Transcriptions with Bilingual Translations</span>
                </div>
                <div className={styles.verseList}>
                  {tradition.verses.map((v, idx) => (
                    <div key={v.id} className={styles.verseItemBox}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                        Verse {idx + 1} • Timestamp: {Math.floor(v.timestamp / 60)}:{(v.timestamp % 60).toString().padStart(2, '0')}
                      </div>
                      <div className={styles.verseOriginal}>{v.originalScript}</div>
                      <div className={styles.verseTranslit}>{v.romanTransliteration}</div>
                      <div className={styles.verseMeaning}>
                        <strong>English Meaning:</strong> {v.englishTranslation}
                      </div>
                      {v.culturalNote && (
                        <div style={{ marginTop: 8, fontSize: '0.76rem', color: '#5eead4', background: 'rgba(42,157,143,0.12)', padding: '6px 10px', borderRadius: 4 }}>
                          💡 <strong>Cultural Annotation:</strong> {v.culturalNote}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'lineage' && (
            <div>
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>
                  <UserTreeIcon size={16} color="var(--gold-400)" />
                  <span>Custodians of Oral Memory</span>
                </div>
                <div className={styles.lineageGrid}>
                  <div className={styles.lineageCardItem}>
                    <span className={styles.lineageItemLabel}>Lead Oral Performer</span>
                    <span className={styles.lineageItemValue}>{tradition.performerLineage.leadPerformer}</span>
                  </div>
                  <div className={styles.lineageCardItem}>
                    <span className={styles.lineageItemLabel}>Clan & Community Affiliation</span>
                    <span className={styles.lineageItemValue}>{tradition.performerLineage.communityLineage}</span>
                  </div>
                  <div className={styles.lineageCardItem}>
                    <span className={styles.lineageItemLabel}>Guru-Shishya Parampara</span>
                    <span className={styles.lineageItemValue}>{tradition.performerLineage.guruParampara || 'Traditional Family Transmission'}</span>
                  </div>
                  <div className={styles.lineageCardItem}>
                    <span className={styles.lineageItemLabel}>Generational Lineage Span</span>
                    <span className={styles.lineageItemValue}>{tradition.performerLineage.generationCount || 6}+ Documented Generations</span>
                  </div>
                </div>
              </div>

              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>Performer Biography & Oral Mastery</div>
                <p className={styles.proseText}>{tradition.performerLineage.bio}</p>
              </div>
            </div>
          )}

          {activeTab === 'musicology' && (
            <div>
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>
                  <WaveformIcon size={16} color="var(--gold-400)" />
                  <span>Acoustic Metrics & Performance Scalability</span>
                </div>
                <div className={styles.lineageGrid}>
                  <div className={styles.lineageCardItem}>
                    <span className={styles.lineageItemLabel}>Scale / Raga Affiliation</span>
                    <span className={styles.lineageItemValue}>{tradition.audioTrack.scaleOrRaga || 'Indigenous Folk Mode'}</span>
                  </div>
                  <div className={styles.lineageCardItem}>
                    <span className={styles.lineageItemLabel}>Rhythmic Tala / Meter</span>
                    <span className={styles.lineageItemValue}>{tradition.audioTrack.talaOrRhythm || 'Syncopated Folk Beat'}</span>
                  </div>
                  <div className={styles.lineageCardItem}>
                    <span className={styles.lineageItemLabel}>Tempo & Cadence</span>
                    <span className={styles.lineageItemValue}>{tradition.audioTrack.bpm} BPM</span>
                  </div>
                  <div className={styles.lineageCardItem}>
                    <span className={styles.lineageItemLabel}>Field Recording Year & Location</span>
                    <span className={styles.lineageItemValue}>{tradition.audioTrack.recordingYear} • {tradition.audioTrack.recordingLocation}</span>
                  </div>
                </div>
              </div>

              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>Traditional Instruments Employed</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {tradition.instruments.map((inst) => (
                    <span key={inst} className="badge" style={{ background: 'rgba(42,157,143,0.15)', color: '#5eead4', border: '1px solid rgba(42,157,143,0.4)', padding: '6px 12px' }}>
                      🎵 {inst}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'context' && (
            <div>
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>
                  <ShieldCheckIcon size={16} color="var(--gold-400)" />
                  <span>Ritual Setting & Community Function</span>
                </div>
                <p className={styles.proseText}>{tradition.ritualContext}</p>
              </div>

              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeading}>Historical Provenance & Preservation Status</div>
                <p className={styles.proseText}>{tradition.historicalContext}</p>
                {tradition.unescoRecognition && (
                  <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 8, fontSize: '0.86rem', color: 'var(--text-gold)' }}>
                    🏛️ <strong>Preservation Recognition:</strong> {tradition.unescoRecognition}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className={styles.modalFooter}>
          <button className={styles.playActionBtn} onClick={() => onPlay(tradition)}>
            <PlayIcon size={18} />
            <span>Play Field Audio Recording</span>
          </button>

          <button className={styles.annotateBtn} onClick={() => onOpenAnnotate(tradition)}>
            <MicIcon size={16} />
            <span>Propose Cultural Annotation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
