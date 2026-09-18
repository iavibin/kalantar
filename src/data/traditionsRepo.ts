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

export const SEEDED_TRADITIONS: Tradition[] = [
  ...TRADITIONS,
  {
    id: 'trad-therukoothu',
    coordinates: { lat: 12.83, lng: 79.70 },
    title: 'Therukoothu — Draupadi Amman Natakam',
    vernacularTitle: 'தெருக்கூத்து — திரௌபதி அம்மன் நாடகம்',
    scriptLabel: 'Tamil Script',
    region: 'Kanchipuram & Tiruvannamalai',
    state: 'Tamil Nadu',
    dialect: 'North Arcot Tamil',
    languageFamily: 'Dravidian',
    category: 'Open-Air Ritual Theatre',
    culturalZone: 'Northern Arcot & Palar Basin',
    practitionerAge: 79,
    livingPractitionerCount: 2,
    hasSuccessor: true,
    lastRecordedDaysAgo: 40,
    vulnerabilityStatus: 'critical',
    endangermentScore: 84,
    activeApprentices: 1,
    community: 'Koothu Pattarai Bards',
    duration: '6:10',
    tags: ['Therukoothu', 'Draupadi Amman', 'Open-Air Theatre', 'North Arcot', 'Ritual Theatre'],
    tagMetadata: {
      theme: 'Open-Air Ritual Theatre',
      instruments: ['Mukhaveenai (Double-reed pipe)', 'Mridangam', 'Kattumelam', 'Thalam'],
      mood: 'Dramatic & Ritualistic'
    },
    summary: 'All-night sacred open-air dramatized recital performed in village squares during temple fire-walking festivals, memorized entirely through spoken verse (viruttam) without scripts.',
    historicalContext: 'Enacted in rural Tamil village squares during annual Draupadi Amman fire-walking rituals with spoken viruttam cycles.',
    performerLineage: {
      leadPerformer: 'Dharmalingam Asan',
      communityLineage: 'Koothu Pattarai Bards',
      region: 'Kanchipuram & Tiruvannamalai',
      state: 'Tamil Nadu',
      district: 'Tiruvannamalai',
      bio: 'Veteran Koothu master preserving unbroken spoken viruttam reciting traditions for over six decades.'
    },
    instruments: ['Mukhaveenai (Double-reed pipe)', 'Mridangam', 'Kattumelam', 'Thalam'],
    ritualContext: 'All-night village square performances culminating in temple fire-walking ceremonies.',
    motifs: ['Draupadi’s Sacred Vow', 'Fall of Duryodhana', 'Fire-Walking Sanctity'],
    audioTrack: {
      id: 'aud-therukoothu',
      title: 'Therukoothu — Draupadi Amman Natakam',
      durationSeconds: 370,
      sampleRateKhz: 48,
      recordingYear: 2024,
      fieldRecordist: 'Kalantar Field Unit',
      recordingLocation: 'Tiruvannamalai, Tamil Nadu',
      waveformPeaks: [0.4, 0.7, 0.88, 0.92, 0.95, 0.8, 0.85, 0.9, 0.82, 0.7, 0.9, 0.95, 0.8, 0.85, 0.95, 0.88, 0.75, 0.9, 0.95, 0.8, 0.65, 0.85, 0.9, 0.75, 0.6, 0.8, 0.9, 0.7, 0.5, 0.35],
      audioToneType: 'aerophone_flute',
      bpm: 130,
      scaleOrRaga: 'Nattai Ritual Mode',
      talaOrRhythm: 'Kattumelam Fast 8-count'
    },
    versesSnippet: 'பாரதப் போர்க்களம் பாவி துரியோதனன் வீழ... தர்மத்தின் குரலாய் திரௌபதி சபதம் நிறைவேறும்!\n(Upon the battleground as evil Duryodhana falls... Draupadi\'s vow is fulfilled by the voice of Dharma!)',
    verses: [
      {
        id: 'the-v1',
        timestamp: 0,
        originalScript: 'பாரதப் போர்க்களம் பாவி துரியோதனன் வீழ... தர்மத்தின் குரலாய் திரௌபதி சபதம் நிறைவேறும்!',
        scriptName: 'Tamil',
        romanTransliteration: 'Pāratap pōrkkaḷam pāvi turiyōtaṉaṉ vīḻa... tarmattiṉ kuralāy tiraupati capatam niṟaivēṟum!',
        englishTranslation: 'Upon the battleground as evil Duryodhana falls... Draupadi\'s vow is fulfilled by the voice of Dharma!',
        culturalNote: 'Chanted with piercing double-reed Mukhaveenai accompaniment at the climactic midnight scene of the Mahabharata recital.'
      }
    ],
    relatedIds: ['villu-pattu-muthupattan', 'trad-silambam-paattu'],
    featured: true
  },
  {
    id: 'trad-silambam-paattu',
    coordinates: { lat: 9.92, lng: 78.12 },
    title: 'Silambam Por-Paattu (Martial Ballad)',
    vernacularTitle: 'சிலம்பப் போர்ப்பாட்டு — களரி வாய்மொழி மரபு',
    scriptLabel: 'Tamil Script',
    region: 'Madurai & Sivagangai',
    state: 'Tamil Nadu',
    dialect: 'Pandya Madurai Tamil',
    languageFamily: 'Dravidian',
    category: 'Martial Rhythms & Chivalric Lore',
    culturalZone: 'Thamirabarani & Southern Plains',
    practitionerAge: 75,
    livingPractitionerCount: 3,
    hasSuccessor: true,
    lastRecordedDaysAgo: 50,
    vulnerabilityStatus: 'critical',
    endangermentScore: 73,
    activeApprentices: 2,
    community: 'Traditional Asan Lineages',
    duration: '3:40',
    tags: ['Silambam', 'Por-Paattu', 'Martial Lore', 'Madurai', 'Staff Combat'],
    tagMetadata: {
      theme: 'Martial Rhythms & Chivalric Lore',
      instruments: ['Thappu (Frame Drum)', 'Kombu Horn'],
      mood: 'Energetic & Chivalric'
    },
    summary: 'Rhythmic oral footwork mnemonics (chuvadus) and chivalric verses chanted during staff combat sparring, preserving pre-colonial Southern martial terminology.',
    historicalContext: 'Chanted by martial arts masters (Asans) to guide disciples in staff fencing and combat maneuvers.',
    performerLineage: {
      leadPerformer: 'Sangaralingam Asan',
      communityLineage: 'Traditional Asan Lineages',
      region: 'Madurai & Sivagangai',
      state: 'Tamil Nadu',
      district: 'Madurai',
      bio: 'Revered Silambam elder who preserves the oral mnemonic verses of Pandya staff fencing.'
    },
    instruments: ['Thappu (Frame Drum)', 'Kombu Horn'],
    ritualContext: 'Martial sparring demonstrations and harvest festival combat arenas.',
    motifs: ['Footwork Chuvadu', 'Bamboo Staff Whirl', 'Warrior Discipline'],
    audioTrack: {
      id: 'aud-silambam-paattu',
      title: 'Silambam Por-Paattu (Martial Ballad)',
      durationSeconds: 220,
      sampleRateKhz: 48,
      recordingYear: 2024,
      fieldRecordist: 'Kalantar Field Unit',
      recordingLocation: 'Madurai, Tamil Nadu',
      waveformPeaks: [0.3, 0.6, 0.85, 0.9, 0.95, 0.8, 0.85, 0.9, 0.8, 0.7, 0.85, 0.9, 0.8, 0.85, 0.9, 0.8, 0.7, 0.85, 0.9, 0.75, 0.6, 0.8, 0.85, 0.7, 0.55, 0.75, 0.8, 0.65, 0.45, 0.3],
      audioToneType: 'percussive_chant',
      bpm: 138,
      scaleOrRaga: 'Martial Folk Cadence',
      talaOrRhythm: 'Thappu Driving Syncopation'
    },
    versesSnippet: 'சுவடு பார்த்து அடி வை மகனே, தடியின் நுனியில் காற்றுப் பறக்கட்டும்!\n(Watch your step and strike true, my son; let the wind whistle off the bamboo tip!)',
    verses: [
      {
        id: 'sil-v1',
        timestamp: 0,
        originalScript: 'சுவடு பார்த்து அடி வை மகனே, தடியின் நுனியில் காற்றுப் பறக்கட்டும்!',
        scriptName: 'Tamil',
        romanTransliteration: 'Cuvaṭu pārttu aṭi vai makaṉē, taṭiyiṉ nuṉiyil kāṟṟup paṟakkaṭṭum!',
        englishTranslation: 'Watch your step and strike true, my son; let the wind whistle off the bamboo tip!',
        culturalNote: 'Sung synchronously with foot movements (chuvadus) during traditional Tamil bamboo staff combat.'
      }
    ],
    relatedIds: ['trad-therukoothu', 'marudha-nilam-oppari'],
    featured: false
  },
  {
    id: 'trad-kurumba-honey',
    coordinates: { lat: 11.42, lng: 76.86 },
    title: 'Kurumba Honey-Gathering Chants',
    vernacularTitle: 'குறும்பா தேனெடுக்கும் வாய்மொழிப் பாடல்',
    scriptLabel: 'Tamil Script',
    region: 'Nilgiri Biosphere Slopes',
    state: 'Tamil Nadu',
    dialect: 'Alu Kurumba (Tribal Dravidian)',
    languageFamily: 'Dravidian',
    category: 'Indigenous Forest Lore',
    culturalZone: 'Nilgiri Biosphere & Western Ghats',
    practitionerAge: 81,
    livingPractitionerCount: 1,
    hasSuccessor: false,
    lastRecordedDaysAgo: 25,
    vulnerabilityStatus: 'critical',
    endangermentScore: 95,
    activeApprentices: 0,
    community: 'Alu Kurumba Tribe',
    duration: '4:05',
    tags: ['Kurumba', 'Honey Gathering', 'Nilgiris', 'Forest Lore', 'Tribal Chant'],
    tagMetadata: {
      theme: 'Indigenous Forest Lore',
      instruments: ['Buguri (Tribal Flute)', 'Are (Clay Drum)'],
      mood: 'Ethereal & Sacred'
    },
    summary: 'Sacred appeasement chants whispered while rappelling sheer Nilgiri cliffs on wild vines to harvest rock-cliff honey, honoring jungle deities and cliff bees.',
    historicalContext: 'Whispered by Alu Kurumba honey harvesters suspended on vine ladders down mountain chasms to appease rock spirits and wild bees.',
    performerLineage: {
      leadPerformer: 'Belli Kurumba',
      communityLineage: 'Alu Kurumba Tribe',
      region: 'Nilgiri Biosphere Slopes',
      state: 'Tamil Nadu',
      district: 'The Nilgiris',
      bio: 'Eighty-one-year-old tribal elder possessing the esoteric appeasement songs for cliff-side honey gathering.'
    },
    instruments: ['Buguri (Tribal Flute)', 'Are (Clay Drum)'],
    ritualContext: 'Seasonal cliffside wild honey harvesting rituals in dense Nilgiri gorge forests.',
    motifs: ['Cliff Rock Spirits', 'Wild Forest Honey', 'Vine Ladder Descent'],
    audioTrack: {
      id: 'aud-kurumba-honey',
      title: 'Kurumba Honey-Gathering Chants',
      durationSeconds: 245,
      sampleRateKhz: 48,
      recordingYear: 2024,
      fieldRecordist: 'Kalantar Field Unit',
      recordingLocation: 'Kotagiri, The Nilgiris',
      waveformPeaks: [0.2, 0.4, 0.6, 0.7, 0.8, 0.75, 0.7, 0.75, 0.8, 0.65, 0.5, 0.6, 0.7, 0.65, 0.55, 0.65, 0.7, 0.6, 0.5, 0.6, 0.7, 0.6, 0.45, 0.5, 0.6, 0.5, 0.4, 0.35, 0.25, 0.2],
      audioToneType: 'aerophone_flute',
      bpm: 78,
      scaleOrRaga: 'Tribal Microtonal Scale',
      talaOrRhythm: 'Are Clay Drum Pulse'
    },
    versesSnippet: 'பாறை மடி மேல் தேன் சொட்டுதே, காவல்காரக் காடே வழியைக் காட்டு!\n(Upon the cliff\'s bosom wild honey drips; O guardian forest spirit, clear our path!)',
    verses: [
      {
        id: 'kur-v1',
        timestamp: 0,
        originalScript: 'பாறை மடி மேல் தேன் சொட்டுதே, காவல்காரக் காடே வழியைக் காட்டு!',
        scriptName: 'Tamil',
        romanTransliteration: 'Pāṟai maṭi mēl tēṉ coṭṭutē, kāvalkārak kāṭē vaḻiyaik kāṭṭu!',
        englishTranslation: 'Upon the cliff\'s bosom wild honey drips; O guardian forest spirit, clear our path!',
        culturalNote: 'Sung in low whispers so as not to agitate the gigantic wild rock bees (Apis dorsata).'
      }
    ],
    relatedIds: ['trad-toda-keli', 'trad-kaani-chants'],
    featured: true
  },
  {
    id: 'trad-toda-keli',
    coordinates: { lat: 11.41, lng: 76.70 },
    title: 'Thoda Keli Chants (Toda Pastoral Hymns)',
    vernacularTitle: 'தோடர் எருமை வழிபாட்டுப் பாடல்',
    scriptLabel: 'Tamil Script',
    region: 'Ooty High Plateaus, Nilgiris',
    state: 'Tamil Nadu',
    dialect: 'Toda (Indo-Dravidian Archaic)',
    languageFamily: 'Dravidian',
    category: 'Pastoral Sacred Chants',
    culturalZone: 'Nilgiri Biosphere & Western Ghats',
    practitionerAge: 78,
    livingPractitionerCount: 1,
    hasSuccessor: false,
    lastRecordedDaysAgo: 35,
    vulnerabilityStatus: 'critical',
    endangermentScore: 91,
    activeApprentices: 0,
    community: 'Toda Pastoralists',
    duration: '4:50',
    tags: ['Toda', 'Thoda Keli', 'Pastoral Hymns', 'Sacred Buffalo', 'Nilgiris'],
    tagMetadata: {
      theme: 'Pastoral Sacred Chants',
      instruments: ['Acapella Guttural Chant'],
      mood: 'Reverent & Archaic'
    },
    summary: 'Unwritten guttural microtonal hymns sung by Toda priest-elders inside conical dairy temples dedicated to the sacred water buffalo lineages.',
    historicalContext: 'Intoned by Toda tribal priests at dawn outside conical stone dairies, praising sacred buffalo lineages.',
    performerLineage: {
      leadPerformer: 'Pillican Toda',
      communityLineage: 'Toda Pastoralists',
      region: 'Ooty High Plateaus, Nilgiris',
      state: 'Tamil Nadu',
      district: 'The Nilgiris',
      bio: 'Elder dairy priest holding sacred oral chants for high-altitude grassland pasturage and dairy rituals.'
    },
    instruments: ['Acapella Guttural Chant'],
    ritualContext: 'Sacred dairy temple consecration and seasonal buffalo migration ceremonies.',
    motifs: ['Sacred Dairy Temple', 'Buffalo Genealogies', 'High Grassland Pastures'],
    audioTrack: {
      id: 'aud-toda-keli',
      title: 'Thoda Keli Chants (Toda Pastoral Hymns)',
      durationSeconds: 290,
      sampleRateKhz: 48,
      recordingYear: 2024,
      fieldRecordist: 'Kalantar Field Unit',
      recordingLocation: 'Udhagamandalam, The Nilgiris',
      waveformPeaks: [0.3, 0.45, 0.6, 0.7, 0.75, 0.7, 0.65, 0.7, 0.75, 0.6, 0.5, 0.6, 0.65, 0.6, 0.55, 0.65, 0.7, 0.6, 0.5, 0.6, 0.7, 0.6, 0.45, 0.5, 0.6, 0.5, 0.4, 0.35, 0.25, 0.2],
      audioToneType: 'vocal_polyphony',
      bpm: 64,
      scaleOrRaga: 'Guttural Microtonal Drone',
      talaOrRhythm: 'Unmeasured Breaths'
    },
    versesSnippet: 'பொலிவு தரும் பால் மடிகளே, முண்டுகளின் மேய்ச்சல் நிலமே வாழ்க!\n(Blessed be the bounty of the sacred dairy, long live the grassy grazing mounds!)',
    verses: [
      {
        id: 'tod-v1',
        timestamp: 0,
        originalScript: 'பொலிவு தரும் பால் மடிகளே, முண்டுகளின் மேய்ச்சல் நிலமே வாழ்க!',
        scriptName: 'Tamil',
        romanTransliteration: 'Polivu tarum pāl maṭikaḷē, muṇṭukaḷiṉ mēyccal nilamē vāḻka!',
        englishTranslation: 'Blessed be the bounty of the sacred dairy, long live the grassy grazing mounds!',
        culturalNote: 'Chanted in deep guttural tones preserving archaic Dravidian phonemes found nowhere else in South Asia.'
      }
    ],
    relatedIds: ['trad-kurumba-honey', 'grama-thalaattu-lullaby'],
    featured: false
  },
  {
    id: 'trad-kaani-chants',
    coordinates: { lat: 8.62, lng: 77.25 },
    title: 'Kaani Tribal Kaanikkarar Chants',
    vernacularTitle: 'காணி பழங்குடி மருத்துவ வாய்மொழிப் பாடல்',
    scriptLabel: 'Tamil Script',
    region: 'Agasthyamalai Hills, Tirunelveli',
    state: 'Tamil Nadu',
    dialect: 'Malampandarish-Kaani Tamil',
    languageFamily: 'Dravidian',
    category: 'Ethnobotanical Healing Chants',
    culturalZone: 'Agasthyamalai & Southern Ghats',
    practitionerAge: 83,
    livingPractitionerCount: 1,
    hasSuccessor: false,
    lastRecordedDaysAgo: 20,
    vulnerabilityStatus: 'critical',
    endangermentScore: 94,
    activeApprentices: 0,
    community: 'Kaani Tribe',
    duration: '3:30',
    tags: ['Kaani Tribe', 'Healing Chants', 'Agasthyamalai', 'Kokkarai', 'Ethnobotany'],
    tagMetadata: {
      theme: 'Ethnobotanical Healing Chants',
      instruments: ['Kokkarai (Notched Iron Scraper Tube)'],
      mood: 'Incantatory & Healing'
    },
    summary: 'Ethnobotanical oral chants intoned with the scraping of the Kokkarai instrument, encoding secret botanical remedies (including Arogyapacha) and medicinal plants.',
    historicalContext: 'Transmitted orally among Kaani tribal healers of Agasthyamalai, using the rhythmic grating of the iron Kokkarai tube to recall combinations of medicinal forest flora.',
    performerLineage: {
      leadPerformer: 'Mallan Kaani',
      communityLineage: 'Kaani Tribe',
      region: 'Agasthyamalai Hills, Tirunelveli',
      state: 'Tamil Nadu',
      district: 'Tirunelveli',
      bio: 'Eighty-three-year-old traditional healer and custodian of the sacred Kokkarai healing songs.'
    },
    instruments: ['Kokkarai (Notched Iron Scraper Tube)'],
    ritualContext: 'Forest healing rites, herbal gathering journeys, and monsoon purification ceremonies.',
    motifs: ['Healing Forest Herbs', 'Kokkarai Iron Resonance', 'Agasthya Mountain Medicine'],
    audioTrack: {
      id: 'aud-kaani-chants',
      title: 'Kaani Tribal Kaanikkarar Chants',
      durationSeconds: 210,
      sampleRateKhz: 48,
      recordingYear: 2024,
      fieldRecordist: 'Kalantar Field Unit',
      recordingLocation: 'Papanasam Hills, Tamil Nadu',
      waveformPeaks: [0.35, 0.6, 0.8, 0.85, 0.9, 0.8, 0.85, 0.9, 0.8, 0.7, 0.85, 0.9, 0.8, 0.85, 0.9, 0.8, 0.7, 0.85, 0.9, 0.75, 0.6, 0.8, 0.85, 0.7, 0.55, 0.75, 0.8, 0.65, 0.45, 0.3],
      audioToneType: 'percussive_chant',
      bpm: 110,
      scaleOrRaga: 'Indigenous Scraping Chant',
      talaOrRhythm: 'Kokkarai Syncopated Scrape'
    },
    versesSnippet: 'மலையடிவாரத்து பச்சிலையே, நோய்களை விரட்டும் மூலிகையே வா!\n(O healing leaf of the Agasthya hills, herb that banishes affliction, reveal thy cure!)',
    verses: [
      {
        id: 'kaa-v1',
        timestamp: 0,
        originalScript: 'மலையடிவாரத்து பச்சிலையே, நோய்களை விரட்டும் மூலிகையே வா!',
        scriptName: 'Tamil',
        romanTransliteration: 'Malaiyaṭivārattu paccilaiyē, nōykaḷai viraṭṭum mūlikaiyē vā!',
        englishTranslation: 'O healing leaf of the Agasthya hills, herb that banishes affliction, reveal thy cure!',
        culturalNote: 'Chanted while searching for medicinal plants such as the stamina-boosting Arogyapacha herb.'
      }
    ],
    relatedIds: ['kaniyan-koothu-thiruvarul', 'trad-kurumba-honey'],
    featured: false
  },
  {
    id: 'trad-pandavani',
    coordinates: { lat: 21.25, lng: 81.63 },
    title: 'Pandavani — Mahabharata Oral Ballad',
    vernacularTitle: 'पंडवानी — महाभारत मौखिक गाथा',
    scriptLabel: 'Devanagari Script',
    region: 'Bhilai & Durg',
    state: 'Chhattisgarh',
    dialect: 'Chhattisgarhi',
    languageFamily: 'Indo-Aryan',
    category: 'Heroic Epic Recitation',
    culturalZone: 'Central Plains & Chota Nagpur',
    practitionerAge: 72,
    livingPractitionerCount: 3,
    hasSuccessor: true,
    lastRecordedDaysAgo: 65,
    vulnerabilityStatus: 'critical',
    endangermentScore: 71,
    activeApprentices: 1,
    community: 'Pardhi & Gond Storytellers',
    duration: '5:20',
    tags: ['Pandavani', 'Mahabharata', 'Chhattisgarhi', 'Tambura', 'Heroic Ballad'],
    tagMetadata: {
      theme: 'Heroic Epic Recitation',
      instruments: ['Tambura (with small bells)', 'Kartal'],
      mood: 'Fiery & Theatrical'
    },
    summary: 'High-energy solo narration of the Mahabharata where the singer uses the single-string Tambura as a spear, bow, or mace while pacing and vocalizing battle cries.',
    historicalContext: 'Sung by Pardhi and Gond oral storytellers of Chhattisgarh, brandishing the Tambura like Bhima’s mace.',
    performerLineage: {
      leadPerformer: 'Devdas Banjare Lineage Singer',
      communityLineage: 'Pardhi & Gond Storytellers',
      region: 'Bhilai & Durg',
      state: 'Chhattisgarh',
      district: 'Durg',
      bio: 'Master storyteller following the fiery Kapalik style of Chhattisgarhi Pandavani epic narration.'
    },
    instruments: ['Tambura (with small bells)', 'Kartal'],
    ritualContext: 'Community harvest celebrations and night-long rural village gatherings.',
    motifs: ['Bhima’s Mace Tempest', 'Tambura as Weapon', 'Kurukshetra Clamor'],
    audioTrack: {
      id: 'aud-pandavani',
      title: 'Pandavani — Mahabharata Oral Ballad',
      durationSeconds: 320,
      sampleRateKhz: 48,
      recordingYear: 2024,
      fieldRecordist: 'Kalantar Field Unit',
      recordingLocation: 'Bhilai, Chhattisgarh',
      waveformPeaks: [0.45, 0.75, 0.92, 0.95, 0.98, 0.85, 0.9, 0.95, 0.85, 0.7, 0.9, 0.95, 0.85, 0.9, 0.95, 0.88, 0.75, 0.9, 0.95, 0.8, 0.65, 0.85, 0.9, 0.75, 0.6, 0.8, 0.9, 0.7, 0.5, 0.35],
      audioToneType: 'plucked_lute',
      bpm: 128,
      scaleOrRaga: 'Chhattisgarhi Folk Epic Scale',
      talaOrRhythm: 'Kartal Fast 4-count Strike'
    },
    versesSnippet: 'भीम गदा भांजत हे गा, कुरुक्षेत्र के मैदान म महासंग्राम मच गे!\n(Bhima swings his mighty mace; a great tempest descends upon Kurukshetra!)',
    verses: [
      {
        id: 'pan-v1',
        timestamp: 0,
        originalScript: 'भीम गदा भांजत हे गा, कुरुक्षेत्र के मैदान म महासंग्राम मच गे!',
        scriptName: 'Devanagari',
        romanTransliteration: 'Bhīm gadā bhāñjat hē gā, Kurukṣētra kē maidān ma mahāsaṅgrām mac gē!',
        englishTranslation: 'Bhima swings his mighty mace; a great tempest descends upon Kurukshetra!',
        culturalNote: 'During this verse, the bard elevates the Tambura horizontally to emulate the whistling motion of Bhima’s battle mace.'
      }
    ],
    relatedIds: ['pabuji-ki-phad-rajasthan', 'trad-daskathia'],
    featured: true
  },
  {
    id: 'trad-daskathia',
    coordinates: { lat: 19.31, lng: 84.79 },
    title: 'Daskathia Oral Ballad',
    vernacularTitle: 'ଦଶକାଠିଆ ମୌଖିକ ଗୀତିକା',
    scriptLabel: 'Odia Script',
    region: 'Ganjam District',
    state: 'Odisha',
    dialect: 'Ganjam Odia',
    languageFamily: 'Indo-Aryan',
    category: 'Dramatic Ballad Recitation',
    culturalZone: 'Kalinga Coast & Eastern Ghats',
    practitionerAge: 74,
    livingPractitionerCount: 2,
    hasSuccessor: true,
    lastRecordedDaysAgo: 55,
    vulnerabilityStatus: 'critical',
    endangermentScore: 77,
    activeApprentices: 1,
    community: 'Gayaka & Palia Duos',
    duration: '4:40',
    tags: ['Daskathia', 'Ganjam', 'Kathi Clappers', 'Odia Ballad', 'Duet Storytelling'],
    tagMetadata: {
      theme: 'Dramatic Ballad Recitation',
      instruments: ['Kathi (Twin wooden clappers)', 'Ramadurgi'],
      mood: 'Witty & Devotional'
    },
    summary: 'Duet oral performance where the primary singer (Gayaka) and chorus-jester (Palia) click wooden sticks at rapid speeds to narrate mythological and satirical stories.',
    historicalContext: 'Performed across southern Odisha by a two-member team using paired resonant Kathi wood clappers held between the fingers.',
    performerLineage: {
      leadPerformer: 'Bichitrananda Rout',
      communityLineage: 'Gayaka & Palia Duos',
      region: 'Ganjam District',
      state: 'Odisha',
      district: 'Ganjam',
      bio: 'Master Gayaka renowned for his rapid-fire Kathi clapping cadence and lyrical improvisation.'
    },
    instruments: ['Kathi (Twin wooden clappers)', 'Ramadurgi'],
    ritualContext: 'Village temple courtyards, Shiva shrines, and rural open-air fairs.',
    motifs: ['Kathi Clapper Rhythms', 'Gayaka and Palia Wit', 'Mythological Satire'],
    audioTrack: {
      id: 'aud-daskathia',
      title: 'Daskathia Oral Ballad',
      durationSeconds: 280,
      sampleRateKhz: 48,
      recordingYear: 2024,
      fieldRecordist: 'Kalantar Field Unit',
      recordingLocation: 'Berhampur, Ganjam, Odisha',
      waveformPeaks: [0.35, 0.65, 0.85, 0.9, 0.95, 0.8, 0.85, 0.9, 0.85, 0.7, 0.88, 0.92, 0.8, 0.85, 0.9, 0.85, 0.7, 0.85, 0.9, 0.75, 0.6, 0.8, 0.88, 0.7, 0.55, 0.75, 0.85, 0.65, 0.45, 0.3],
      audioToneType: 'percussive_chant',
      bpm: 132,
      scaleOrRaga: 'Odisi Folk Cadence',
      talaOrRhythm: 'Kathi Rapid Wood Clapping'
    },
    versesSnippet: 'କାଠି ବାଜେ ଠଣ ଠଣ, ରାମ ନାମ ଗାଅ ହେ ଜନଗଣ!\n(The wooden sticks ring with sharp clatter; sing out the name of the Divine, O people!)',
    verses: [
      {
        id: 'das-v1',
        timestamp: 0,
        originalScript: 'କାଠି ବାଜେ ଠଣ ଠଣ, ରାମ ନାମ ଗାଅ ହେ ଜନଗଣ!',
        scriptName: 'Odia',
        romanTransliteration: 'Kāṭhi bājē ṭhaṇa ṭhaṇa, Rāma nāma gāa hē janagaṇa!',
        englishTranslation: 'The wooden sticks ring with sharp clatter; sing out the name of the Divine, O people!',
        culturalNote: 'The clatter of the two wooden Kathi pieces is sustained continuously without stopping throughout the recital.'
      }
    ],
    relatedIds: ['trad-pandavani', 'baul-gaan-moner-manush'],
    featured: true
  },
  {
    id: 'trad-theyyam-thottam',
    coordinates: { lat: 12.01, lng: 75.27 },
    title: 'Theyyam Thottam — Sacred Invocatory Chants',
    vernacularTitle: 'തെയ്യം തോട്ടം — മലബാർ അനുഷ്ഠാന ഗാനം',
    scriptLabel: 'Malayalam Script',
    region: 'Kannur & Kasaragod',
    state: 'Kerala',
    dialect: 'North Malabar Malayalam',
    languageFamily: 'Dravidian',
    category: 'Ritual Trance Invocations',
    culturalZone: 'Malabar Coast & Western Foothills',
    practitionerAge: 76,
    livingPractitionerCount: 3,
    hasSuccessor: true,
    lastRecordedDaysAgo: 35,
    vulnerabilityStatus: 'critical',
    endangermentScore: 82,
    activeApprentices: 2,
    community: 'Vannan & Malayan Performers',
    duration: '5:20',
    tags: ['Theyyam Thottam', 'Theyyam', 'Thottam', 'Malabar', 'Ritual Chants', 'Kerala'],
    tagMetadata: {
      theme: 'Ritual Trance Invocations',
      instruments: ['Chenda (Cylindrical Drum)', 'Ilathalam (Bronze Cymbals)', 'Kuzhal'],
      mood: 'Fierce & Transcendent'
    },
    summary: 'Archaic ritual oral ballads intoned by hereditary dancers in North Malabar to awaken deity personas before stepping into the blazing temple flames.',
    historicalContext: 'Sung during annual Kaliyattam shrines in northern Kerala, chronicling heroic ancestors and deities transformed into sacred presences.',
    performerLineage: {
      leadPerformer: 'Kannan Panicker',
      communityLineage: 'Vannan & Malayan Performers',
      region: 'Kannur & Kasaragod',
      state: 'Kerala',
      district: 'Kannur',
      bio: 'Master Theyyam chanter and dancer holding archaic North Malabar ritual thottam oral cycles.'
    },
    instruments: ['Chenda (Cylindrical Drum)', 'Ilathalam (Bronze Cymbals)', 'Kuzhal'],
    ritualContext: 'All-night sacred grove and shrine rituals during annual Kaliyattam festivities.',
    motifs: ['Fire Walking Pyre', 'Awakening of Muchilot Bhagavathi', 'Sacred Grove Sanctuary'],
    audioTrack: {
      id: 'aud-theyyam-thottam',
      title: 'Theyyam Thottam Invocatory Chant',
      durationSeconds: 320,
      sampleRateKhz: 48,
      recordingYear: 2024,
      fieldRecordist: 'Kalantar Field Unit',
      recordingLocation: 'Payyanur, Kannur, Kerala',
      waveformPeaks: [0.4, 0.7, 0.9, 0.95, 0.85, 0.9, 0.95, 0.8, 0.85, 0.9, 0.75, 0.8, 0.9, 0.85, 0.7, 0.85, 0.9, 0.8, 0.7, 0.85, 0.9, 0.75, 0.6, 0.8, 0.85, 0.7, 0.55, 0.75, 0.8, 0.5],
      audioToneType: 'percussive_chant',
      bpm: 136,
      scaleOrRaga: 'Malabar Ritual Cadence',
      talaOrRhythm: 'Chenda Uruttu Rhythmic Cycle'
    },
    versesSnippet: 'തീക്കനലിൽ കാലൂன்றி ஆடும் ഭഗവതി... തോട്ടം പാടി ഉണർത്തുന്നു മലനാട്!\n(Stepping upon glowing embers, the Goddess dances; with thottam chants Malanad awakens!)',
    verses: [
      {
        id: 'thy-v1',
        timestamp: 0,
        originalScript: 'തീക്കനലിൽ കാലൂன்றி ஆடும் ഭഗവതി... തോട്ടം പാടി ഉണർത്തുന്നു മലനാട്!',
        scriptName: 'Malayalam',
        romanTransliteration: 'Theekkanalil kaaloorri aadum bhagavathi... thottam paadi unarthunnu malanaad!',
        englishTranslation: 'Stepping upon glowing embers, the Goddess dances; with thottam chants Malanad awakens!',
        culturalNote: 'Chanted in archaic Malayalam at midnight as ritual headdresses and fiery embers are prepared.'
      }
    ],
    relatedIds: ['kaniyan-koothu-thiruvarul', 'villu-pattu-muthupattan'],
    featured: true
  },
  {
    id: 'trad-yakshagana-tenkutittu',
    coordinates: { lat: 12.91, lng: 74.85 },
    title: 'Tenkutittu Yakshagana — Prasanga Ballad',
    vernacularTitle: 'ತೆಂಕುತಿಟ್ಟು ಯಕ್ಷಗಾನ — ಪ್ರಸಂಗ ಗಾಯನ',
    scriptLabel: 'Kannada Script',
    region: 'Dakshina Kannada & Udupi',
    state: 'Karnataka',
    dialect: 'Coastal Tulu-Kannada',
    languageFamily: 'Dravidian',
    category: 'Epic Dramatic Recitation',
    culturalZone: 'Coastal Karavali & Western Ghats',
    practitionerAge: 72,
    livingPractitionerCount: 4,
    hasSuccessor: true,
    lastRecordedDaysAgo: 45,
    vulnerabilityStatus: 'endangered',
    endangermentScore: 68,
    activeApprentices: 3,
    community: 'Bhagavata Lineages',
    duration: '5:10',
    tags: ['Tenkutittu Yakshagana', 'Yakshagana', 'Tenkutittu', 'Karnataka', 'Tulu', 'Bhagavatha'],
    tagMetadata: {
      theme: 'Epic Dramatic Recitation',
      instruments: ['Chande (High-pitched Drum)', 'Maddale (Percussion)', 'Thala (Finger Cymbals)'],
      mood: 'Heroic & Dramatic'
    },
    summary: 'High-energy Southern style oral narrative theatre led by the Bhagavata chanter, whose powerful high-register vocal cadences guide masked heroic performers.',
    historicalContext: 'Narrated through coastal Karnataka all night during harvest months, enacting epic conflicts between gods, demons, and chivalric heroes.',
    performerLineage: {
      leadPerformer: 'Shridhar Bhagavata',
      communityLineage: 'Bhagavata Lineages',
      region: 'Dakshina Kannada & Udupi',
      state: 'Karnataka',
      district: 'Dakshina Kannada',
      bio: 'Renowned Bhagavata vocalist who holds thousands of archaic poetic verses from the Tenkutittu repertory.'
    },
    instruments: ['Chande (High-pitched Drum)', 'Maddale (Percussion)', 'Thala (Finger Cymbals)'],
    ritualContext: 'Open-air paddy field stages and temple courtyards during winter harvest festivals.',
    motifs: ['Battle of Kurukshetra', 'Chande War Cadence', 'Bhagavatha Lyrical Command'],
    audioTrack: {
      id: 'aud-yakshagana-tenkutittu',
      title: 'Tenkutittu Yakshagana Prasanga Verse',
      durationSeconds: 310,
      sampleRateKhz: 48,
      recordingYear: 2024,
      fieldRecordist: 'Kalantar Field Unit',
      recordingLocation: 'Mangalore, Karnataka',
      waveformPeaks: [0.5, 0.75, 0.95, 0.9, 0.85, 0.9, 0.95, 0.8, 0.85, 0.9, 0.85, 0.7, 0.85, 0.9, 0.8, 0.85, 0.9, 0.75, 0.6, 0.8, 0.85, 0.7, 0.55, 0.75, 0.8, 0.65, 0.45, 0.3],
      audioToneType: 'percussive_chant',
      bpm: 140,
      scaleOrRaga: 'Nati / Mohana Folk Blend',
      talaOrRhythm: 'Tisra Chande Syncopation'
    },
    versesSnippet: 'ರಣರಂಗದಿ ವೀರ ರವಿಯು ಮೂಡಿದನು, ಧರ್ಮದ ರಕ್ಷೆಗೆ ಖಡ್ಗವನೆತ್ತಿದನು!\n(On the battle-plain the valiant sun arose; for righteous duty he drew the gleaming blade!)',
    verses: [
      {
        id: 'yak-v1',
        timestamp: 0,
        originalScript: 'ರಣರಂಗದಿ ವೀರ ರವಿಯು ಮೂಡಿದನು, ಧರ್ಮದ ರಕ್ಷೆಗೆ ಖಡ್ಗವನೆತ್ತಿದನು!',
        scriptName: 'Kannada',
        romanTransliteration: 'Raṇaraṅgadi vīra raviyu mūḍidanu, dharmada rakṣege khaḍgavannettidanu!',
        englishTranslation: 'On the battle-plain the valiant sun arose; for righteous duty he drew the gleaming blade!',
        culturalNote: 'Sung at the highest vocal register to cut through the resonant roar of Chande and Maddale drums.'
      }
    ],
    relatedIds: ['trad-therukoothu', 'villu-pattu-muthupattan'],
    featured: true
  },
  {
    id: 'trad-burrakatha',
    coordinates: { lat: 16.30, lng: 80.43 },
    title: 'Burrakatha — Palnadu Heroic Ballad',
    vernacularTitle: 'బుర్రకథ — పల్నాటి యుద్ధ గాథ',
    scriptLabel: 'Telugu Script',
    region: 'Guntur & Rayalaseema',
    state: 'Andhra Pradesh',
    dialect: 'Rayalaseema & Palnadu Telugu',
    languageFamily: 'Dravidian',
    category: 'Heroic Ballad Recitation',
    culturalZone: 'Krishna Basin & Rayalaseema Hills',
    practitionerAge: 75,
    livingPractitionerCount: 2,
    hasSuccessor: true,
    lastRecordedDaysAgo: 50,
    vulnerabilityStatus: 'critical',
    endangermentScore: 80,
    activeApprentices: 1,
    community: 'Burrakatha Troupe Masters',
    duration: '4:55',
    tags: ['Burrakatha', 'Palnadu', 'Tambura', 'Andhra Pradesh', 'Heroic Ballad', 'Telugu'],
    tagMetadata: {
      theme: 'Heroic Ballad Recitation',
      instruments: ['Tambura', 'Gummeta (Clay drum / Dakki)', 'Andelu (Anklet bells)'],
      mood: 'Spirited & Chivalric'
    },
    summary: 'A dynamic three-person ballad tradition featuring a principal storyteller (Kathakudu) playing Tambura and two side-commentators beating earthen Gummeta drums.',
    historicalContext: 'Recounts historic chronicles of the Battle of Palnadu and peasant struggles across villages of Andhra Pradesh and Telangana.',
    performerLineage: {
      leadPerformer: 'Venkata Subbaiah Dalapathi',
      communityLineage: 'Burrakatha Troupe Masters',
      region: 'Guntur & Rayalaseema',
      state: 'Andhra Pradesh',
      district: 'Guntur',
      bio: 'Master storyteller sustaining the oral narrative art of Palnadu ballads and folk historical memory.'
    },
    instruments: ['Tambura', 'Gummeta (Clay drum / Dakki)', 'Andelu (Anklet bells)'],
    ritualContext: 'Village open-air gatherings, festival grounds, and agrarian community assemblies.',
    motifs: ['Hero of Palnadu', 'Twin Gummeta Cadence', 'Righteous Peasant Lore'],
    audioTrack: {
      id: 'aud-burrakatha',
      title: 'Burrakatha Palnadu Battle Chant',
      durationSeconds: 295,
      sampleRateKhz: 48,
      recordingYear: 2024,
      fieldRecordist: 'Kalantar Field Unit',
      recordingLocation: 'Macherla, Guntur, Andhra Pradesh',
      waveformPeaks: [0.3, 0.6, 0.85, 0.9, 0.95, 0.8, 0.85, 0.9, 0.8, 0.7, 0.85, 0.9, 0.8, 0.85, 0.9, 0.8, 0.7, 0.85, 0.9, 0.75, 0.6, 0.8, 0.85, 0.7, 0.55, 0.75, 0.8, 0.65, 0.45, 0.3],
      audioToneType: 'plucked_lute',
      bpm: 128,
      scaleOrRaga: 'Telugu Janapada Raga',
      talaOrRhythm: 'Gummeta Driving Rhythm'
    },
    versesSnippet: 'పల్నాటి నేల పై పొంగిన పౌరుషం... తంబూరా తీగపై పలికేను గాథలు!\n(Valor surged across the soil of Palnadu; upon the strumming tambura strings, legends resound!)',
    verses: [
      {
        id: 'bur-v1',
        timestamp: 0,
        originalScript: 'పల్నాటి నేల పై పొంగిన పౌరుషం... తంబూరా తీగపై పలికేను గాథలు!',
        scriptName: 'Telugu',
        romanTransliteration: 'Palnāṭi nēla pai poṅgina pauruṣaṁ... tambūrā tīgapai palikēnu gādhalu!',
        englishTranslation: 'Valor surged across the soil of Palnadu; upon the strumming tambura strings, legends resound!',
        culturalNote: 'The Rajakiya side-commentator intersperses satirical social wit while the Hasyaka humorist entertains the village assembly.'
      }
    ],
    relatedIds: ['trad-oggu-katha', 'villu-pattu-muthupattan'],
    featured: true
  },
  {
    id: 'trad-oggu-katha',
    coordinates: { lat: 17.97, lng: 79.59 },
    title: 'Oggu Katha — Mallanna Pastoral Ballad',
    vernacularTitle: 'ఒగ్గు కథ — మల్లన్న చరితం',
    scriptLabel: 'Telugu Script',
    region: 'Warangal & Karimnagar',
    state: 'Telangana',
    dialect: 'Telangana Rural Telugu',
    languageFamily: 'Dravidian',
    category: 'Pastoral Epic & Ritual Chant',
    culturalZone: 'Godavari Basin & Deccan Plateau',
    practitionerAge: 77,
    livingPractitionerCount: 2,
    hasSuccessor: true,
    lastRecordedDaysAgo: 40,
    vulnerabilityStatus: 'critical',
    endangermentScore: 85,
    activeApprentices: 2,
    community: 'Kuruma & Yadava Bards',
    duration: '5:00',
    tags: ['Oggu Katha', 'Mallanna', 'Jaggu Drum', 'Telangana', 'Kuruma', 'Pastoral Ballad'],
    tagMetadata: {
      theme: 'Pastoral Epic & Ritual Chant',
      instruments: ['Jaggu (Brass Hourglass Drum)', 'Thalam (Cymbals)', 'Tappeta'],
      mood: 'Ecstatic & Pastoral'
    },
    summary: 'A devotional and chivalric ballad tradition of the Kuruma shepherd community, accompanied by the energetic resonance of the large brass Jaggu hourglass drum.',
    historicalContext: 'Chanted during the annual Mallanna Jathara pilgrimage in Telangana, preserving pastoral origin epics and shepherd genealogies.',
    performerLineage: {
      leadPerformer: 'Mallaiah Oggu Pujari',
      communityLineage: 'Kuruma & Yadava Bards',
      region: 'Warangal & Karimnagar',
      state: 'Telangana',
      district: 'Warangal',
      bio: 'Elder Oggu priest-bard carrying forward sacred Mallanna pilgrimage chants and oral pastoral lore.'
    },
    instruments: ['Jaggu (Brass Hourglass Drum)', 'Thalam (Cymbals)', 'Tappeta'],
    ritualContext: 'Mallanna Jathara temple festivals and sheep pen consecration ceremonies.',
    motifs: ['Lord Mallanna Journey', 'Jaggu Drum Thunder', 'Shepherd Flock Prosperity'],
    audioTrack: {
      id: 'aud-oggu-katha',
      title: 'Oggu Katha Mallanna Ballad',
      durationSeconds: 300,
      sampleRateKhz: 48,
      recordingYear: 2024,
      fieldRecordist: 'Kalantar Field Unit',
      recordingLocation: 'Komuravelli, Warangal, Telangana',
      waveformPeaks: [0.35, 0.7, 0.9, 0.95, 0.85, 0.9, 0.95, 0.85, 0.75, 0.9, 0.95, 0.8, 0.85, 0.9, 0.85, 0.75, 0.85, 0.9, 0.8, 0.7, 0.85, 0.9, 0.75, 0.6, 0.8, 0.85, 0.7, 0.55, 0.4, 0.3],
      audioToneType: 'percussive_chant',
      bpm: 134,
      scaleOrRaga: 'Telangana Oggu Folk Mode',
      talaOrRhythm: 'Jaggu Resonant Pulse'
    },
    versesSnippet: 'డమరుకం మోగెనో మల్లన్న... గొర్రెల కాపరుల కాపాడ రారో!\n(The Jaggu drum thunders, Lord Mallanna... come safeguard the flocks of your shepherds!)',
    verses: [
      {
        id: 'ogg-v1',
        timestamp: 0,
        originalScript: 'డమరుకం మోగెనో మల్లన్న... గొర్రెల కాపరుల కాపాడ రారో!',
        scriptName: 'Telugu',
        romanTransliteration: 'Ḍamarukaṁ mōgenō mallanna... gorrela kāparula kāpāḍa rārō!',
        englishTranslation: 'The Jaggu drum thunders, Lord Mallanna... come safeguard the flocks of your shepherds!',
        culturalNote: 'Sung while striking the brass Jaggu drum and sprinkling sacred turmeric (bhandar) upon devotees.'
      }
    ],
    relatedIds: ['trad-burrakatha', 'trad-theyyam-thottam'],
    featured: true
  }
];

