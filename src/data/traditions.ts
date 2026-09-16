import { Tradition, TraditionEntry, CulturalZone, Exhibition } from './types';
export type { TraditionEntry };

export const TRADITIONS: Tradition[] = [
  // 1. Tamil Nadu - Villu Pattu
  {
    id: 'villu-pattu-muthupattan',
    title: 'Muthupattan Kathai (Villu Pattu)',
    vernacularTitle: 'வில்லுப்பாட்டு — முத்துப்பட்டன் கதை',
    scriptLabel: 'Tamil Script',
    region: 'Tirunelveli & Tenkasi',
    state: 'Tamil Nadu',
    dialect: 'Southern Tirunelveli Tamil',
    languageFamily: 'Dravidian',
    category: 'Heroic Ballad & Bow-Song',
    culturalZone: 'Thamirabarani & Southern Plains',
    practitionerAge: 77,
    livingPractitionerCount: 1,
    hasSuccessor: false,
    lastRecordedDaysAgo: 45,
    vulnerabilityStatus: 'critical',
    endangermentScore: 88,
    activeApprentices: 0,
    community: 'Villisai Pulavar',
    duration: '4:35',
    tags: ['Villu Pattu', 'Muthupattan', 'Bow Song', 'Tirunelveli', 'Heroic Ballad'],
    tagMetadata: {
      theme: 'Heroic Ballad & Bow-Song',
      instruments: ['Villu (Musical Bow)', 'Udukku', 'Kudam', 'Thalam'],
      mood: 'Epic & Rhythmic'
    },
    summary: 'A centuries-old narrative ballad chanted with a large curved bow struck with wooden plectrums, chronicling the bravery and sacrifice of folk hero Muthupattan.',
    historicalContext: 'Chanted during midnight temple Kodai festivals in southern Tamil Nadu. The lead Pulavar strikes the resonant bowstring while exchanging swift rhythmic dialogues with accompanying percussionists.',
    performerLineage: {
      leadPerformer: 'Muthukumarasamy Pulavar',
      communityLineage: 'Villisai Pulavar',
      region: 'Tirunelveli & Tenkasi',
      state: 'Tamil Nadu',
      district: 'Tenkasi',
      bio: 'Master bard with seven decades of mastery over the oral poetic cycles of folk hero Muthupattan.'
    },
    instruments: ['Villu (Musical Bow)', 'Udukku', 'Kudam', 'Thalam'],
    ritualContext: 'Midnight temple Kodai festivals before village guardian shrines.',
    motifs: ['Martyrdom of Muthupattan', 'Bronze Bells on the Bow', 'Pastoral Justice'],
    unescoRecognition: 'Documented on National Heritage Archive',
    audioTrack: {
      id: 'aud-villu-muthupattan',
      title: 'Muthupattan Kathai (Villu Pattu)',
      durationSeconds: 275,
      sampleRateKhz: 48,
      recordingYear: 2024,
      fieldRecordist: 'Kalantar Field Unit',
      recordingLocation: 'Tenkasi, Tamil Nadu',
      waveformPeaks: [0.35, 0.72, 0.95, 0.88, 0.96, 0.74, 0.89, 0.93, 0.81, 0.65, 0.94, 0.98, 0.76, 0.84, 0.99, 0.87, 0.75, 0.91, 0.95, 0.78, 0.63, 0.82, 0.9, 0.71, 0.54, 0.79, 0.92, 0.64, 0.44, 0.28],
      audioToneType: 'plucked_lute',
      bpm: 124,
      scaleOrRaga: 'Madhyamavati Folk Cadence',
      talaOrRhythm: 'Tisra Gati syncopated bow strikes'
    },
    versesSnippet: 'வில்லினில் தந்தி அசையுதையா, வெண்கல மணியொலி கேட்குதையா!\nVilliniṉ tanti acaiyutaiyā, veṇkala maṇiyoli kēṭkutaiyā!\n(The taut bowstring vibrates; hear the resonance of the bronze bells!)',
    verses: [
      {
        id: 'vil-v1',
        timestamp: 0,
        originalScript: 'வில்லினில் தந்தி அசையுதையா, வெண்கல மணியொலி கேட்குதையா!',
        scriptName: 'Tamil',
        romanTransliteration: 'Villiniṉ tanti acaiyutaiyā, veṇkala maṇiyoli kēṭkutaiyā!',
        englishTranslation: 'The taut bowstring vibrates; hear the resonance of the bronze bells!',
        culturalNote: 'The bronze bells suspended along the arch of the bow chime with each wooden baton strike.'
      },
      {
        id: 'vil-v2',
        timestamp: 55,
        originalScript: 'முத்துப்பட்டன் வீரக்கதை பாட வாரீர், பொத்தி வச்ச காதலைத்தான் சொல்ல வாரீர்!',
        scriptName: 'Tamil',
        romanTransliteration: 'Muttuppaṭṭaṉ vīrakkatai pāṭa vārīr, potti vacca kātalait-tāṉ colla vārīr!',
        englishTranslation: 'Come gather to hear the valiant ballad of Muthupattan; hear the tale of fearless love that conquered all divides!',
        culturalNote: 'Muthupattan fell defending his community and cattle from mountain raiders.'
      }
    ],
    relatedIds: ['kaniyan-koothu-thiruvarul', 'pabuji-ki-phad-rajasthan'],
    featured: true
  },

  // 2. Tamil Nadu - Marudha Nilam Oppari
  {
    id: 'marudha-nilam-oppari',
    title: 'Marudha Nilam Oppari (Lamentation Poetry)',
    vernacularTitle: 'ஒப்பாரிப் பாடல் — மருத நில அழுகை மரபு',
    scriptLabel: 'Tamil Script',
    region: 'Madurai & Dindigul Rural Belts',
    state: 'Tamil Nadu',
    dialect: 'Kongu Tamil',
    languageFamily: 'Dravidian',
    category: 'Elegiac Oral Verse',
    culturalZone: 'Thamirabarani & Southern Plains',
    practitionerAge: 82,
    livingPractitionerCount: 1,
    hasSuccessor: false,
    lastRecordedDaysAgo: 30,
    vulnerabilityStatus: 'critical',
    endangermentScore: 92,
    activeApprentices: 0,
    community: 'Agricultural Weavers & Elders',
    duration: '3:50',
    tags: ['Oppari', 'Lamentation', 'Kongu Tamil', 'Elegiac Verse', 'Madurai'],
    tagMetadata: {
      theme: 'Elegiac Oral Verse',
      instruments: ['Acapella (Voice Only)'],
      mood: 'Mournful & Poignant'
    },
    summary: 'Unwritten spontaneous rhyming eulogies sung during grief rituals. The verse encodes generations of maternal lineage, agrarian history, and personal genealogy.',
    historicalContext: 'Spontaneously composed during memorial rituals across the rural agrarian plains of central and southern Tamil Nadu, carrying maternal genealogies without any written ledger.',
    performerLineage: {
      leadPerformer: 'Karuppayi Ammal',
      communityLineage: 'Agricultural Weavers & Elders',
      region: 'Madurai & Dindigul Rural Belts',
      state: 'Tamil Nadu',
      district: 'Madurai',
      bio: 'Eighty-two-year-old matriarch capable of weaving complex poetic mourning meters entirely from memory.'
    },
    instruments: ['Acapella (Voice Only)'],
    ritualContext: 'Mourning gatherings and ancestor memorial rites in rural agricultural hamlets.',
    motifs: ['Maternal Lineage', 'Golden Rain of Tears', 'Agrarian Kinship'],
    unescoRecognition: 'Oral Literature Documentation Registry',
    audioTrack: {
      id: 'aud-marudha-oppari',
      title: 'Marudha Nilam Oppari (Lamentation Poetry)',
      durationSeconds: 230,
      sampleRateKhz: 48,
      recordingYear: 2024,
      fieldRecordist: 'Kalantar Field Unit',
      recordingLocation: 'Dindigul, Tamil Nadu',
      waveformPeaks: [0.25, 0.4, 0.6, 0.75, 0.8, 0.7, 0.65, 0.7, 0.8, 0.6, 0.5, 0.65, 0.7, 0.6, 0.55, 0.65, 0.7, 0.6, 0.5, 0.6, 0.7, 0.6, 0.45, 0.5, 0.6, 0.5, 0.4, 0.35, 0.25, 0.2],
      audioToneType: 'vocal_polyphony',
      bpm: 68,
      scaleOrRaga: 'Ahiri Mourning Mode',
      talaOrRhythm: 'Free Rhythm Acapella'
    },
    versesSnippet: 'ஆராரோ பாடி உன்னை ஆள வெச்ச தாயிருக்க... பூமியில நான் அழுதா பொன்மழையும் பெய்யாதோ?\n(With lullabies I raised you, my son; if I weep on this earth, will tears not pour like heavy golden rain?)',
    verses: [
      {
        id: 'opp-v1',
        timestamp: 0,
        originalScript: 'ஆராரோ பாடி உன்னை ஆள வெச்ச தாயிருக்க... பூமியில நான் அழுதா பொன்மழையும் பெய்யாதோ?',
        scriptName: 'Tamil',
        romanTransliteration: 'Ārārō pāṭi uṉṉai āḷa vecca tāyirukka... pūmiyila nāṉ aḻutā poṉmaḻaiyum peyyātō?',
        englishTranslation: 'With lullabies I raised you, my son; if I weep on this earth, will tears not pour like heavy golden rain?',
        culturalNote: 'Oppari verses deliberately evoke the rhythmic lullaby (Aararo) as an ironic contrast to mortal separation.'
      }
    ],
    relatedIds: ['grama-thalaattu-lullaby', 'kaniyan-koothu-thiruvarul'],
    featured: true
  },

  // 3. Tamil Nadu - Kaniyan Koothu
  {
    id: 'kaniyan-koothu-thiruvarul',
    title: 'Kaniyan Koothu Thiruvarul Paattu',
    vernacularTitle: 'கணியான் கூத்து — சுடலை மாடன் அருளழைப்பு',
    scriptLabel: 'Tamil Script',
    region: 'Tirunelveli & Kanniyakumari',
    state: 'Tamil Nadu',
    dialect: 'Nanjil Nadu Tamil',
    languageFamily: 'Dravidian',
    category: 'Ritual Trance Invocations',
    culturalZone: 'Thamirabarani & Southern Plains',
    practitionerAge: 74,
    livingPractitionerCount: 2,
    hasSuccessor: true,
    lastRecordedDaysAgo: 60,
    vulnerabilityStatus: 'critical',
    endangermentScore: 78,
    activeApprentices: 1,
    community: 'Kaniyan',
    duration: '5:12',
    tags: ['Kaniyan Koothu', 'Magudam', 'Sudalai Madan', 'Trance Invocation', 'Nanjil Nadu'],
    tagMetadata: {
      theme: 'Ritual Trance Invocations',
      instruments: ['Magudam (Twin Frame Drums)', 'Thambatti', 'Thalam'],
      mood: 'Ecstatic & Trance-Inducing'
    },
    summary: 'Night-long ritual invocation chanted by men adorned in red silken skirts to the feverish tempo of twin Magudam drums, preserved strictly through oral recital.',
    historicalContext: 'Transmitted strictly within hereditary Kaniyan families, accompanying all-night worship of guardian spirit Sudalai Madan to avert misfortune.',
    performerLineage: {
      leadPerformer: 'Subramania Kaniyan',
      communityLineage: 'Kaniyan',
      region: 'Tirunelveli & Kanniyakumari',
      state: 'Tamil Nadu',
      district: 'Kanniyakumari',
      bio: 'Master Kaniyan chanter and lead Magudam drum player continuing unbroken sacred trance rites.'
    },
    instruments: ['Magudam (Twin Frame Drums)', 'Thambatti', 'Thalam'],
    ritualContext: 'Midnight ritual possession ceremonies at Sudalai Madan village shrines.',
    motifs: ['Sudalai Madan Pyre', 'Twin Magudam Polyrhythms', 'Oracle Invocation'],
    unescoRecognition: 'Documented on National Heritage Archive',
    audioTrack: {
      id: 'aud-kaniyan-thiruvarul',
      title: 'Kaniyan Koothu Thiruvarul Paattu',
      durationSeconds: 312,
      sampleRateKhz: 48,
      recordingYear: 2023,
      fieldRecordist: 'Kalantar Field Unit',
      recordingLocation: 'Kanniyakumari, Tamil Nadu',
      waveformPeaks: [0.5, 0.8, 0.95, 0.9, 0.98, 0.85, 0.9, 0.95, 0.85, 0.7, 0.9, 0.95, 0.8, 0.85, 0.95, 0.88, 0.75, 0.9, 0.95, 0.8, 0.65, 0.85, 0.9, 0.75, 0.6, 0.8, 0.9, 0.7, 0.5, 0.35],
      audioToneType: 'percussive_chant',
      bpm: 142,
      scaleOrRaga: 'Kurinji Trance Rhythm',
      talaOrRhythm: 'Magudam Polyrhythmic Cycle'
    },
    versesSnippet: 'சுடலை வனத்திலே சுழலும் மாடசாமி... மகுடத் தாளத்திலே மயங்கி வாருமய்யா!\n(Sudalai Madan spinning through the night pyre... come awakened to the rhythm of our Magudam!)',
    verses: [
      {
        id: 'kan-v1',
        timestamp: 0,
        originalScript: 'சுடலை வனத்திலே சுழலும் மாடசாமி... மகுடத் தாளத்திலே மயங்கி வாருமய்யா!',
        scriptName: 'Tamil',
        romanTransliteration: 'Cuṭalai vaṉattilē cuḻalum māṭacāmi... makuṭat tāḷattilē mayaṅki vārumayyā!',
        englishTranslation: 'Sudalai Madan spinning through the night pyre... come awakened to the rhythm of our Magudam!',
        culturalNote: 'Chanted to invoke the protective presence of guardian deity Sudalai Madan.'
      }
    ],
    relatedIds: ['villu-pattu-muthupattan', 'marudha-nilam-oppari'],
    featured: true
  },

  // 4. Tamil Nadu - Grama Thalaattu
  {
    id: 'grama-thalaattu-lullaby',
    title: 'Grama Thalaattu (Folk Agrarian Lullaby)',
    vernacularTitle: 'நாட்டுப்புறத் தாலாட்டு — கொங்கு நாட்டு உழவு தாலாட்டு',
    scriptLabel: 'Tamil Script',
    region: 'Thanjavur & Tiruvarur',
    state: 'Tamil Nadu',
    dialect: 'Cauvery Delta Tamil',
    languageFamily: 'Dravidian',
    category: 'Agrarian Domestic Lore',
    culturalZone: 'Thamirabarani & Southern Plains',
    practitionerAge: 71,
    livingPractitionerCount: 3,
    hasSuccessor: true,
    lastRecordedDaysAgo: 90,
    vulnerabilityStatus: 'endangered',
    endangermentScore: 65,
    activeApprentices: 2,
    community: 'Delta Farming Communities',
    duration: '3:20',
    tags: ['Thalaattu', 'Lullaby', 'Cauvery Delta', 'Agrarian Lore', 'Thanjavur'],
    tagMetadata: {
      theme: 'Agrarian Domestic Lore',
      instruments: ['Acapella (Voice Only)'],
      mood: 'Soothing & Pastoral'
    },
    summary: 'Delta paddy-field lullaby sung without written script, teaching infants the ecology of Kaveri river channels, seasonal sowing cycles, and ancestral harvests.',
    historicalContext: 'Mothers and elder women in the Kaveri delta region chant these cradle songs to transmit agrarian ecology, canal irrigation methods, and seasonal sowing cycles.',
    performerLineage: {
      leadPerformer: 'Chellammal R.',
      communityLineage: 'Delta Farming Communities',
      region: 'Thanjavur & Tiruvarur',
      state: 'Tamil Nadu',
      district: 'Tiruvarur',
      bio: 'Seventy-one-year-old grandmother holding vast repertoires of agrarian Kaveri delta cradle songs.'
    },
    instruments: ['Acapella (Voice Only)'],
    ritualContext: 'Domestic child-rearing and seasonal harvest resting huts.',
    motifs: ['Kaveri River Inflow', 'Ripening Green Paddy Fields', 'Maternal Blessing'],
    unescoRecognition: 'Sangeet Natak Akademi Living Lore Archive',
    audioTrack: {
      id: 'aud-grama-thalaattu',
      title: 'Grama Thalaattu (Folk Agrarian Lullaby)',
      durationSeconds: 200,
      sampleRateKhz: 48,
      recordingYear: 2024,
      fieldRecordist: 'Kalantar Field Unit',
      recordingLocation: 'Tiruvarur, Tamil Nadu',
      waveformPeaks: [0.2, 0.35, 0.5, 0.6, 0.65, 0.55, 0.5, 0.6, 0.65, 0.55, 0.45, 0.55, 0.6, 0.55, 0.5, 0.55, 0.6, 0.5, 0.45, 0.5, 0.55, 0.45, 0.4, 0.45, 0.5, 0.4, 0.35, 0.3, 0.25, 0.2],
      audioToneType: 'aerophone_flute',
      bpm: 72,
      scaleOrRaga: 'Neelambari Lullaby Folk Cadence',
      talaOrRhythm: 'Gentle Cradle Sway'
    },
    versesSnippet: 'காவிரி நீர் ஓடிவர, கழனி எங்கும் நெல் விளைய... தூங்கடா என் கண்மணியே, துரை மகனே கண்வளராய்!\n(As Kaveri water flows and the green fields yield paddy... sleep, my darling jewel, rest your eyes.)',
    verses: [
      {
        id: 'tha-v1',
        timestamp: 0,
        originalScript: 'காவிரி நீர் ஓடிவர, கழனி எங்கும் நெல் விளைய... தூங்கடா என் கண்மணியே, துரை மகனே கண்வளராய்!',
        scriptName: 'Tamil',
        romanTransliteration: 'Kāviri nīr ōṭivara, kaḻaṉi eṅkum nel viḷaiya... tūṅkaṭā eṉ kaṇmaṇiyē, turai makaṉē kaṇvaḷarāy!',
        englishTranslation: 'As Kaveri water flows and the green fields yield paddy... sleep, my darling jewel, rest your eyes.',
        culturalNote: 'Traditional agrarian lullaby evoking the life-giving flow of the Kaveri River into agricultural wetlands.'
      }
    ],
    relatedIds: ['marudha-nilam-oppari', 'baul-gaan-moner-manush'],
    featured: false
  },

  // 5. Rajasthan - Pabuji Ki Phad
  {
    id: 'pabuji-ki-phad-rajasthan',
    title: 'Pabuji Ki Phad (Bhopa Epic Chant)',
    vernacularTitle: 'पाबूजी री फड़ (भोपा महाकाव्य गायन)',
    scriptLabel: 'Devanagari Script',
    region: 'Thar Desert (Jodhpur & Nagaur)',
    state: 'Rajasthan',
    dialect: 'Marwari',
    languageFamily: 'Indo-Aryan',
    category: 'Heroic Epic & Scroll Ballad',
    culturalZone: 'Thar Desert & Western Arid Zone',
    practitionerAge: 73,
    livingPractitionerCount: 2,
    hasSuccessor: true,
    lastRecordedDaysAgo: 110,
    vulnerabilityStatus: 'critical',
    endangermentScore: 76,
    activeApprentices: 1,
    community: 'Bhopa',
    duration: '5:45',
    tags: ['Pabuji Ki Phad', 'Bhopa', 'Ravanahatha', 'Marwari', 'Scroll Epic'],
    tagMetadata: {
      theme: 'Heroic Epic & Scroll Ballad',
      instruments: ['Ravanahatha (Bowed spike fiddle)', 'Ghungroo'],
      mood: 'Resonant & Heroic'
    },
    summary: 'All-night recitation sung before a 30-foot painted narrative cloth (Phad). The priest-bard plays the Ravanahatha while his partner illuminates the scrolls by lantern.',
    historicalContext: 'Narrated by the Bhopa bards of the Thar Desert, chronicling the heroic deeds of Pabuji, an incarnation of Lakshmana who protected pastoral camel herds.',
    performerLineage: {
      leadPerformer: 'Chogaram Bhopa & Kamla Devi',
      communityLineage: 'Bhopa',
      region: 'Thar Desert (Jodhpur & Nagaur)',
      state: 'Rajasthan',
      district: 'Jodhpur',
      bio: 'Celebrated Bhopa couple preserving the entire 30-foot painted Phad scroll recitation from memory.'
    },
    instruments: ['Ravanahatha (Bowed spike fiddle)', 'Ghungroo'],
    ritualContext: 'All-night desert bhoot-katha vigils in front of village shrines to protect cattle and cure sickness.',
    motifs: ['Black Mare Kesar Kalmi', 'Pabuji’s Sacred Vow', 'Illuminated Phad Scroll'],
    unescoRecognition: 'Sangeet Natak Akademi National Masterpiece Registry',
    audioTrack: {
      id: 'aud-pabuji-phad',
      title: 'Pabuji Ki Phad (Bhopa Epic Chant)',
      durationSeconds: 345,
      sampleRateKhz: 48,
      recordingYear: 2023,
      fieldRecordist: 'Kalantar Field Unit',
      recordingLocation: 'Jodhpur, Rajasthan',
      waveformPeaks: [0.35, 0.65, 0.85, 0.9, 0.95, 0.8, 0.85, 0.9, 0.85, 0.7, 0.88, 0.92, 0.8, 0.85, 0.9, 0.85, 0.7, 0.85, 0.9, 0.75, 0.6, 0.8, 0.88, 0.7, 0.55, 0.75, 0.85, 0.65, 0.45, 0.3],
      audioToneType: 'bowed_string',
      bpm: 116,
      scaleOrRaga: 'Maand Folk Scale',
      talaOrRhythm: 'Ravanahatha Bowed Drone'
    },
    versesSnippet: 'केसर कालमी री असवारी, पाबूजी पधारिया रण-खेत म्हाने!\n(Riding his black mare Kesar Kalmi, Lord Pabuji arrives upon the desert battleground!)',
    verses: [
      {
        id: 'pab-v1',
        timestamp: 0,
        originalScript: 'केसर कालमी री असवारी, पाबूजी पधारिया रण-खेत म्हाने!',
        scriptName: 'Devanagari',
        romanTransliteration: 'Kēsar kālamī rī asavārī, Pābūjī padhāriyā raṇ-khēt mhānē!',
        englishTranslation: 'Riding his black mare Kesar Kalmi, Lord Pabuji arrives upon the desert battleground!',
        culturalNote: 'The singing begins as the Bhopi holds the oil lamp to illuminate Pabuji’s mare on the painted Phad cloth.'
      }
    ],
    relatedIds: ['villu-pattu-muthupattan', 'baul-gaan-moner-manush'],
    featured: true
  },

  // 6. West Bengal - Baul Gaan
  {
    id: 'baul-gaan-moner-manush',
    title: 'Baul Gaan — Moner Manush',
    vernacularTitle: 'বাউল গান — মনের মানুষ (লালন দর্শন)',
    scriptLabel: 'Bengali Script',
    region: 'Birbhum & Nadia',
    state: 'West Bengal',
    dialect: 'Rarh Bengali',
    languageFamily: 'Indo-Aryan',
    category: 'Mystic Oral Philosophy',
    culturalZone: 'Bengal Delta & Rarh Region',
    practitionerAge: 69,
    livingPractitionerCount: 4,
    hasSuccessor: true,
    lastRecordedDaysAgo: 75,
    vulnerabilityStatus: 'endangered',
    endangermentScore: 58,
    activeApprentices: 3,
    community: 'Baul Sadhakas',
    duration: '4:15',
    tags: ['Baul Gaan', 'Moner Manush', 'Lalon Fakir', 'Ektara', 'Birbhum'],
    tagMetadata: {
      theme: 'Mystic Oral Philosophy',
      instruments: ['Ektara', 'Dubki', 'Dotara', 'Nupur'],
      mood: 'Mystic & Ecstatic'
    },
    summary: 'Unwritten esoteric spiritual verses tracing back to Lalon Fakir, exploring inner human divinity beyond religious orthodoxies through acoustic rhythm and metaphor.',
    historicalContext: 'Transmitted orally by wandering Baul minstrel ascetics across Bengal. The songs challenge caste dogma and celebrate the indwelling divine spirit (Moner Manush).',
    performerLineage: {
      leadPerformer: 'Gour Das Baul',
      communityLineage: 'Baul Sadhakas',
      region: 'Birbhum & Nadia',
      state: 'West Bengal',
      district: 'Birbhum',
      bio: 'Sixty-nine-year-old Baul bard and mystic practitioner of Lalon Fakir’s acoustic philosophy.'
    },
    instruments: ['Ektara', 'Dubki', 'Dotara', 'Nupur'],
    ritualContext: 'Akharas, rural melas, and village gatherings under sacred trees.',
    motifs: ['Unknown Bird in the Cage', 'Moner Manush', 'Spiritual Liberation'],
    unescoRecognition: 'UNESCO Representative List of the Intangible Cultural Heritage of Humanity',
    audioTrack: {
      id: 'aud-baul-moner-manush',
      title: 'Baul Gaan — Moner Manush',
      durationSeconds: 255,
      sampleRateKhz: 48,
      recordingYear: 2024,
      fieldRecordist: 'Kalantar Field Unit',
      recordingLocation: 'Kenduli, Birbhum, West Bengal',
      waveformPeaks: [0.3, 0.5, 0.7, 0.85, 0.9, 0.8, 0.85, 0.9, 0.8, 0.7, 0.85, 0.9, 0.8, 0.85, 0.9, 0.8, 0.7, 0.85, 0.9, 0.75, 0.6, 0.8, 0.85, 0.7, 0.55, 0.75, 0.8, 0.65, 0.45, 0.3],
      audioToneType: 'plucked_lute',
      bpm: 108,
      scaleOrRaga: 'Baul Bhatiyali Cadence',
      talaOrRhythm: 'Kaharwa Ektara Pulse'
    },
    versesSnippet: 'খাঁচার ভিতর অচিন পাখি কেমনে আসে যায়... তারে ধরতে পারলে মন-বেড়ি দিতাম পাখির পায়!\n(How does the unknown bird flutter in and out of the cage? If only I could catch it, I would bind it with the fetters of my heart!)',
    verses: [
      {
        id: 'bau-v1',
        timestamp: 0,
        originalScript: 'খাঁচার ভিতর অচিন পাখি কেমনে আসে যায়... তারে ধরতে পারলে মন-বেড়ি দিতাম পাখির পায়!',
        scriptName: 'Bengali',
        romanTransliteration: 'Khā̃cār bhitar acin pākhī kemanē āsē yāẏ... tārē dharatē pāralē man-bēṛi ditām pākhīr pāẏ!',
        englishTranslation: 'How does the unknown bird flutter in and out of the cage? If only I could catch it, I would bind it with the fetters of my heart!',
        culturalNote: 'Famous mystic metaphor by Lalon Fakir representing the soul dwelling momentarily inside the mortal body.'
      }
    ],
    relatedIds: ['pabuji-ki-phad-rajasthan', 'grama-thalaattu-lullaby'],
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
    id: 'thamirabarani-southern-plains',
    name: 'Thamirabarani & Southern Plains',
    localName: 'தாமிரபரணி மற்றும் தென் தமிழகச் சமவெளி',
    states: ['Tamil Nadu'],
    description: 'Ancient cradle of the seven-foot musical bow ballads (Villu Pattu), grief eulogies (Oppari), sacred Sudalai invocations (Kaniyan Koothu), and Kaveri agrarian cradle songs.',
    traditionCount: 4,
    endangeredCount: 3,
    color: '#e07a5f',
    representativeInstruments: ['Villu (Musical Bow)', 'Magudam', 'Udukku', 'Kudam', 'Thalam']
  },
  {
    id: 'thar-desert-western-zone',
    name: 'Thar Desert & Western Arid Zone',
    localName: 'थार मरुस्थल एवं पश्चिमी अंचल',
    states: ['Rajasthan'],
    description: 'Arid dunes preserving centuries of illuminated scroll ballads (Phad) sung to the haunting acoustic resonance of the Ravanahatha spike fiddle.',
    traditionCount: 1,
    endangeredCount: 1,
    color: '#d4af37',
    representativeInstruments: ['Ravanahatha (Bowed spike fiddle)', 'Ghungroo']
  },
  {
    id: 'bengal-delta-rarh-region',
    name: 'Bengal Delta & Rarh Region',
    localName: 'বঙ্গ অববাহিকা ও রাঢ় অঞ্চল',
    states: ['West Bengal'],
    description: 'Riverine and red-soil landscape resonant with the mystic non-dogmatic Baul songs of Lalon Fakir, powered by the rhythmic pulse of the Ektara and Dubki.',
    traditionCount: 1,
    endangeredCount: 1,
    color: '#2a9d8f',
    representativeInstruments: ['Ektara', 'Dubki', 'Dotara', 'Nupur']
  }
];

