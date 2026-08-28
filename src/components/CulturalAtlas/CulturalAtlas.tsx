import React, { useState } from 'react';
import styles from './CulturalAtlas.module.css';
import { CulturalZone } from '../../data/types';
import { CompassIcon } from '../common/Icons';

interface CulturalAtlasProps {
  zones: CulturalZone[];
  onSelectZoneAndSearch: (zoneName: string) => void;
}

export const CulturalAtlas: React.FC<CulturalAtlasProps> = ({
  zones,
  onSelectZoneAndSearch
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>(zones[0]?.id || 'thamirabarani-coromandel');

  return (
    <section className={styles.atlasContainer} id="cultural-atlas-section">
      <div className="container">
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: 6 }}>
            Geographic <span className="text-gold">Cultural Atlas</span> of Southern Orality
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            Survey the ecological zones, sacred forest corridors, coastal delta estuaries, and pastoral plateaus where South India's oral literatures evolved and are sustained.
          </p>
        </div>

        <div className={styles.atlasGrid}>
          {/* SVG Map Card */}
          <div className={styles.mapCard}>
            <div className={styles.mapSvgWrapper}>
              <svg
                viewBox="0 0 600 650"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              >
                <defs>
                  <radialGradient id="ocean-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(38, 70, 83, 0.25)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>

                {/* Ambient Background Circles */}
                <circle cx="300" cy="330" r="270" fill="url(#ocean-gradient)" />

                {/* Krishna-Godavari Riverine Plains (Andhra / Telangana) */}
                <path
                  d="M 220 180 Q 380 160 410 270 Q 340 340 230 310 Q 200 240 220 180 Z"
                  fill="#d4af37"
                  fillOpacity={selectedZoneId === 'krishna-godavari-riverine' ? 0.85 : 0.38}
                  stroke="#d4af37"
                  strokeWidth="1.5"
                  className={`${styles.zonePath} ${selectedZoneId === 'krishna-godavari-riverine' ? styles.zonePathActive : ''}`}
                  onClick={() => setSelectedZoneId('krishna-godavari-riverine')}
                />

                {/* Coastal Canara & Deccan Plateau (Karnataka) */}
                <path
                  d="M 160 260 Q 240 270 250 410 Q 180 440 150 310 Z"
                  fill="#3b82f6"
                  fillOpacity={selectedZoneId === 'coastal-canara-deccan' ? 0.85 : 0.38}
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  className={`${styles.zonePath} ${selectedZoneId === 'coastal-canara-deccan' ? styles.zonePathActive : ''}`}
                  onClick={() => setSelectedZoneId('coastal-canara-deccan')}
                />

                {/* Malabar Coast & Western Ghats (Kerala) */}
                <path
                  d="M 190 390 Q 240 400 230 570 Q 180 540 180 430 Z"
                  fill="#2a9d8f"
                  fillOpacity={selectedZoneId === 'malabar-western-ghats' ? 0.85 : 0.38}
                  stroke="#2a9d8f"
                  strokeWidth="1.5"
                  className={`${styles.zonePath} ${selectedZoneId === 'malabar-western-ghats' ? styles.zonePathActive : ''}`}
                  onClick={() => setSelectedZoneId('malabar-western-ghats')}
                />

                {/* Thamirabarani & Coromandel Basin (Tamil Nadu) */}
                <path
                  d="M 240 370 Q 360 360 330 550 Q 240 600 230 460 Z"
                  fill="#e07a5f"
                  fillOpacity={selectedZoneId === 'thamirabarani-coromandel' ? 0.85 : 0.38}
                  stroke="#e07a5f"
                  strokeWidth="1.5"
                  className={`${styles.zonePath} ${selectedZoneId === 'thamirabarani-coromandel' ? styles.zonePathActive : ''}`}
                  onClick={() => setSelectedZoneId('thamirabarani-coromandel')}
                />

                {/* Hotspot Indicators */}
                <g style={{ pointerEvents: 'none' }}>
                  <circle cx="280" cy="480" r="5" fill="#fce09b" />
                  <text x="290" y="485" fill="#fce09b" fontSize="11" fontWeight="700">Nellai / Coromandel</text>

                  <circle cx="195" cy="470" r="5" fill="#5eead4" />
                  <text x="135" y="485" fill="#5eead4" fontSize="11" fontWeight="700">Malabar</text>

                  <circle cx="185" cy="330" r="5" fill="#93c5fd" />
                  <text x="120" y="345" fill="#93c5fd" fontSize="11" fontWeight="700">Canara</text>

                  <circle cx="310" cy="240" r="5" fill="#fde047" />
                  <text x="320" y="245" fill="#fde047" fontSize="11" fontWeight="700">Telangana / Rayalaseema</text>
                </g>
              </svg>
            </div>

            <div style={{ marginTop: 14, fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <CompassIcon size={16} color="var(--gold-400)" />
              <span>Click on any cultural zone or card to isolate regional oral traditions</span>
            </div>
          </div>

          {/* Zone Detail Cards List */}
          <div className={styles.zoneCardList}>
            {zones.map((zone) => {
              const isSelected = zone.id === selectedZoneId;
              return (
                <div
                  key={zone.id}
                  className={`${styles.zoneItemCard} ${isSelected ? styles.zoneItemActive : ''}`}
                  style={{ '--zone-color': zone.color } as React.CSSProperties}
                  onClick={() => setSelectedZoneId(zone.id)}
                >
                  <div className={styles.zoneTitleRow}>
                    <div>
                      <h4 className={styles.zoneName}>{zone.name}</h4>
                      <div className={styles.zoneLocalName}>{zone.localName}</div>
                    </div>
                    <span className="badge" style={{ background: `${zone.color}25`, color: zone.color, border: `1px solid ${zone.color}50` }}>
                      {zone.traditionCount} Traditions
                    </span>
                  </div>

                  <p className={styles.zoneDesc}>{zone.description}</p>

                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: 10 }}>
                    <strong>States:</strong> {zone.states.join(', ')}
                  </div>

                  <div className={styles.zoneMetaRow}>
                    <div className={styles.zoneStatsPill}>
                      <span>Instruments: {zone.representativeInstruments.slice(0, 3).join(', ')}</span>
                    </div>

                    <button
                      className={styles.zoneExploreBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectZoneAndSearch(zone.name);
                      }}
                    >
                      Filter by Zone →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