export const SEEDED_ENTRIES: TraditionEntry[] = SEEDED_TRADITIONS.map((t) => ({
  id: t.id,
  title: t.title,
  region: t.region,
  dialect: t.dialect,
  practitionerAge: t.practitionerAge,
  livingPractitionerCount: t.livingPractitionerCount,
  hasSuccessor: t.hasSuccessor,
  lastRecordedDaysAgo: t.lastRecordedDaysAgo,
  tags: t.tagMetadata,
  summary: t.summary,
  relatedIds: t.relatedIds
}));

class TraditionsRepository {
  private traditions: Tradition[] = [...SEEDED_TRADITIONS];
  private entries: TraditionEntry[] = [...SEEDED_ENTRIES];
  private culturalZones: CulturalZone[] = [...CULTURAL_ZONES];
  private exhibitions: Exhibition[] = [...CURATED_EXHIBITIONS];
  private stats: PreservationStats = {
    ...PRESERVATION_STATS,
    totalTraditions: SEEDED_TRADITIONS.length,
    totalDialects: 13,
    endangeredDocumented: 12
  };
  private annotations: CommunityAnnotation[] = [];
  private fieldRecordingsQueue: FieldRecordingSubmission[] = [];

  constructor() {
    const custom = this.loadCustomTraditions();
    if (custom.length > 0) {
      const existingIds = new Set(this.traditions.map((t) => t.id));
      for (const item of custom) {
        if (!existingIds.has(item.id)) {
          this.traditions.push(item);
          existingIds.add(item.id);
        }
      }
    }
  }

