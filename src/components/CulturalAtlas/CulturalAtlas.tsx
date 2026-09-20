import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  GoogleMap,
  MarkerF as Marker,
  InfoWindowF as InfoWindow,
  useJsApiLoader
} from '@react-google-maps/api';
import styles from './CulturalAtlas.module.css';
import { Tradition } from '../../data/types';
import { GraphIcon, BookOpenIcon, CompassIcon, MapIcon, SatelliteIcon } from '../common/Icons';

interface CulturalAtlasProps {
  traditions: Tradition[];
  onOpenDossier: (tradition: Tradition) => void;
  onOpenGraphNode: (traditionId: string) => void;
}

type MapViewMode = 'all' | 'south';
type BaseLayerType = 'street' | 'satellite';

const LOCAL_STORAGE_LAYER_KEY = 'kalantar_map_layer';

// Google Maps API Key from environment variable (Vite import.meta.env)
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

// Default Framing: All India and South India
const VIEW_FRAMES = {
  all: { center: { lat: 22.0, lng: 79.5 }, zoom: 5 },
  south: { center: { lat: 12.8, lng: 78.5 }, zoom: 7 }
};

// Dark theme map styles tailored to Kalantar's aesthetic
const DARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#0f172a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0f172a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d4af37' }]
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#334155' }]
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#475569' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#94a3b8' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#132338' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1e293b' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#0b1120' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#64748b' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#273549' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#152033' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#182338' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#070c18' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#38bdf8' }]
  }
];

const getEndangermentColor = (statusOrTradition: string | Tradition) => {
  const status =
    typeof statusOrTradition === 'string'
      ? statusOrTradition
      : statusOrTradition.vulnerabilityStatus;
  switch (status) {
    case 'critical':
      return '#ef4444';
    case 'endangered':
      return '#f97316';
    case 'vulnerable':
      return '#eab308';
    default:
      return '#10b981';
  }
};

