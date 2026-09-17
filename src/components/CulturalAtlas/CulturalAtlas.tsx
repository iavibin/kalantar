import React, { useState, useMemo } from 'react';
import styles from './CulturalAtlas.module.css';
import { Tradition } from '../../data/types';
import { MapIcon, GraphIcon, BookOpenIcon, CompassIcon } from '../common/Icons';

interface CulturalAtlasProps {
  traditions: Tradition[];
  onOpenDossier: (tradition: Tradition) => void;
  onOpenGraphNode: (traditionId: string) => void;
}

type MapViewMode = 'all' | 'south';

export const CulturalAtlas: React.FC<CulturalAtlasProps> = ({
  traditions,
  onOpenDossier,
  onOpenGraphNode
}) => {
  const [viewMode, setViewMode] = useState<MapViewMode>('all');

  // Filter traditions that have coordinates
  const traditionsWithCoords = useMemo(() => {
    return traditions.filter((t) => t.coordinates && t.coordinates.lat && t.coordinates.lng);
  }, [traditions]);

  const [activeTraditionId, setActiveTraditionId] = useState<string>(
    traditionsWithCoords[0]?.id || ''
  );

  const activeTradition = useMemo(() => {
    return (
      traditionsWithCoords.find((t) => t.id === activeTraditionId) ||
      traditionsWithCoords[0] ||
      null
    );
  }, [traditionsWithCoords, activeTraditionId]);

  // Map coordinate boundaries
  const bounds = useMemo(() => {
    if (viewMode === 'south') {
      return {
        minLat: 7.5,
        maxLat: 15.5,
        minLng: 74.0,
        maxLng: 82.5,
        svgWidth: 800,
        svgHeight: 650,
        padX: 70,
        padY: 60
      };
    }
    return {
      minLat: 6.5,
      maxLat: 33.5,
      minLng: 68.0,
      maxLng: 92.0,
      svgWidth: 800,
      svgHeight: 650,
      padX: 70,
      padY: 55
    };
  }, [viewMode]);

  // Linear projection from (lat, lng) to SVG (x, y)
  const projectCoords = (lat: number, lng: number) => {
    const { minLat, maxLat, minLng, maxLng, svgWidth, svgHeight, padX, padY } = bounds;
    const innerW = svgWidth - padX * 2;
    const innerH = svgHeight - padY * 2;

    const clampedLng = Math.max(minLng, Math.min(maxLng, lng));
    const clampedLat = Math.max(minLat, Math.min(maxLat, lat));

    const x = padX + ((clampedLng - minLng) / (maxLng - minLng)) * innerW;
    const y = padY + ((maxLat - clampedLat) / (maxLat - minLat)) * innerH;

    return { x, y };
  };

  const getEndangermentColor = (t: Tradition) => {
    switch (t.vulnerabilityStatus) {
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
              onClick={() => setViewMode('all')}
              id="btn-map-all-india"
            >
              All India View
            </button>
            <button
              className={`${styles.viewBtn} ${viewMode === 'south' ? styles.viewBtnActive : ''}`}
              onClick={() => setViewMode('south')}
              id="btn-map-south-india"
            >
              South India Focus
            </button>
          </div>
        </div>
      </div>

      <div className={styles.atlasLayout}>
        {/* Main SVG Map Card */}
        <div className={styles.mapCard}>
          <div className={styles.mapSvgWrapper}>
            <svg
              viewBox="0 0 800 650"
              className={styles.mapSvg}
              aria-label="Map of Indian Oral Tradition Performance Sites"
            >
              <defs>
                <radialGradient id="oceanGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(38, 70, 83, 0.35)" />
                  <stop offset="100%" stopColor="rgba(9, 13, 22, 0.1)" />
                </radialGradient>

                <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#18233c" />
                  <stop offset="50%" stopColor="#121b2d" />
                  <stop offset="100%" stopColor="#0c1322" />
                </linearGradient>

                <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Ocean Ambient Glow */}
              <circle cx="400" cy="340" r="320" fill="url(#oceanGrad)" />

              {/* Graticule Grid Lines */}
              <g className={styles.graticuleGroup}>
                {[10, 15, 20, 25, 30].map((latDeg) => {
                  if (latDeg < bounds.minLat || latDeg > bounds.maxLat) return null;
                  const { y } = projectCoords(latDeg, bounds.minLng);
                  return (
                    <g key={`lat-${latDeg}`}>
                      <line
                        x1="40"
                        y1={y}
                        x2="760"
                        y2={y}
                        className={styles.graticuleLine}
                      />
                      <text x="45" y={y - 4} className={styles.graticuleLabel}>
                        {latDeg}° N
                      </text>
                    </g>
                  );
                })}

                {[72, 76, 80, 84, 88].map((lngDeg) => {
                  if (lngDeg < bounds.minLng || lngDeg > bounds.maxLng) return null;
                  const { x } = projectCoords(bounds.minLat, lngDeg);
                  return (
                    <g key={`lng-${lngDeg}`}>
                      <line
                        x1={x}
                        y1="40"
                        x2={x}
                        y2="610"
                        className={styles.graticuleLine}
                      />
                      <text x={x + 4} y="625" className={styles.graticuleLabel}>
                        {lngDeg}° E
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* SVG Map Outlines */}
              {viewMode === 'all' ? (
                /* All India Cartographic Outline */
                <g>
                  {/* Indian Subcontinent Landmass Silhouette */}
                  <path
                    d="M 370 70 
                       C 385 75, 410 95, 430 115 
                       C 450 135, 480 150, 520 170 
                       C 560 190, 610 195, 660 210 
                       C 680 220, 685 240, 665 255 
                       C 630 265, 600 270, 575 285 
                       C 560 300, 555 330, 545 365 
                       C 535 405, 510 460, 480 505 
                       C 450 550, 415 585, 375 620 
                       C 365 625, 355 620, 350 605 
                       C 335 560, 320 500, 310 440 
                       C 300 380, 280 340, 240 320 
                       C 215 310, 195 295, 190 270 
                       C 185 240, 210 215, 235 190 
                       C 260 165, 290 140, 320 110 
                       C 345 85, 360 70, 370 70 Z"
                    fill="url(#landGrad)"
                    className={styles.landMass}
                  />

                  {/* Sri Lanka Outline */}
                  <ellipse
                    cx="410"
                    cy="625"
                    rx="14"
                    ry="22"
                    fill="#18233c"
                    stroke="rgba(212, 175, 55, 0.25)"
                    strokeWidth="1"
                  />

                  {/* Water Body Labels */}
                  <text x="140" y="470" className={styles.oceanLabel}>Arabian Sea</text>
                  <text x="590" y="450" className={styles.oceanLabel}>Bay of Bengal</text>
                  <text x="320" y="640" className={styles.oceanLabel}>Indian Ocean</text>

                  {/* Geographic Context Hints */}
                  <text x="210" y="240" className={styles.regionLabel}>Thar Desert</text>
                  <text x="610" y="270" className={styles.regionLabel}>Rarh Bengal</text>
                  <text x="360" y="540" className={styles.regionLabel}>Coromandel / Thamirabarani</text>
                </g>
              ) : (
                /* South India Focused Cartographic Silhouette */
                <g>
                  {/* Peninsular South India (Deccan, Western Ghats, Coromandel, Kaveri, Malabar) */}
                  <path
                    d="M 120 70 
                       Q 400 50 680 90 
                       C 670 180, 640 260, 600 350 
                       C 560 440, 500 520, 440 575 
                       C 400 610, 360 625, 340 625 
                       C 320 620, 300 590, 280 540 
                       C 250 460, 220 380, 190 280 
                       C 160 180, 130 110, 120 70 Z"
                    fill="url(#landGrad)"
                    className={styles.landMass}
                  />

                  {/* Sri Lanka Outline */}
                  <ellipse
                    cx="530"
                    cy="590"
                    rx="32"
                    ry="46"
                    fill="#18233c"
                    stroke="rgba(212, 175, 55, 0.3)"
                    strokeWidth="1.5"
                  />

                  {/* South India Region Text */}
                  <text x="110" y="420" className={styles.oceanLabel}>Malabar Coast</text>
                  <text x="580" y="320" className={styles.oceanLabel}>Coromandel Basin</text>
                  <text x="340" y="160" className={styles.regionLabel}>Deccan Plateau</text>
                  <text x="360" y="320" className={styles.regionLabel}>Kaveri River Basin</text>
                </g>
              )}

              {/* Map Pins for Traditions */}
              {traditionsWithCoords.map((tradition) => {
                const { lat, lng } = tradition.coordinates!;
                const { x, y } = projectCoords(lat, lng);
                const isSelected = activeTradition?.id === tradition.id;
                const pinColor = getEndangermentColor(tradition);

                return (
                  <g
                    key={tradition.id}
                    className={`${styles.pinGroup} ${isSelected ? styles.pinGroupActive : ''}`}
                    style={{ '--pin-color': pinColor } as React.CSSProperties}
                    onClick={() => setActiveTraditionId(tradition.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${tradition.title} marker at ${tradition.region}`}
                  >
                    {/* Animated Pulsing Ring */}
                    <circle
                      cx={x}
                      cy={y}
                      r="12"
                      fill={pinColor}
                      className={styles.pulseCircle}
                      style={{ animationDuration: isSelected ? '1.6s' : '3s' }}
                    />

                    {/* Ground Marker Base */}
                    <ellipse
                      cx={x}
                      cy={y + 10}
                      rx="7"
                      ry="3.5"
                      fill="rgba(0, 0, 0, 0.5)"
                    />

                    {/* Pin Needle Stem */}
                    <line
                      x1={x}
                      y1={y}
                      x2={x}
                      y2={y + 10}
                      stroke={pinColor}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Pin Head Teardrop */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 9 : 7}
                      fill={pinColor}
                      className={styles.pinHead}
                    />

                    {/* Inner White Core */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 3.5 : 2.5}
                      fill="#ffffff"
                    />

                    {/* Pin Name Tag */}
                    <g
                      className={styles.pinLabelTag}
                      transform={`translate(${x + 12}, ${y - 12})`}
                    >
                      <rect
                        x="0"
                        y="0"
                        width={Math.max(90, tradition.dialect.length * 6.8 + 14)}
                        height="20"
                        className={styles.pinLabelRect}
                      />
                      <text x="8" y="14" className={styles.pinLabelText}>
                        {tradition.dialect}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
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
                {/* Primary Action: Open Tradition Detail View (TraditionModal) */}
                <button
                  className={styles.primaryDossierBtn}
                  onClick={() => onOpenDossier(activeTradition)}
                  id="btn-map-open-dossier"
                >
                  <BookOpenIcon size={15} />
                  <span>Open Lore Dossier</span>
                </button>

                {/* Secondary Action: View in Knowledge Graph */}
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
                  <div
                    key={t.id}
                    className={`${styles.listItem} ${isSelected ? styles.listItemActive : ''}`}
                    onClick={() => setActiveTraditionId(t.id)}
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
                  </div>
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
