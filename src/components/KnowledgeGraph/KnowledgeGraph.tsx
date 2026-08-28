import React, { useState, useEffect, useRef } from 'react';
import styles from './KnowledgeGraph.module.css';
import { KnowledgeNode, KnowledgeEdge, Tradition } from '../../data/types';
import { calculateEndangermentScore, getEndangermentLevel } from '../../data/endangermentScore';
import { PlayIcon, BookOpenIcon } from '../common/Icons';

interface KnowledgeGraphProps {
  graphData: { nodes: KnowledgeNode[]; edges: KnowledgeEdge[] };
  traditions: Tradition[];
  selectedTraditionId?: string | null;
  onPlayTradition: (tradition: Tradition) => void;
  onOpenDossier: (tradition: Tradition) => void;
}

interface SimulatedNode extends KnowledgeNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  score: number;
  level: string;
}

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({
  traditions,
  selectedTraditionId,
  onPlayTradition,
  onOpenDossier
}) => {
  const [nodes, setNodes] = useState<SimulatedNode[]>([]);
  const [edges, setEdges] = useState<KnowledgeEdge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [filterLevel, setFilterLevel] = useState<'all' | 'Critical' | 'At Risk' | 'Stable'>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);

  const containerRef = useRef<SVGSVGElement | null>(null);

  // Initialize force-directed layout from traditions and relatedIds
  useEffect(() => {
    const width = 800;
    const height = 560;
    const centerX = width / 2;
    const centerY = height / 2;

    const initialNodes: SimulatedNode[] = traditions.map((t, idx) => {
      const score = calculateEndangermentScore(t);
      const level = getEndangermentLevel(score);
      const radius = Math.round(16 + (score / 100) * 16); // 16px to 32px based on score
      const color = level === 'Critical' ? '#ef4444' : level === 'At Risk' ? '#f97316' : '#10b981';

      const angle = (idx / traditions.length) * 2 * Math.PI;
      const dist = 180 + (idx % 3) * 35;

      return {
        id: t.id,
        label: t.title.split(' (')[0],
        type: 'tradition',
        traditionId: t.id,
        description: `Score: ${score}/100 (${level}) • ${t.dialect}, ${t.region}`,
        count: score,
        color,
        score,
        level,
        x: centerX + Math.cos(angle) * dist + (Math.random() * 20 - 10),
        y: centerY + Math.sin(angle) * dist + (Math.random() * 20 - 10),
        vx: 0,
        vy: 0,
        radius
      };
    });

    const initialEdges: KnowledgeEdge[] = [];
    const edgeSet = new Set<string>();

    traditions.forEach((t) => {
      t.relatedIds.forEach((relId) => {
        const edgeKey = [t.id, relId].sort().join('--');
        if (!edgeSet.has(edgeKey) && traditions.some((x) => x.id === relId)) {
          edgeSet.add(edgeKey);
          initialEdges.push({
            source: t.id,
            target: relId,
            relation: 'related_tradition',
            weight: 3
          });
        }
      });
    });

    setNodes(initialNodes);
    setEdges(initialEdges);

    if (selectedTraditionId) {
      setSelectedNodeId(selectedTraditionId);
    } else {
      setSelectedNodeId(initialNodes[0]?.id || null);
    }
  }, [traditions, selectedTraditionId]);

  // Handle Dragging
  const handleMouseDown = (nodeId: string) => {
    setDraggingNodeId(nodeId);
    setSelectedNodeId(nodeId);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggingNodeId || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoomLevel;
    const y = (e.clientY - rect.top) / zoomLevel;

    setNodes((prev) =>
      prev.map((n) => (n.id === draggingNodeId ? { ...n, x, y } : n))
    );
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  // Find active node and connected elements
  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];
  
  const connectedEdges = edges.filter(
    (e) => e.source === selectedNodeId || e.target === selectedNodeId
  );

  const connectedNodeIds = new Set<string>();
  connectedEdges.forEach((e) => {
    connectedNodeIds.add(e.source);
    connectedNodeIds.add(e.target);
  });

  const matchedTradition = traditions.find((t) => t.id === selectedNodeId);

  const visibleNodes = nodes.filter((n) => {
    if (filterLevel === 'all') return true;
    return n.level === filterLevel;
  });

  return (
    <section className={styles.graphContainer} id="knowledge-graph-section">
      <div className="container">
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: 6 }}>
            Cross-Tradition <span className="text-gold">Oral Knowledge Graph</span>
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            Force-directed relational network connecting oral traditions via ancestral lineages and shared performance motifs. Node size reflects calculated Endangerment Score (0–100).
          </p>
        </div>

        <div className={styles.graphWrapper}>
          {/* Main SVG Graph Canvas */}
          <div className={styles.canvasArea}>
            {/* Overlay Filters */}
            <div className={styles.graphOverlayControls}>
              <div className={styles.filterChipGroup}>
                {(['all', 'Critical', 'At Risk', 'Stable'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    className={`${styles.filterBtn} ${filterLevel === lvl ? styles.filterBtnActive : ''}`}
                    onClick={() => setFilterLevel(lvl)}
                  >
                    {lvl === 'all' ? 'All Traditions (15)' : `${lvl} Tier`}
                  </button>
                ))}
              </div>

              <div className={styles.zoomControls}>
                <button className={styles.zoomBtn} onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.15))}>
                  +
                </button>
                <button className={styles.zoomBtn} onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.15))}>
                  -
                </button>
                <button
                  className={styles.zoomBtn}
                  style={{ fontSize: '0.72rem', width: 'auto', padding: '0 8px' }}
                  onClick={() => setZoomLevel(1)}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* SVG Elements */}
            <svg
              ref={containerRef}
              className={styles.graphSvg}
              viewBox="0 0 800 560"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <g transform={`scale(${zoomLevel})`} style={{ transformOrigin: '400px 280px', transition: 'transform 0.2s ease' }}>
                {/* Connecting Edges */}
                {edges.map((edge, idx) => {
                  const src = nodes.find((n) => n.id === edge.source);
                  const tgt = nodes.find((n) => n.id === edge.target);
                  if (!src || !tgt) return null;

                  const isConnected =
                    selectedNodeId === edge.source || selectedNodeId === edge.target;
                  const isHovered =
                    hoveredNodeId === edge.source || hoveredNodeId === edge.target;

                  return (
                    <g key={idx}>
                      <line
                        x1={src.x}
                        y1={src.y}
                        x2={tgt.x}
                        y2={tgt.y}
                        stroke={
                          isConnected
                            ? 'var(--gold-400)'
                            : isHovered
                            ? 'rgba(212, 175, 55, 0.8)'
                            : 'rgba(255, 255, 255, 0.15)'
                        }
                        strokeWidth={isConnected ? 2.8 : 1.2}
                      />
                    </g>
                  );
                })}

                {/* Nodes */}
                {visibleNodes.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const isNeighbor = connectedNodeIds.has(node.id);
                  const isHovered = hoveredNodeId === node.id;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      style={{ cursor: 'pointer' }}
                      onMouseDown={() => handleMouseDown(node.id)}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                    >
                      {/* Outer Glow Halo */}
                      {(isSelected || isNeighbor || isHovered) && (
                        <circle
                          r={node.radius + 8}
                          fill="none"
                          stroke={node.color}
                          strokeWidth="2"
                          opacity={isSelected ? 0.95 : 0.5}
                          style={{ animation: 'pulseGlow 2s infinite' }}
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        r={node.radius}
                        fill={node.color}
                        stroke={isSelected ? '#fff' : 'rgba(0, 0, 0, 0.6)'}
                        strokeWidth={isSelected ? 3 : 1.5}
                        style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}
                      />

                      {/* Score inside node */}
                      <text
                        dy="4"
                        textAnchor="middle"
                        fill="#fff"
                        fontSize="11px"
                        fontWeight="800"
                        style={{ pointerEvents: 'none' }}
                      >
                        {node.score}
                      </text>

                      {/* Node Label Text */}
                      <text
                        dy={node.radius + 14}
                        textAnchor="middle"
                        fill={isSelected ? '#fff' : 'var(--text-secondary)'}
                        fontSize="10px"
                        fontWeight={isSelected ? '700' : '500'}
                        style={{ pointerEvents: 'none', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Legend Bar */}
            <div className={styles.legendBar}>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: '#ef4444' }} />
                <span>Critical Endangerment (70–100)</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: '#f97316' }} />
                <span>At Risk (40–69)</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: '#10b981' }} />
                <span>Stable (&lt;40)</span>
              </div>
            </div>
          </div>

          {/* Node Inspector Side Panel */}
          {matchedTradition && activeNode && (
            <div className={styles.inspectorPane}>
              <div>
                <div className={styles.inspectorHeader}>
                  <span
                    className="badge"
                    style={{
                      background: `${activeNode.color}22`,
                      color: activeNode.color,
                      border: `1px solid ${activeNode.color}55`
                    }}
                  >
                    {activeNode.level.toUpperCase()} • SCORE {activeNode.score}/100
                  </span>
                </div>

                <h3 className={styles.inspectorTitle}>{matchedTradition.title}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-gold)', marginBottom: 8 }}>
                  {matchedTradition.vernacularTitle}
                </div>

                <p className={styles.inspectorDesc}>
                  {matchedTradition.summary}
                </p>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                  <div><strong>Dialect:</strong> {matchedTradition.dialect} ({matchedTradition.region})</div>
                  <div><strong>Bards:</strong> {matchedTradition.livingPractitionerCount} living • Avg Age: {matchedTradition.practitionerAge}</div>
                  <div><strong>Successor:</strong> {matchedTradition.hasSuccessor ? 'Documented apprentice' : 'No living successor'}</div>
                </div>

                {/* Connected Relations List */}
                <div className={styles.connectedSection}>
                  <div className={styles.connectedTitle}>
                    Connected Traditions ({connectedEdges.length})
                  </div>
                  <div className={styles.connectionList}>
                    {connectedEdges.map((edge, idx) => {
                      const otherId = edge.source === activeNode.id ? edge.target : edge.source;
                      const otherTrad = traditions.find((t) => t.id === otherId);
                      if (!otherTrad) return null;

                      return (
                        <div
                          key={idx}
                          className={styles.connectionItem}
                          onClick={() => setSelectedNodeId(otherId)}
                        >
                          <span>{otherTrad.title.split(' (')[0]}</span>
                          <span className={styles.connectionRelation}>
                            {otherTrad.region} →
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Inspector Actions */}
              <div className={styles.inspectorActions}>
                <button
                  className={styles.actionBtnPrimary}
                  onClick={() => onPlayTradition(matchedTradition)}
                >
                  <PlayIcon size={16} />
                  <span>Listen to Field Recording</span>
                </button>
                <button
                  className={styles.actionBtnSecondary}
                  onClick={() => onOpenDossier(matchedTradition)}
                >
                  <BookOpenIcon size={16} />
                  <span>View Archival Dossier</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
