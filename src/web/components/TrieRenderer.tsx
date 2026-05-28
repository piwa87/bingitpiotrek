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
  trie,
  highlightedPath,
  trieType,
  recentWords,
  status,
}) => {
  void trie;

  const ROOT_ID = '__root__';
  const H_SPACING = 88;
  const V_SPACING = 92;
  const PADDING = 56;
  const NODE_RADIUS = 20;

  type BuildNode = {
    id: string;
    value: string;
    depth: number;
    x: number;
    terminalCount: number;
    children: Map<string, BuildNode>;
  };

  type PositionedNode = {
    id: string;
    value: string;
    depth: number;
    x: number;
    y: number;
    terminalCount: number;
  };

  type PositionedEdge = {
    id: string;
    fromId: string;
    toId: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };

  const sortedChildren = (node: BuildNode): BuildNode[] =>
    Array.from(node.children.values()).sort((a, b) => a.value.localeCompare(b.value));

  const highlightedNodeIds = useMemo(() => {
    const nodeIds = new Set<string>();
    if (!highlightedPath) {
      return nodeIds;
    }

    nodeIds.add(ROOT_ID);
    let prefix = '';
    for (const char of highlightedPath) {
      prefix += char;
      nodeIds.add(prefix);
    }
    return nodeIds;
  }, [highlightedPath]);

  const highlightedEdgeIds = useMemo(() => {
    const edgeIds = new Set<string>();
    if (!highlightedPath) {
      return edgeIds;
    }

    let previousId = ROOT_ID;
    let prefix = '';
    for (const char of highlightedPath) {
      prefix += char;
      edgeIds.add(`${previousId}->${prefix}`);
      previousId = prefix;
    }
    return edgeIds;
  }, [highlightedPath]);

  const insertedWordsPreview = useMemo(() => {
    if (recentWords.length === 0) {
      return 'No inserted words yet.';
    }

    return recentWords.slice(-8).join(', ');
  }, [recentWords]);

  const layout = useMemo(() => {
    const root: BuildNode = {
      id: ROOT_ID,
      value: 'ROOT',
      depth: 0,
      x: 0,
      terminalCount: 0,
      children: new Map<string, BuildNode>(),
    };

    for (const word of recentWords) {
      let currentNode = root;
      let prefix = '';

      for (const char of word) {
        prefix += char;
        let childNode = currentNode.children.get(char);
        if (!childNode) {
          childNode = {
            id: prefix,
            value: char,
            depth: 0,
            x: 0,
            terminalCount: 0,
            children: new Map<string, BuildNode>(),
          };
          currentNode.children.set(char, childNode);
        }
        currentNode = childNode;
      }

      currentNode.terminalCount += 1;
    }

    let leafIndex = 0;
    const assignLayout = (node: BuildNode, depth: number): void => {
      node.depth = depth;
      const children = sortedChildren(node);

      if (children.length === 0) {
        node.x = leafIndex * H_SPACING;
        leafIndex += 1;
        return;
      }

      for (const child of children) {
        assignLayout(child, depth + 1);
      }

      const xSum = children.reduce((sum, child) => sum + child.x, 0);
      node.x = xSum / children.length;
    };

    const nodesRaw: BuildNode[] = [];
    const edgesRaw: Array<{ id: string; fromId: string; toId: string; x1: number; y1: number; x2: number; y2: number }> = [];
    let minX = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxDepth = 0;

    const collectPositioned = (node: BuildNode, parent?: BuildNode): void => {
      nodesRaw.push(node);
      minX = Math.min(minX, node.x);
      maxX = Math.max(maxX, node.x);
      maxDepth = Math.max(maxDepth, node.depth);

      if (parent) {
        edgesRaw.push({
          id: `${parent.id}->${node.id}`,
          fromId: parent.id,
          toId: node.id,
          x1: parent.x,
          y1: parent.depth * V_SPACING,
          x2: node.x,
          y2: node.depth * V_SPACING,
        });
      }

      for (const child of sortedChildren(node)) {
        collectPositioned(child, node);
      }
    };

    assignLayout(root, 0);
    collectPositioned(root);

    const normalizedMinX = Number.isFinite(minX) ? minX : 0;
    const offsetX = PADDING - normalizedMinX;

    const nodes: PositionedNode[] = nodesRaw.map((node) => ({
      id: node.id,
      value: node.value,
      depth: node.depth,
      x: node.x + offsetX,
      y: node.depth * V_SPACING + PADDING,
      terminalCount: node.terminalCount,
    }));

    const edges: PositionedEdge[] = edgesRaw.map((edge) => ({
      ...edge,
      x1: edge.x1 + offsetX,
      y1: edge.y1 + PADDING,
      x2: edge.x2 + offsetX,
      y2: edge.y2 + PADDING,
    }));

    const rawWidth = maxX - normalizedMinX;
    const viewBoxWidth = Math.max(rawWidth + PADDING * 2, NODE_RADIUS * 8);
    const viewBoxHeight = Math.max(maxDepth * V_SPACING + PADDING * 2 + 32, NODE_RADIUS * 8);

    return { nodes, edges, viewBoxWidth, viewBoxHeight };
  }, [recentWords]);

  const svgContent = useMemo(() => {
    if (recentWords.length === 0) {
      return (
        <svg viewBox="0 0 800 360" className="trie-canvas" role="img" aria-label="Empty trie visualization">
          <text x="400" y="180" textAnchor="middle" dominantBaseline="middle" className="empty-message">
            Insert a word to build the trie visualization.
          </text>
        </svg>
      );
    }

    return (
      <svg
        viewBox={`0 0 ${layout.viewBoxWidth} ${layout.viewBoxHeight}`}
        className="trie-canvas"
        role="img"
        aria-label="Trie visualization"
      >
        {layout.edges.map((edge) => (
          <line
            key={edge.id}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            className={`edge${highlightedEdgeIds.has(edge.id) ? ' edge-path' : ''}`}
          />
        ))}

        {layout.nodes.map((node) => {
          const isRoot = node.id === ROOT_ID;
          const isTerminal = node.terminalCount > 0;
          const nodeClass = isRoot ? 'node-root' : isTerminal ? 'node-terminal' : 'node-regular';
          const pathClass = highlightedNodeIds.has(node.id) ? ' node-path' : '';

          return (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r={NODE_RADIUS} className={`${nodeClass}${pathClass}`} />
              <text x={node.x} y={node.y} className="node-text">
                {node.value}
              </text>
              {isTerminal && (
                <text x={node.x} y={node.y + NODE_RADIUS + 16} className="terminal-count">
                  x{node.terminalCount}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    );
  }, [highlightedEdgeIds, highlightedNodeIds, layout, recentWords]);

  return (
    <div className="trie-renderer">
      <h2>Trie Structure Visualization</h2>
      <div className="canvas-container">{svgContent}</div>
      <p className="visualization-note">{status}</p>
      <p className="visualization-note"><strong>Recent inserted words:</strong> {insertedWordsPreview}</p>
      <p className="visualization-note"><strong>Trie type:</strong> {trieType.toUpperCase()}</p>
    </div>
  );
};
