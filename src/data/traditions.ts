import { Tradition, TraditionEntry, CulturalZone, Exhibition } from './types';
export type { TraditionEntry };
import { calculateEndangermentScore, getEndangermentLevel } from './endangermentScore';

export const TRADITIONS: Tradition[] = [
  // 1. Tamil Nadu - Villu Paatu
  {
    id: 'villu-paatu-nellai',
    title: 'Villu Paatu (The Great Bow Song)',
    vernacularTitle: 'வில்லுப்பாட்டு (தென் தமிழக கதைப்பாடல்)',
    scriptLabel: 'Tamil Script',
    region: 'Tamil Nadu',
    state: 'Tamil Nadu',
    dialect: 'Nellai Tamil',
    languageFamily: 'Dravidian',
    category: 'Heroic Ballad',
    culturalZone: 'Thamirabarani & Coromandel Basin',
    practitionerAge: 78,
    livingPractitionerCount: 12,
    hasSuccessor: false,
    lastRecordedDaysAgo: 420,
    vulnerabilityStatus: 'critical',
    tags: ['Villu Paattu', 'Bow Song', 'Nellai Tamil', 'Heroic Ballad', 'Muthupattan Lore'],
    tagMetadata: {
      theme: 'Martyrdom & Pastoral Heroism',
      instruments: ['villu (musical bow)', 'udukku', 'kalam (pot)', 'veesukol'],
      mood: 'Exhilarating & Devotional'
    },
    summary: 'An exhilarating musical storytelling form where a heavy seven-foot strung bow fitted with bronze bells is struck with wooden batons to narrate heroic and martyr epics.',
    historicalContext: 'Practiced since the 15th century in southern Tamil Nadu during temple Kodai festivals. The lead Pulavar strikes the bowstring while exchanging witty rhythmic dialogues with co-singers.',
    performerLineage: {
      leadPerformer: 'Pulavar Muthukumarasamy & Troupe',
      communityLineage: 'Hereditary Pulavar bardic guild',
      guruParampara: 'Kanyakumari-Tirunelveli Villisai tradition across 6 generations',
      generationCount: 6,
      region: 'Thamirabarani Basin',
      state: 'Tamil Nadu',
      district: 'Tirunelveli' as string,
      bio: 'Master bard with encyclopedic command over oral ballads of Sudalai Madan, Muthupattan, and Kannagi legends.'
    },
    instruments: ['villu (musical bow)', 'udukku', 'kalam (pot)', 'veesukol', 'thavil'],
    ritualContext: 'Staged during midnight temple Kodai festivals before rural village shrines to appease guardian spirits and celebrate village martyrs.',
    motifs: ['Martyrdom of Muthupattan', 'The Golden Bow of Truth', 'Defiance of Caste Hegemony', 'Guardian Deity of the Frontier'],
    unescoRecognition: 'Documented on Sangeet Natak Akademi National Heritage Archive',
    audioTrack: {
      id: 'aud-villu-01',
      title: 'Muthupattan Kathai (Ballad of the Brave Scholar)',
      durationSeconds: 275,
      sampleRateKhz: 48,
      recordingYear: 2023,
      fieldRecordist: 'South Indian Oral Heritage Mission',
      recordingLocation: 'Tenkasi, Tamil Nadu',
      waveformPeaks: [0.35, 0.72, 0.95, 0.88, 0.96, 0.74, 0.89, 0.93, 0.81, 0.65, 0.94, 0.98, 0.76, 0.84, 0.99, 0.87, 0.75, 0.91, 0.95, 0.78, 0.63, 0.82, 0.9, 0.71, 0.54, 0.79, 0.92, 0.64, 0.44, 0.28],
      audioToneType: 'percussive_chant',
      bpm: 126,
      scaleOrRaga: 'Kurinji / Madhyamavati Folk Mode',
      talaOrRhythm: 'Tisra Gati syncopated bow strikes'
    },
    verses: [
      {
        id: 'vil-v1',
        timestamp: 0,
        originalScript: 'வில்லினில் தந்தி அசையுதையா, வெண்கல மணியொலி கேட்குதையா!',
        scriptName: 'Tamil',
        romanTransliteration: 'Villiniṉ tantiy acaiyutaiyā, veṇkala maṇiyoli kēṭkutaiyā!',
        englishTranslation: 'The taut bowstring vibrates, O kin! Hear the resonance of the bronze bells chiming through the night!',
        culturalNote: 'The bells suspended along the arch of the Villu chime synchronously with every strike of the wooden baton.'
      },
      {
        id: 'vil-v2',
        timestamp: 55,
        originalScript: 'முத்துப்பட்டன் வீரக்கதை பாட வாரீர், பொத்தி வச்ச காதலைத்தான் சொல்ல வாரீர்!',
        scriptName: 'Tamil',
        romanTransliteration: 'Muttu-p-paṭṭaṉ vīrakkatai pāṭa vārīr, potti vacca kātalait-tāṉ colla vārīr!',
        englishTranslation: 'Come gather to hear the valiant ballad of Muthupattan; hear the tale of fearless love that conquered all divides!',
        culturalNote: 'Muthupattan renounced his privileges to marry two Arundhathiyar women and fell protecting cattle from raiders.'
      },
      {
        id: 'vil-v3',
        timestamp: 135,
        originalScript: 'மண்ணைக் காக்க தன் உயிரைக் கொடுத்தாரே, குலதெய்வமாய் நின்று அருள் புரிவாரே!',
        scriptName: 'Tamil',
        romanTransliteration: 'Maṇṇaik kākka taṉ uyiraik koṭuttārē, kulateyvamāy niṉṟu aruḷ purivārē!',
        englishTranslation: 'He laid down his mortal life to shield the village soil; now he stands eternal as our fierce and loving guardian god!',
        culturalNote: 'Villu Paattu functions as an apotheosis where human folk heroes are elevated into living deities.'
      }
    ],
    relatedIds: ['kaniyan-koothu-tirunelveli', 'kavadi-sindhu-madurai', 'burrakatha-rayalaseema'],
    featured: true
  },

  // 2. Tamil Nadu - Kaniyan Koothu
  {
    id: 'kaniyan-koothu-tirunelveli',
    title: 'Kaniyan Koothu (Mayana Kollai Sacred Chants)',
    vernacularTitle: 'கணியான் கூத்து (மயானக் கொள்ளை பாட்டு)',
    scriptLabel: 'Tamil Script',
    region: 'Tamil Nadu',
    state: 'Tamil Nadu',
    dialect: 'Nellai Tamil',
    languageFamily: 'Dravidian',
    category: 'Temple & Ritual Chant',
    culturalZone: 'Thamirabarani & Coromandel Basin',
    practitionerAge: 86,
    livingPractitionerCount: 3,
    hasSuccessor: false,
    lastRecordedDaysAgo: 680,
    vulnerabilityStatus: 'critical',
    tags: ['Kaniyan Koothu', 'Magudam', 'Nellai Tamil', 'Amman Lore', 'Ritual Trance'],
    tagMetadata: {
      theme: 'Chthonic Rituals & Goddess Invocation',
      instruments: ['magudam (frame drum)', 'singi (bronze cymbals)'],
      mood: 'Trance & Eerie'
    },
    summary: 'An esoteric ritual chant and dance performed exclusively by hereditary Kaniyan bards at cremation grounds and Amman shrines, invoking guardian spirits through high-tempo polyrhythms.',
    historicalContext: 'Transmitted strictly within the Kaniyan community across centuries. The chants accompany ritual dances around boiling turmeric pots and midnight fire altars.',
    performerLineage: {
      leadPerformer: 'Kaniyan Shanmugam & Asan Murugan',
      communityLineage: 'Hereditary Kaniyan ritual singers',
      guruParampara: 'Kaniyan lineage of Srivaikuntam',
      generationCount: 8,
      region: 'Nellai District',
      state: 'Tamil Nadu',
      district: 'Tirunelveli',
      bio: 'Eighty-six-year-old maestro who retains over 60 esoteric Thottam chants and is one of the last three living custodians of the Magudam rhythms.'
    },
    instruments: ['magudam (frame drum)', 'singi (bronze cymbals)', 'salangai'],
    ritualContext: 'Performed at midnight during the annual Mayana Kollai (cremation ground) festival and Sudalai Madan temple rituals.',
    motifs: ['Cremation Ground Regeneration', 'Goddess Kali Possession', 'The Holy Fire Walk', 'Protective Village Borders'],
    unescoRecognition: 'Sangeet Natak Akademi Urgent Preservation Priority',
    audioTrack: {
      id: 'aud-kaniyan-02',
      title: 'Maguda Isai & Sudalai Thottam',
      durationSeconds: 240,
      sampleRateKhz: 48,
      recordingYear: 2022,
      fieldRecordist: 'Tamil Intangible Heritage Mission',
      recordingLocation: 'Srivaikuntam, Tamil Nadu',
      waveformPeaks: [0.4, 0.75, 0.98, 0.88, 0.95, 0.72, 0.9, 0.96, 0.82, 0.68, 0.92, 0.99, 0.84, 0.88, 0.97, 0.9, 0.76, 0.93, 0.95, 0.8, 0.65, 0.84, 0.91, 0.73, 0.55, 0.8, 0.93, 0.66, 0.45, 0.3],
      audioToneType: 'percussive_chant',
      bpm: 144,
      scaleOrRaga: 'Indigenous Magudam Trance Meter',
      talaOrRhythm: 'High-speed 16-beat syncopated Magudam roll'
    },
    verses: [
      {
        id: 'kan-v1',
        timestamp: 0,
        originalScript: 'மகுடத்தின் ஓசை மயானத்தில் கேட்குது, சுடலை மாடன் காலடியில் பூமி நடுங்குது!',
        scriptName: 'Tamil',
        romanTransliteration: 'Makuṭattiṉ ōcai mayāṉattil kēṭkutu, Cuṭalai Māṭaṉ kālaṭiyil pūmi naṭuṅkutu!',
        englishTranslation: 'The roar of the Magudam frame drum shakes the cremation ground; beneath the stride of Sudalai Madan, the earth shivers!',
        culturalNote: 'The Magudam is heated over charcoal embers between verses to maintain razor-sharp acoustic tension.'
      }
    ],
    relatedIds: ['villu-paatu-nellai', 'theyyam-thottam-malabar'],
    featured: true
  },

  // 3. Tamil Nadu - Oyilattam
  {
    id: 'oyilattam-kongu',
    title: 'Oyilattam (Graceful Heroic Dance Ballads)',
    vernacularTitle: 'ஒயிலாட்டம் (கொங்கு நாட்டு வீரப்பாடல்)',
    scriptLabel: 'Tamil Script',
    region: 'Tamil Nadu',
    state: 'Tamil Nadu',
    dialect: 'Kongu Tamil',
    languageFamily: 'Dravidian',
    category: 'Dance & Martial Ballad',
    culturalZone: 'Thamirabarani & Coromandel Basin',
    practitionerAge: 56,
    livingPractitionerCount: 20,
    hasSuccessor: false,
    lastRecordedDaysAgo: 140,
    vulnerabilityStatus: 'vulnerable',
    tags: ['Oyilattam', 'Kongu Tamil', 'Thavil & Parai', 'Heroic Ballad', 'Agricultural Lore'],
    tagMetadata: {
      theme: 'Village Epics & Chivalric Honor',
      instruments: ['thavil', 'parai', 'jalra'],
      mood: 'Vibrant & Celebratory'
    },
    summary: 'A rhythmic folk dance and responsive choral singing tradition recounting the martial ballads of the Kongu region with synchronized kerchief waving.',
    historicalContext: 'Originally performed exclusively by men holding colored cloth kerchiefs and ankle bells, singing the epics of Ponnar-Sankar and local agrarian leaders.',
    performerLineage: {
      leadPerformer: 'Asan Chinnasamy & Troupe',
      communityLineage: 'Kongu Vellalar & agrarian village bards',
      guruParampara: 'Dharapuram Oyilattam Gurukulam',
      generationCount: 5,
      region: 'Kongu Nadu',
      state: 'Tamil Nadu',
      district: 'Tiruppur',
      bio: 'Renowned Asan training youth in intricate footwork sequences while preserving ancient poetic couplets.'
    },
    instruments: ['thavil', 'parai', 'jalra', 'salangai'],
    ritualContext: 'Performed during temple car festivals, Pongal harvests, and village Mariamman celebrations across the western plateau.',
    motifs: ['Ponnar Sankar Valor', 'The Sacred Cauvery Flow', 'Agrarian Resilience', 'Chivalric Kerchief Duel'],
    unescoRecognition: 'Tamil Nadu Folk Arts Development Archive',
    audioTrack: {
      id: 'aud-oyil-03',
      title: 'Ponnar Sankar Veerakkathai',
      durationSeconds: 230,
      sampleRateKhz: 48,
      recordingYear: 2023,
      fieldRecordist: 'Kongu Folklore Project',
      recordingLocation: 'Dharapuram, Tamil Nadu',
      waveformPeaks: [0.3, 0.6, 0.85, 0.9, 0.95, 0.78, 0.86, 0.92, 0.8, 0.65, 0.88, 0.94, 0.79, 0.84, 0.97, 0.89, 0.74, 0.88, 0.92, 0.78, 0.64, 0.81, 0.89, 0.72, 0.54, 0.78, 0.9, 0.63, 0.42, 0.25],
      audioToneType: 'vocal_polyphony',
      bpm: 118,
      scaleOrRaga: 'Mohanam / Folk Pentatonic',
      talaOrRhythm: 'Oyil 4-count synchronized footwork pulse'
    },
    verses: [
      {
        id: 'oyi-v1',
        timestamp: 0,
        originalScript: 'கொங்கு நாட்டில் பிறந்த வீரர் பொன்னர் சங்கரையா, தங்க வாளை ஏந்தி நின்றார் மானம் காக்கவே!',
        scriptName: 'Tamil',
        romanTransliteration: 'Koṅku nāṭṭil piṟanta vīrar Poṉṉar Caṅkaraiyā, taṅka vāḷai ēnti niṉṟār māṉam kākkavē!',
        englishTranslation: 'Born in the heroic soil of Kongu were warriors Ponnar and Sankar; raising their golden swords to safeguard their people’s honor!',
        culturalNote: 'The chorus responds in soaring unison: ‘Oyilamma Oyilē!’ while waving red and yellow kerchiefs.'
      }
    ],
    relatedIds: ['silambattam-kombu-chants', 'kavadi-sindhu-madurai'],
    featured: false
  },

  // 4. Tamil Nadu - Kavadi Sindhu
  {
    id: 'kavadi-sindhu-madurai',
    title: 'Kavadi Sindhu (Murugan Pilgrim Ballads)',
    vernacularTitle: 'காவடிச் சிந்து (முருகன் வழிநடைப் பாட்டு)',
    scriptLabel: 'Tamil Script',
    region: 'Tamil Nadu',
    state: 'Tamil Nadu',
    dialect: 'Madurai Tamil',
    languageFamily: 'Dravidian',
    category: 'Pilgrim & Devotional Lore',
    culturalZone: 'Thamirabarani & Coromandel Basin',
    practitionerAge: 88,
    livingPractitionerCount: 6,
    hasSuccessor: true,
    lastRecordedDaysAgo: 580,
    vulnerabilityStatus: 'vulnerable',
    tags: ['Kavadi Sindhu', 'Murugan Bhakti', 'Nadaswaram', 'Thavil', 'Pilgrim Lore'],
    tagMetadata: {
      theme: 'Murugan Bhakti & Ecstatic Pilgrimage',
      instruments: ['nadaswaram', 'thavil', 'thaalam'],
      mood: 'Ecstatic & Rhythmic'
    },
    summary: 'Complex metrical ballads pioneered by poet Annamalai Reddiar, sung by pilgrims carrying ornate Kavadi arches on long foot journeys to Palani and Tiruchendur.',
    historicalContext: 'Created to alleviate the exhaustion of barefoot pilgrims marching across blazing terrain through intoxicating poetic meters that induce divine trance.',
    performerLineage: {
      leadPerformer: 'Desikar Sundaram & Troupe',
      communityLineage: 'Hereditary Oduvar and Kavadi bards of Madurai',
      guruParampara: 'Chennikulam Annamalai Reddiar oral school',
      generationCount: 5,
      region: 'Madurai & Dindigul',
      state: 'Tamil Nadu',
      district: 'Madurai',
      bio: 'Eighty-eight-year-old virtuoso who sings all 36 classical Kavadi Sindhu meters with flawless rhythmic syncopation.'
    },
    instruments: ['nadaswaram', 'thavil', 'thaalam'],
    ritualContext: 'Sung along pilgrimage trails to Lord Murugan temples and during Thaipusam / Panguni Uthiram festivals.',
    motifs: ['The Golden Spear (Vel)', 'Ecstatic Mountain Ascents', 'The Peacock Mount', 'Surrender of Worldly Burdens'],
    unescoRecognition: 'Documented in Tamil Sacred Music Archive',
    audioTrack: {
      id: 'aud-kavadi-04',
      title: 'Valli Kalyana Sindhu',
      durationSeconds: 260,
      sampleRateKhz: 48,
      recordingYear: 2022,
      fieldRecordist: 'Madurai Heritage Society',
      recordingLocation: 'Palani Foothills, Tamil Nadu',
      waveformPeaks: [0.35, 0.7, 0.92, 0.88, 0.96, 0.75, 0.89, 0.94, 0.82, 0.67, 0.91, 0.98, 0.84, 0.89, 0.97, 0.91, 0.78, 0.92, 0.96, 0.81, 0.66, 0.85, 0.91, 0.74, 0.57, 0.82, 0.94, 0.67, 0.46, 0.3],
      audioToneType: 'aerophone_flute',
      bpm: 130,
      scaleOrRaga: 'Chenchurutti / Anandabhairavi Folk Blend',
      talaOrRhythm: 'Sindhu Chhand rhythmic bounce'
    },
    verses: [
      {
        id: 'kav-v1',
        timestamp: 0,
        originalScript: 'பழனி மலை மேல் இருக்கும் முருகா, உன் பாதம் பணிந்தோம் அருள்தாராய் கந்தா!',
        scriptName: 'Tamil',
        romanTransliteration: 'Pazhaṉi malai mēl irukkum Murukā, uṉ pātam paṇintōm aruḷtārāy Kantā!',
        englishTranslation: 'O Muruga residing atop the sacred hill of Palani! We bow before your holy feet; shower us with grace, O Skanda!',
        culturalNote: 'The melodic meter shifts rapidly between slow invocation and lightning-fast foot marching rhythm.'
      }
    ],
    relatedIds: ['villu-paatu-nellai', 'oyilattam-kongu'],
    featured: true
  },

  // 5. Tamil Nadu - Nondi Natakam
  {
    id: 'nondi-natakam-thanjavur',
    title: 'Nondi Natakam (Moral Ballad of Redemption)',
    vernacularTitle: 'நொண்டி நாடகம் (தஞ்சை நீதி நாட்டியக் கதை)',
    scriptLabel: 'Tamil Script',
    region: 'Tamil Nadu',
    state: 'Tamil Nadu',
    dialect: 'Thanjavur Tamil',
    languageFamily: 'Dravidian',
    category: 'Satirical Narrative',
    culturalZone: 'Thamirabarani & Coromandel Basin',
    practitionerAge: 89,
    livingPractitionerCount: 2,
    hasSuccessor: false,
    lastRecordedDaysAgo: 710,
    vulnerabilityStatus: 'critical',
    tags: ['Nondi Natakam', 'Thanjavur Tamil', 'Satire', 'Moral Ballad', 'Single Actor Theater'],
    tagMetadata: {
      theme: 'Satirical Morality & Social Redemption',
      instruments: ['mridangam', 'kanjira', 'talam'],
      mood: 'Reflective & Satirical'
    },
    summary: 'A rare single-actor oral ballad recounting the trials of a crippled protagonist seeking divine healing after moral transgressions. Rendered in sharp, satirical rhyming couplets.',
    historicalContext: 'Flourished in the 17th–18th centuries in the Kaveri Delta. The performer hops on one leg throughout the multi-hour performance using humorous verse to critique societal corruptions.',
    performerLineage: {
      leadPerformer: 'Nondi Vadivelu & Troupe',
      communityLineage: 'Thanjavur hereditary drama bards',
      guruParampara: 'Kumbakonam folk nataka parampara',
      generationCount: 7,
      region: 'Kaveri Delta',
      state: 'Tamil Nadu',
      district: 'Thanjavur',
      bio: 'Eighty-nine-year-old master who preserves the entire Nondi Natakam verse cycle in memory, capable of continuous 4-hour solo enactment.'
    },
    instruments: ['mridangam', 'kanjira', 'talam'],
    ritualContext: 'Performed in village temple mandapams and harvest night assemblies in Thanjavur and Tiruvarur.',
    motifs: ['Crippled Protagonist’s Confession', 'Critique of Feudal Hypocrisy', 'Divine Mercy of the Goddess', 'Restoration of Limbs and Honor'],
    unescoRecognition: 'Sangeet Natak Akademi Critically Endangered Record',
    audioTrack: {
      id: 'aud-nondi-05',
      title: 'Nondi Vilasam (The Lament of the Limping Thief)',
      durationSeconds: 250,
      sampleRateKhz: 48,
      recordingYear: 2021,
      fieldRecordist: 'Kaveri Delta Orality Archive',
      recordingLocation: 'Kumbakonam, Tamil Nadu',
      waveformPeaks: [0.25, 0.52, 0.78, 0.85, 0.8, 0.65, 0.78, 0.88, 0.72, 0.6, 0.8, 0.85, 0.9, 0.82, 0.68, 0.77, 0.84, 0.88, 0.75, 0.6, 0.72, 0.8, 0.65, 0.48, 0.7, 0.82, 0.56, 0.38, 0.22, 0.12],
      audioToneType: 'plucked_lute',
      bpm: 104,
      scaleOrRaga: 'Sahana / Nadanamakriya Folk Blend',
      talaOrRhythm: 'Khanda Chapu asymmetrical meter'
    },
    verses: [
      {
        id: 'non-v1',
        timestamp: 0,
        originalScript: 'ஒத்தக் காலில் நான் ஆடி வந்தேன், ஊரெல்லாம் செய்த தவறைச் சொல்லி அழுதேன்!',
        scriptName: 'Tamil',
        romanTransliteration: 'Ottak kālil nāṉ āṭi vantēṉ, ūrellām ceyta tavaṟaic colli azhutēṉ!',
        englishTranslation: 'On one leg I came dancing before you; weeping as I confessed the folly of my straying ways to the whole village!',
        culturalNote: 'The rhythm simulates the limping gait of the actor hopping rhythmically to the beats of the kanjira.'
      }
    ],
    relatedIds: ['villu-paatu-nellai', 'burrakatha-rayalaseema', 'sobane-pada-mysore'],
    featured: false
  },

  // 6. Tamil Nadu - Silambattam Chants
  {
    id: 'silambattam-kombu-chants',
    title: 'Silambattam Por-Pattu (Martial Staff Chants)',
    vernacularTitle: 'சிலம்பாட்டம் போர்ப் பாட்டு (போர்க் கலை வாய்மொழி மரபு)',
    scriptLabel: 'Tamil Script',
    region: 'Tamil Nadu',
    state: 'Tamil Nadu',
    dialect: 'Madurai Tamil',
    languageFamily: 'Dravidian',
    category: 'Dance & Martial Ballad',
    culturalZone: 'Thamirabarani & Coromandel Basin',
    practitionerAge: 59,
    livingPractitionerCount: 16,
    hasSuccessor: false,
    lastRecordedDaysAgo: 180,
    vulnerabilityStatus: 'vulnerable',
    tags: ['Silambam', 'Martial Chants', 'Parai & Kombu', 'Por-Pattu', 'Ancient Tamil Warfare'],
    tagMetadata: {
      theme: 'Ancient Martial Warfare & Footwork',
      instruments: ['parai', 'thappu', 'kombu horn'],
      mood: 'Fierce & Rhythmic'
    },
    summary: 'Oral cadence chants used to time weapon swings, staff duels, and combat stances in ancient Tamil martial art traditions. Passed strictly from Asan to student in rural Kalari arenas.',
    historicalContext: 'Dating back to the Sangam era, Por-Pattu verses encode weapon physics, pressure point targeting, and moral rules of engagement through rhythm.',
    performerLineage: {
      leadPerformer: 'Asan Karuppiah & Troupe',
      communityLineage: 'Madurai Silambam Asan lineage',
      guruParampara: 'Southern Silambam Akhada of Usilampatti',
      generationCount: 6,
      region: 'Madurai Region',
      state: 'Tamil Nadu',
      district: 'Madurai',
      bio: 'Master instructor whose chanting coordinates the blinding combat speed of four duelists spinning bamboo staves simultaneously.'
    },
    instruments: ['parai', 'thappu', 'kombu horn'],
    ritualContext: 'Sung during village martial exhibitions, temple Kodai protective dances, and harvest hero memorials.',
    motifs: ['The Unyielding Bamboo Staff', 'The Code of the Duel', 'Defense of the Village Gates', 'Ancestral Tiger Stances'],
    unescoRecognition: 'National Indigenous Sports Heritage Registry',
    audioTrack: {
      id: 'aud-silam-06',
      title: 'Kombu Isai & Por-Pattu Varisai',
      durationSeconds: 220,
      sampleRateKhz: 48,
      recordingYear: 2023,
      fieldRecordist: 'Tamil Nadu Martial Lore Mission',
      recordingLocation: 'Usilampatti, Tamil Nadu',
      waveformPeaks: [0.4, 0.78, 0.96, 0.92, 0.99, 0.85, 0.94, 0.98, 0.88, 0.72, 0.95, 0.99, 0.85, 0.9, 0.98, 0.93, 0.8, 0.94, 0.96, 0.83, 0.68, 0.88, 0.94, 0.78, 0.6, 0.85, 0.94, 0.68, 0.48, 0.3],
      audioToneType: 'percussive_chant',
      bpm: 138,
      scaleOrRaga: 'Martial Por-Tal Cadence',
      talaOrRhythm: 'Rapid driving 8-beat parai combat rhythm'
    },
    verses: [
      {
        id: 'sil-v1',
        timestamp: 0,
        originalScript: 'கொம்பின் முழக்கம் வானைத் தொட, சிலம்பின் கம்பு சுழன்று பாயுது பார்!',
        scriptName: 'Tamil',
        romanTransliteration: 'Kombin muzhakkam vāṉait toṭa, cilampiṉ kampu suzhaṉṟu pāyutu pār!',
        englishTranslation: 'As the blare of the brass Kombu horn pierces the sky, witness the bamboo staff whirling like lightning across the field!',
        culturalNote: 'The rhythm dictates the precise split-second foot step transitions (Kaal-adi Varisai).'
      }
    ],
    relatedIds: ['oyilattam-kongu', 'vadakkan-pattukal-kadathanad'],
    featured: false
  },

  // 7. Kerala - Theyyam Thottam
  {
    id: 'theyyam-thottam-malabar',
    title: 'Theyyam Thottam (Oracle Incantations)',
    vernacularTitle: 'തെയ്യം തോട്ടം പാട്ട് (വടക്കേ മലബാർ ദ്രാവിഡ സ്തോത്രം)',
    scriptLabel: 'Malayalam Script',
    region: 'Kerala',
    state: 'Kerala',
    dialect: 'North Malabar Malayalam',
    languageFamily: 'Dravidian',
    category: 'Temple & Ritual Chant',
    culturalZone: 'Malabar Coast & Western Ghats',
    practitionerAge: 72,
    livingPractitionerCount: 18,
    hasSuccessor: true,
    lastRecordedDaysAgo: 90,
    vulnerabilityStatus: 'thriving',
    tags: ['Theyyam', 'Thottam', 'Chenda & Edakka', 'North Malabar', 'Sacred Possession'],
    tagMetadata: {
      theme: 'Divine Possession & Ancestral Wrath',
      instruments: ['chenda', 'edakka', 'thudi', 'kuzhal'],
      mood: 'Incantatory & Powerful'
    },
    summary: 'Hypnotic ritual invocations sung before the physical transformation of the performer into a living deity (Theyyam), recounting the apotheosis of folk martyrs and serpent spirits.',
    historicalContext: 'Rooted in pre-Aryan Dravidian animism in North Malabar sacred groves (Kavus). The Thottam is the oral liturgical spine that prepares the dancer for the trance state.',
    performerLineage: {
      leadPerformer: 'Peruvannan Narayanan & Troupe',
      communityLineage: 'Hereditary Vannan & Malayan Theyyam bards',
      guruParampara: 'Kannur-Kasaragod Vannan Gurukulam',
      generationCount: 9,
      region: 'North Malabar',
      state: 'Kerala',
      district: 'Kannur',
      bio: 'Master Theyyam artist who has performed over 40 distinct deity forms and knows thousands of Thottam poetic stanzas by heart.'
    },
    instruments: ['chenda', 'edakka', 'thudi', 'kuzhal', 'elathalam'],
    ritualContext: 'Sung during night-long Theyyam ceremonies in sacred ancestral Kavus across Kannur and Kasaragod.',
    motifs: ['Muthappan Ancestral Compassion', 'Muchilot Bhagavathi Fire Walk', 'Defiance of Feudal Injustice', 'The Sacred Tiger Guardian'],
    unescoRecognition: 'Recognized as one of the world’s oldest living ritual theater traditions by UNESCO',
    audioTrack: {
      id: 'aud-theyyam-07',
      title: 'Muthappan Thottam & Chenda Melam',
      durationSeconds: 310,
      sampleRateKhz: 48,
      recordingYear: 2023,
      fieldRecordist: 'Kerala Folklore Academy',
      recordingLocation: 'Parassini Kadavu, Kerala',
      waveformPeaks: [0.35, 0.75, 0.99, 0.95, 0.99, 0.88, 0.96, 0.98, 0.9, 0.78, 0.96, 0.99, 0.88, 0.92, 0.99, 0.94, 0.82, 0.95, 0.98, 0.86, 0.72, 0.9, 0.96, 0.82, 0.65, 0.88, 0.96, 0.72, 0.52, 0.35],
      audioToneType: 'percussive_chant',
      bpm: 136,
      scaleOrRaga: 'Indigenous Malabar Thottam Sur',
      talaOrRhythm: 'Chenda Chembada 8-beat driving pulse'
    },
    verses: [
      {
        id: 'thy-v1',
        timestamp: 0,
        originalScript: 'മുത്തപ്പൻ തിരുമുടിയേന്തി വരുന്നു, കാനനവാസൻ കാരുണ്യം ചൊരിയുന്നു!',
        scriptName: 'Malayalam',
        romanTransliteration: 'Muttappan thirumuṭiyēnti varunnu, kānaṉavāsaṉ kāruṇyaṁ coriyunnu!',
        englishTranslation: 'Lord Muthappan arrives wearing the celestial crown; the forest-dweller showers boundless compassion upon all living beings!',
        culturalNote: 'The massive headdress (Mudi) of the Theyyam rises up to 30 feet, illuminated solely by coconut-oil torches.'
      }
    ],
    relatedIds: ['kaniyan-koothu-tirunelveli', 'vadakkan-pattukal-kadathanad'],
    featured: true
  },

  // 8. Kerala - Vadakkan Pattukal
  {
    id: 'vadakkan-pattukal-kadathanad',
    title: 'Vadakkan Pattukal (Northern Valor Ballads)',
    vernacularTitle: 'വടക്കൻ പാട്ടുകൾ (കടത്തനാടൻ വീരഗാഥ)',
    scriptLabel: 'Malayalam Script',
    region: 'Kerala',
    state: 'Kerala',
    dialect: 'Malabar Malayalam',
    languageFamily: 'Dravidian',
    category: 'Heroic Ballad',
    culturalZone: 'Malabar Coast & Western Ghats',
    practitionerAge: 81,
    livingPractitionerCount: 5,
    hasSuccessor: false,
    lastRecordedDaysAgo: 540,
    vulnerabilityStatus: 'critical',
    tags: ['Vadakkan Pattukal', 'Chekavar Warriors', 'Chenda', 'Kalarippayattu', 'Kadathanad'],
    tagMetadata: {
      theme: 'Chivalry, Betrayal & Kalarippayattu',
      instruments: ['chenda', 'elathalam', 'veena'],
      mood: 'Valiant & Melancholic'
    },
    summary: 'Centuries-old heroic ballads chronicling the legendary duels, chivalric codes, and tragic betrayals of Aromal Chekavar, Thacholi Othenan, and Unniyarcha in medieval Kadathanad.',
    historicalContext: 'Preserved orally by wandering village bards across North Malabar without written manuscripts, sung in rhythmically complex metric stanzas.',
    performerLineage: {
      leadPerformer: 'Moothiran Gurukkal & Chindu Panicker',
      communityLineage: 'Chekavar martial bardic clan of Kadathanad',
      guruParampara: 'Puthuram family oral lineage',
      generationCount: 7,
      region: 'Kadathanad',
      state: 'Kerala',
      district: 'Kozhikode',
      bio: 'Eighty-one-year-old bard who preserves the 12,000-line complete Aromal Chekavar death ballad cycle.'
    },
    instruments: ['chenda', 'elathalam', 'veena'],
    ritualContext: 'Sung during post-harvest gatherings, Kalari martial inaugurations, and temple grounds in northern Kerala.',
    motifs: ['The Fatal Ankam Arena', 'The Traitorous Chathiyan Chanthu', 'Unniyarcha’s Fearless Resistance', 'Honor Over Life'],
    unescoRecognition: 'Sangeet Natak Akademi National Intangible Heritage Registry',
    audioTrack: {
      id: 'aud-vadakkan-08',
      title: 'Aromal Chekavar Ankam Pattu',
      durationSeconds: 280,
      sampleRateKhz: 48,
      recordingYear: 2022,
      fieldRecordist: 'Kerala Folklore Mission',
      recordingLocation: 'Vadakara, Kerala',
      waveformPeaks: [0.3, 0.65, 0.9, 0.95, 0.99, 0.85, 0.92, 0.97, 0.89, 0.74, 0.96, 0.99, 0.85, 0.9, 0.98, 0.93, 0.8, 0.94, 0.96, 0.83, 0.68, 0.88, 0.94, 0.78, 0.6, 0.85, 0.94, 0.68, 0.48, 0.3],
      audioToneType: 'bowed_string',
      bpm: 112,
      scaleOrRaga: 'Natta Folk / Dheera Sankarabharanam Mode',
      talaOrRhythm: 'Ankam Chenda martial cadence'
    },
    verses: [
      {
        id: 'vad-v1',
        timestamp: 0,
        originalScript: 'അങ്കത്തട്ടിൽ കയറി ആരോമൽ ചേകവർ, കടത്തനാടിൻ മാനം കാക്കാൻ വാളോങ്ങി!',
        scriptName: 'Malayalam',
        romanTransliteration: 'Aṅkathaṭṭil kayaṟi Ārōmal Cēkavar, Kaṭattanāṭiṉ mānaṁ kākkāṉ vāḷōṅṅi!',
        englishTranslation: 'Aromal Chekavar stepped into the duel arena; raising his broadsword to defend the honor of Kadathanad!',
        culturalNote: 'Aromal’s sword broke due to poisoned wooden pegs inserted secretly by the traitor Chanthu.'
      }
    ],
    relatedIds: ['silambattam-kombu-chants', 'theyyam-thottam-malabar'],
    featured: true
  },

  // 9. Kerala - Sopana Sangeetham
  {
    id: 'sopana-sangeetham-temple',
    title: 'Sopana Sangeetham (Altar Chants of Ashtapadi)',
    vernacularTitle: 'സോപാന സംഗീതം (ഇടയ്ക്ക സംഗീത ധ്വനി)',
    scriptLabel: 'Malayalam Script',
    region: 'Kerala',
    state: 'Kerala',
    dialect: 'Travancore Malayalam',
    languageFamily: 'Dravidian',
    category: 'Temple & Ritual Chant',
    culturalZone: 'Malabar Coast & Western Ghats',
    practitionerAge: 66,
    livingPractitionerCount: 22,
    hasSuccessor: true,
    lastRecordedDaysAgo: 130,
    vulnerabilityStatus: 'thriving',
    tags: ['Sopana Sangeetham', 'Edakka Drum', 'Temple Sanctum', 'Ashtapadi', 'Microtonal Singing'],
    tagMetadata: {
      theme: 'Temple Sanctum Praise & Microtonal Flow',
      instruments: ['edakka', 'chengila', 'maram'],
      mood: 'Serene & Transcendent'
    },
    summary: 'A sublime devotional singing style rendered at the sacred flight of steps (Sopanam) of Kerala temples to the microtonal beats of the hourglass-shaped Edakka drum.',
    historicalContext: 'Practiced by hereditary Marar and Poduval communities. Characterized by continuous microtonal glides (Gamakas) and plain-note sustained resonance.',
    performerLineage: {
      leadPerformer: 'Ambalapuzha Vijayan Marar',
      communityLineage: 'Hereditary Temple Marar musicians',
      guruParampara: 'Ambalapuzha Sopana Parampara',
      generationCount: 6,
      region: 'Central Travancore',
      state: 'Kerala',
      district: 'Alappuzha',
      bio: 'Virtuoso Edakka player and vocalist who conducts daily Sopana singing at the sanctum steps.'
    },
    instruments: ['edakka', 'chengila', 'maram'],
    ritualContext: 'Sung during daily temple sanctum openings (Nirmalyam) and evening deeparadhana rites.',
    motifs: ['The Sacred Temple Steps (Sopanam)', 'Gita Govinda Ashtapadi', 'The Microtonal Glides of the Edakka', 'Divine Surrender'],
    unescoRecognition: 'Sangeet Natak Akademi Living Master Record',
    audioTrack: {
      id: 'aud-sopana-09',
      title: 'Chandanacharchitha Ashtapadi on Edakka',
      durationSeconds: 290,
      sampleRateKhz: 48,
      recordingYear: 2023,
      fieldRecordist: 'Travancore Sacred Music Archive',
      recordingLocation: 'Ambalapuzha, Kerala',
      waveformPeaks: [0.2, 0.45, 0.65, 0.78, 0.85, 0.89, 0.67, 0.74, 0.82, 0.6, 0.77, 0.85, 0.9, 0.81, 0.68, 0.79, 0.86, 0.92, 0.77, 0.63, 0.75, 0.8, 0.65, 0.48, 0.7, 0.83, 0.58, 0.38, 0.25, 0.12],
      audioToneType: 'percussive_chant',
      bpm: 86,
      scaleOrRaga: 'Puraneeru / Desakshi Temple Mode',
      talaOrRhythm: 'Chengila slow 4-beat meditative swing'
    },
    verses: [
      {
        id: 'sop-v1',
        timestamp: 0,
        originalScript: 'ചന്ദന ചർച്ചിത നീല കളേബരം, പീത വസനം വനമാലി!',
        scriptName: 'Malayalam',
        romanTransliteration: 'Chandana charcchita neela kaḷēbaraṁ, peetha vasanam vanamālī!',
        englishTranslation: 'Anointed in fragrant sandalwood upon dark celestial form, adorned in golden silken robes strides the Lord of the Forest!',
        culturalNote: 'The Edakka’s pitch is altered dynamically during play by squeezing the central cloth webbing.'
      }
    ],
    relatedIds: ['pulluvan-pattu-serpent', 'theyyam-thottam-malabar'],
    featured: false
  },

  // 10. Kerala - Pulluvan Pattu
  {
    id: 'pulluvan-pattu-serpent',
    title: 'Pulluvan Pattu (Serpent Propitiation Chants)',
    vernacularTitle: 'പുള്ളുവൻ പാട്ട് (സർപ്പക്കാവ് പൂജാ കീർത്തനം)',
    scriptLabel: 'Malayalam Script',
    region: 'Kerala',
    state: 'Kerala',
    dialect: 'Palakkad Malayalam',
    languageFamily: 'Dravidian',
    category: 'Temple & Ritual Chant',
    culturalZone: 'Malabar Coast & Western Ghats',
    practitionerAge: 84,
    livingPractitionerCount: 4,
    hasSuccessor: false,
    lastRecordedDaysAgo: 620,
    vulnerabilityStatus: 'critical',
    tags: ['Pulluvan Pattu', 'Pulluvan Veena', 'Pulluvan Kudam', 'Sarpa Kavu', 'Sacred Groves'],
    tagMetadata: {
      theme: 'Naga Serpent Lore & Sacred Groves',
      instruments: ['pulluvan veena (one-string fiddle)', 'pulluvan kudam (earthen pot)', 'elathalam'],
      mood: 'Hypnotic & Mystical'
    },
    summary: 'Esoteric ritual chants sung by Pulluva bards to propitiate serpent deities in ancestral sacred groves (Sarpa Kavu), accompanied by the plucked earthen pot and one-stringed fiddle.',
    historicalContext: 'Preserved by the Pulluvar community across millennia. The performance accompanies the drawing of intricate multi-colored floor mandalas (Kalam) made of natural herbal powders.',
    performerLineage: {
      leadPerformer: 'Pulluvan Raman & Lakshmi Pulluvathi',
      communityLineage: 'Hereditary Pulluva serpent-priest clan',
      guruParampara: 'Mannarasala-Palakkad Sarpa Kavu tradition',
      generationCount: 8,
      region: 'Palakkad',
      state: 'Kerala',
      district: 'Palakkad',
      bio: 'Eighty-four-year-old bard couple who possess the sole surviving knowledge of the 24 sacred Sarpa Thullal chant meters.'
    },
    instruments: ['pulluvan veena (one-string fiddle)', 'pulluvan kudam (earthen pot)', 'elathalam'],
    ritualContext: 'Chanted inside sacred serpent groves (Sarpa Kavu) during Ayilyam constellation days.',
    motifs: ['The Cosmic Serpent Ananta', 'The Sacred Herbal Kalam Mandala', 'Protection of the Forest Grove', 'Virgin Trance Dance'],
    unescoRecognition: 'Endangered Languages and Oralities Archive (ELAR)',
    audioTrack: {
      id: 'aud-pulluvan-10',
      title: 'Sarpa Kavu Kalam Pattu',
      durationSeconds: 270,
      sampleRateKhz: 48,
      recordingYear: 2021,
      fieldRecordist: 'Kerala Sacred Groves Documentation Unit',
      recordingLocation: 'Mannarasala, Kerala',
      waveformPeaks: [0.18, 0.38, 0.65, 0.78, 0.85, 0.89, 0.67, 0.74, 0.82, 0.6, 0.77, 0.85, 0.9, 0.81, 0.68, 0.79, 0.86, 0.92, 0.77, 0.63, 0.75, 0.8, 0.65, 0.48, 0.7, 0.83, 0.58, 0.38, 0.25, 0.12],
      audioToneType: 'bowed_string',
      bpm: 92,
      scaleOrRaga: 'Indigenous Pulluvan Hexatonic Mode',
      talaOrRhythm: 'Kudam plucked syncopated resonance'
    },
    verses: [
      {
        id: 'pul-v1',
        timestamp: 0,
        originalScript: 'നാഗരാജാവേ സർപ്പദൈവമേ, കാവുകൾ കാക്കും കണ്മണിയെ!',
        scriptName: 'Malayalam',
        romanTransliteration: 'Nāgarājāvē sarppadaivamē, kāvukaḷ kākkum kaṇmaṇiyē!',
        englishTranslation: 'O King of Serpents, divine Naga deity! Precious jewel who shields the green sacred forest groves from all harm!',
        culturalNote: 'The Pulluvan Kudam is a baked earthen resonator strung with a leather thong, plucked with a wooden plectrum.'
      }
    ],
    relatedIds: ['kaniyan-koothu-tirunelveli', 'sopana-sangeetham-temple', 'sobane-pada-mysore'],
    featured: true
  },

  // 11. Karnataka - Tenkutittu Yakshagana
  {
    id: 'yakshagana-prasanga-tenku',
    title: 'Tenkutittu Yakshagana Oral Prasangas',
    vernacularTitle: 'ತೆಂಕುತಿಟ್ಟು ಯಕ್ಷಗಾನ ಪ್ರಸಂಗ (ಕರಾವಳಿ ವೀರ ಮಹಾಕಾವ್ಯ)',
    scriptLabel: 'Kannada Script',
    region: 'Karnataka',
    state: 'Karnataka',
    dialect: 'Coastal Tulu-Kannada',
    languageFamily: 'Dravidian',
    category: 'Heroic Ballad',
    culturalZone: 'Coastal Canara & Deccan Plateau',
    practitionerAge: 60,
    livingPractitionerCount: 38,
    hasSuccessor: true,
    lastRecordedDaysAgo: 45,
    vulnerabilityStatus: 'thriving',
    tags: ['Yakshagana', 'Chande & Maddale', 'Tenkutittu', 'Tulu-Kannada', 'Theatrical Epics'],
    tagMetadata: {
      theme: 'Mythological Battles & Earthy Discourse',
      instruments: ['chande', 'maddale', 'tala (bells)'],
      mood: 'Majestic & Dramatic'
    },
    summary: 'Improvised verse recitations and high-pitched choral duels driving coastal Karnataka’s night-long theatrical epics, performed based on memorized poetic Prasanga stanzas.',
    historicalContext: 'Originating over 500 years ago along the Arabian Sea coast of Karnataka. The Bhagavata (lead singer) controls the narrative tempo while actors engage in spontaneous philosophical dialogues.',
    performerLineage: {
      leadPerformer: 'Bhagavatha Shankaranarayana & Troupe',
      communityLineage: 'Hereditary Yakshagana Bhagavatha lineage of Dharmasthala',
      guruParampara: 'Tenkutittu Mela Parampara',
      generationCount: 6,
      region: 'Dakshina Kannada',
      state: 'Karnataka',
      district: 'Udupi',
      bio: 'Master Bhagavata who commands over 80 complete Prasanga cycles and leads all-night open-air performances.'
    },
    instruments: ['chande', 'maddale', 'tala (bells)'],
    ritualContext: 'Performed from dusk to dawn in village paddy fields during the dry winter and spring festival seasons.',
    motifs: ['Bhima’s Agrarian Valor', 'Karna’s Moral Dilemma', 'The Thunder of the Chande Drum', 'Triumph of Cosmic Truth'],
    unescoRecognition: 'Sangeet Natak Akademi National Intangible Masterpiece',
    audioTrack: {
      id: 'aud-yaksha-11',
      title: 'Karna Parva Prasanga & Chande Melam',
      durationSeconds: 300,
      sampleRateKhz: 48,
      recordingYear: 2023,
      fieldRecordist: 'Karnataka Yakshagana Academy',
      recordingLocation: 'Udupi, Karnataka',
      waveformPeaks: [0.35, 0.72, 0.98, 0.94, 0.99, 0.85, 0.94, 0.98, 0.88, 0.75, 0.95, 0.99, 0.86, 0.91, 0.98, 0.93, 0.8, 0.94, 0.96, 0.83, 0.68, 0.88, 0.94, 0.78, 0.6, 0.85, 0.94, 0.68, 0.48, 0.3],
      audioToneType: 'percussive_chant',
      bpm: 140,
      scaleOrRaga: 'Bhairavi / Nattai Yakshagana Mode',
      talaOrRhythm: 'Chande high-tension explosive martial rolls'
    },
    verses: [
      {
        id: 'yak-v1',
        timestamp: 0,
        originalScript: 'ಚಂಡೆಯ ನಾದಕೆ ದಿಕ್ಕುಗಳು ನಡುಗಿದವು, ವೀರ ಕರ್ಣ ರಣರಂಗಕೆ ಧುಮುಕಿದನು!',
        scriptName: 'Kannada',
        romanTransliteration: 'Chaṇḍeya nādake dikkugaḷu naḍugidavu, vīra Karṇa raṇaraṅgake dhumukidanu!',
        englishTranslation: 'At the thunderous roar of the Chande drum, the eight directions trembled as heroic Karna charged onto the battlefield!',
        culturalNote: 'The Chande’s shrill, piercing timbre cuts through the night air across miles of rural coastal hamlets.'
      }
    ],
    relatedIds: ['dollu-kunitha-kuruba', 'burrakatha-rayalaseema'],
    featured: true
  },

  // 12. Karnataka - Dollu Kunitha
  {
    id: 'dollu-kunitha-kuruba',
    title: 'Dollu Kunitha Ballads of Beereshwara',
    vernacularTitle: 'ಡೊಳ್ಳು ಕುಣಿತ (ಕುರುಬ ಗೌಡರ ಬೀರೇಶ್ವರ ಗೀತೆ)',
    scriptLabel: 'Kannada Script',
    region: 'Karnataka',
    state: 'Karnataka',
    dialect: 'North Karnataka Kannada',
    languageFamily: 'Dravidian',
    category: 'Dance & Martial Ballad',
    culturalZone: 'Coastal Canara & Deccan Plateau',
    practitionerAge: 64,
    livingPractitionerCount: 30,
    hasSuccessor: true,
    lastRecordedDaysAgo: 150,
    vulnerabilityStatus: 'thriving',
    tags: ['Dollu Kunitha', 'Kuruba Pastoral Lore', 'Dollu Drum', 'North Karnataka', 'Shiva Worship'],
    tagMetadata: {
      theme: 'Kuruba Pastoral Lore & Shiva Worship',
      instruments: ['dollu (large barrel drum)', 'tala', 'kahale (brass horn)'],
      mood: 'Exuberant & Thunderous'
    },
    summary: 'Thunderous drum-dance ballads of the Kuruba shepherd community recounting the mythological birth and miracles of Lord Beereshwara, sung while executing acrobatic step formations.',
    historicalContext: 'Preserved by the Kuruba pastoralists of northern Karnataka. Dancers hang heavy drums from their necks, beating them in dizzying syncopations while singing oral lore.',
    performerLineage: {
      leadPerformer: 'Gowda Somalingappa & Troupe',
      communityLineage: 'Hereditary Kuruba pastoral singers',
      guruParampara: 'Chitradurga-Shimoga Dollu Gurukulam',
      generationCount: 6,
      region: 'North Karnataka',
      state: 'Karnataka',
      district: 'Chitradurga',
      bio: 'Master drummer capable of performing high-jump rotations while sustaining high-cadence singing.'
    },
    instruments: ['dollu (large barrel drum)', 'tala', 'kahale (brass horn)'],
    ritualContext: 'Performed during annual Beereshwara Jathre fairs, harvest celebrations, and Shiva temple festivals.',
    motifs: ['Lord Beereshwara’s Pastoral Miracles', 'The Golden Wool of the Flock', 'The Thunder of the Sacred Drum', 'Community Solidarity'],
    unescoRecognition: 'Karnataka Janapada Academy Masterpiece Archive',
    audioTrack: {
      id: 'aud-dollu-12',
      title: 'Beereshwara Mahatme Dollu Pata',
      durationSeconds: 260,
      sampleRateKhz: 48,
      recordingYear: 2023,
      fieldRecordist: 'Karnataka Folk Lore Trust',
      recordingLocation: 'Chitradurga, Karnataka',
      waveformPeaks: [0.38, 0.75, 0.98, 0.94, 0.99, 0.88, 0.96, 0.98, 0.88, 0.75, 0.95, 0.99, 0.86, 0.91, 0.98, 0.93, 0.8, 0.94, 0.96, 0.83, 0.68, 0.88, 0.94, 0.78, 0.6, 0.85, 0.94, 0.68, 0.48, 0.3],
      audioToneType: 'percussive_chant',
      bpm: 132,
      scaleOrRaga: 'Indigenous Kuruba Pentatonic Mode',
      talaOrRhythm: 'Dollu 8-count heavy barrel syncopation'
    },
    verses: [
      {
        id: 'dol-v1',
        timestamp: 0,
        originalScript: 'ಡೊಳ್ಳಿನ ಗತ್ತು ಗುಡುಗಿನ ಹಂಗೆ, ಬೀರೇಶ್ವರನ ಕರುಣೆ ಮಳೆಯ ಹಂಗೆ!',
        scriptName: 'Kannada',
        romanTransliteration: 'Ḍoḷḷina gattu guḍugina haṅge, Bīrēshvarana karuṇe maḷeya haṅge!',
        englishTranslation: 'The cadence of the Dollu drum resounds like monsoon thunder; the grace of Lord Beereshwara showers upon us like fertile rain!',
        culturalNote: 'The sheep-skin drumhead is tuned with wooden wedges to produce deep, earth-trembling bass frequencies.'
      }
    ],
    relatedIds: ['yakshagana-prasanga-tenku', 'oggu-katha-telangana'],
    featured: false
  },

  // 13. Karnataka - Sobane Pada
  {
    id: 'sobane-pada-mysore',
    title: 'Sobane Pada (Matriarchal Life-Cycle Chants)',
    vernacularTitle: 'ಸೋಬಾನೆ ಪದ (ಹಳೆ ಮೈಸೂರು ಮಹಿಳಾ ಮೌಖಿಕ ಕಾವ್ಯ)',
    scriptLabel: 'Kannada Script',
    region: 'Karnataka',
    state: 'Karnataka',
    dialect: 'Old Mysore Kannada',
    languageFamily: 'Dravidian',
    category: 'Matriarchal Life-Cycle Song',
    culturalZone: 'Coastal Canara & Deccan Plateau',
    practitionerAge: 91,
    livingPractitionerCount: 1,
    hasSuccessor: false,
    lastRecordedDaysAgo: 720,
    vulnerabilityStatus: 'critical',
    tags: ['Sobane Pada', 'Old Mysore Kannada', 'Matriarchal Lore', 'Life-Cycle Chants', 'Critically Endangered'],
    tagMetadata: {
      theme: 'Female Oral Histories & Wedding Lore',
      instruments: ['shruti box', 'taala'],
      mood: 'Tender & Ancient'
    },
    summary: 'Ancient auspicious wedding and life-cycle ballads preserved in the memory of elder village matriarchs, recounting bridal blessings, female solidarity, and social wisdom across generations.',
    historicalContext: 'Chanted purely by elder women without instrumental accompaniment or written manuscripts during pre-wedding turmeric smearing rites.',
    performerLineage: {
      leadPerformer: 'Ajji Honnamma (Elder Matriarch)',
      communityLineage: 'Hereditary rural matriarchal oral custodian',
      guruParampara: 'Passed mother-to-daughter in Mandya district',
      generationCount: 8,
      region: 'Old Mysore Basin',
      state: 'Karnataka',
      district: 'Mandya',
      bio: 'Ninety-one-year-old sole living custodian who remembers thousands of archaic verses detailing rural women’s oral histories.'
    },
    instruments: ['shruti box', 'taala'],
    ritualContext: 'Chanted in the inner courtyards of rural village homes during wedding rituals and maternity blessings.',
    motifs: ['The Turmeric Blessing of the Bride', 'Mother’s Counsel Across Eras', 'The River Cauvery as Life-Giver', 'Female Lineage Resilience'],
    unescoRecognition: 'Endangered Languages & Oralities Priority Archive',
    audioTrack: {
      id: 'aud-sobane-13',
      title: 'Sobane Hennina Hadu (Auspicious Bridal Chants)',
      durationSeconds: 220,
      sampleRateKhz: 48,
      recordingYear: 2021,
      fieldRecordist: 'Mysore Oral History Mission',
      recordingLocation: 'Mandya, Karnataka',
      waveformPeaks: [0.15, 0.32, 0.52, 0.65, 0.72, 0.75, 0.58, 0.64, 0.7, 0.52, 0.68, 0.74, 0.78, 0.71, 0.58, 0.69, 0.75, 0.8, 0.66, 0.51, 0.63, 0.69, 0.54, 0.38, 0.58, 0.7, 0.48, 0.3, 0.18, 0.08],
      audioToneType: 'vocal_polyphony',
      bpm: 76,
      scaleOrRaga: 'Archaic Kannada Folk Drone Mode',
      talaOrRhythm: 'Slow 3-beat matriarchal lullaby meter'
    },
    verses: [
      {
        id: 'sob-v1',
        timestamp: 0,
        originalScript: 'ಸೋಬಾನೆ ಎಂದೆನೆ ಸುಖದ ಮಳೆಯೇ ಸುರಿದೀತು, ಹೆಣ್ಣಿನ ಬಾಳಿಗೆ ದೈವದ ಆಸರೆ ಸಿಕ್ಕೀತು!',
        scriptName: 'Kannada',
        romanTransliteration: 'Sōbāne endene sukhada maḷeyē suridītu, heṇṇina bāḷige daivada āsare sikkītu!',
        englishTranslation: 'As we chant the sacred Sobane, may showers of prosperity descend; may divine grace illuminate every step of the daughter’s journey!',
        culturalNote: 'The singing begins in a low vocal register, gradually joined by co-elders in layered polyphony.'
      }
    ],
    relatedIds: ['nondi-natakam-thanjavur', 'pulluvan-pattu-serpent'],
    featured: false
  },

  // 14. Andhra Pradesh - Burrakatha
  {
    id: 'burrakatha-rayalaseema',
    title: 'Burrakatha (Three-Bard Heroic Ballad)',
    vernacularTitle: 'బుర్రకథ (రాయలసీమ వీరగాథ)',
    scriptLabel: 'Telugu Script',
    region: 'Andhra Pradesh',
    state: 'Andhra Pradesh',
    dialect: 'Rayalaseema Telugu',
    languageFamily: 'Dravidian',
    category: 'Heroic Ballad',
    culturalZone: 'Krishna-Godavari Riverine Plains',
    practitionerAge: 62,
    livingPractitionerCount: 14,
    hasSuccessor: false,
    lastRecordedDaysAgo: 210,
    vulnerabilityStatus: 'vulnerable',
    tags: ['Burrakatha', 'Rayalaseema Telugu', 'Tambura & Gummeta', 'Heroic Ballad', 'Social Satire'],
    tagMetadata: {
      theme: 'Historical Revolts & Chivalric Lore',
      instruments: ['tambura', 'andelu (brass ring cymbals)', 'gummeta (clay baked drum)'],
      mood: 'Dramatic & Satirical'
    },
    summary: 'A dynamic oral storytelling trio consisting of the main Kathakudu (teller) and two side-commentators who blend heroic folklore with sharp social commentary.',
    historicalContext: 'Evolved in the Telugu countryside as a powerful medium for spreading awareness of peasant rebellions, chivalric epics of Palnadu, and Bobbili battles.',
    performerLineage: {
      leadPerformer: 'Burrakatha Venkateswarlu Troupe',
      communityLineage: 'Hereditary Jangam & Telugu bardic guild',
      guruParampara: 'Kurnool-Anantapur Burrakatha lineage',
      generationCount: 6,
      region: 'Rayalaseema',
      state: 'Andhra Pradesh',
      district: 'Kurnool',
      bio: 'Master teller with 40 years of experience playing the Gummeta clay drum while dancing and singing multi-hour epics.'
    },
    instruments: ['tambura', 'andelu (brass ring cymbals)', 'gummeta (clay baked drum)'],
    ritualContext: 'Performed at village squares, harvest melas, and civic assemblies across Andhra Pradesh.',
    motifs: ['The Battle of Palnadu', 'Alluri Sitarama Raju Revolt', 'The Witty Voice of the Peasant', 'Chivalric Sacrifice'],
    unescoRecognition: 'Andhra Pradesh Folk Arts Academy Documentation Record',
    audioTrack: {
      id: 'aud-burra-14',
      title: 'Palnati Yuddham Burrakatha',
      durationSeconds: 275,
      sampleRateKhz: 48,
      recordingYear: 2023,
      fieldRecordist: 'Telugu Orality Preservation Project',
      recordingLocation: 'Kurnool, Andhra Pradesh',
      waveformPeaks: [0.35, 0.7, 0.95, 0.9, 0.98, 0.78, 0.89, 0.94, 0.82, 0.68, 0.92, 0.98, 0.84, 0.88, 0.97, 0.9, 0.76, 0.91, 0.95, 0.79, 0.65, 0.84, 0.9, 0.73, 0.55, 0.8, 0.92, 0.65, 0.45, 0.3],
      audioToneType: 'plucked_lute',
      bpm: 124,
      scaleOrRaga: 'Telugu Desi / Bilahari Folk Mode',
      talaOrRhythm: 'Gummeta rhythmic baked clay pulse'
    },
    verses: [
      {
        id: 'bur-v1',
        timestamp: 0,
        originalScript: 'తంబుర మీటి కథ మొదలెట్టే, వీరుల గాథ వినరండి బాబూ!',
        scriptName: 'Telugu',
        romanTransliteration: 'Tambura mīṭi katha modaleṭṭē, vīrula gātha vinaraṇḍi bābū!',
        englishTranslation: 'Strumming the Tambura we begin our tale; gather round O folks to hear the epic of fearless warriors!',
        culturalNote: 'The two side-bards punctuate the narration with witty banter: ‘Aha! Oho!’ while striking the brass finger rings.'
      }
    ],
    relatedIds: ['oggu-katha-telangana', 'villu-paatu-nellai'],
    featured: false
  },

  // 15. Telangana - Oggu Katha
  {
    id: 'oggu-katha-telangana',
    title: 'Oggu Katha (Kuruma Pastoral Ballads)',
    vernacularTitle: 'ఒగ్గు కథ (తెలంగాణ మల్లన్న చరితం)',
    scriptLabel: 'Telugu Script',
    region: 'Telangana',
    state: 'Telangana',
    dialect: 'Warangal / Telangana Folk Telugu',
    languageFamily: 'Dravidian',
    category: 'Pastoral & Agro Lore',
    culturalZone: 'Krishna-Godavari Riverine Plains',
    practitionerAge: 79,
    livingPractitionerCount: 7,
    hasSuccessor: false,
    lastRecordedDaysAgo: 510,
    vulnerabilityStatus: 'critical',
    tags: ['Oggu Katha', 'Mallanna Lore', 'Jaggu Drum', 'Telangana', 'Kuruma Pastoralists'],
    tagMetadata: {
      theme: 'Pastoral Deities & Sheep Herder Migration',
      instruments: ['jaggu (brass hour-glass drum)', 'tala', 'oggu damarukam'],
      mood: 'Spirited & Rhythmic'
    },
    summary: 'The hereditary oral epics of the Kuruma and Golla pastoral communities, recounting the cosmic marriage and miracles of Lord Mallanna to the thunder of the Jaggu brass drum.',
    historicalContext: 'Transmitted strictly within Kuruma bardic lineages. The tellers smear sacred turmeric across their foreheads and wield the brass Jaggu drum during marathon all-night recitations.',
    performerLineage: {
      leadPerformer: 'Oggu Chukka Sattaiah Troupe & Mallayya',
      communityLineage: 'Hereditary Kuruma Oggu Pujari clan',
      guruParampara: 'Komuravelli Mallanna oral school',
      generationCount: 8,
      region: 'Telangana Plateau',
      state: 'Telangana',
      district: 'Warangal',
      bio: 'Seventy-nine-year-old Oggu master whose soaring vocals and Jaggu drumming command the complete Mallanna Charitam.'
    },
    instruments: ['jaggu (brass hour-glass drum)', 'tala', 'oggu damarukam'],
    ritualContext: 'Sung during the annual Komuravelli Mallanna Jathra and sheep herding pastoral blessing rites.',
    motifs: ['Lord Mallanna’s Golden Flock', 'Goddess Medalamma’s Valor', 'The Sacred Turmeric Blessing', 'Pastoral Co-existence with Wilderness'],
    unescoRecognition: 'Sangeet Natak Akademi National Masterpiece Registry',
    audioTrack: {
      id: 'aud-oggu-15',
      title: 'Komuravelli Mallanna Kalyanam',
      durationSeconds: 290,
      sampleRateKhz: 48,
      recordingYear: 2022,
      fieldRecordist: 'Telangana Folk Arts Trust',
      recordingLocation: 'Warangal, Telangana',
      waveformPeaks: [0.35, 0.74, 0.98, 0.92, 0.99, 0.85, 0.94, 0.98, 0.88, 0.74, 0.95, 0.99, 0.86, 0.9, 0.98, 0.92, 0.78, 0.93, 0.96, 0.82, 0.67, 0.86, 0.93, 0.76, 0.58, 0.83, 0.94, 0.68, 0.48, 0.32],
      audioToneType: 'percussive_chant',
      bpm: 134,
      scaleOrRaga: 'Indigenous Telangana Oggu Folk Cadence',
      talaOrRhythm: 'Jaggu 7-count driving pastoral meter'
    },
    verses: [
      {
        id: 'ogg-v1',
        timestamp: 0,
        originalScript: 'జగ్గు మోగెను జయజయ రవమై, కొమురవెల్లి మల్లన్న దయతో కాపాడెను!',
        scriptName: 'Telugu',
        romanTransliteration: 'Jaggu mōgenu jayajaya ravamai, Komuravelli Mallanna dayatō kāpāḍenu!',
        englishTranslation: 'The brass Jaggu drum thunders with cries of victory; Lord Komuravelli Mallanna shields our shepherd flocks with divine mercy!',
        culturalNote: 'The lead singer sprinkles yellow turmeric powder (Bhandari) into the air as the rhythm accelerates.'
      }
    ],
    relatedIds: ['burrakatha-rayalaseema', 'dollu-kunitha-kuruba', 'villu-paatu-nellai'],
    featured: true
  }
];