export const CURATED_EXHIBITIONS: Exhibition[] = [
  {
    id: 'exhib-heroic-ballads',
    title: 'Echoes of the Valiant: Musical Bows & Desert Scrolls',
    subtitle: 'Muthupattan Kathai & Pabuji Ki Phad',
    curatorNote: 'A deep comparative study of how oral societies immortalized village champions across Dravidian bow-songs and Rajasthani illuminated scrolls without written archives.',
    coverImageTheme: 'terracotta-flame',
    traditionIds: ['villu-pattu-muthupattan', 'pabuji-ki-phad-rajasthan'],
    accentColor: '#e07a5f',
    culturalThemes: ['Heroic Epic', 'Musical Bows', 'Scroll Ballads', 'Pastoral Guardians']
  },
  {
    id: 'exhib-ritual-soundscapes',
    title: 'Voices of Ecstasy: Trance Drums & Baul Mysticism',
    subtitle: 'Kaniyan Koothu & Baul Gaan',
    curatorNote: 'Exploring how rhythmic trance chanting and acoustic mysticism liberate the soul from social dogmas.',
    coverImageTheme: 'indigo-gold',
    traditionIds: ['kaniyan-koothu-thiruvarul', 'baul-gaan-moner-manush'],
    accentColor: '#d4af37',
    culturalThemes: ['Ritual Trance', 'Acoustic Mysticism', 'Magudam Polyrhythms', 'Lalon Philosophy']
  },
  {
    id: 'exhib-maternal-agrarian',
    title: 'Rhythms of the Earth: Cradle Lullabies & Lamentations',
    subtitle: 'Grama Thalaattu & Marudha Nilam Oppari',
    curatorNote: 'Documenting the unwritten maternal genealogies and agrarian ecological knowledge preserved exclusively through spontaneous elder women’s verse.',
    coverImageTheme: 'forest-emerald',
    traditionIds: ['marudha-nilam-oppari', 'grama-thalaattu-lullaby'],
    accentColor: '#2a9d8f',
    culturalThemes: ['Maternal Verse', 'Agrarian Ecology', 'Elegiac Verse', 'Kaveri River Lore']
  }
];

