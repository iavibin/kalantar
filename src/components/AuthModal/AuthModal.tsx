import React, { useState, useEffect, useRef } from 'react';
import styles from './AuthModal.module.css';
import { CloseIcon, CheckIcon, ShieldCheckIcon } from '../common/Icons';
import { useAuth } from '../../context/AuthContext';

// ─── Types ────────────────────────────────────────────────────────────────────

type AuthTab = 'volunteer' | 'staff';

interface VolunteerPass {
  id: string;
  fullName: string;
  // email/phone are kept in component state only and are NOT persisted to storage
  state: string;
  joinedAt: string;
}

interface AuthModalProps {
  onClose: () => void;
  /** Optional: called after a successful volunteer registration so the caller
   *  can navigate to the Field Recorder tab. */
  onVolunteerSuccess?: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATE_CODES: Record<string, string> = {
  'Andhra Pradesh': 'AP',
  'Arunachal Pradesh': 'AR',
  'Assam': 'AS',
  'Bihar': 'BR',
  'Chhattisgarh': 'CG',
  'Goa': 'GA',
  'Gujarat': 'GJ',
  'Haryana': 'HR',
  'Himachal Pradesh': 'HP',
  'Jharkhand': 'JH',
  'Karnataka': 'KA',
  'Kerala': 'KL',
  'Madhya Pradesh': 'MP',
  'Maharashtra': 'MH',
  'Manipur': 'MN',
  'Meghalaya': 'ML',
  'Mizoram': 'MZ',
  'Nagaland': 'NL',
  'Odisha': 'OD',
  'Punjab': 'PB',
  'Rajasthan': 'RJ',
  'Sikkim': 'SK',
  'Tamil Nadu': 'TN',
  'Telangana': 'TS',
  'Tripura': 'TR',
  'Uttar Pradesh': 'UP',
  'Uttarakhand': 'UK',
  'West Bengal': 'WB',
  'Delhi': 'DL',
};

function generateVolunteerId(state: string): string {
  const code = STATE_CODES[state] || state.slice(0, 2).toUpperCase();
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `KLTR-${code}-${digits}`;
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}

// Deterministic-looking QR-style grid pattern using the pass ID as a seed
function buildQrPattern(seed: string): boolean[] {
  const cells: boolean[] = [];
  for (let i = 0; i < 49; i++) {
    const charCode = seed.charCodeAt(i % seed.length) + i;
    cells.push(charCode % 3 !== 0);
  }
  // Force fixed-position "finder" squares at corners (top-left 3×3, etc.)
  const cornerPositions = [0, 1, 2, 7, 8, 9, 14, 15, 16, 32, 33, 34, 39, 40, 41, 46, 47, 48];
  cornerPositions.forEach((pos) => { cells[pos] = true; });
  return cells;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onVolunteerSuccess }) => {
  const { loginAsAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<AuthTab>('volunteer');

  // Volunteer form state — email and phone are ephemeral display-only; not stored
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [volunteerState, setVolunteerState] = useState('Tamil Nadu');
  const [volunteerPass, setVolunteerPass] = useState<VolunteerPass | null>(null);
  const [isVolunteerSubmitting, setIsVolunteerSubmitting] = useState(false);

  // Staff login state
  const [staffUser, setStaffUser] = useState('');
  const [staffPass, setStaffPass] = useState('');
  const [staffError, setStaffError] = useState<string | null>(null);
  const [staffSuccess, setStaffSuccess] = useState(false);
  const [isStaffSubmitting, setIsStaffSubmitting] = useState(false);

  // ── Accessibility: focus trap + Escape + focus restore ───────────────────
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();
    return () => {
      previousFocusRef.current?.focus();
    };
  }, []);

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
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // ── Volunteer submit ──────────────────────────────────────────────────────

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    setIsVolunteerSubmitting(true);
    setTimeout(() => {
      const joinedAt = new Date().toISOString();
      const pass: VolunteerPass = {
        id: generateVolunteerId(volunteerState),
        fullName: fullName.trim(),
        // Email and phone are intentionally NOT included — PII must not be
        // stored client-side until a proper consent, retention, deletion, and
        // secure-storage design is in place. TODO: implement server-side registration.
        state: volunteerState,
        joinedAt,
      };

      // Persist only non-sensitive fields: generated ID, state code, and join date.
      try {
        localStorage.setItem(
          'kalantar_volunteer_pass',
          JSON.stringify({ id: pass.id, state: pass.state, joinedAt: pass.joinedAt })
        );
      } catch {
        // localStorage may be blocked in some environments
      }

      setVolunteerPass(pass);
      setIsVolunteerSubmitting(false);
    }, 600);
  };

  // ── Staff login submit ────────────────────────────────────────────────────
  // NOTE: This is a MOCK authentication path for demonstration / local review
  // only. The hardcoded credential check MUST be replaced with a server-side
  // authentication service that issues a signed, HTTP-only session token before
  // any production deployment. The localStorage flag written here is not a
  // trusted authorization token — it is purely a UI hint with no enforcement.

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStaffError(null);
    setIsStaffSubmitting(true);

    setTimeout(() => {
      if (staffUser === 'admin' && staffPass === 'kalantar2026') {
        loginAsAdmin();
        setStaffSuccess(true);
      } else {
        setStaffError('Invalid credentials. Please verify your staff username and passphrase.');
      }
      setIsStaffSubmitting(false);
    }, 500);
  };

  // ── QR pattern ────────────────────────────────────────────────────────────
  const qrCells = volunteerPass ? buildQrPattern(volunteerPass.id) : [];

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className={styles.overlay} onClick={onClose} aria-hidden="true">
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon size={15} />
        </button>

        {/* Header */}
        <div className={styles.modalHeader}>
          <h3 id="auth-modal-title" className={styles.modalTitle}>Kalantar Access Portal</h3>
          <p className={styles.modalSubtitle}>
            Join as a field volunteer or sign in as an archival reviewer.
          </p>

          {/* Tab row */}
          <div className={styles.tabRow} role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'volunteer'}
              className={`${styles.tabBtn} ${activeTab === 'volunteer' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('volunteer')}
            >
              🧑‍🤝‍🧑 Volunteer Registration
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'staff'}
              className={`${styles.tabBtn} ${activeTab === 'staff' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('staff')}
            >
              🔒 Staff Login
            </button>
          </div>
        </div>

        {/* Tab bodies */}
        <div className={styles.tabBody}>

          {/* ══ VOLUNTEER TAB ══════════════════════════════════════════════ */}
          {activeTab === 'volunteer' && (
            <>
              {!volunteerPass ? (
                <form onSubmit={handleVolunteerSubmit}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Full Name *</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="e.g. Lakshmi Priya Rajan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email Address *</label>
                    <input
                      type="email"
                      className={styles.formInput}
                      placeholder="e.g. volunteer@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phone Number</label>
                    <input
                      type="tel"
                      className={styles.formInput}
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>State / Region *</label>
                    <select
                      className={styles.formInput}
                      value={volunteerState}
                      onChange={(e) => setVolunteerState(e.target.value)}
                      required
                    >
                      {Object.keys(STATE_CODES).sort().map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isVolunteerSubmitting || !fullName.trim() || !email.trim()}
                  >
                    {isVolunteerSubmitting ? 'Generating Pass…' : '🪪 Register & Get Volunteer Pass'}
                  </button>
                </form>
              ) : (
                /* ── Volunteer Digital Pass ── */
                <div>
                  <div className={styles.passCard}>
                    {/* Card header */}
                    <div className={styles.passHeader}>
                      <div className={styles.passLogo}>
                        <div className={styles.passLogoEmblem}>க</div>
                        <div>
                          <div className={styles.passOrgName}>KALANTAR</div>
                          <div className={styles.passOrgSub}>National Oral Archive</div>
                        </div>
                      </div>
                      <span className={styles.passTypeBadge}>Field Volunteer</span>
                    </div>

                    <div className={styles.passDivider} />

                    {/* Card body */}
                    <div className={styles.passBody}>
                      <div className={styles.passInfo}>
                        <div className={styles.passField}>
                          <span className={styles.passFieldLabel}>Volunteer Name</span>
                          <span className={styles.passFieldValue}>{volunteerPass.fullName}</span>
                        </div>
                        <div className={styles.passField}>
                          <span className={styles.passFieldLabel}>Volunteer ID</span>
                          <span className={styles.passIdValue}>{volunteerPass.id}</span>
                        </div>
                        <div className={styles.passField}>
                          <span className={styles.passFieldLabel}>Region</span>
                          <span className={styles.passFieldValue}>{volunteerPass.state}</span>
                        </div>
                        <div className={styles.passField}>
                          <span className={styles.passFieldLabel}>Enrolled</span>
                          <span className={styles.passFieldValue}>{formatDate(volunteerPass.joinedAt)}</span>
                        </div>
                      </div>

                      {/* Decorative QR badge */}
                      <div className={styles.qrBadge} aria-hidden="true">
                        {qrCells.map((filled, i) => (
                          <div
                            key={i}
                            className={`${styles.qrCell} ${filled ? styles.qrCellFilled : styles.qrCellEmpty}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className={styles.passFooter}>
                      <span>
                        <ShieldCheckIcon size={12} style={{ display: 'inline', marginRight: 4 }} />
                        Open Access · Heritage Protocol
                      </span>
                    </div>
                  </div>

                  {/* Close and navigate to Field Recorder */}
                  <button
                    className={styles.passDoneBtn}
                    onClick={() => {
                      onClose();
                      onVolunteerSuccess?.();
                    }}
                  >
                    Start Recording Field Traditions →
                  </button>
                </div>
              )}
            </>
          )}

          {/* ══ STAFF LOGIN TAB ════════════════════════════════════════════ */}
          {activeTab === 'staff' && (
            <>
              {!staffSuccess ? (
                <form onSubmit={handleStaffLogin}>
                  {staffError && (
                    <div className={styles.errorBanner} role="alert">{staffError}</div>
                  )}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Staff Username</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="Reviewer username"
                      value={staffUser}
                      autoComplete="username"
                      onChange={(e) => {
                        setStaffUser(e.target.value);
                        setStaffError(null);
                      }}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Passphrase</label>
                    <input
                      type="password"
                      className={styles.formInput}
                      placeholder="Archival reviewer passphrase"
                      value={staffPass}
                      autoComplete="current-password"
                      onChange={(e) => {
                        setStaffPass(e.target.value);
                        setStaffError(null);
                      }}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isStaffSubmitting || !staffUser.trim() || !staffPass.trim()}
                  >
                    {isStaffSubmitting ? 'Verifying…' : '🔐 Sign In as Reviewer'}
                  </button>
                </form>
              ) : (
                <div className={styles.reviewerSuccess}>
                  <div className={styles.reviewerSuccessIcon}>
                    <CheckIcon size={26} />
                  </div>
                  <div className={styles.reviewerBadge}>
                    <ShieldCheckIcon size={13} />
                    Archival Reviewer
                  </div>
                  <div className={styles.reviewerSuccessTitle}>Reviewer Access Granted</div>
                  <p className={styles.reviewerSuccessText}>
                    You are now signed in as an Archival Reviewer. Pending field recordings and
                    community annotations in the queue can be approved, edited, or flagged for
                    expert consultation.
                  </p>
                  <button className={styles.submitBtn} onClick={onClose} style={{ marginTop: 8 }}>
                    Go to Archive →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
