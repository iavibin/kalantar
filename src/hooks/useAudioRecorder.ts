import { useState, useRef, useEffect, useCallback } from 'react';

export interface AudioRecorderHook {
  isRecording: boolean;
  isPaused: boolean;
  recordingDuration: number;
  audioBlob: Blob | null;
  audioUrl: string | null;
  permissionError: string | null;
  startRecording: () => Promise<void>;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => void;
  clearRecording: () => void;
}

/**
 * Determine the most compatible supported audio MIME type across browsers
 */
function getSupportedAudioMimeType(): string | undefined {
  if (typeof window === 'undefined' || typeof window.MediaRecorder === 'undefined') {
    return undefined;
  }

  const candidateMimeTypes = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/ogg;codecs=opus',
    'audio/mp4',
    'audio/aac'
  ];

  for (const mimeType of candidateMimeTypes) {
    if (MediaRecorder.isTypeSupported(mimeType)) {
      return mimeType;
    }
  }

  return undefined;
}

/**
 * Formats low-level MediaDevices / MediaRecorder exceptions into human-friendly messages
 */
function formatPermissionError(err: any): string {
  if (!err) return 'An unknown error occurred while trying to access the audio device.';

  if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
    return 'Microphone access was denied. Please allow microphone permissions in your browser address bar/settings to record oral traditions.';
  }

  if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
    return 'No audio input hardware or microphone was detected on this device.';
  }

  if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
    return 'The microphone is currently locked or in use by another application or tab.';
  }

  if (err.name === 'OverconstrainedError') {
    return 'Microphone audio constraints could not be satisfied by available hardware.';
  }

  if (err.name === 'SecurityError') {
    return 'Microphone capture is restricted by browser security policies (ensure HTTPS or localhost).';
  }

  return err.message || 'Could not initialize microphone audio stream.';
}

/**
 * Custom React Hook for live microphone recording and audio Blob generation
 */
export function useAudioRecorder(): AudioRecorderHook {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  // Internal references
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const currentAudioUrlRef = useRef<string | null>(null);
  const mimeTypeRef = useRef<string>('audio/webm');

  // Keep ref synchronized with state to ensure cleanup functions always have the latest URL
  useEffect(() => {
    currentAudioUrlRef.current = audioUrl;
  }, [audioUrl]);

  // Cleanup helper to stop tracks and timers
  const cleanupStream = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (timerIntervalRef.current !== null) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  // Full unmount cleanup
  useEffect(() => {
    return () => {
      cleanupStream();
      if (currentAudioUrlRef.current) {
        URL.revokeObjectURL(currentAudioUrlRef.current);
        currentAudioUrlRef.current = null;
      }
    };
  }, [cleanupStream]);

  /**
   * Start live audio recording
   */
  const startRecording = useCallback(async (): Promise<void> => {
    setPermissionError(null);

    // Revoke previous audio preview URL if existing
    if (currentAudioUrlRef.current) {
      URL.revokeObjectURL(currentAudioUrlRef.current);
      currentAudioUrlRef.current = null;
    }
    setAudioUrl(null);
    setAudioBlob(null);
    setRecordingDuration(0);
    setIsPaused(false);

    try {
      if (typeof window === 'undefined' || !navigator?.mediaDevices?.getUserMedia) {
        throw new Error('Audio recording is not supported in this browser environment.');
      }

      if (typeof window.MediaRecorder === 'undefined') {
        throw new Error('MediaRecorder API is not available on this device.');
      }

      // Cleanup any previous ongoing stream
      cleanupStream();

      // Request hardware microphone stream with audio enhancements
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      mediaStreamRef.current = stream;

      const chosenMime = getSupportedAudioMimeType();
      const options: MediaRecorderOptions = chosenMime ? { mimeType: chosenMime } : {};
      mimeTypeRef.current = chosenMime || 'audio/webm';

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const mime = mediaRecorder.mimeType || mimeTypeRef.current || 'audio/webm';
        const finalBlob = new Blob(audioChunksRef.current, { type: mime });
        const objectUrl = URL.createObjectURL(finalBlob);

        setAudioBlob(finalBlob);
        setAudioUrl(objectUrl);
        currentAudioUrlRef.current = objectUrl;
        setIsRecording(false);
        setIsPaused(false);

        // Turn off microphone hardware and indicator lights
        cleanupStream();
      };

      mediaRecorder.onerror = (event: Event) => {
        console.error('MediaRecorder error event:', event);
        setPermissionError('An unexpected recording error occurred.');
        setIsRecording(false);
        setIsPaused(false);
        cleanupStream();
      };

      // Start capturing with timeslice for frequent data chunks
      mediaRecorder.start(200);
      setIsRecording(true);
      setIsPaused(false);

      // Start elapsed timer
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error('Microphone access / initialization error:', err);
      const errorMessage = formatPermissionError(err);
      setPermissionError(errorMessage);
      setIsRecording(false);
      setIsPaused(false);
      cleanupStream();
    }
  }, [cleanupStream]);

  /**
   * Pause recording
   */
  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerIntervalRef.current !== null) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }
  }, []);

  /**
   * Resume recording from paused state
   */
  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      if (timerIntervalRef.current === null) {
        timerIntervalRef.current = window.setInterval(() => {
          setRecordingDuration((prev) => prev + 1);
        }, 1000);
      }
    }
  }, []);

  /**
   * Stop recording and finalize Blob
   */
  const stopRecording = useCallback(() => {
    if (timerIntervalRef.current !== null) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  /**
   * Clear current recording state, reset duration, and revoke object URL
   */
  const clearRecording = useCallback(() => {
    cleanupStream();

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        // Ignore inactive stop error
      }
    }

    if (currentAudioUrlRef.current) {
      URL.revokeObjectURL(currentAudioUrlRef.current);
      currentAudioUrlRef.current = null;
    }

    audioChunksRef.current = [];
    mediaRecorderRef.current = null;

    setAudioBlob(null);
    setAudioUrl(null);
    setIsRecording(false);
    setIsPaused(false);
    setRecordingDuration(0);
    setPermissionError(null);
  }, [cleanupStream]);

  return {
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
    clearRecording
  };
}
