import React, { useState } from 'react';
import styles from './TraditionModal.module.css';
import { Tradition } from '../../data/types';
import {
  CloseIcon,
  PlayIcon,
  ShieldCheckIcon,
  MicIcon,
  BookOpenIcon,
  UserTreeIcon,
  WaveformIcon
} from '../common/Icons';

interface TraditionModalProps {
  tradition: Tradition | null;
  onClose: () => void;
  onPlay: (tradition: Tradition) => void;
  onOpenAnnotate: (tradition: Tradition) => void;
}

type ModalTab = 'transcription' | 'info';

function isRealString(val?: string, placeholders: string[] = []): boolean {
  if (!val) return false;
  const trimmed = val.trim();
  if (!trimmed) return false;
  const lower = trimmed.toLowerCase();
  for (const ph of placeholders) {
    const phLower = ph.toLowerCase();
    if (lower === phLower || lower.startsWith(phLower) || lower.includes(phLower)) {
      return false;
    }
  }
  return true;
}

export const TraditionModal: React.FC<TraditionModalProps> = ({
  tradition,
  onClose,
  onPlay,
  onOpenAnnotate
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('transcription');

  if (!tradition) return null;

  const hasVerses = Boolean(tradition.verses && tradition.verses.length > 0);

  // Check which rich demo sections have authentic authored content
  const lineage = tradition.performerLineage;
  const hasCommunity = isRealString(lineage?.communityLineage, [
    'field community',
    'field documentation'
  ]);
  const hasGuru = isRealString(lineage?.guruParampara, ['traditional family transmission']);
  const hasGenerations = Boolean(lineage?.generationCount && lineage.generationCount > 0);
  const hasBio = isRealString(lineage?.bio, ['recorded in', 'live field recording']);
  const showLineageSection = hasCommunity || hasGuru || hasGenerations || hasBio;

  const audio = tradition.audioTrack;
  const hasScale = isRealString(audio?.scaleOrRaga, ['indigenous folk mode']);
  const hasTala = isRealString(audio?.talaOrRhythm, ['syncopated folk beat']);
  const hasBpm = Boolean(audio?.bpm && audio.bpm > 0);
  const hasInstruments = Boolean(tradition.instruments && tradition.instruments.length > 0);
  const showMusicologySection = hasScale || hasTala || hasBpm || hasInstruments;

  const hasRitual = isRealString(tradition.ritualContext, [
    'field documentation',
    'oral field lore',
    'captured via kalantar'
  ]);
  const hasHistorical = isRealString(tradition.historicalContext, [
    'captured via kalantar',
    'field documentation',
    'oral field lore'
  ]);
  const realMotifs = (tradition.motifs || []).filter((m) =>
    isRealString(m, ['field documentation', 'oral field lore'])
  );
  const hasMotifs = realMotifs.length > 0;
  const hasUnesco = Boolean(tradition.unescoRecognition && tradition.unescoRecognition.trim());
  const showContextSection = hasRitual || hasHistorical || hasMotifs || hasUnesco;

  const durationSec = tradition.audioTrack?.durationSeconds || 180;
  const formattedDuration = `${Math.floor(durationSec / 60)}:${(durationSec % 60)
    .toString()
    .padStart(2, '0')}`;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close Dossier">
            <CloseIcon size={20} />
          </button>

          <div className={styles.topBadges}>
            {tradition.culturalZone && tradition.culturalZone !== 'Field Recording' && (
              <span
                className="badge"
                style={{
                  background: 'rgba(217,107,39,0.2)',
                  color: 'var(--text-saffron)',
                  border: '1px solid rgba(217,107,39,0.4)'
                }}
              >
                {tradition.culturalZone}
              </span>
            )}
            {tradition.category && (
              <span
                className="badge"
                style={{
                  background: 'rgba(212,175,55,0.15)',
                  color: 'var(--text-gold)',
                  border: '1px solid rgba(212,175,55,0.3)'
                }}
              >
                {tradition.category}
              </span>
            )}
            {tradition.vulnerabilityStatus === 'critical' && (
              <span className="badge badge-critical">UNESCO Critical</span>
            )}
            {tradition.vulnerabilityStatus === 'endangered' && (
              <span className="badge badge-endangered">Endangered</span>
            )}
            {tradition.vulnerabilityStatus === 'vulnerable' && (
              <span className="badge badge-vulnerable">Vulnerable</span>
            )}
            {tradition.vulnerabilityStatus === 'thriving' && (
              <span className="badge badge-thriving">Living Heritage</span>
            )}
          </div>

          <h2 className={styles.modalTitle}>{tradition.title}</h2>
          {tradition.vernacularTitle &&
            tradition.vernacularTitle.trim() !== '' &&
            tradition.vernacularTitle.trim().toLowerCase() !== tradition.title.trim().toLowerCase() && (
              <div className={styles.modalVernacular}>{tradition.vernacularTitle}</div>
            )}

          <div className={styles.modalMetaRow}>
            {tradition.performerLineage?.leadPerformer && (
              <>
                <span>
                  <strong>Practitioner:</strong> {tradition.performerLineage.leadPerformer}
                  {tradition.practitionerAge ? ` (Age ${tradition.practitionerAge})` : ''}
                </span>
                <span>•</span>
              </>
            )}
            <span>
              <strong>Region:</strong> {tradition.region || tradition.state || 'Field Region'}
            </span>
            {tradition.dialect && (
              <>
                <span>•</span>
                <span>
                  <strong>Dialect:</strong> {tradition.dialect}
                  {tradition.languageFamily && tradition.languageFamily !== 'Dravidian'
                    ? ` (${tradition.languageFamily})`
                    : ''}
                </span>
              </>
            )}
            <span>•</span>
            <span>
              <strong>Archival ID:</strong> {tradition.id}
            </span>
          </div>
        </div>

        {/* 2-Tab Navigation Switcher */}
        <div className={styles.modalTabs}>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'transcription' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('transcription')}
          >
            📜 Oral Transcription
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'info' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('info')}
          >
            ℹ️ Info
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.modalBody}>
          {/* TAB 1: Oral Transcription */}
          {activeTab === 'transcription' && (
            <div>
              {hasVerses ? (
                <div className={styles.sectionBlock}>
                  <div className={styles.sectionHeading}>
                    <BookOpenIcon size={16} color="var(--gold-400)" />
                    <span>Field Recording Transcriptions ({tradition.verses.length} Verses)</span>
                  </div>
                  <div className={styles.verseList}>
                    {tradition.verses.map((v, idx) => (
                      <div key={v.id} className={styles.verseItemBox}>
                        <div
                          style={{
                            fontSize: '0.72rem',
                            color: 'var(--text-muted)',
                            marginBottom: 4
                          }}
                        >
                          Verse {idx + 1} • Timestamp: {Math.floor(v.timestamp / 60)}:
                          {(v.timestamp % 60).toString().padStart(2, '0')}
                        </div>
                        <div className={styles.verseOriginal}>{v.originalScript}</div>
                        <div className={styles.verseTranslit}>{v.romanTransliteration}</div>
                        <div className={styles.verseMeaning}>
                          <strong>English Meaning:</strong> {v.englishTranslation}
                        </div>
                        {v.culturalNote && (
                          <div
                            style={{
                              marginTop: 8,
                              fontSize: '0.76rem',
                              color: '#5eead4',
                              background: 'rgba(42,157,143,0.12)',
                              padding: '6px 10px',
                              borderRadius: 4
                            }}
                          >
                            💡 <strong>Cultural Annotation:</strong> {v.culturalNote}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={styles.transcriptionSummaryBlock}>
                  <div className={styles.sectionBlock}>
                    <div className={styles.sectionHeading}>
                      <BookOpenIcon size={16} color="var(--gold-400)" />
                      <span>Summary</span>
                    </div>
                    <div className={styles.summaryNotesBox}>
                      <p className={styles.summaryNotesText}>
                        {tradition.summary ||
                          `Field recording of "${tradition.title}" performed by ${
                            tradition.performerLineage?.leadPerformer || 'the practitioner'
                          }. No line-by-line verse transcription has been submitted yet.`}
                      </p>
                    </div>
                  </div>

                  <div className={styles.audioPlayerCard}>
                    <div className={styles.audioCardHeader}>
                      <div className={styles.audioWaveformVisual}>
                        {(
                          tradition.audioTrack?.waveformPeaks || [
                            0.4, 0.7, 0.85, 0.92, 0.7, 0.85, 0.95, 0.8, 0.6, 0.85, 0.9, 0.75, 0.6,
                            0.8, 0.7, 0.5
                          ]
                        )
                          .slice(0, 18)
                          .map((peak, idx) => (
                            <span
                              key={idx}
                              className={styles.waveformBar}
                              style={{ height: `${Math.max(16, peak * 100)}%` }}
                            />
                          ))}
                      </div>
                      <div className={styles.audioDetails}>
                        <div className={styles.audioTrackTitle}>
                          {tradition.audioTrack?.title || tradition.title}
                        </div>
                        <div className={styles.audioTrackSub}>
                          Direct Field Audio • Duration: {formattedDuration} • Recorded{' '}
                          {tradition.audioTrack?.recordingYear || new Date().getFullYear()}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={styles.inlinePlayBtn}
                      onClick={() => onPlay(tradition)}
                    >
                      <PlayIcon size={18} />
                      <span>Play Recording</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Info */}
          {activeTab === 'info' && (
            <div className={styles.infoContainer}>
              {/* Section 1: Submitter Input Data */}
              <div className={styles.infoSection}>
                <div className={styles.infoSectionHeading}>
                  <BookOpenIcon size={16} color="var(--gold-400)" />
                  <span>Field Intake & Practitioner Details</span>
                </div>
                <div className={styles.infoFieldsGrid}>
                  <div className={styles.infoFieldItem}>
                    <span className={styles.infoFieldLabel}>Tradition Title</span>
                    <span className={styles.infoFieldValue}>{tradition.title}</span>
                  </div>
                  <div className={styles.infoFieldItem}>
                    <span className={styles.infoFieldLabel}>Lead Oral Practitioner</span>
                    <span className={styles.infoFieldValue}>
                      {tradition.performerLineage?.leadPerformer || 'Field Practitioner'}
                    </span>
                  </div>
                  <div className={styles.infoFieldItem}>
                    <span className={styles.infoFieldLabel}>Practitioner Age</span>
                    <span className={styles.infoFieldValue}>
                      {tradition.practitionerAge
                        ? `${tradition.practitionerAge} years old`
                        : 'Not specified'}
                    </span>
                  </div>
                  <div className={styles.infoFieldItem}>
                    <span className={styles.infoFieldLabel}>Geographic Region</span>
                    <span className={styles.infoFieldValue}>
                      {tradition.region || tradition.state || 'Field Region'}
                    </span>
                  </div>
                  {tradition.dialect && (
                    <div className={styles.infoFieldItem}>
                      <span className={styles.infoFieldLabel}>Spoken Dialect</span>
                      <span className={styles.infoFieldValue}>{tradition.dialect}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 2: Calculated / Derived Endangerment Metrics */}
              <div className={styles.infoSection}>
                <div className={styles.infoSectionHeading}>
                  <WaveformIcon size={16} color="var(--gold-400)" />
                  <span>Calculated Endangerment & Preservation Metrics</span>
                </div>
                <div className={styles.infoFieldsGrid}>
                  <div className={styles.infoFieldItem}>
                    <span className={styles.infoFieldLabel}>Endangerment Score</span>
                    <span className={styles.infoFieldValue} style={{ color: 'var(--text-gold)' }}>
                      {tradition.endangermentScore !== undefined
                        ? `${tradition.endangermentScore} / 100`
                        : 'Computed on intake'}
                    </span>
                  </div>
                  <div className={styles.infoFieldItem}>
                    <span className={styles.infoFieldLabel}>Vulnerability Tier</span>
                    <span className={styles.infoFieldValue} style={{ textTransform: 'capitalize' }}>
                      {tradition.vulnerabilityStatus || 'Documented'}
                    </span>
                  </div>
                  <div className={styles.infoFieldItem}>
                    <span className={styles.infoFieldLabel}>Category / Oral Genre</span>
                    <span className={styles.infoFieldValue}>{tradition.category}</span>
                  </div>
                  <div className={styles.infoFieldItem}>
                    <span className={styles.infoFieldLabel}>Successor / Apprentice</span>
                    <span className={styles.infoFieldValue}>
                      {tradition.hasSuccessor
                        ? '✓ Successor Identified'
                        : '⚠️ No Successor (High Risk)'}
                    </span>
                  </div>
                  {tradition.livingPractitionerCount !== undefined && (
                    <div className={styles.infoFieldItem}>
                      <span className={styles.infoFieldLabel}>Living Practitioners</span>
                      <span className={styles.infoFieldValue}>
                        {tradition.livingPractitionerCount} documented custodian
                        {tradition.livingPractitionerCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                  {tradition.lastRecordedDaysAgo !== undefined && (
                    <div className={styles.infoFieldItem}>
                      <span className={styles.infoFieldLabel}>Last Documentation</span>
                      <span className={styles.infoFieldValue}>
                        {tradition.lastRecordedDaysAgo === 0
                          ? 'Direct live submission'
                          : `${tradition.lastRecordedDaysAgo} days ago`}
                      </span>
                    </div>
                  )}
                  {Boolean(tradition.activeApprentices) && (
                    <div className={styles.infoFieldItem}>
                      <span className={styles.infoFieldLabel}>Active Apprentices</span>
                      <span className={styles.infoFieldValue}>{tradition.activeApprentices}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 3: Bard Lineage & Guru Parampara (Only if authentic content exists) */}
              {showLineageSection && (
                <div className={styles.infoSection}>
                  <div className={styles.infoSectionHeading}>
                    <UserTreeIcon size={16} color="var(--gold-400)" />
                    <span>Custodians of Oral Memory & Bard Lineage</span>
                  </div>
                  <div className={styles.infoFieldsGrid}>
                    {hasCommunity && (
                      <div className={styles.infoFieldItem}>
                        <span className={styles.infoFieldLabel}>Clan / Community Affiliation</span>
                        <span className={styles.infoFieldValue}>
                          {lineage.communityLineage}
                        </span>
                      </div>
                    )}
                    {hasGuru && (
                      <div className={styles.infoFieldItem}>
                        <span className={styles.infoFieldLabel}>Guru-Shishya Parampara</span>
                        <span className={styles.infoFieldValue}>{lineage.guruParampara}</span>
                      </div>
                    )}
                    {hasGenerations && (
                      <div className={styles.infoFieldItem}>
                        <span className={styles.infoFieldLabel}>Generational Lineage Span</span>
                        <span className={styles.infoFieldValue}>
                          {lineage.generationCount}+ Documented Generations
                        </span>
                      </div>
                    )}
                  </div>
                  {hasBio && (
                    <div className={styles.infoProseBlock}>
                      <div className={styles.infoProseHeading}>
                        Performer Biography & Oral Mastery
                      </div>
                      <p className={styles.proseText}>{lineage.bio}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Section 4: Ethnomusicology & Organology (Only if authentic content exists) */}
              {showMusicologySection && (
                <div className={styles.infoSection}>
                  <div className={styles.infoSectionHeading}>
                    <WaveformIcon size={16} color="var(--gold-400)" />
                    <span>Ethnomusicology & Organology</span>
                  </div>
                  <div className={styles.infoFieldsGrid}>
                    {hasScale && (
                      <div className={styles.infoFieldItem}>
                        <span className={styles.infoFieldLabel}>Scale / Raga Affiliation</span>
                        <span className={styles.infoFieldValue}>{audio.scaleOrRaga}</span>
                      </div>
                    )}
                    {hasTala && (
                      <div className={styles.infoFieldItem}>
                        <span className={styles.infoFieldLabel}>Rhythmic Tala / Meter</span>
                        <span className={styles.infoFieldValue}>{audio.talaOrRhythm}</span>
                      </div>
                    )}
                    {hasBpm && (
                      <div className={styles.infoFieldItem}>
                        <span className={styles.infoFieldLabel}>Tempo & Cadence</span>
                        <span className={styles.infoFieldValue}>{audio.bpm} BPM</span>
                      </div>
                    )}
                    {audio?.recordingYear && (
                      <div className={styles.infoFieldItem}>
                        <span className={styles.infoFieldLabel}>Recording Archive Details</span>
                        <span className={styles.infoFieldValue}>
                          {audio.recordingYear}
                          {audio.recordingLocation ? ` • ${audio.recordingLocation}` : ''}
                        </span>
                      </div>
                    )}
                  </div>
                  {hasInstruments && (
                    <div className={styles.infoProseBlock}>
                      <div className={styles.infoProseHeading}>
                        Traditional Instruments Employed
                      </div>
                      <div className={styles.badgeList}>
                        {tradition.instruments.map((inst) => (
                          <span
                            key={inst}
                            className="badge"
                            style={{
                              background: 'rgba(42,157,143,0.15)',
                              color: '#5eead4',
                              border: '1px solid rgba(42,157,143,0.4)',
                              padding: '6px 12px'
                            }}
                          >
                            🎵 {inst}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Section 5: Anthropological Context & UNESCO (Only if authentic content exists) */}
              {showContextSection && (
                <div className={styles.infoSection}>
                  <div className={styles.infoSectionHeading}>
                    <ShieldCheckIcon size={16} color="var(--gold-400)" />
                    <span>Anthropological Context & Historical Provenance</span>
                  </div>
                  {hasRitual && (
                    <div className={styles.infoProseBlock} style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
                      <div className={styles.infoProseHeading}>
                        Ritual Setting & Community Function
                      </div>
                      <p className={styles.proseText}>{tradition.ritualContext}</p>
                    </div>
                  )}
                  {hasHistorical && (
                    <div className={styles.infoProseBlock}>
                      <div className={styles.infoProseHeading}>
                        Historical Provenance & Archival Significance
                      </div>
                      <p className={styles.proseText}>{tradition.historicalContext}</p>
                    </div>
                  )}
                  {hasMotifs && (
                    <div className={styles.infoProseBlock}>
                      <div className={styles.infoProseHeading}>Key Narrative & Mythic Motifs</div>
                      <div className={styles.badgeList}>
                        {realMotifs.map((motif) => (
                          <span
                            key={motif}
                            className="badge"
                            style={{
                              background: 'rgba(217,107,39,0.15)',
                              color: 'var(--text-saffron)',
                              border: '1px solid rgba(217,107,39,0.3)',
                              padding: '5px 10px'
                            }}
                          >
                            🪔 {motif}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {hasUnesco && (
                    <div
                      style={{
                        marginTop: 14,
                        padding: '10px 14px',
                        background: 'rgba(212,175,55,0.1)',
                        border: '1px solid rgba(212,175,55,0.3)',
                        borderRadius: 8,
                        fontSize: '0.86rem',
                        color: 'var(--text-gold)'
                      }}
                    >
                      🏛️ <strong>Preservation Recognition:</strong> {tradition.unescoRecognition}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className={styles.modalFooter}>
          <button
            type="button"
            className={styles.playActionBtn}
            onClick={() => onPlay(tradition)}
          >
            <PlayIcon size={18} />
            <span>Play Field Audio Recording</span>
          </button>

          <button
            type="button"
            className={styles.annotateBtn}
            onClick={() => onOpenAnnotate(tradition)}
          >
            <MicIcon size={16} />
            <span>Propose Cultural Annotation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
