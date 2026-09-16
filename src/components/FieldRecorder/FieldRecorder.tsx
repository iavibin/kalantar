import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './FieldRecorder.module.css';
import {
  MicIcon,
  StopIcon,
  PauseIcon,
  PlayIcon,
  CheckIcon,
  CloseIcon,
  ShieldCheckIcon,
  RepeatIcon,
  WaveformIcon,
} from '../common/Icons';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import {
  saveOfflineRecording,
  getAllOfflineRecordings,
  deleteOfflineRecording,
  markRecordingSynced,
  type OfflineRecording,
} from '../../utils/offlineAudioStorage';
import { traditionsRepo } from '../../data/traditionsRepo';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function formatTimestamp(iso: string): string {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export const FieldRecorder: React.FC = () => {
  // ── Form state ────────────────────────────────────────────────────────────
  const [traditionTitle, setTraditionTitle] = useState<string>('');
  const [practitionerName, setPractitionerName] = useState<string>('');
  const [practitionerAge, setPractitionerAge] = useState<string>('65');
  const [location, setLocation] = useState<string>('Tamil Nadu');
  const [dialect, setDialect] = useState<string>('');
  const [hasSuccessor, setHasSuccessor] = useState<boolean>(false);

  // ── Audio recorder hook ───────────────────────────────────────────────────
  const {
    isRecording,
    isPaused,
    recordingDuration,
    audioBlob,
    audioUrl,
    permissionError,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    clearRecording,
  } = useAudioRecorder();

  // ── Submission / loading ──────────────────────────────────────────────────
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // ── Offline queue ─────────────────────────────────────────────────────────
  const [queue, setQueue] = useState<OfflineRecording[]>([]);
  const [queueLoading, setQueueLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [expandedPreviewId, setExpandedPreviewId] = useState<string | null>(null);

  // ── Connectivity ──────────────────────────────────────────────────────────
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // ── Toast ─────────────────────────────────────────────────────────────────
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastCounterRef = useRef<number>(0);

  // ─────────────────────────────────────────────────────────────────────────
  // Effects
  // ─────────────────────────────────────────────────────────────────────────

  // Track online/offline
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  // Load IndexedDB queue on mount
  const refreshQueue = useCallback(async () => {
    try {
      const records = await getAllOfflineRecordings();
      setQueue(records);
    } catch (err) {
      console.error('Failed to load offline queue:', err);
    } finally {
      setQueueLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshQueue();
  }, [refreshQueue]);

  // ─────────────────────────────────────────────────────────────────────────
  // Toast helpers
  // ─────────────────────────────────────────────────────────────────────────

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = ++toastCounterRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Save to offline device
  // ─────────────────────────────────────────────────────────────────────────

  const handleSaveOffline = async () => {
    if (!audioBlob || !practitionerName.trim()) return;

    setIsSaving(true);
    try {
      const entry: OfflineRecording = {
        id: `rec-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        audioBlob,
        audioUrl: audioUrl ?? undefined,
        durationSeconds: recordingDuration,
        recordedAt: new Date().toISOString(),
        practitionerName: practitionerName.trim(),
        practitionerAge: practitionerAge ? parseInt(practitionerAge, 10) : 65,
        traditionTitle: traditionTitle.trim() || 'Untitled Field Recording',
        location: location.trim() || 'Unknown Location',
        dialect: dialect.trim() || 'Unspecified Dialect',
        hasSuccessor,
        synced: false,
      };

      await saveOfflineRecording(entry);
      showToast(`"${entry.traditionTitle}" saved to device. ${formatTime(recordingDuration)} of audio queued offline.`, 'success');

      // Reset form
      clearRecording();
      setTraditionTitle('');
      setPractitionerName('');
      setPractitionerAge('65');
      setLocation('Tamil Nadu');
      setDialect('');
      setHasSuccessor(false);

      await refreshQueue();
    } catch (err) {
      console.error('Failed to save offline recording:', err);
      showToast('Failed to save recording to device storage. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Delete item from queue
  // ─────────────────────────────────────────────────────────────────────────

  const handleDelete = async (id: string) => {
    try {
      await deleteOfflineRecording(id);
      if (expandedPreviewId === id) setExpandedPreviewId(null);
      await refreshQueue();
      showToast('Recording deleted from device storage.', 'info');
    } catch (err) {
      console.error('Failed to delete recording:', err);
      showToast('Failed to delete recording.', 'error');
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Sync all pending recordings to the knowledge base
  // ─────────────────────────────────────────────────────────────────────────

  const handleSyncAll = async () => {
    const pending = queue.filter((r) => !r.synced);
    if (pending.length === 0) {
      showToast('No pending recordings to sync.', 'info');
      return;
    }

    setIsSyncing(true);
    let successCount = 0;
    let errorCount = 0;

    for (const recording of pending) {
      try {
        await traditionsRepo.submitFieldRecordingFromOffline(recording);
        await markRecordingSynced(recording.id);
        successCount++;
      } catch (err) {
        console.error(`Sync failed for ${recording.id}:`, err);
        errorCount++;
      }
    }

    await refreshQueue();
    setIsSyncing(false);

    if (errorCount === 0) {
      showToast(
        `${successCount} recording${successCount !== 1 ? 's' : ''} synced to the Knowledge Base and now searchable.`,
        'success'
      );
    } else {
      showToast(
        `${successCount} synced, ${errorCount} failed. Check console for details.`,
        'error'
      );
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Derived data
  // ─────────────────────────────────────────────────────────────────────────

  const pendingCount = queue.filter((r) => !r.synced).length;
  const syncedCount = queue.filter((r) => r.synced).length;

  const recorderStationClass = [
    styles.recorderStation,
    isRecording && !isPaused ? styles.recorderStationRecording : '',
    isPaused ? styles.recorderStationPaused : '',
    audioBlob && !isRecording && !isPaused ? styles.recorderStationDone : '',
  ]
    .filter(Boolean)
    .join(' ');

  const canSave = !!audioBlob && !isRecording && !!practitionerName.trim();

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className={styles.recorderPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>
          <span className={styles.pageTitleIcon}>
            <MicIcon size={20} color="#fff" />
          </span>
          Field Recorder
        </h2>
        <p className={styles.pageSubtitle}>
          Capture live oral tradition recordings directly from the field. Recordings are stored
          locally on this device with zero internet required, and can be synced to the Knowledge
          Base when connectivity is available.
        </p>
      </div>

      {/* Dual-column grid */}
      <div className={styles.dualGrid}>

        {/* ═══════════════════════════════════════════════════════════════════
            CARD A — Audio Intake & Interview Metadata
            ═══════════════════════════════════════════════════════════════════ */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>
              <WaveformIcon size={14} />
              Field Audio Intake &amp; Interview Metadata
            </span>
          </div>

          <div className={styles.cardBody}>
            {/* Audio Recording Station */}
            <div className={recorderStationClass}>
              {/* Station header row */}
              <div className={styles.stationRow}>
                <span className={styles.stationLabel}>
                  <MicIcon size={14} />
                  Audio Capture Station
                </span>

                {isRecording && !isPaused && (
                  <div className={styles.liveBadge}>
                    <span className={styles.pulseDotLive} />
                    <span className={styles.liveText}>Recording Live</span>
                  </div>
                )}

                {isPaused && (
                  <div className={styles.pausedBadge}>
                    ⏸ Paused
                  </div>
                )}

                {audioBlob && !isRecording && !isPaused && (
                  <span className={styles.doneBadge}>
                    <CheckIcon size={14} />
                    Captured ({formatTime(recordingDuration)})
                  </span>
                )}
              </div>

              {/* Timer display */}
              {(isRecording || isPaused) && (
                <div className={styles.timerDisplay}>{formatTime(recordingDuration)}</div>
              )}

              {/* Permission / hardware error */}
              {permissionError && (
                <div className={styles.errorBanner}>
                  <div className={styles.errorBannerTitle}>Microphone Access Issue</div>
                  <div>{permissionError}</div>
                </div>
              )}

              {/* Controls */}
              <div className={styles.controlsRow}>
                {!isRecording && !isPaused && !audioBlob && (
                  <button
                    type="button"
                    className={styles.btnRecord}
                    onClick={startRecording}
                  >
                    <MicIcon size={17} />
                    Start Recording
                  </button>
                )}

                {isRecording && !isPaused && (
                  <>
                    <button
                      type="button"
                      className={styles.btnStop}
                      onClick={stopRecording}
                    >
                      <StopIcon size={16} />
                      Stop
                    </button>
                    <button
                      type="button"
                      className={styles.btnPause}
                      onClick={pauseRecording}
                    >
                      <PauseIcon size={16} />
                      Pause
                    </button>
                  </>
                )}

                {isPaused && (
                  <>
                    <button
                      type="button"
                      className={styles.btnResume}
                      onClick={resumeRecording}
                    >
                      <PlayIcon size={16} />
                      Resume
                    </button>
                    <button
                      type="button"
                      className={styles.btnStop}
                      onClick={stopRecording}
                    >
                      <StopIcon size={16} />
                      Stop
                    </button>
                  </>
                )}

                {audioBlob && !isRecording && !isPaused && (
                  <>
                    <div className={styles.audioPreview}>
                      <audio controls src={audioUrl ?? undefined}>
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                    <button
                      type="button"
                      className={styles.btnClear}
                      onClick={clearRecording}
                    >
                      <RepeatIcon size={13} />
                      Re-record
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Practitioner info */}
            <div className={styles.formGrid2}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Practitioner / Bard Name *</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="e.g. Pulavar Subramania Asan"
                  value={practitionerName}
                  onChange={(e) => setPractitionerName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Approximate Age</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  className={styles.formInput}
                  placeholder="e.g. 72"
                  value={practitionerAge}
                  onChange={(e) => setPractitionerAge(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Oral Tradition / Song Title</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="e.g. Villu Paatu Ballad or Kaniyan Elegy"
                value={traditionTitle}
                onChange={(e) => setTraditionTitle(e.target.value)}
              />
            </div>

            <div className={styles.formGrid2}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>State / Region</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="e.g. Tamil Nadu, Kerala"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Dialect / Sub-variant</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="e.g. Nellai Dialect, Malabar Tulu"
                  value={dialect}
                  onChange={(e) => setDialect(e.target.value)}
                />
              </div>
            </div>

            {/* Succession toggle */}
            <label className={styles.successorToggle}>
              <input
                type="checkbox"
                className={styles.successorCheckbox}
                checked={hasSuccessor}
                onChange={(e) => setHasSuccessor(e.target.checked)}
              />
              <div>
                <div className={styles.successorLabel}>
                  Is anyone younger actively learning this tradition?
                </div>
                <div className={styles.successorHelp}>
                  Critical signal for calculating generational transmission vitality and UNESCO endangerment risk.
                </div>
              </div>
            </label>

            {/* Save button */}
            <button
              type="button"
              className={styles.saveBtn}
              disabled={!canSave || isSaving}
              onClick={handleSaveOffline}
              title={
                !audioBlob
                  ? 'Record audio first before saving'
                  : !practitionerName.trim()
                  ? 'Enter the practitioner name before saving'
                  : undefined
              }
            >
              {isSaving ? (
                <>
                  <span className={styles.syncSpinner} />
                  Saving to Device…
                </>
              ) : (
                <>
                  <ShieldCheckIcon size={16} />
                  Save to Offline Device
                </>
              )}
            </button>
            <p className={styles.saveBtnHint}>
              <ShieldCheckIcon size={12} />
              Zero internet required · Audio stored in browser IndexedDB
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            CARD B — Offline Sync Manager & Device Queue
            ═══════════════════════════════════════════════════════════════════ */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>
              <ShieldCheckIcon size={14} />
              Offline Sync Manager &amp; Device Queue
            </span>
            {/* Connectivity pill */}
            <div
              className={`${styles.connectivityPill} ${
                isOnline ? styles.connectivityOnline : styles.connectivityOffline
              }`}
            >
              <span
                className={`${styles.connectivityDot} ${
                  isOnline ? styles.connectivityDotOnline : styles.connectivityDotOffline
                }`}
              />
              {isOnline ? 'Online' : 'Offline'}
            </div>
          </div>

          <div className={styles.cardBody}>
            {/* Queue stats */}
            <div className={styles.queueStatsBar}>
              <div className={styles.queueStat}>
                <span className={styles.queueStatValue}>{queue.length}</span>
                <span className={styles.queueStatLabel}>Total</span>
              </div>
              <div className={styles.queueStatDivider} />
              <div className={styles.queueStat}>
                <span className={styles.queueStatValue}>{pendingCount}</span>
                <span className={styles.queueStatLabel}>Pending Sync</span>
              </div>
              <div className={styles.queueStatDivider} />
              <div className={styles.queueStat}>
                <span className={styles.queueStatValue}>{syncedCount}</span>
                <span className={styles.queueStatLabel}>Synced</span>
              </div>
            </div>

            {/* Queue list */}
            {queueLoading ? (
              <div className={styles.queueEmpty}>
                <div className={styles.queueEmptyIcon}>
                  <WaveformIcon size={22} />
                </div>
                <div className={styles.queueEmptyTitle}>Loading device queue…</div>
              </div>
            ) : queue.length === 0 ? (
              <div className={styles.queueEmpty}>
                <div className={styles.queueEmptyIcon}>
                  <MicIcon size={22} />
                </div>
                <div className={styles.queueEmptyTitle}>No recordings on this device</div>
                <div className={styles.queueEmptySubtext}>
                  Record and save a field session using the panel on the left to see it appear here.
                </div>
              </div>
            ) : (
              <div className={styles.queueList}>
                {queue.map((item) => (
                  <div
                    key={item.id}
                    className={`${styles.queueItem} ${item.synced ? styles.queueItemSynced : ''}`}
                  >
                    <div className={styles.queueItemTop}>
                      <div className={styles.queueItemMeta}>
                        <div className={styles.queueItemTitle} title={item.traditionTitle}>
                          {item.traditionTitle}
                        </div>
                        <div className={styles.queueItemPractitioner}>
                          {item.practitionerName}, Age {item.practitionerAge} · {item.location}
                        </div>
                      </div>
                      <div className={styles.queueItemBadges}>
                        {item.synced ? (
                          <span className={styles.syncedBadge}>
                            <CheckIcon size={10} />
                            Synced
                          </span>
                        ) : (
                          <span className={styles.pendingBadge}>Pending</span>
                        )}
                      </div>
                    </div>

                    <div className={styles.queueItemBottom}>
                      <div className={styles.queueItemInfo}>
                        <span>{formatTime(item.durationSeconds)}</span>
                        <span className={styles.queueItemInfoSep} />
                        <span>{item.dialect}</span>
                        <span className={styles.queueItemInfoSep} />
                        <span>{formatTimestamp(item.recordedAt)}</span>
                      </div>
                      <div className={styles.queueItemActions}>
                        {item.audioUrl && (
                          <button
                            type="button"
                            className={styles.btnPreview}
                            onClick={() =>
                              setExpandedPreviewId(
                                expandedPreviewId === item.id ? null : item.id
                              )
                            }
                            aria-label="Toggle audio preview"
                          >
                            <PlayIcon size={12} />
                            {expandedPreviewId === item.id ? 'Hide' : 'Preview'}
                          </button>
                        )}
                        <button
                          type="button"
                          className={styles.btnDelete}
                          onClick={() => handleDelete(item.id)}
                          aria-label="Delete recording"
                          title="Delete this recording from device"
                        >
                          <CloseIcon size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Inline audio preview */}
                    {expandedPreviewId === item.id && item.audioUrl && (
                      <audio
                        className={styles.inlineAudio}
                        controls
                        src={item.audioUrl}
                        autoPlay={false}
                      >
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Sync All button */}
            <button
              type="button"
              className={styles.syncAllBtn}
              disabled={isSyncing || pendingCount === 0}
              onClick={handleSyncAll}
              title={
                pendingCount === 0
                  ? 'No pending recordings to sync'
                  : !isOnline
                  ? 'Connect to a network to sync recordings'
                  : undefined
              }
            >
              {isSyncing ? (
                <>
                  <span className={styles.syncSpinner} />
                  Syncing {pendingCount} Recording{pendingCount !== 1 ? 's' : ''}…
                </>
              ) : (
                <>
                  <CheckIcon size={16} />
                  Sync All to Knowledge Base
                  {pendingCount > 0 && ` (${pendingCount})`}
                </>
              )}
            </button>

            {!isOnline && pendingCount > 0 && (
              <p className={styles.saveBtnHint}>
                <ShieldCheckIcon size={12} />
                Recordings are safe on this device. Connect to internet to sync.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Toast notifications */}
      <div className={styles.toastContainer} aria-live="polite">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${styles.toast} ${
              toast.type === 'success'
                ? styles.toastSuccess
                : toast.type === 'error'
                ? styles.toastError
                : styles.toastInfo
            }`}
          >
            {toast.type === 'success' && <CheckIcon size={15} />}
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
};
