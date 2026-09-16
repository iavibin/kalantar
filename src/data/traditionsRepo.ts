// Single Unified Data Access Layer for Kalantar
// Designed to be swapped seamlessly for real FastAPI/REST calls without touching React components.

import {
  Tradition,
  TraditionEntry,
  CulturalZone,
  Exhibition,
  KnowledgeGraphData,
  KnowledgeNode,
  KnowledgeEdge,
  PreservationStats,
  FacetFilterState,
  CommunityAnnotation,
  FieldRecordingSubmission
} from './types';
import type { OfflineRecording } from '../utils/offlineAudioStorage';
import {
  TRADITIONS,
  TRADITION_ENTRIES,
  CULTURAL_ZONES,
  CURATED_EXHIBITIONS,
  PRESERVATION_STATS
} from './traditions';
import { calculateEndangermentScore, getEndangermentLevel, EndangermentLevel } from './endangermentScore';

class TraditionsRepository {
  private traditions: Tradition[] = [...TRADITIONS];
  private entries: TraditionEntry[] = [...TRADITION_ENTRIES];
  private culturalZones: CulturalZone[] = [...CULTURAL_ZONES];
  private exhibitions: Exhibition[] = [...CURATED_EXHIBITIONS];
  private stats: PreservationStats = { ...PRESERVATION_STATS };
  private annotations: CommunityAnnotation[] = [];
  private fieldRecordingsQueue: FieldRecordingSubmission[] = [];