  private loadCustomTraditions(): Tradition[] {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    try {
      const stored = localStorage.getItem('kalantar_custom_traditions');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  }

  private saveCustomTradition(tradition: Tradition) {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      const existing = this.loadCustomTraditions();
      const idx = existing.findIndex((t) => t.id === tradition.id);
      if (idx >= 0) {
        existing[idx] = tradition;
      } else {
        existing.push(tradition);
      }
      localStorage.setItem('kalantar_custom_traditions', JSON.stringify(existing));
    } catch {
      // ignore
    }
  }

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
        label: t.title.split(' (')[0].split(' — ')[0],
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
    const id = recording.id || `rec-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const entry: FieldRecordingSubmission = {
      ...recording,
      id,
      createdAt: recording.createdAt || new Date().toISOString(),
      status: 'queued_offline'
    };
    this.fieldRecordingsQueue.push(entry);

    const tradition: Tradition = {
      id,
      title: recording.traditionTitle || 'Untitled Field Lore',
      vernacularTitle: recording.traditionTitle || 'Untitled Field Lore',
      scriptLabel: recording.dialect || 'Unspecified',
      region: recording.region || 'Field Location',
      state: recording.region || 'Field Location',
      dialect: recording.dialect || 'Field Dialect',
      languageFamily: 'Dravidian',
      category: 'Heroic Ballad',
      culturalZone: recording.region || 'Field Recording',
      practitionerAge: recording.approximateAge || 65,
      livingPractitionerCount: 1,
      hasSuccessor: recording.hasSuccessor,
      lastRecordedDaysAgo: 0,
      vulnerabilityStatus: 'endangered',
      tags: ['field-recording', recording.dialect, recording.region].filter(Boolean),
      tagMetadata: {
        theme: 'Field Documentation',
        instruments: [],
        mood: 'Documentary'
      },
      summary: recording.notes || `Field recording of ${recording.traditionTitle} by ${recording.leadPerformer}.`,
      historicalContext: 'Captured via Kalantar field recording submission.',
      performerLineage: {
        leadPerformer: recording.leadPerformer,
        communityLineage: recording.communityLineage || 'Field Community',
        region: recording.region || 'Unknown',
        state: recording.region || 'Unknown',
        district: recording.region || 'Unknown',
        bio: `Recorded in ${recording.region}.`
      },
      instruments: [],
      ritualContext: 'Oral Field Lore',
      motifs: [],
      relatedIds: [],
      audioTrack: {
        id: `audio-${id}`,
        title: recording.traditionTitle || 'Field Recording',
        durationSeconds: recording.durationSeconds || 180,
        sampleRateKhz: 44.1,
        recordingYear: new Date().getFullYear(),
        fieldRecordist: 'Field Volunteer',
        recordingLocation: recording.region || 'Field Location',
        waveformPeaks: Array.from({ length: 30 }, () => parseFloat((0.2 + Math.random() * 0.7).toFixed(2))),
        audioToneType: 'vocal_polyphony',
        bpm: 0
      },
      verses: []
    };

    this.traditions.push(tradition);
    this.saveCustomTradition(tradition);

    return this.delay({
      success: true,
      message: 'Saved locally — will sync when connection is available',
      id
    }, 150);
  }

  public async getFieldRecordingsQueue(): Promise<FieldRecordingSubmission[]> {
    return this.delay([...this.fieldRecordingsQueue]);
  }

  public async submitFieldRecordingFromOffline(recording: OfflineRecording): Promise<Tradition> {
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
    this.saveCustomTradition(tradition);

    this.stats.totalTraditions = this.traditions.length;
    if (vulnerabilityStatus === 'critical' || vulnerabilityStatus === 'endangered') {
      this.stats.endangeredDocumented += 1;
    }

    return this.delay(tradition, 120);
  }

  public async deleteTradition(id: string): Promise<boolean> {
    this.traditions = this.traditions.filter((t) => t.id !== id);
    this.entries = this.entries.filter((e) => e.id !== id);
    this.stats.totalTraditions = this.traditions.length;

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = this.loadCustomTraditions().filter((t) => t.id !== id);
        localStorage.setItem('kalantar_custom_traditions', JSON.stringify(stored));
      } catch {}
    }

    return this.delay(true, 50);
  }

  public async updateTradition(id: string, updates: Partial<Tradition>): Promise<Tradition | null> {
    const idx = this.traditions.findIndex((t) => t.id === id);
    if (idx === -1) return null;

    this.traditions[idx] = {
      ...this.traditions[idx],
      ...updates,
      ...(updates.region ? { state: updates.region } : {})
    };

    const entryIdx = this.entries.findIndex((e) => e.id === id);
    if (entryIdx !== -1) {
      this.entries[entryIdx] = {
        ...this.entries[entryIdx],
        ...(updates.title ? { title: updates.title } : {}),
        ...(updates.region ? { region: updates.region } : {}),
        ...(updates.dialect ? { dialect: updates.dialect } : {})
      };
    }

    this.saveCustomTradition(this.traditions[idx]);
    return this.delay(this.traditions[idx], 50);
  }
}

// Singleton repository export
export const traditionsRepo = new TraditionsRepository();
export { TRADITIONS, TRADITION_ENTRIES, calculateEndangermentScore, getEndangermentLevel };
export type { TraditionEntry, EndangermentLevel };
