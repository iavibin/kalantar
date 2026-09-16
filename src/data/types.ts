// Unified Types for Kalantar Oral Tradition Preservation Platform

export type VulnerabilityStatus = 'critical' | 'endangered' | 'vulnerable' | 'thriving';

export type TraditionCategory = 
  | 'Heroic Ballad' 
  | 'Heroic Ballad & Bow-Song'
  | 'Elegiac Oral Verse'
  | 'Ritual Trance Invocations'
  | 'Agrarian Domestic Lore'
  | 'Heroic Epic & Scroll Ballad'
  | 'Mystic Oral Philosophy'
  | 'Temple & Ritual Chant' 
  | 'Pilgrim & Devotional Lore' 
  | 'Dance & Martial Ballad' 
  | 'Matriarchal Life-Cycle Song' 
  | 'Pastoral & Agro Lore' 
  | 'Satirical Narrative'
  | string;

export interface VerseLyric {
  id: string;
  timestamp: number; // in seconds for audio sync
  originalScript: string;
  scriptName: string; // e.g. "Tamil", "Malayalam", "Kannada", "Telugu", "Meitei Mayek"
  romanTransliteration: string; // IPA / IAST transliteration
  englishTranslation: string;
  culturalNote?: string;
}

export interface PerformerLineage {
  leadPerformer: string;
  communityLineage: string; // e.g. "Pulavar hereditary guild", "Pulluva bards", "Kaniyan clan"
  guruParampara?: string;
  generationCount?: number;
  region: string;
  state: string;
  district: string;
  bio: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  durationSeconds: number;
  sampleRateKhz: number;
  recordingYear: number;
  fieldRecordist: string;
  recordingLocation: string;
  waveformPeaks: number[]; // Array of normalized amplitude values (0.1 to 1.0) for visualizer
  audioToneType: 'bowed_string' | 'plucked_lute' | 'vocal_polyphony' | 'percussive_chant' | 'aerophone_flute';
  bpm: number;
  scaleOrRaga?: string;
  talaOrRhythm?: string;
}

export interface TraditionTags {
  theme: string;
  instruments: string[];
  mood: string;
}

export interface Tradition {
  id: string;
  title: string;
  vernacularTitle: string;
  scriptLabel: string;
  region: string; // Indian state (e.g. Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana)
  state: string;  // Alias for compatibility
  dialect: string;
  languageFamily: 'Dravidian' | 'Indo-Aryan' | 'Tibeto-Burman';
  category: TraditionCategory;
  culturalZone: string; // e.g. "Thamirabarani & Coromandel Basin", "Malabar Coast & Sahyadri"
  
  // Urgency & Endangerment Metrics per PRD Section 7
  practitionerAge: number; // 55 - 92
  livingPractitionerCount: number; // 1 - 40
  hasSuccessor: boolean;
  lastRecordedDaysAgo: number;
  vulnerabilityStatus: VulnerabilityStatus;
  endangermentScore?: number;
  activeApprentices?: number;
  community?: string;
  duration?: string;
  versesSnippet?: string;

  tags: string[];
  tagMetadata: TraditionTags;
  summary: string; // 1 - 2 sentences
  historicalContext: string;
  performerLineage: PerformerLineage;
  instruments: string[];
  ritualContext: string;
  motifs: string[];
  relatedIds: string[]; // 1 - 3 other entry IDs for relational graph

  unescoRecognition?: string;
  audioTrack: AudioTrack;
  verses: VerseLyric[];
  featured?: boolean;
}

export interface TraditionEntry {
  id: string;
  title: string;
  region: string;
  dialect: string;
  practitionerAge: number;
  livingPractitionerCount: number;
  hasSuccessor: boolean;
  lastRecordedDaysAgo: number;
  tags: TraditionTags;
  summary: string;
  relatedIds: string[];
}

export interface KnowledgeNode {
  id: string;
  label: string;
  type: 'tradition' | 'motif' | 'instrument' | 'region' | 'lineage';
  traditionId?: string;
  description?: string;
  count?: number;
  color?: string;
}

export interface KnowledgeEdge {
  source: string;
  target: string;
  relation: string;
  weight?: number;
}

export interface KnowledgeGraphData {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}

export interface CulturalZone {
  id: string;
  name: string;
  localName: string;
  states: string[];
  description: string;
  traditionCount: number;
  endangeredCount: number;
  color: string;
  representativeInstruments: string[];
}

export interface Exhibition {
  id: string;
  title: string;
  subtitle: string;
  curatorNote: string;
  coverImageTheme: string;
  traditionIds: string[];
  accentColor: string;
  culturalThemes: string[];
}

export interface PreservationStats {
  totalTraditions: number;
  totalDialects: number;
  totalAudioHours: number;
  endangeredDocumented: number;
  hereditaryLineages: number;
  communityAnnotations: number;
}

export interface FacetFilterState {
  category?: string;
  vulnerabilityStatus?: VulnerabilityStatus | 'all';
  endangermentLevel?: 'Critical' | 'At Risk' | 'Stable' | 'all';
  culturalZone?: string;
  dialect?: string;
  instrument?: string;
  motif?: string;
  searchQuery?: string;
  sortBy?: 'recommended' | 'score' | 'vitality' | 'alphabetical' | 'recency';
}

export interface CommunityAnnotation {
  traditionId: string;
  contributorName: string;
  roleOrCommunity: string;
  dialectAffiliation: string;
  annotationType: 'verse_correction' | 'cultural_context' | 'lineage_update' | 'alternative_variant';
  proposedText: string;
  referenceSource?: string;
}

export interface FieldRecordingSubmission {
  id?: string;
  traditionTitle: string;
  leadPerformer: string;
  approximateAge?: number;
  region: string;
  dialect: string;
  communityLineage?: string;
  hasSuccessor: boolean;
  notes?: string;
  audioBlobUrl: string;
  durationSeconds?: number;
  status?: 'queued_offline' | 'synced';
  createdAt?: string;
}

