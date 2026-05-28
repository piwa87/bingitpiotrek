import React, { useMemo } from 'react';
import '../styles/TrieRenderer.css';

interface TrieRendererProps {
  trie: unknown;
  highlightedPath: string;
  trieType: 'basic' | 'alphabet' | 'tst';
  recentWords: string[];
  status: string;
}

export const TrieRenderer: React.FC<TrieRendererProps> = ({
  highlightedPath,
  trieType,
  recentWords,
  status,
}) => {
  const insertedWordsPreview = useMemo(() => {
    if (recentWords.length === 0) {
      return 'No inserted words yet.';
    }

    return recentWords.slice(-8).join(', ');
  }, [recentWords]);

  const svgContent = useMemo(() => {
    return (
      <svg viewBox="0 0 800 600" className="trie-canvas">
        <defs>
          <style>{`
            .node { fill: #667eea; stroke: #333; stroke-width: 2; }
            .node-text { font-size: 12px; text-anchor: middle; dominant-baseline: middle; fill: white; font-weight: bold; }
            .edge { stroke: #764ba2; stroke-width: 2; fill: none; }
          `}</style>
        </defs>

        <circle cx="400" cy="50" r="25" className="node" />
        <text x="400" y="50" className="node-text">ROOT</text>

        <g className="example-tree">
          <line x1="400" y1="75" x2="200" y2="150" className="edge" />
          <line x1="400" y1="75" x2="400" y2="150" className="edge" />
          <line x1="400" y1="75" x2="600" y2="150" className="edge" />

          <circle cx="200" cy="150" r="20" className="node" />
          <text x="200" y="150" className="node-text">a</text>

          <circle cx="400" cy="150" r="20" className="node" />
          <text x="400" y="150" className="node-text">p</text>

          <circle cx="600" cy="150" r="20" className="node" />
          <text x="600" y="150" className="node-text">t</text>
        </g>

        <g className="legend">
          <rect x="50" y="450" width="700" height="130" fill="rgba(255,255,255,0.9)" stroke="#333" strokeWidth="1" rx="5" />
          <text x="60" y="475" className="legend-title">How to read this visualization</text>
          <text x="60" y="500" className="legend-text">- Nodes represent characters in the trie</text>
          <text x="60" y="520" className="legend-text">- Edges represent transitions to child nodes</text>
          <text x="60" y="540" className="legend-text">- A root-to-node path represents a prefix</text>
          <text x="60" y="560" className="legend-text">Type: {trieType} | Highlight: {highlightedPath || 'none'}</text>
        </g>
      </svg>
    );
  }, [highlightedPath, trieType]);

  return (
    <div className="trie-renderer">
      <h2>Trie Structure Visualization</h2>
      <div className="canvas-container">{svgContent}</div>
      <p className="visualization-note">{status}</p>
      <p className="visualization-note"><strong>Recent inserted words:</strong> {insertedWordsPreview}</p>
    </div>
  );
};
