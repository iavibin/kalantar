/**
 * Kalantar Offline Audio Storage Utility
 * Native IndexedDB wrapper for preserving oral traditions audio blobs and field metadata
 * Zero external dependencies, client-side offline-first architecture.
 */

const DB_NAME = 'kalantar_offline_db';
const DB_VERSION = 1;
const STORE_NAME = 'recordings';

export interface OfflineRecording {
  id: string;
  audioBlob: Blob;
  audioUrl?: string; // object URL for in-memory playback preview
  durationSeconds: number;
  recordedAt: string;
  practitionerName: string;
  practitionerAge: number;
  traditionTitle: string;
  location: string;
  dialect: string;
  hasSuccessor: boolean;
  synced: boolean;
}

/**
 * Open or upgrade the native IndexedDB instance
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this browser environment.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('synced', 'synced', { unique: false });
        store.createIndex('recordedAt', 'recordedAt', { unique: false });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error || new Error('Failed to open IndexedDB'));
    };

    request.onblocked = () => {
      console.warn('IndexedDB upgrade blocked by open tab/connection.');
    };
  });
}

/**
 * Save an offline recording entry to IndexedDB
 */
export async function saveOfflineRecording(entry: OfflineRecording): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    // Create a persistable copy (omitting transient audioUrl so stale blob urls aren't persisted)
    const { audioUrl: _transientUrl, ...recordToSave } = entry;

    const request = store.put(recordToSave);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error || new Error(`Failed to save recording with id: ${entry.id}`));
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onerror = () => {
      reject(transaction.error || new Error('Transaction error while saving recording'));
    };
  });
}

/**
 * Retrieve all offline recordings from IndexedDB, generating fresh in-memory preview URLs
 */
export async function getAllOfflineRecordings(): Promise<OfflineRecording[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const results: OfflineRecording[] = (request.result || []).map((item: any) => {
        // Generate a fresh object URL for immediate in-memory playback preview
        let previewUrl: string | undefined;
        if (item.audioBlob && item.audioBlob instanceof Blob) {
          try {
            previewUrl = URL.createObjectURL(item.audioBlob);
          } catch (e) {
            console.warn('Failed to create object URL for audio blob:', e);
          }
        }
        return {
          ...item,
          audioUrl: previewUrl || item.audioUrl
        };
      });
      resolve(results);
    };

    request.onerror = () => {
      reject(request.error || new Error('Failed to fetch offline recordings'));
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onerror = () => {
      reject(transaction.error || new Error('Transaction error while fetching recordings'));
    };
  });
}

/**
 * Delete an offline recording by ID
 */
export async function deleteOfflineRecording(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error || new Error(`Failed to delete recording with id: ${id}`));
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onerror = () => {
      reject(transaction.error || new Error('Transaction error while deleting recording'));
    };
  });
}

/**
 * Mark a local offline recording as synced with the central repository / remote server
 */
export async function markRecordingSynced(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const getRequest = store.get(id);

    getRequest.onsuccess = () => {
      const data = getRequest.result;
      if (!data) {
        reject(new Error(`Recording not found for id: ${id}`));
        return;
      }

      data.synced = true;
      const putRequest = store.put(data);

      putRequest.onsuccess = () => {
        resolve();
      };

      putRequest.onerror = () => {
        reject(putRequest.error || new Error(`Failed to update sync status for id: ${id}`));
      };
    };

    getRequest.onerror = () => {
      reject(getRequest.error || new Error(`Failed to read recording with id: ${id}`));
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onerror = () => {
      reject(transaction.error || new Error('Transaction error while marking recording as synced'));
    };
  });
}

/**
 * Retrieve single recording by ID
 */
export async function getOfflineRecordingById(id: string): Promise<OfflineRecording | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
      const item = request.result;
      if (!item) {
        resolve(null);
        return;
      }
      let previewUrl: string | undefined;
      if (item.audioBlob && item.audioBlob instanceof Blob) {
        try {
          previewUrl = URL.createObjectURL(item.audioBlob);
        } catch (e) {
          console.warn('Failed to create object URL for audio blob:', e);
        }
      }
      resolve({
        ...item,
        audioUrl: previewUrl || item.audioUrl
      });
    };

    request.onerror = () => {
      reject(request.error || new Error(`Failed to fetch recording with id: ${id}`));
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

/**
 * Count how many recordings are currently pending sync
 */
export async function getUnsyncedRecordingsCount(): Promise<number> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const items = request.result || [];
      const unsynced = items.filter((item: any) => !item.synced).length;
      resolve(unsynced);
    };

    request.onerror = () => {
      reject(request.error || new Error('Failed to count unsynced recordings'));
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

/**
 * Clear all offline recordings (archival reset or clean up)
 */
export async function clearAllOfflineRecordings(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error || new Error('Failed to clear recordings store'));
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}
