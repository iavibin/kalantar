import React, { useState, useEffect, useRef } from 'react';
import styles from './AudioPlayer.module.css';
import { Tradition, VerseLyric } from '../../data/types';
import { PlayIcon, PauseIcon, WaveformIcon, CloseIcon, RepeatIcon, VolumeIcon, VolumeMuteIcon, BookOpenIcon } from '../common/Icons';

interface AudioPlayerProps {
  tradition: Tradition | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onClosePlayer: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  tradition,
  isPlaying,
  onPlayPause,
  onClosePlayer
}) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [showLyrics, setShowLyrics] = useState<boolean>(true);
  const [scriptMode, setScriptMode] = useState<'all' | 'original' | 'english'>('all');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{ osc?: OscillatorNode; gain?: GainNode; filter?: BiquadFilterNode }[]>([]);
  const timerRef = useRef<number | null>(null);

  // Initialize Web Audio synth for ambient acoustic demonstration
  const startSynth = (toneType: string) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }

      if (!audioCtxRef.current) return;
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      stopSynth();

      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      // Base frequencies corresponding to scale/raga
      const baseFreqs = toneType === 'bowed_string' 
        ? [146.83, 220.0, 293.66, 440.0] // D3, A3, D4, A4 (Pulluvan Veena resonance)
        : toneType === 'plucked_lute' 
        ? [164.81, 246.94, 329.63] // E3, B3, E4 (Tambura / Villu resonance)
        : toneType === 'aerophone_flute'
        ? [293.66, 369.99, 440.0, 587.33] // D4, F#4, A4, D5 (Nadaswaram / Kuzhal resonance)
        : [110.0, 164.81, 220.0]; // Low drone (Edakka / Chenda)

      baseFreqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter ? ctx.createBiquadFilter() : null;

        osc.type = toneType === 'bowed_string' ? 'sawtooth' : toneType === 'plucked_lute' ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq * (1 + (i % 2) * 0.005), now);

        if (filter) {
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(toneType === 'aerophone_flute' ? 1200 : 800, now);
          osc.connect(filter);
          filter.connect(gain);
        } else {
          osc.connect(gain);
        }

        const vol = isMuted ? 0 : 0.04 / (i + 1);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(vol, now + 0.3);

        gain.connect(ctx.destination);
        osc.start(now);
        synthNodesRef.current.push({ osc, gain, filter: filter || undefined });
      });
    } catch (e) {
      // Graceful fallback if Web Audio is not allowed
      console.warn('AudioContext ambient synthesis unavailable:', e);
    }
  };

  const stopSynth = () => {
    try {
      synthNodesRef.current.forEach(({ osc, gain }) => {
        if (gain && audioCtxRef.current) {
          gain.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.1);
        }
        if (osc) {
          setTimeout(() => {
            try { osc.stop(); osc.disconnect(); } catch (_) {}
          }, 120);
        }
      });
      synthNodesRef.current = [];
    } catch (e) {
      console.warn('Synth shutdown:', e);
    }
  };

  // Playback loop and timer
  useEffect(() => {
    if (isPlaying && tradition) {
      startSynth(tradition.audioTrack.audioToneType);

      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.5 * playbackSpeed;
          if (next >= tradition.audioTrack.durationSeconds) {
            if (isLooping) {
              return 0;
            } else {
              onPlayPause();
              return 0;
            }
          }
          return next;
        });
      }, 500);
    } else {
      stopSynth();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      stopSynth();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, tradition?.id, playbackSpeed, isLooping, isMuted]);

  // Reset time when tradition changes
  useEffect(() => {
    setCurrentTime(0);
  }, [tradition?.id]);

  if (!tradition) return null;

  const duration = tradition.audioTrack.durationSeconds;
  const progressRatio = Math.min(1, currentTime / (duration || 1));

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTime(ratio * duration);
  };

  // Find currently active verse
  const activeVerseIndex = tradition.verses.reduce((acc, verse, idx) => {
    if (currentTime >= verse.timestamp) {
      return idx;
    }
    return acc;
  }, 0);

  return (
    <div className={styles.audioPlayerDock} id="kalantar-audio-dock">
      <div className={`container ${styles.playerInner}`}>
        {/* Primary Audio Player Row */}
        <div className={styles.primaryRow}>
          {/* Metadata */}
          <div className={styles.trackMetaGroup}>
            <div className={styles.trackIconBox}>
              <WaveformIcon size={22} color="#fff" />
            </div>
            <div className={styles.trackText}>
              <div className={styles.trackTitle}>{tradition.audioTrack.title}</div>
              <div className={styles.trackVernacular}>{tradition.vernacularTitle}</div>
            </div>
          </div>

          {/* Transport Controls */}
          <div className={styles.playbackControls}>
            <button
              className={`${styles.secondaryControlBtn} ${isLooping ? styles.secondaryControlBtnActive : ''}`}
              onClick={() => setIsLooping(!isLooping)}
              title="Toggle Loop"
            >
              <RepeatIcon size={16} />
            </button>

            <button
              className={styles.playToggleBtn}
              onClick={onPlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <PauseIcon size={22} /> : <PlayIcon size={22} />}
            </button>

            <button
              className={styles.secondaryControlBtn}
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeMuteIcon size={18} /> : <VolumeIcon size={18} />}
            </button>
          </div>

          {/* Waveform Scrubber */}
          <div className={styles.scrubberArea}>
            <div className={styles.timeInfoRow}>
              <span>{formatTime(currentTime)}</span>
              <span>
                {tradition.audioTrack.scaleOrRaga} • {tradition.performerLineage.leadPerformer}
              </span>
              <span>{formatTime(duration)}</span>
            </div>

            <div
              className={styles.waveformCanvasContainer}
              onClick={handleWaveformClick}
              title="Click anywhere on waveform to seek"
            >
              {tradition.audioTrack.waveformPeaks.map((peak, idx) => {
                const barRatio = idx / tradition.audioTrack.waveformPeaks.length;
                const isPlayed = barRatio <= progressRatio;
                return (
                  <div
                    key={idx}
                    className={`${styles.waveformBar} ${isPlayed ? styles.waveformBarPlayed : ''}`}
                    style={{
                      height: `${Math.max(12, peak * 32)}px`
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Side Tools & Speed */}
          <div className={styles.sideActions}>
            <div className={styles.speedSelector}>
              {[0.75, 1.0, 1.25].map((speed) => (
                <button
                  key={speed}
                  className={`${styles.speedBtn} ${playbackSpeed === speed ? styles.speedBtnActive : ''}`}
                  onClick={() => setPlaybackSpeed(speed)}
                >
                  {speed}x
                </button>
              ))}
            </div>

            <button
              className={styles.transcriptToggleBtn}
              onClick={() => setShowLyrics(!showLyrics)}
            >
              <BookOpenIcon size={14} />
              <span>{showLyrics ? 'Hide Lyrics' : 'Sync Lyrics'}</span>
            </button>

            <button
              className={styles.secondaryControlBtn}
              onClick={onClosePlayer}
              title="Close Player"
            >
              <CloseIcon size={18} />
            </button>
          </div>
        </div>

        {/* Synchronized Transcripts & Vernacular Lyrics Tray */}
        {showLyrics && tradition.verses.length > 0 && (
          <div className={styles.transcriptTray}>
            <div className={styles.transcriptHeader}>
              <div className={styles.transcriptTitle}>
                <span>📜 Synchronized Oral Transcriptions ({tradition.verses.length} Verses)</span>
              </div>

              <div className={styles.scriptModeGroup}>
                <button
                  className={`${styles.scriptBtn} ${scriptMode === 'all' ? styles.scriptBtnActive : ''}`}
                  onClick={() => setScriptMode('all')}
                >
                  Full Multilingual
                </button>
                <button
                  className={`${styles.scriptBtn} ${scriptMode === 'original' ? styles.scriptBtnActive : ''}`}
                  onClick={() => setScriptMode('original')}
                >
                  Original Script
                </button>
                <button
                  className={`${styles.scriptBtn} ${scriptMode === 'english' ? styles.scriptBtnActive : ''}`}
                  onClick={() => setScriptMode('english')}
                >
                  English Translation
                </button>
              </div>
            </div>

            {tradition.verses.map((verse: VerseLyric, idx: number) => {
              const isActive = idx === activeVerseIndex;
              return (
                <div
                  key={verse.id}
                  className={`${styles.verseCard} ${isActive ? styles.verseCardActive : ''}`}
                  onClick={() => setCurrentTime(verse.timestamp)}
                >
                  {(scriptMode === 'all' || scriptMode === 'original') && (
                    <div className={styles.verseScriptText}>
                      {verse.originalScript}
                    </div>
                  )}

                  {scriptMode === 'all' && (
                    <div className={styles.verseTransliteration}>
                      {verse.romanTransliteration}
                    </div>
                  )}

                  {(scriptMode === 'all' || scriptMode === 'english') && (
                    <div className={styles.verseEnglish}>
                      {verse.englishTranslation}
                    </div>
                  )}

                  {verse.culturalNote && isActive && (
                    <div className={styles.verseNote}>
                      💡 <strong>Oral Anthropological Note:</strong> {verse.culturalNote}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Graceful placeholder when tradition has no transcribed verses (e.g. field recordings) */}
        {showLyrics && tradition.verses.length === 0 && (
          <div className={styles.transcriptTray} style={{ padding: '16px 20px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              No synchronized transcriptions available for this field recording yet.
              Community annotators can add verses via the Contribute Oral Lore workflow.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