export const CulturalAtlas: React.FC<CulturalAtlasProps> = ({
  traditions,
  onOpenDossier,
  onOpenGraphNode
}) => {
  const [viewMode, setViewMode] = useState<MapViewMode>('all');
  const [baseLayer, setBaseLayer] = useState<BaseLayerType>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_LAYER_KEY);
      if (saved === 'satellite' || saved === 'street') return saved;
    } catch {
      // Ignore local storage errors
    }
    return 'street';
  });

  const traditionsWithCoords = useMemo(() => {
    return traditions.filter((t) => t.coordinates && t.coordinates.lat && t.coordinates.lng);
  }, [traditions]);

  const [activeTraditionId, setActiveTraditionId] = useState<string>(
    traditionsWithCoords[0]?.id || ''
  );

  const [selectedPopupTradition, setSelectedPopupTradition] = useState<Tradition | null>(
    () => traditionsWithCoords[0] || null
  );

  const activeTradition = useMemo(() => {
    return (
      traditionsWithCoords.find((t) => t.id === activeTraditionId) ||
      traditionsWithCoords[0] ||
      null
    );
  }, [traditionsWithCoords, activeTraditionId]);

  const mapRef = useRef<google.maps.Map | null>(null);

  // Load Google Maps JavaScript API via @react-google-maps/api
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onMapUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  // Base layer switcher: Street (Dark styled roadmap) vs Satellite (Hybrid imagery)
  const handleLayerChange = (layer: BaseLayerType) => {
    if (layer === baseLayer) return;
    setBaseLayer(layer);
    try {
      localStorage.setItem(LOCAL_STORAGE_LAYER_KEY, layer);
    } catch {
      // Ignore
    }
    if (mapRef.current) {
      mapRef.current.setMapTypeId(layer === 'satellite' ? 'hybrid' : 'roadmap');
    }
  };

  // View mode switcher: All India framing vs South India focus
  const handleViewModeChange = (mode: MapViewMode) => {
    setViewMode(mode);
    if (!mapRef.current) return;

    const frame = VIEW_FRAMES[mode];
    mapRef.current.panTo(frame.center);
    mapRef.current.setZoom(frame.zoom);
  };

  // Marker click handler
  const handleMarkerClick = (tradition: Tradition) => {
    setActiveTraditionId(tradition.id);
    setSelectedPopupTradition(tradition);
    if (mapRef.current && tradition.coordinates) {
      mapRef.current.panTo({
        lat: tradition.coordinates.lat,
        lng: tradition.coordinates.lng
      });
    }
  };

  // Select tradition from quick sidebar list and focus on map
  const handleSelectFromList = (tradition: Tradition) => {
    setActiveTraditionId(tradition.id);
    setSelectedPopupTradition(tradition);
    if (mapRef.current && tradition.coordinates) {
      mapRef.current.panTo({
        lat: tradition.coordinates.lat,
        lng: tradition.coordinates.lng
      });
      mapRef.current.setZoom(Math.max(mapRef.current.getZoom() || 7, 7));
    }
  };

  // SVG Marker Generator
  const getMarkerIcon = useCallback(
    (tradition: Tradition, isSelected: boolean) => {
      const pinColor = getEndangermentColor(tradition.vulnerabilityStatus);
      const stroke = isSelected ? '#ffffff' : '#090d16';
      const strokeWidth = isSelected ? 2.5 : 1.5;
      const r = isSelected ? 9 : 7;
      const haloR = isSelected ? 16 : 12;
      const haloOpacity = isSelected ? 0.35 : 0.18;

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="${haloR}" fill="${pinColor}" fill-opacity="${haloOpacity}" />
        <circle cx="18" cy="18" r="${r}" fill="${pinColor}" stroke="${stroke}" stroke-width="${strokeWidth}" />
        <circle cx="18" cy="18" r="2.5" fill="#ffffff" />
      </svg>`;

      return {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
        scaledSize: typeof google !== 'undefined' && google.maps ? new google.maps.Size(36, 36) : undefined,
        anchor: typeof google !== 'undefined' && google.maps ? new google.maps.Point(18, 18) : undefined
      };
    },
    []
  );

  // Map Options
  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      styles: baseLayer === 'street' ? DARK_MAP_STYLES : undefined,
      mapTypeId: baseLayer === 'satellite' ? 'hybrid' : 'roadmap',
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      gestureHandling: 'cooperative',
      minZoom: 4,
      maxZoom: 18
    }),
    [baseLayer]
  );

  return (
    <section className={styles.atlasContainer} id="cultural-atlas-map">
      <div className={styles.atlasHeader}>
        <div className={styles.headerTop}>
          <div>
            <h2 className={styles.title}>
              Cultural Lore <span className={styles.titleHighlight}>Map</span>
            </h2>
            <p className={styles.subtitle}>
              Geospatial cartography of India's living bardic epic traditions. Explore ancestral lineages,
              oral dialects, and endangered performance sites anchored across river basins, deserts, and coastal ghats.
            </p>
          </div>

          <div className={styles.viewControls}>
            <button
              className={`${styles.viewBtn} ${viewMode === 'all' ? styles.viewBtnActive : ''}`}
              onClick={() => handleViewModeChange('all')}
              id="btn-map-all-india"
            >
              All India View
            </button>
            <button
              className={`${styles.viewBtn} ${viewMode === 'south' ? styles.viewBtnActive : ''}`}
              onClick={() => handleViewModeChange('south')}
              id="btn-map-south-india"
            >
              South India Focus
            </button>
          </div>
        </div>
      </div>

      <div className={styles.atlasLayout}>
        {/* Main Map Card */}
        <div className={styles.mapCard}>
          <div className={styles.mapViewport}>
            <div className={styles.mapContainer}>
              {!GOOGLE_MAPS_API_KEY ? (
                <div className={styles.apiKeyNotice}>
                  <MapIcon size={36} color="var(--text-gold)" />
                  <h3 className={styles.apiKeyNoticeTitle}>Google Maps API Key Required</h3>
                  <p className={styles.apiKeyNoticeText}>
                    To display the interactive Cultural Lore Map, please provide a valid{' '}
                    <code>VITE_GOOGLE_MAPS_API_KEY</code> in your <code>.env</code> file.
                  </p>
                  <span className={styles.apiKeyHint}>
                    See <code>README.md</code> for environment setup and Google Cloud domain restriction instructions.
                  </span>
                </div>
              ) : loadError ? (
                <div className={styles.apiKeyNotice}>
                  <CompassIcon size={36} color="var(--text-saffron)" />
                  <h3 className={styles.apiKeyNoticeTitle}>Unable to Load Google Maps</h3>
                  <p className={styles.apiKeyNoticeText}>
                    Failed to initialize the Google Maps JavaScript API. Please check your network connection
                    and verify that your API key is authorized for this domain.
                  </p>
                </div>
              ) : !isLoaded ? (
                <div className={styles.mapLoading}>
                  <div className={styles.loadingSpinner} />
                  <span>Loading Cultural Lore Map...</span>
                </div>
              ) : (
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={VIEW_FRAMES[viewMode].center}
                  zoom={VIEW_FRAMES[viewMode].zoom}
                  options={mapOptions}
                  onLoad={onMapLoad}
                  onUnmount={onMapUnmount}
                >
                  {traditionsWithCoords.map((tradition) => {
                    const isSelected = tradition.id === activeTraditionId;
                    return (
                      <Marker
                        key={tradition.id}
                        position={{
                          lat: tradition.coordinates!.lat,
                          lng: tradition.coordinates!.lng
                        }}
                        title={tradition.title}
                        icon={getMarkerIcon(tradition, isSelected)}
                        onClick={() => handleMarkerClick(tradition)}
                      />
                    );
                  })}

                  {selectedPopupTradition && selectedPopupTradition.coordinates && (
                    <InfoWindow
                      position={{
                        lat: selectedPopupTradition.coordinates.lat,
                        lng: selectedPopupTradition.coordinates.lng
                      }}
                      onCloseClick={() => setSelectedPopupTradition(null)}
                    >
                      <div className={styles.popupCard}>
                        <div className={styles.popupBadgeRow}>
                          <span
                            className={styles.popupStatusBadge}
                            style={{
                              color: getEndangermentColor(selectedPopupTradition),
                              borderColor: `${getEndangermentColor(selectedPopupTradition)}60`,
                              background: `${getEndangermentColor(selectedPopupTradition)}18`
                            }}
                          >
                            {selectedPopupTradition.vulnerabilityStatus.toUpperCase()} VITALITY
                          </span>
                          <span className={styles.popupCoords}>
                            {selectedPopupTradition.coordinates.lat.toFixed(2)}°N,{' '}
                            {selectedPopupTradition.coordinates.lng.toFixed(2)}°E
                          </span>
                        </div>

                        <h3 className={styles.popupTitle}>{selectedPopupTradition.title}</h3>
                        {selectedPopupTradition.vernacularTitle && (
                          <div className={styles.popupVernacular}>
                            {selectedPopupTradition.vernacularTitle}
                          </div>
                        )}

                        <div className={styles.popupRegion}>
                          <strong>Location:</strong> {selectedPopupTradition.region},{' '}
                          {selectedPopupTradition.state}
                        </div>

                        <p className={styles.popupSummary}>{selectedPopupTradition.summary}</p>

                        <div className={styles.popupActions}>
                          <button
                            type="button"
                            className={styles.popupDossierBtn}
                            onClick={() => onOpenDossier(selectedPopupTradition)}
                          >
                            Open Lore Dossier
                          </button>
                          <button
                            type="button"
                            className={styles.popupGraphBtn}
                            onClick={() => onOpenGraphNode(selectedPopupTradition.id)}
                          >
                            Knowledge Graph
                          </button>
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              )}
            </div>

            {/* Google Maps-Style Floating Base Layer Switcher */}
            <div className={styles.layerSwitcher} role="group" aria-label="Map Base Layer">
              <button
                type="button"
                className={`${styles.layerBtn} ${baseLayer === 'street' ? styles.layerBtnActive : ''}`}
                onClick={() => handleLayerChange('street')}
                id="btn-layer-street"
                aria-pressed={baseLayer === 'street'}
              >
                <MapIcon size={14} />
                <span>Map</span>
              </button>
              <button
                type="button"
                className={`${styles.layerBtn} ${baseLayer === 'satellite' ? styles.layerBtnActive : ''}`}
                onClick={() => handleLayerChange('satellite')}
                id="btn-layer-satellite"
                aria-pressed={baseLayer === 'satellite'}
              >
                <SatelliteIcon size={14} />
                <span>Satellite</span>
              </button>
            </div>
          </div>

          <div className={styles.mapFooterNote}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <CompassIcon size={15} color="var(--text-gold)" />
              <span>Click on any marker pin to inspect the oral tradition dossier</span>
            </div>

            <div className={styles.mapLegend}>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: '#ef4444' }} />
                <span>Critical</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: '#f97316' }} />
                <span>Endangered</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: '#eab308' }} />
                <span>Vulnerable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Side Tradition Inspector Drawer */}
        <div className={styles.sideDrawer}>
          {activeTradition && (
            <div className={styles.inspectCard}>
              <div className={styles.cardBadgeRow}>
                <span
                  className={styles.statusBadge}
                  style={{
                    background: `${getEndangermentColor(activeTradition)}20`,
                    color: getEndangermentColor(activeTradition),
                    border: `1px solid ${getEndangermentColor(activeTradition)}50`
                  }}
                >
                  {activeTradition.vulnerabilityStatus.toUpperCase()} VITALITY
                </span>

                {activeTradition.coordinates && (
                  <span className={styles.coordPill}>
                    <CompassIcon size={11} />
                    {activeTradition.coordinates.lat.toFixed(2)}°N, {activeTradition.coordinates.lng.toFixed(2)}°E
                  </span>
                )}
              </div>

              <h3 className={styles.inspectTitle}>{activeTradition.title}</h3>
              {activeTradition.vernacularTitle && (
                <div className={styles.inspectVernacular}>
                  {activeTradition.vernacularTitle}
                </div>
              )}

              <div className={styles.inspectRegion}>
                <strong>Location:</strong> {activeTradition.region}, {activeTradition.state}
              </div>

              <p className={styles.inspectSummary}>{activeTradition.summary}</p>

              <div className={styles.inspectMetaList}>
                <div className={styles.inspectMetaItem}>
                  <strong>Lead Bard:</strong> {activeTradition.performerLineage.leadPerformer} (Age {activeTradition.practitionerAge})
                </div>
                <div className={styles.inspectMetaItem}>
                  <strong>Sacred Instruments:</strong> {activeTradition.instruments.join(', ')}
                </div>
                <div className={styles.inspectMetaItem}>
                  <strong>Cultural Zone:</strong> {activeTradition.culturalZone}
                </div>
              </div>

              <div className={styles.actionButtons}>
                <button
                  className={styles.primaryDossierBtn}
                  onClick={() => onOpenDossier(activeTradition)}
                  id="btn-map-open-dossier"
                >
                  <BookOpenIcon size={15} />
                  <span>Open Lore Dossier</span>
                </button>

                <button
                  className={styles.graphSecondaryBtn}
                  onClick={() => onOpenGraphNode(activeTradition.id)}
                  id="btn-map-view-graph"
                >
                  <GraphIcon size={14} />
                  <span>View in Knowledge Graph</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick List of All Geocoded Traditions */}
          <div className={styles.traditionsListCard}>
            <div className={styles.listHeader}>
              Archived Traditions by Coordinate ({traditionsWithCoords.length})
            </div>

            <div className={styles.listScroll}>
              {traditionsWithCoords.map((t) => {
                const isSelected = activeTradition?.id === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    className={`${styles.listItem} ${isSelected ? styles.listItemActive : ''}`}
                    onClick={() => handleSelectFromList(t)}
                  >
                    <div>
                      <div className={styles.listItemTitle}>{t.title}</div>
                      <div className={styles.listItemRegion}>
                        {t.dialect} • {t.state}
                      </div>
                    </div>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: getEndangermentColor(t)
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalAtlas;