export const TRADITION_ENTRIES: TraditionEntry[] = TRADITIONS.map((t) => ({
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

export const CULTURAL_ZONES: CulturalZone[] = [
  {
    id: 'thamirabarani-coromandel',
    name: 'Thamirabarani & Coromandel Basin',
    localName: 'தாமிரபரணி மற்றும் சோழ மண்டலக் கரை',
    states: ['Tamil Nadu', 'Puducherry'],
    description: 'Ancient cradle of the seven-foot musical bow ballads (Villu Paattu), Mayana Kollai sacred chants, Oyilattam heroic dances, and Kavadi pilgrim Sindhu meters.',
    traditionCount: 6,
    endangeredCount: 3,
    color: '#e07a5f',
    representativeInstruments: ['Villu (Bow)', 'Magudam', 'Thavil', 'Parai', 'Nadaswaram']
  },
  {
    id: 'malabar-western-ghats',
    name: 'Malabar Coast & Western Ghats',
    localName: 'മലബാർ തീരവും പശ്ചിമഘട്ടവും',
    states: ['Kerala'],
    description: 'Mist-clad sacred groves harboring the dramatic Theyyam Thottam possession chants, Kadathanad Chekavar valor ballads, and Sopanam Edakka temple microtones.',
    traditionCount: 4,
    endangeredCount: 2,
    color: '#2a9d8f',
    representativeInstruments: ['Chenda', 'Edakka', 'Pulluvan Veena', 'Pulluvan Kudam', 'Kuzhal']
  },
  {
    id: 'coastal-canara-deccan',
    name: 'Coastal Canara & Deccan Plateau',
    localName: 'ಕರಾವಳಿ ಕೆನರಾ ಮತ್ತು ದಖ್ಖನ್ ಪ್ರಸ್ಥಭೂಮಿ',
    states: ['Karnataka'],
    description: 'Epicenter of high-energy coastal Tenkutittu Yakshagana choral duels, Kuruba shepherd Dollu Kunitha barrel-drum songs, and matriarchal Sobane Pada.',
    traditionCount: 3,
    endangeredCount: 1,
    color: '#3b82f6',
    representativeInstruments: ['Chande', 'Maddale', 'Dollu', 'Kahale', 'Shruti Box']
  },
  {
    id: 'krishna-godavari-riverine',
    name: 'Krishna-Godavari Riverine Plains',
    localName: 'కృష్ణా-గోదావరి మైదానాలు',
    states: ['Andhra Pradesh', 'Telangana'],
    description: 'Rich fertile plains and pastoral plateaus of the three-bard Burrakatha peasant ballads and the thunderous Jaggu-drum Oggu Katha shepherd epics.',
    traditionCount: 2,
    endangeredCount: 1,
    color: '#d4af37',
    representativeInstruments: ['Tambura', 'Gummeta', 'Jaggu', 'Andelu', 'Oggu Damarukam']
  }
];

export const CURATED_EXHIBITIONS: Exhibition[] = [
  {
    id: 'exhib-bows-drums',
    title: 'Resonances of the Soil: Musical Bows, Frame Drums & Bronze Chimes',
    subtitle: 'From Tamil Villu Paattu and Magudam to Kerala Chenda and Telangana Jaggu',
    curatorNote: 'An exploration of how indigenous southern acoustic instruments—from strung hunting bows to baked earthen pots and high-tension frame drums—drive marathon night-long oral epics.',
    coverImageTheme: 'terracotta-flame',
    traditionIds: ['villu-paatu-nellai', 'kaniyan-koothu-tirunelveli', 'oggu-katha-telangana'],
    accentColor: '#e07a5f',
    culturalThemes: ['Musical Bows', 'Magudam Rolls', 'Acoustic Organology', 'All-Night Rituals']
  },
  {
    id: 'exhib-sacred-groves-possession',
    title: 'Voices of the Sacred Groves: Oracle Incantations & Serpent Chants',
    subtitle: 'Theyyam Thottam of North Malabar & Pulluvan Pattu of Palakkad',
    curatorNote: 'Centuries of indigenous sacred ecology, human-wildlife co-existence, and spirit mediumship coded into unforgettable oral poetry.',
    coverImageTheme: 'forest-emerald',
    traditionIds: ['theyyam-thottam-malabar', 'pulluvan-pattu-serpent'],
    accentColor: '#2a9d8f',
    culturalThemes: ['Sacred Groves', 'Serpent Lore', 'Oracle Trance', 'Ethno-Ecology']
  },
  {
    id: 'exhib-martial-ballads',
    title: 'Chivalry of the Duel: Martial Epics & Anti-Colonial Defiance',
    subtitle: 'Vadakkan Pattukal, Silambattam Por-Pattu & Burrakatha',
    curatorNote: 'How heroic bards preserved the memories of peasant warriors, Kalari duelists, and martial footwork across generations without writing.',
    coverImageTheme: 'indigo-gold',
    traditionIds: ['vadakkan-pattukal-kadathanad', 'silambattam-kombu-chants', 'burrakatha-rayalaseema'],
    accentColor: '#d4af37',
    culturalThemes: ['Martial Arts', 'Heroic Ballads', 'Honor & Betrayal', 'Peasant Revolts']
  }
];

export const KNOWLEDGE_GRAPH_DATA = {
  nodes: [
    // Traditions
    { id: 'villu-paatu-nellai', label: 'Villu Paatu', type: 'tradition' as const, color: '#e07a5f', count: 4 },
    { id: 'kaniyan-koothu-tirunelveli', label: 'Kaniyan Koothu', type: 'tradition' as const, color: '#e07a5f', count: 3 },
    { id: 'oyilattam-kongu', label: 'Oyilattam', type: 'tradition' as const, color: '#e07a5f', count: 3 },
    { id: 'kavadi-sindhu-madurai', label: 'Kavadi Sindhu', type: 'tradition' as const, color: '#e07a5f', count: 3 },
    { id: 'nondi-natakam-thanjavur', label: 'Nondi Natakam', type: 'tradition' as const, color: '#e07a5f', count: 3 },
    { id: 'silambattam-kombu-chants', label: 'Silambattam Por-Pattu', type: 'tradition' as const, color: '#e07a5f', count: 3 },
    { id: 'theyyam-thottam-malabar', label: 'Theyyam Thottam', type: 'tradition' as const, color: '#e07a5f', count: 3 },
    { id: 'vadakkan-pattukal-kadathanad', label: 'Vadakkan Pattukal', type: 'tradition' as const, color: '#e07a5f', count: 3 },
    { id: 'sopana-sangeetham-temple', label: 'Sopana Sangeetham', type: 'tradition' as const, color: '#e07a5f', count: 3 },
    { id: 'pulluvan-pattu-serpent', label: 'Pulluvan Pattu', type: 'tradition' as const, color: '#e07a5f', count: 3 },
    { id: 'yakshagana-prasanga-tenku', label: 'Tenkutittu Yakshagana', type: 'tradition' as const, color: '#e07a5f', count: 3 },
    { id: 'dollu-kunitha-kuruba', label: 'Dollu Kunitha', type: 'tradition' as const, color: '#e07a5f', count: 3 },
    { id: 'sobane-pada-mysore', label: 'Sobane Pada', type: 'tradition' as const, color: '#e07a5f', count: 2 },
    { id: 'burrakatha-rayalaseema', label: 'Burrakatha', type: 'tradition' as const, color: '#e07a5f', count: 3 },
    { id: 'oggu-katha-telangana', label: 'Oggu Katha', type: 'tradition' as const, color: '#e07a5f', count: 3 },

    // Thematic Motifs
    { id: 'm-heroic-martyrdom', label: 'Motif: Heroic Martyrdom & Village Protection', type: 'motif' as const, color: '#f59e0b', count: 5 },
    { id: 'm-sacred-groves', label: 'Motif: Sacred Groves & Animal Spirits', type: 'motif' as const, color: '#f59e0b', count: 4 },
    { id: 'm-pastoral-flocks', label: 'Motif: Pastoral Deities & Herder Migration', type: 'motif' as const, color: '#f59e0b', count: 3 },
    { id: 'm-divine-possession', label: 'Motif: Ritual Trance & Oracle Mediumship', type: 'motif' as const, color: '#f59e0b', count: 3 },

    // Key Instruments
    { id: 'inst-villu', label: 'Inst: Villu (Musical Bow)', type: 'instrument' as const, color: '#2a9d8f', count: 1 },
    { id: 'inst-thavil', label: 'Inst: Thavil & Parai', type: 'instrument' as const, color: '#2a9d8f', count: 3 },
    { id: 'inst-chenda', label: 'Inst: Chenda & Edakka', type: 'instrument' as const, color: '#2a9d8f', count: 3 },
    { id: 'inst-pulluvan-veena', label: 'Inst: Pulluvan Veena & Kudam', type: 'instrument' as const, color: '#2a9d8f', count: 1 },
    { id: 'inst-chande', label: 'Inst: Chande & Maddale', type: 'instrument' as const, color: '#2a9d8f', count: 1 },
    { id: 'inst-jaggu', label: 'Inst: Jaggu & Gummeta', type: 'instrument' as const, color: '#2a9d8f', count: 2 }
  ],
  edges: [
    { source: 'villu-paatu-nellai', target: 'm-heroic-martyrdom', relation: 'features_motif', weight: 3 },
    { source: 'villu-paatu-nellai', target: 'inst-villu', relation: 'uses_instrument', weight: 3 },
    { source: 'kaniyan-koothu-tirunelveli', target: 'm-divine-possession', relation: 'features_motif', weight: 3 },
    { source: 'oyilattam-kongu', target: 'inst-thavil', relation: 'uses_instrument', weight: 3 },
    { source: 'kavadi-sindhu-madurai', target: 'inst-thavil', relation: 'uses_instrument', weight: 2 },
    { source: 'theyyam-thottam-malabar', target: 'm-divine-possession', relation: 'features_motif', weight: 3 },
    { source: 'theyyam-thottam-malabar', target: 'inst-chenda', relation: 'uses_instrument', weight: 3 },
    { source: 'vadakkan-pattukal-kadathanad', target: 'm-heroic-martyrdom', relation: 'features_motif', weight: 3 },
    { source: 'sopana-sangeetham-temple', target: 'inst-chenda', relation: 'uses_instrument', weight: 2 },
    { source: 'pulluvan-pattu-serpent', target: 'm-sacred-groves', relation: 'features_motif', weight: 3 },
    { source: 'pulluvan-pattu-serpent', target: 'inst-pulluvan-veena', relation: 'uses_instrument', weight: 3 },
    { source: 'yakshagana-prasanga-tenku', target: 'inst-chande', relation: 'uses_instrument', weight: 3 },
    { source: 'dollu-kunitha-kuruba', target: 'm-pastoral-flocks', relation: 'features_motif', weight: 3 },
    { source: 'burrakatha-rayalaseema', target: 'inst-jaggu', relation: 'uses_instrument', weight: 2 },
    { source: 'oggu-katha-telangana', target: 'm-pastoral-flocks', relation: 'features_motif', weight: 3 },
    { source: 'oggu-katha-telangana', target: 'inst-jaggu', relation: 'uses_instrument', weight: 3 }
  ]
};

export const PRESERVATION_STATS = {
  totalTraditions: 15,
  totalDialects: 12,
  totalAudioHours: 240.5,
  endangeredDocumented: 11,
  hereditaryLineages: 36,
  communityAnnotations: 84
};
