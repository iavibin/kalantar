import React from 'react';
import styles from './AboutModal.module.css';
import { CloseIcon, ShieldCheckIcon } from '../common/Icons';

interface AboutModalProps {
  onClose: () => void;
}

const ARCHITECTURE_PILLARS = [
  {
    icon: '📡',
    title: 'Offline-First PWA Capture',
    desc: 'Field recordings are persisted to native IndexedDB with zero server dependency — synced to the archive when connectivity returns.',
  },
  {
    icon: '🏷️',
    title: 'Human-Verified Cultural Tagging',
    desc: 'Community annotators from hereditary guild lineages review, correct, and extend AI-generated transcriptions and cultural metadata.',
  },
  {
    icon: '📊',
    title: 'Rule-Based Endangerment Scoring',
    desc: 'A transparent, explainable 100-point score derived from practitioner age, successor pipeline, recording recency, and living-practitioner count.',
  },
] as const;

const BENCHMARKS = [
  'IIT Madras AI4Bharat "Smriti"',
  'UNESCO Endangered Languages Framework',
  'Sangeet Natak Akademi Guidelines',
  'IFLA Oral Heritage Protocols',
] as const;

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close About modal">
          <CloseIcon size={17} />
        </button>

        {/* Hero Band */}
        <div className={styles.heroBand}>
          <div className={styles.emblemLarge}>
            <span className={styles.emblemChar}>க</span>
          </div>
          <h2 className={styles.heroTitle}>KALANTAR</h2>
          <span className={styles.heroVernacular}>காலாந்தர் · कालांतर · ಕಾಲಾಂತರ</span>
          <p className={styles.heroTagline}>
            "Across Time" — National Digital Archive for India's Endangered Oral Traditions
          </p>
        </div>

        {/* Body */}
        <div className={styles.body}>

          {/* Mission */}
          <div>
            <div className={styles.sectionTitle}>Our Mission</div>
            <p className={styles.missionText}>
              India harbours over <strong>4,000 living oral traditions</strong> — epic ballads, ritual chants, bardic genealogies, and sacred forest ecologies — transmitted exclusively through memory across hereditary performer lineages for centuries. With <strong>no written scripts</strong>, these traditions vanish permanently when their last elderly masters pass away.
            </p>
            <p className={styles.missionText} style={{ marginTop: 10 }}>
              Kalantar is a <strong>community-driven, offline-first archival system</strong> built to capture, transcribe, culturally annotate, and permanently preserve these endangered living traditions before the generational transmission chain breaks.
            </p>
          </div>

          {/* Architecture Pillars */}
          <div>
            <div className={styles.sectionTitle}>Technical Architecture</div>
            <div className={styles.pillarGrid}>
              {ARCHITECTURE_PILLARS.map((p) => (
                <div key={p.title} className={styles.pillarCard}>
                  <span className={styles.pillarIcon}>{p.icon}</span>
                  <div className={styles.pillarTitle}>{p.title}</div>
                  <div className={styles.pillarDesc}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Benchmarks */}
          <div>
            <div className={styles.sectionTitle}>Validated Against</div>
            <div className={styles.benchmarkRow}>
              {BENCHMARKS.map((b) => (
                <div key={b} className={styles.benchmarkPill}>
                  <span className={styles.benchmarkPillDot} />
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer strip */}
        <div className={styles.footerStrip}>
          <div className={styles.footerStripText}>
            <ShieldCheckIcon size={13} />
            Open Access Cultural Heritage Protocol · Zero External Backends
          </div>
          <button className={styles.closeModalBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
