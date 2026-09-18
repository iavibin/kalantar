import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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

const STREET_TILE_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const STREET_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>';

const SATELLITE_TILE_URL =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const SATELLITE_ATTRIBUTION =
  'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

const SATELLITE_LABELS_URL =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png';

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

const escapeHtml = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
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

  const activeTradition = useMemo(() => {
    return traditionsWithCoords.find((t) => t.id === activeTraditionId) || traditionsWithCoords[0] || null;
  }, [traditionsWithCoords, activeTraditionId]);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const streetLayerRef = useRef<L.TileLayer | null>(null);
  const satelliteGroupRef = useRef<L.LayerGroup | null>(null);
  const markersLayerRef = useRef<L.FeatureGroup | null>(null);
  const markerMapRef = useRef<Map<string, L.Marker>>(new Map());

  // Initialize Leaflet Map Instance
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [22.0, 79.5],
      zoom: 5,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: false
    });

    L.control.zoom({ position: 'topleft' }).addTo(map);

    const streetLayer = L.tileLayer(STREET_TILE_URL, {
      attribution: STREET_ATTRIBUTION,
      subdomains: 'abcd',
      maxZoom: 19
    });
    streetLayerRef.current = streetLayer;

    const satelliteBase = L.tileLayer(SATELLITE_TILE_URL, {
      attribution: SATELLITE_ATTRIBUTION,
      maxZoom: 19
    });

    const satelliteLabels = L.tileLayer(SATELLITE_LABELS_URL, {
      subdomains: 'abcd',
      maxZoom: 19,
      pane: 'overlayPane'
    });

    const satelliteGroup = L.layerGroup([satelliteBase, satelliteLabels]);
    satelliteGroupRef.current = satelliteGroup;

    if (baseLayer === 'satellite') {
      satelliteGroup.addTo(map);
    } else {
      streetLayer.addTo(map);
    }

    const markersLayer = L.featureGroup().addTo(map);
    markersLayerRef.current = markersLayer;

    mapInstanceRef.current = map;

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Base layer switcher: toggles TileLayer seamlessly without resetting center or zoom
  const handleLayerChange = (layer: BaseLayerType) => {
    if (layer === baseLayer) return;
    setBaseLayer(layer);
    try {
      localStorage.setItem(LOCAL_STORAGE_LAYER_KEY, layer);
    } catch {
      // Ignore
    }

    const map = mapInstanceRef.current;
    const streetLayer = streetLayerRef.current;
    const satelliteGroup = satelliteGroupRef.current;

    if (map && streetLayer && satelliteGroup) {
      if (layer === 'street') {
        if (map.hasLayer(satelliteGroup)) {
          map.removeLayer(satelliteGroup);
        }
        if (!map.hasLayer(streetLayer)) {
          map.addLayer(streetLayer);
        }
      } else {
        if (map.hasLayer(streetLayer)) {
          map.removeLayer(streetLayer);
        }
        if (!map.hasLayer(satelliteGroup)) {
          map.addLayer(satelliteGroup);
        }
      }
    }
  };

  // Top view mode switcher: smoothly animates camera to nationwide or southern peninsular view
  const handleViewModeChange = (mode: MapViewMode) => {
    setViewMode(mode);
    const map = mapInstanceRef.current;
    if (!map) return;

    if (mode === 'south') {
      map.flyTo([12.8, 78.5], 7, { duration: 1.2 });
    } else {
      map.flyTo([22.0, 79.5], 5, { duration: 1.2 });
    }
  };

  // Create High-Contrast Custom DivIcon for tradition markers
  const createMarkerIcon = (tradition: Tradition, isSelected: boolean) => {
    const pinColor = getEndangermentColor(tradition.vulnerabilityStatus);
    const activeClass = isSelected ? styles.markerSelected : '';
    const dialectText = escapeHtml(tradition.dialect || tradition.title);

    return L.divIcon({
      className: styles.markerIconWrapper,
      html: `
        <div class="${styles.markerPin} ${activeClass}" style="--pin-color: ${pinColor};" role="button" aria-label="${escapeHtml(tradition.title)}">
          <div class="${styles.markerPinBody}">
            <div class="${styles.markerHalo}"></div>
            <div class="${styles.markerPulse}"></div>
            <div class="${styles.markerHead}">
              <div class="${styles.markerCore}"></div>
            </div>
            <div class="${styles.markerStem}"></div>
          </div>
          <div class="${styles.markerBadge}">
            <span class="${styles.markerBadgeDot}" style="background-color: ${pinColor};"></span>
            <span class="${styles.markerBadgeText}">${dialectText}</span>
          </div>
        </div>
      `,
      iconSize: [140, 40],
      iconAnchor: [14, 34],
      popupAnchor: [14, -36]
    });
  };

  // Create popup HTML with lore dossier and knowledge graph actions
  const createPopupHtml = (tradition: Tradition) => {
    const pinColor = getEndangermentColor(tradition.vulnerabilityStatus);
    const coords = tradition.coordinates
      ? `${tradition.coordinates.lat.toFixed(2)}°N, ${tradition.coordinates.lng.toFixed(2)}°E`
      : '';

    return `
      <div class="${styles.popupCard}">
        <div class="${styles.popupBadgeRow}">
          <span class="${styles.popupStatusBadge}" style="color: ${pinColor}; border-color: ${pinColor}60; background: ${pinColor}18;">
            ${tradition.vulnerabilityStatus.toUpperCase()} VITALITY
          </span>
          ${coords ? `<span class="${styles.popupCoords}">${coords}</span>` : ''}
        </div>
        <h3 class="${styles.popupTitle}">${escapeHtml(tradition.title)}</h3>
        ${
          tradition.vernacularTitle
            ? `<div class="${styles.popupVernacular}">${escapeHtml(tradition.vernacularTitle)}</div>`
            : ''
        }
        <div class="${styles.popupRegion}">
          <strong>Location:</strong> ${escapeHtml(tradition.region)}, ${escapeHtml(tradition.state)}
        </div>
        <p class="${styles.popupSummary}">${escapeHtml(tradition.summary)}</p>
        <div class="${styles.popupActions}">
          <button type="button" class="${styles.popupDossierBtn}" data-action="dossier" data-id="${tradition.id}">
            Open Lore Dossier
          </button>
          <button type="button" class="${styles.popupGraphBtn}" data-action="graph" data-id="${tradition.id}">
            Knowledge Graph
          </button>
        </div>
      </div>
    `;
  };

  // Render and sync markers on coordinate changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();
    markerMapRef.current.clear();

    traditionsWithCoords.forEach((t) => {
      const isSelected = t.id === activeTraditionId;
      const icon = createMarkerIcon(t, isSelected);
      const marker = L.marker([t.coordinates!.lat, t.coordinates!.lng], {
        icon,
        riseOnHover: true
      });

      marker.bindPopup(createPopupHtml(t), {
        maxWidth: 340,
        minWidth: 260
      });

      marker.on('click', () => {
        setActiveTraditionId(t.id);
      });

      marker.addTo(markersLayer);
      markerMapRef.current.set(t.id, marker);
    });
  }, [traditionsWithCoords, activeTraditionId]);

  // Handle action buttons inside Leaflet popups
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const handlePopupOpen = (e: L.PopupEvent) => {
      const popupEl = e.popup.getElement();
      if (!popupEl) return;

      const dossierBtn = popupEl.querySelector('button[data-action="dossier"]');
      const graphBtn = popupEl.querySelector('button[data-action="graph"]');
      const id = dossierBtn?.getAttribute('data-id') || graphBtn?.getAttribute('data-id');
      if (!id) return;

      const tradition = traditions.find((t) => t.id === id);
      if (!tradition) return;

      if (dossierBtn) {
        dossierBtn.addEventListener('click', (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          onOpenDossier(tradition);
        });
      }

      if (graphBtn) {
        graphBtn.addEventListener('click', (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          onOpenGraphNode(id);
        });
      }
    };

    map.on('popupopen', handlePopupOpen);
    return () => {
      map.off('popupopen', handlePopupOpen);
    };
  }, [traditions, onOpenDossier, onOpenGraphNode]);

  // Select tradition from quick sidebar list and focus on map
  const handleSelectFromList = (tradition: Tradition) => {
    setActiveTraditionId(tradition.id);
    const map = mapInstanceRef.current;
    if (map && tradition.coordinates) {
      map.flyTo([tradition.coordinates.lat, tradition.coordinates.lng], Math.max(map.getZoom(), 7), {
        duration: 1.0
      });
      const marker = markerMapRef.current.get(tradition.id);
      if (marker) {
        marker.openPopup();
      }
    }
  };

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
            <div className={styles.mapContainer} ref={mapContainerRef} />

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
