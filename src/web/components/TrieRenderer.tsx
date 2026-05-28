import React, { useMemo } from 'react';
import '../styles/TrieRenderer.css';

interface TrieRendererProps {
  trie: any;
  highlightedPath: string;
  trieType: 'basic' | 'alphabet' | 'tst';
}

export const TrieRenderer: React.FC<TrieRendererProps> = ({
  trie,
  highlightedPath,
  trieType,
}) => {
  const svgContent = useMemo(() => {
    // Extract internal structure (simplified visualization)
    // This is educational - showing the concept of trie node traversal
    return (
      <svg viewBox="0 0 800 600" className="trie-canvas">
        <defs>
          <style>{`
            .node { fill: #667eea; stroke: #333; stroke-width: 2; }
            .node-text { font-size: 12px; text-anchor: middle; dominant-baseline: middle; fill: white; font-weight: bold; }
            .edge { stroke: #764ba2; stroke-width: 2; fill: none; }
            .highlight { stroke: #ff6b6b; stroke-width: 3; }
            .highlighted-node { fill: #ffa94d; }
          `}</style>
        </defs>

        {/* Root node */}
        <circle cx="400" cy="50" r="25" className="node" />
        <text x="400" y="50" className="node-text">
          ROOT
        </text>

        {/* Example visualization structure */}
        <g className="example-tree">
          {/* Level 1 */}
          <line x1="400" y1="75" x2="200" y2="150" className="edge" />
          <line x1="400" y1="75" x2="400" y2="150" className="edge" />
          <line x1="400" y1="75" x2="600" y2="150" className="edge" />

          <circle cx="200" cy="150" r="20" className="node" />
          <text x="200" y="150" className="node-text">
            a
          </text>

          <circle cx="400" cy="150" r="20" className="node" />
          <text x="400" y="150" className="node-text">
            p
          </text>

          <circle cx="600" cy="150" r="20" className="node" />
          <text x="600" y="150" className="node-text">
            t
          </text>

          {/* Level 2 */}
          <line x1="200" y1="170" x2="120" y2="230" className="edge" />
          <line x1="200" y1="170" x2="200" y2="230" className="edge" />
          <line x1="400" y1="170" x2="360" y2="230" className="edge" />
          <line x1="400" y1="170" x2="440" y2="230" className="edge" />

          <circle cx="120" cy="230" r="18" className="node" />
          <text x="120" y="230" className="node-text">
            n
          </text>

          <circle cx="200" cy="230" r="18" className="node" />
          <text x="200" y="230" className="node-text">
            p
          </text>

          <circle cx="360" cy="230" r="18" className="node" />
          <text x="360" y="230" className="node-text">
            p
          </text>

          <circle cx="440" cy="230" r="18" className="node" />
          <text x="440" y="230" className="node-text">
            l
          </text>
        </g>

        {/* Legend */}
        <g className="legend">
          <rect x="50" y="450" width="700" height="130" fill="rgba(255,255,255,0.9)" stroke="#333" strokeWidth="1" rx="5" />
          <text x="60" y="475" className="legend-title">
            How to read this visualization:
          </text>
          <text x="60" y="500" className="legend-text">
            • Nodes represent characters in the trie
          </text>
          <text x="60" y="520" className="legend-text">
            • Lines show character transitions (edges)
          </text>
          <text x="60" y="540" className="legend-text">
            • Each path from ROOT to a leaf or marked node represents a word or prefix
          </text>
          <text x="60" y="560" className="legend-text">
            Type: <strong>{trieType}</strong> | Highlight: <strong>{highlightedPath || 'None'}</strong>
          </text>
        </g>
      </svg>
    );
  }, [highlightedPath, trieType]);

  return (
    <div className="trie-renderer">
      <h2>🌳 Trie Structure Visualization</h2>
      <div className="canvas-container">{svgContent}</div>
      <p className="visualization-note">
        This visualization shows the hierarchical structure of the trie. Each node can have up to 26 children
        (or custom alphabet size). This is an educational rendering.
      </p>
    </div>
  );
};