  // Helper simulating realistic async response
  private async delay<T>(data: T, ms: number = 20): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(data), ms));
  }

  /**
   * Search and filter oral traditions by facets, keywords, regions, endangerment, and sort criteria.
   */
  public async getTraditions(filters?: FacetFilterState): Promise<Tradition[]> {
    let result = [...this.traditions];

    if (!filters) {
      return this.delay(result);
    }

    const {
      searchQuery,
      category,
      vulnerabilityStatus,
      endangermentLevel,
      culturalZone,
      dialect,
      instrument,
      motif,
      sortBy
    } = filters;

    // Search query matching title, region, dialect, tags, lyrics, instruments, and motifs
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((t) => {
        const titleMatch = t.title.toLowerCase().includes(q);
        const vernMatch = t.vernacularTitle.toLowerCase().includes(q);
        const dialectMatch = t.dialect.toLowerCase().includes(q);
        const stateMatch = (t.state || t.region).toLowerCase().includes(q);
        const zoneMatch = t.culturalZone.toLowerCase().includes(q);
        const performerMatch = t.performerLineage.leadPerformer.toLowerCase().includes(q);
        const tagMatch = t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          t.tagMetadata.theme.toLowerCase().includes(q) ||
          t.tagMetadata.mood.toLowerCase().includes(q) ||
          t.tagMetadata.instruments.some((inst) => inst.toLowerCase().includes(q));
        const motifMatch = t.motifs.some((m) => m.toLowerCase().includes(q));
        const instrumentMatch = t.instruments.some((i) => i.toLowerCase().includes(q));
        const lyricMatch = t.verses.some((v) => 
          v.originalScript.toLowerCase().includes(q) ||
          v.romanTransliteration.toLowerCase().includes(q) ||
          v.englishTranslation.toLowerCase().includes(q)
        );

        return (
          titleMatch ||
          vernMatch ||
          dialectMatch ||
          stateMatch ||
          zoneMatch ||
          performerMatch ||
          tagMatch ||
          motifMatch ||
          instrumentMatch ||
          lyricMatch
        );
      });
    }

    // Category filter
    if (category && category !== 'all') {
      result = result.filter((t) => t.category === category);
    }

    // Endangerment Level filter ('Critical', 'At Risk', 'Stable')
    if (endangermentLevel && endangermentLevel !== 'all') {
      result = result.filter((t) => {
        const score = calculateEndangermentScore(t);
        const level = getEndangermentLevel(score);
        return level === endangermentLevel;
      });
    }

    // Vulnerability Status
    if (vulnerabilityStatus && vulnerabilityStatus !== 'all') {
      result = result.filter((t) => t.vulnerabilityStatus === vulnerabilityStatus);
    }

    // Cultural Zone
    if (culturalZone && culturalZone !== 'all') {
      result = result.filter((t) => t.culturalZone === culturalZone);
    }

    // Dialect
    if (dialect && dialect !== 'all') {
      result = result.filter((t) => t.dialect.toLowerCase().includes(dialect.toLowerCase()));
    }

    // Instrument
    if (instrument && instrument !== 'all') {
      result = result.filter((t) =>
        t.instruments.some((i) => i.toLowerCase().includes(instrument.toLowerCase()))
      );
    }

    // Motif
    if (motif && motif !== 'all') {
      result = result.filter((t) =>
        t.motifs.some((m) => m.toLowerCase().includes(motif.toLowerCase()))
      );
    }

    // Sorting
    if (sortBy) {
      if (sortBy === 'score' || sortBy === 'vitality') {
        // Sort descending by calculated endangerment score (highest endangerment first)
        result.sort((a, b) => calculateEndangermentScore(b) - calculateEndangermentScore(a));
      } else if (sortBy === 'alphabetical') {
        result.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortBy === 'recency') {
        result.sort((a, b) => b.audioTrack.recordingYear - a.audioTrack.recordingYear);
      }
    }

    return this.delay(result);
  }

  /**
   * Get a single tradition by unique ID
   */
  public async getTraditionById(id: string): Promise<Tradition | null> {
    const found = this.traditions.find((t) => t.id === id) || null;
    return this.delay(found);
  }

  /**
   * Get all featured traditions for the spotlight hero view
   */
  public async getFeaturedTraditions(): Promise<Tradition[]> {
    const featured = this.traditions.filter((t) => t.featured);
    return this.delay(featured);
  }

  /**
   * Get distinct facets for filter selectors (categories, zones, dialects, instruments, motifs)
   */
  public async getFilterFacets(): Promise<{
    categories: string[];
    culturalZones: string[];
    dialects: string[];
    instruments: string[];
    motifs: string[];
  }> {
    const categories = Array.from(new Set(this.traditions.map((t) => t.category)));
    const culturalZones = Array.from(new Set(this.traditions.map((t) => t.culturalZone)));
    const dialects = Array.from(new Set(this.traditions.map((t) => t.dialect)));
    
    const instrumentSet = new Set<string>();
    this.traditions.forEach((t) => t.instruments.forEach((i) => instrumentSet.add(i.split(' (')[0])));
    
    const motifSet = new Set<string>();
    this.traditions.forEach((t) => t.motifs.forEach((m) => motifSet.add(m)));

    return this.delay({
      categories,
      culturalZones,
      dialects,
      instruments: Array.from(instrumentSet),
      motifs: Array.from(motifSet)
    });
  }

  /**
   * Get all seeded oral tradition entries with urgency signals.
   */
  public async getTraditionEntries(): Promise<TraditionEntry[]> {
    return this.delay([...this.entries]);
  }

  /**
   * Get a single seeded tradition entry by ID.
   */
  public async getTraditionEntryById(id: string): Promise<TraditionEntry | null> {
    const found = this.entries.find((e) => e.id === id) || null;
    return this.delay(found);
  }

  /**
   * Get all entries annotated with calculated endangerment score and level.
   */
  public async getScoredEntries(): Promise<Array<TraditionEntry & { score: number; level: EndangermentLevel }>> {
    const scored = this.entries.map((entry) => {
      const score = calculateEndangermentScore(entry);
      const level = getEndangermentLevel(score);
      return {
        ...entry,
        score,
        level
      };
    });
    return this.delay(scored);
  }

  /**
   * Generates force-directed knowledge graph directly from TRADITIONS dataset,
   * wiring edges from relatedIds and sizing/coloring nodes according to endangerment score.
   */
  public async getKnowledgeGraph(): Promise<KnowledgeGraphData> {
    const nodes: KnowledgeNode[] = this.traditions.map((t) => {
      const score = calculateEndangermentScore(t);
      const level = getEndangermentLevel(score);
      const color = level === 'Critical' ? '#ef4444' : level === 'At Risk' ? '#f97316' : '#10b981';
      
      return {
        id: t.id,
        label: t.title.split(' (')[0],
        type: 'tradition',
        traditionId: t.id,
        description: `Endangerment Score: ${score}/100 (${level}) • ${t.dialect}, ${t.region}`,
        count: score,
        color
      };
    });

    const edges: KnowledgeEdge[] = [];
    const edgeSet = new Set<string>();

    this.traditions.forEach((t) => {
      t.relatedIds.forEach((relId) => {
        const edgeKey = [t.id, relId].sort().join('--');
        if (!edgeSet.has(edgeKey) && this.traditions.some((x) => x.id === relId)) {
          edgeSet.add(edgeKey);
          edges.push({
            source: t.id,
            target: relId,
            relation: 'related_tradition',
            weight: 3
          });
        }
      });
    });

    return this.delay({ nodes, edges });
  }

  /**
   * Get regional cultural zones with territorial metadata
   */
  public async getCulturalZones(): Promise<CulturalZone[]> {
    return this.delay([...this.culturalZones]);
  }

  /**
   * Get curated story exhibitions
   */
  public async getCuratedExhibitions(): Promise<Exhibition[]> {
    return this.delay([...this.exhibitions]);
  }

  /**
   * Get preservation archive statistics
   */
  public async getPreservationStats(): Promise<PreservationStats> {
    return this.delay({ ...this.stats });
  }

  /**
   * Propose a community preservation annotation
   */
  public async submitCommunityAnnotation(annotation: CommunityAnnotation): Promise<{ success: boolean; message: string }> {
    this.annotations.push(annotation);
    this.stats.communityAnnotations += 1;
    return this.delay({
      success: true,
      message: 'Oral annotation successfully submitted to the Kalantar Archival Verification Panel.'
    }, 150);
  }

  /**
   * Save a field recording to the offline-first in-memory sync queue
   */
  public async submitFieldRecording(recording: FieldRecordingSubmission): Promise<{ success: boolean; message: string; id: string }> {
    const entry: FieldRecordingSubmission = {
      ...recording,
      id: recording.id || `rec-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: recording.createdAt || new Date().toISOString(),
      status: 'queued_offline'
    };
    this.fieldRecordingsQueue.push(entry);
    return this.delay({
      success: true,
      message: 'Saved locally — will sync when connection is available',
      id: entry.id!
    }, 150);
  }

  /**
   * Retrieve all locally queued field recordings
   */
  public async getFieldRecordingsQueue(): Promise<FieldRecordingSubmission[]> {
    return this.delay([...this.fieldRecordingsQueue]);
  }

  /**
   * Promote an offline-captured OfflineRecording to a fully indexed Tradition entry.
   * Calculates endangerment score from the practitioner's age and successor status,
   * constructs a synthetic Tradition object, and appends it to the live traditions array
   * so it is immediately searchable in the Search Portal.
   *
   * Endangerment score weights (simplified field formula):
   *   - Practitioner age >= 75 → +40 pts
   *   - Practitioner age >= 60 → +25 pts
   *   - Practitioner age < 60  → +10 pts
   *   - No successor            → +35 pts | Has successor → +5 pts
   *   - Base recency weight     → +15 pts (freshly recorded, so medium urgency baseline)
   */
  public async submitFieldRecordingFromOffline(recording: OfflineRecording): Promise<Tradition> {
    // --- Endangerment score (simplified field formula) ---
    const ageScore =
      recording.practitionerAge >= 75 ? 40
      : recording.practitionerAge >= 60 ? 25
      : 10;
    const successorScore = recording.hasSuccessor ? 5 : 35;
    const recencyScore = 15;
    const rawScore = Math.min(100, ageScore + successorScore + recencyScore);

    const vulnerabilityStatus =
      rawScore >= 70 ? 'critical'
      : rawScore >= 40 ? 'endangered'
      : rawScore >= 20 ? 'vulnerable'
      : 'thriving';

    const id = `field-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const recordingYear = new Date(recording.recordedAt).getFullYear();

    const tradition: Tradition = {
      id,
      title: recording.traditionTitle || 'Untitled Field Recording',
      vernacularTitle: recording.traditionTitle || 'Untitled Field Recording',
      scriptLabel: recording.dialect || 'Unspecified',
      region: recording.location || 'Unknown Region',
      state: recording.location || 'Unknown Region',
      dialect: recording.dialect || 'Unspecified Dialect',
      languageFamily: 'Dravidian',
      category: 'Heroic Ballad',
      culturalZone: recording.location || 'Field Recording',

      practitionerAge: recording.practitionerAge,
      livingPractitionerCount: 1,
      hasSuccessor: recording.hasSuccessor,
      lastRecordedDaysAgo: 0,
      vulnerabilityStatus,

      tags: ['field-recording', recording.dialect, recording.location].filter(Boolean),
      tagMetadata: {
        theme: 'Field Documentation',
        instruments: [],
        mood: 'Documentary'
      },
      summary: `Field recording captured by Kalantar volunteer. Practitioner: ${recording.practitionerName}, Age: ${recording.practitionerAge}. Location: ${recording.location}.`,
      historicalContext: 'Captured via Kalantar offline field recording system.',
      performerLineage: {
        leadPerformer: recording.practitionerName,
        communityLineage: 'Field Documentation',
        region: recording.location || 'Unknown',
        state: recording.location || 'Unknown',
        district: recording.location || 'Unknown',
        bio: `Live field recording. Age: ${recording.practitionerAge}. Successor: ${recording.hasSuccessor ? 'Yes' : 'No'}.`
      },
      instruments: [],
      ritualContext: 'Field Documentation',
      motifs: [],
      relatedIds: [],

      audioTrack: {
        id: `audio-${id}`,
        title: recording.traditionTitle || 'Field Recording',
        durationSeconds: recording.durationSeconds,
        sampleRateKhz: 44.1,
        recordingYear,
        fieldRecordist: 'Kalantar Field Volunteer',
        recordingLocation: recording.location || 'Unknown Location',
        waveformPeaks: Array.from({ length: 40 }, () =>
          parseFloat((0.2 + Math.random() * 0.8).toFixed(2))
        ),
        audioToneType: 'vocal_polyphony',
        bpm: 0,
        scaleOrRaga: undefined,
        talaOrRhythm: undefined
      },
      verses: []
    };

    this.traditions.push(tradition);
    this.stats.totalTraditions += 1;
    if (vulnerabilityStatus === 'critical' || vulnerabilityStatus === 'endangered') {
      this.stats.endangeredDocumented += 1;
    }

    return this.delay(tradition, 120);
  }
}

// Singleton repository export
export const traditionsRepo = new TraditionsRepository();
export { TRADITIONS, TRADITION_ENTRIES, calculateEndangermentScore, getEndangermentLevel };
export type { TraditionEntry, EndangermentLevel };
