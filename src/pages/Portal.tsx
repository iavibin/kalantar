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
import { AdminEditModal } from '../components/AdminEditModal/AdminEditModal';
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
  const [activeTab, setActiveTab] = useState<ActiveTab>('search');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FacetFilterState>({
    sortBy: 'recommended'
  });

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
    totalTraditions: 6,
    totalDialects: 6,
    totalAudioHours: 27.2,
    endangeredDocumented: 5,
    hereditaryLineages: 14,
    communityAnnotations: 38
  });

  const [activePlayingTradition, setActivePlayingTradition] = useState<Tradition | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedDossierTradition, setSelectedDossierTradition] = useState<Tradition | null>(null);
  const [editingTradition, setEditingTradition] = useState<Tradition | null>(null);
  const [isContributeOpen, setIsContributeOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [preselectedTradition, setPreselectedTradition] = useState<Tradition | null>(null);
  const [selectedGraphTraditionId, setSelectedGraphTraditionId] = useState<string | null>(null);

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

  const refreshTraditions = async () => {
    const currentFilters: FacetFilterState = { ...filters, searchQuery };
    const [result, updatedStats, kGraph] = await Promise.all([
      traditionsRepo.getTraditions(currentFilters),
      traditionsRepo.getPreservationStats(),
      traditionsRepo.getKnowledgeGraph()
    ]);
    setTraditions(result);
    setStats(updatedStats);
    setKnowledgeGraph(kGraph);
  };

  useEffect(() => {
    const fetchTraditions = async () => {
      const currentFilters: FacetFilterState = { ...filters, searchQuery };
      const result = await traditionsRepo.getTraditions(currentFilters);
      setTraditions(result);
    };
    fetchTraditions();
  }, [filters, searchQuery]);

  const handlePlayToggle = (tradition: Tradition) => {
    if (activePlayingTradition?.id === tradition.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActivePlayingTradition(tradition);
      setIsPlaying(true);
    }
  };

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

  const handleDeleteTradition = async (id: string) => {
    await traditionsRepo.deleteTradition(id);
    if (activePlayingTradition?.id === id) {
      setIsPlaying(false);
      setActivePlayingTradition(null);
    }
    await refreshTraditions();
  };

  const handleSaveEdit = async (id: string, updates: Partial<Tradition>) => {
    await traditionsRepo.updateTradition(id, updates);
    setEditingTradition(null);
    await refreshTraditions();
  };

  return (
    <div className="portal-page">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

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
            onEditTradition={setEditingTradition}
            onDeleteTradition={handleDeleteTradition}
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

      {editingTradition && (
        <AdminEditModal
          tradition={editingTradition}
          onClose={() => setEditingTradition(null)}
          onSave={handleSaveEdit}
        />
      )}

      {isContributeOpen && (
        <ContributeModal
          traditions={traditions}
          preselectedTradition={preselectedTradition}
          onClose={() => setIsContributeOpen(false)}
          onAnnotationSuccess={refreshTraditions}
        />
      )}

      {isAboutOpen && <AboutModal onClose={() => setIsAboutOpen(false)} />}

      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onVolunteerSuccess={() => setActiveTab('recorder')}
        />
      )}

      <Footer
        onTabChange={setActiveTab}
        onOpenContribute={() => handleOpenContribute()}
      />
    </div>
  );
};

export default Portal;
