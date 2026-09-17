import React, { useEffect, useRef } from 'react';
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
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  // Remember what had focus before the modal opened so we can restore it
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // ── Focus management ──────────────────────────────────────────────────────
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    // Move focus into modal on open
    closeBtnRef.current?.focus();

    return () => {
      // Restore focus to the triggering element on close
      previousFocusRef.current?.focus();
    };
  }, []);

  // ── Keyboard handling — Escape + Tab trap ─────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusable = Array.from(
        modal.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.closest('[aria-hidden="true"]'));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    // Overlay — click outside to close; aria-hidden so screen readers skip it
    <div className={styles.overlay} onClick={onClose} aria-hidden="true">
      {/* Dialog — stop propagation; full ARIA dialog semantics */}
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-title"
        onClick={(e) => e.stopPropagation()}
        // Remove aria-hidden from the dialog itself
        aria-hidden={undefined}
      >
        {/* Close button — receives initial focus */}
        <button
          ref={closeBtnRef}
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close About modal"
        >
          <CloseIcon size={17} />
        </button>

        {/* Hero Band */}
        <div className={styles.heroBand}>
          <div className={styles.emblemLarge}>
            <span className={styles.emblemChar}>க</span>
          </div>
          <h2 id="about-modal-title" className={styles.heroTitle}>KALANTAR</h2>
          <span className={styles.heroVernacular}>கலந்தர் · कालांतर · ಕಾಲಾಂತರ</span>
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