export const KNOWLEDGE_GRAPH_DATA = {
  nodes: [
    { id: 'villu-pattu-muthupattan', label: 'Villu Pattu', type: 'tradition' as const, color: '#ef4444', count: 88 },
    { id: 'marudha-nilam-oppari', label: 'Marudha Nilam Oppari', type: 'tradition' as const, color: '#ef4444', count: 92 },
    { id: 'kaniyan-koothu-thiruvarul', label: 'Kaniyan Koothu', type: 'tradition' as const, color: '#f97316', count: 78 },
    { id: 'grama-thalaattu-lullaby', label: 'Grama Thalaattu', type: 'tradition' as const, color: '#f97316', count: 65 },
    { id: 'pabuji-ki-phad-rajasthan', label: 'Pabuji Ki Phad', type: 'tradition' as const, color: '#f97316', count: 76 },
    { id: 'baul-gaan-moner-manush', label: 'Baul Gaan', type: 'tradition' as const, color: '#10b981', count: 58 },

    // Thematic Motifs
    { id: 'm-heroic-ballad', label: 'Motif: Heroic Martyrdom & Pastoral Valor', type: 'motif' as const, color: '#f59e0b', count: 4 },
    { id: 'm-maternal-kinship', label: 'Motif: Maternal Lineage & Domestic Lore', type: 'motif' as const, color: '#f59e0b', count: 4 },
    { id: 'm-trance-mysticism', label: 'Motif: Trance Possession & Mystic Philosophy', type: 'motif' as const, color: '#f59e0b', count: 4 },

    // Key Instruments
    { id: 'inst-villu', label: 'Inst: Villu (Musical Bow)', type: 'instrument' as const, color: '#2a9d8f', count: 2 },
    { id: 'inst-magudam', label: 'Inst: Magudam Twin Frame Drums', type: 'instrument' as const, color: '#2a9d8f', count: 2 },
    { id: 'inst-ravanahatha', label: 'Inst: Ravanahatha Spike Fiddle', type: 'instrument' as const, color: '#2a9d8f', count: 2 },
    { id: 'inst-ektara', label: 'Inst: Ektara & Dubki', type: 'instrument' as const, color: '#2a9d8f', count: 2 }
  ],
  edges: [
    { source: 'villu-pattu-muthupattan', target: 'm-heroic-ballad', relation: 'features_motif', weight: 3 },
    { source: 'villu-pattu-muthupattan', target: 'inst-villu', relation: 'uses_instrument', weight: 3 },
    { source: 'villu-pattu-muthupattan', target: 'kaniyan-koothu-thiruvarul', relation: 'related_tradition', weight: 3 },
    { source: 'villu-pattu-muthupattan', target: 'pabuji-ki-phad-rajasthan', relation: 'related_tradition', weight: 2 },

    { source: 'marudha-nilam-oppari', target: 'm-maternal-kinship', relation: 'features_motif', weight: 3 },
    { source: 'marudha-nilam-oppari', target: 'grama-thalaattu-lullaby', relation: 'related_tradition', weight: 3 },
    { source: 'marudha-nilam-oppari', target: 'kaniyan-koothu-thiruvarul', relation: 'related_tradition', weight: 2 },

    { source: 'kaniyan-koothu-thiruvarul', target: 'm-trance-mysticism', relation: 'features_motif', weight: 3 },
    { source: 'kaniyan-koothu-thiruvarul', target: 'inst-magudam', relation: 'uses_instrument', weight: 3 },

    { source: 'grama-thalaattu-lullaby', target: 'm-maternal-kinship', relation: 'features_motif', weight: 3 },
    { source: 'grama-thalaattu-lullaby', target: 'baul-gaan-moner-manush', relation: 'related_tradition', weight: 2 },

    { source: 'pabuji-ki-phad-rajasthan', target: 'm-heroic-ballad', relation: 'features_motif', weight: 3 },
    { source: 'pabuji-ki-phad-rajasthan', target: 'inst-ravanahatha', relation: 'uses_instrument', weight: 3 },
    { source: 'pabuji-ki-phad-rajasthan', target: 'baul-gaan-moner-manush', relation: 'related_tradition', weight: 2 },

    { source: 'baul-gaan-moner-manush', target: 'm-trance-mysticism', relation: 'features_motif', weight: 3 },
    { source: 'baul-gaan-moner-manush', target: 'inst-ektara', relation: 'uses_instrument', weight: 3 }
  ]
};

export const PRESERVATION_STATS = {
  totalTraditions: 6,
  totalDialects: 6,
  totalAudioHours: 27.2,
  endangeredDocumented: 5,
  hereditaryLineages: 14,
  communityAnnotations: 38
};
