import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from '../components/Header/Header';
import { Hero } from '../components/Hero/Hero';
import { SearchPortal } from '../components/Search/SearchPortal';
import { AudioPlayer } from '../components/AudioPlayer/AudioPlayer';
import { KnowledgeGraph } from '../components/KnowledgeGraph/KnowledgeGraph';
import { Exhibitions } from '../components/Exhibitions/Exhibitions';
import { TraditionModal } from '../components/TraditionModal/TraditionModal';
import { ContributeModal } from '../components/ContributeModal/ContributeModal';
import { FieldRecorder } from '../components/FieldRecorder/FieldRecorder';
import { AboutModal } from '../components/AboutModal/AboutModal';
import { AuthModal } from '../components/AuthModal/AuthModal';
import { Footer } from '../components/Footer/Footer';

import {
  Tradition,
  Exhibition,
  KnowledgeGraphData,
  PreservationStats,
  FacetFilterState
} from '../data/types';
import { traditionsRepo } from '../data/traditionsRepo';

export const Portal: React.FC = () => {
  // Default tab: Orality Search
  const [activeTab, setActiveTab] = useState<ActiveTab>('search');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FacetFilterState>({
    sortBy: 'recommended'
  });

  // Data states
  const [traditions, setTraditions] = useState<Tradition[]>([]);
  const [facetOptions, setFacetOptions] = useState<{
    categories: string[];
    culturalZones: string[];
    dialects: string[];
    instruments: string[];
    motifs: string[];
  }>({
    categories: [],
    culturalZones: [],
    dialects: [],
    instruments: [],
    motifs: []
  });
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [knowledgeGraph, setKnowledgeGraph] = useState<KnowledgeGraphData>({ nodes: [], edges: [] });
  const [stats, setStats] = useState<PreservationStats>({
    totalTraditions: 12,
    totalDialects: 24,
    totalAudioHours: 184.5,
    endangeredDocumented: 9,
    hereditaryLineages: 48,
    communityAnnotations: 132
  });

  // Player & Modal states
  const [activePlayingTradition, setActivePlayingTradition] = useState<Tradition | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedDossierTradition, setSelectedDossierTradition] = useState<Tradition | null>(null);
  const [isContributeOpen, setIsContributeOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [preselectedTradition, setPreselectedTradition] = useState<Tradition | null>(null);
  const [selectedGraphTraditionId, setSelectedGraphTraditionId] = useState<string | null>(null);

  // Initial load of repository metadata
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [fOptions, exhibs, kGraph, pStats] = await Promise.all([
          traditionsRepo.getFilterFacets(),
          traditionsRepo.getCuratedExhibitions(),
          traditionsRepo.getKnowledgeGraph(),
          traditionsRepo.getPreservationStats()
        ]);
        setFacetOptions(fOptions);
        setExhibitions(exhibs);
        setKnowledgeGraph(kGraph);
        setStats(pStats);
      } catch (err) {
        console.error('Error loading repository data:', err);
      }
    };
    loadInitialData();
  }, []);

  // Fetch traditions whenever filters or query change
  useEffect(() => {
    const fetchTraditions = async () => {
      const currentFilters: FacetFilterState = { ...filters, searchQuery };
      const result = await traditionsRepo.getTraditions(currentFilters);
      setTraditions(result);
      if (!activePlayingTradition && result.length > 0) {
        setActivePlayingTradition(result[0]);
      }
    };
    fetchTraditions();
  }, [filters, searchQuery]);

  // Audio Play toggle
  const handlePlayToggle = (tradition: Tradition) => {
    if (activePlayingTradition?.id === tradition.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActivePlayingTradition(tradition);
      setIsPlaying(true);
    }
  };

  // Quick chip click in Hero
  const handleQuickChipClick = (motifOrTerm: string) => {
    if (motifOrTerm === 'Endangered Dialects') {
      setFilters({ ...filters, vulnerabilityStatus: 'critical' });
      setSearchQuery('');
    } else {
      setSearchQuery(motifOrTerm);
    }
    setActiveTab('search');
    const portalElement = document.getElementById('search-portal');
    if (portalElement) portalElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenGraphNode = (traditionId: string) => {
    setSelectedGraphTraditionId(traditionId);
    setActiveTab('graph');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleOpenDossier = (tradition: Tradition) => {
    setSelectedDossierTradition(tradition);
  };

  const handleOpenContribute = (tradition?: Tradition) => {
    setPreselectedTradition(tradition || null);
    setIsContributeOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({ sortBy: 'recommended' });
  };

  const refreshStats = () => {
    traditionsRepo.getPreservationStats().then(setStats);
  };

  return (
    <div className="portal-page">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenContribute={() => handleOpenContribute()}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        totalTraditions={traditions.length}
        totalDialects={stats.totalDialects}
      />

      {/* Hero — hidden on recorder tab */}
      {activeTab !== 'recorder' && (
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={() => {
            setActiveTab('search');
            const el = document.getElementById('search-portal');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onQuickChipClick={handleQuickChipClick}
          stats={stats}
        />
      )}

      {/* Main Content — single canonical container width */}
      <main className="container">
        {activeTab === 'search' && (
          <SearchPortal
            traditions={traditions}
            activeFilters={filters}
            onFilterChange={setFilters}
            onResetFilters={handleResetFilters}
            facetOptions={facetOptions}
            activePlayingId={isPlaying && activePlayingTradition ? activePlayingTradition.id : null}
            onPlayToggle={handlePlayToggle}
            onOpenDossier={handleOpenDossier}
            onOpenGraphNode={handleOpenGraphNode}
          />
        )}

        {activeTab === 'graph' && (
          <KnowledgeGraph
            graphData={knowledgeGraph}
            traditions={traditions}
            selectedTraditionId={selectedGraphTraditionId}
            onPlayTradition={handlePlayToggle}
            onOpenDossier={handleOpenDossier}
          />
        )}

        {activeTab === 'exhibitions' && (
          <Exhibitions
            exhibitions={exhibitions}
            traditions={traditions}
            onPlayTradition={handlePlayToggle}
          />
        )}

        {activeTab === 'recorder' && <FieldRecorder />}
      </main>

      {/* Persistent dockable audio player */}
      {activePlayingTradition && (
        <AudioPlayer
          tradition={activePlayingTradition}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onClosePlayer={() => {
            setIsPlaying(false);
            setActivePlayingTradition(null);
          }}
        />
      )}

      {/* Deep Archival Dossier Modal */}
      {selectedDossierTradition && (
        <TraditionModal
          tradition={selectedDossierTradition}
          onClose={() => setSelectedDossierTradition(null)}
          onPlay={handlePlayToggle}
          onOpenAnnotate={(t) => {
            setSelectedDossierTradition(null);
            handleOpenContribute(t);
          }}
        />
      )}

      {/* Community Annotation Modal */}
      {isContributeOpen && (
        <ContributeModal
          traditions={traditions}
          preselectedTradition={preselectedTradition}
          onClose={() => setIsContributeOpen(false)}
          onAnnotationSuccess={refreshStats}
        />
      )}

      {/* About Us Modal */}
      {isAboutOpen && <AboutModal onClose={() => setIsAboutOpen(false)} />}

      {/* Volunteer / Staff Auth Modal */}
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}

      {/* Footer */}
      <Footer
        onTabChange={setActiveTab}
        onOpenContribute={() => handleOpenContribute()}
      />
    </div>
  );
};

export default Portal;
