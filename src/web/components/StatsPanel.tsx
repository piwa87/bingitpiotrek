import React, { useMemo } from 'react';
import '../styles/StatsPanel.css';

interface StatsPanelProps {
  trie: any;
  history: { action: string; word: string; timestamp: number }[];
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ trie, history }) => {
  const stats = useMemo(() => {
    const insertCount = history.filter((h) => h.action === 'insert').length;
    const uniqueWords = new Set(history.map((h) => h.word)).size;
    const avgWordLength = history.length > 0
      ? (history.reduce((sum, h) => sum + h.word.length, 0) / history.length).toFixed(2)
      : 0;

    return {
      insertCount,
      uniqueWords,
      avgWordLength,
      totalOperations: history.length,
    };
  }, [history]);

  return (
    <div className="stats-panel">
      <h3>📈 Statistics</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-label">Operations</div>
          <div className="stat-value">{stats.totalOperations}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Insertions</div>
          <div className="stat-value">{stats.insertCount}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Unique Words</div>
          <div className="stat-value">{stats.uniqueWords}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Avg Length</div>
          <div className="stat-value">{stats.avgWordLength}</div>
        </div>
      </div>

      {history.length > 0 && (
        <div className="history-section">
          <h4>📝 Recent Operations</h4>
          <div className="history-list">
            {history.slice(-5).reverse().map((entry, idx) => (
              <div key={idx} className="history-item">
                <span className="history-action">{entry.action}</span>
                <span className="history-word">{entry.word}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="complexity-info">
        <h4>⏱️ Complexity</h4>
        <div className="complexity-item">
          <strong>Time (Insert/Search):</strong> O(m)
        </div>
        <div className="complexity-item">
          <strong>Space:</strong> O(ALPHABET_SIZE × N)
        </div>
        <p className="complexity-note">m = word length, N = number of nodes</p>
      </div>
    </div>
  );
};
