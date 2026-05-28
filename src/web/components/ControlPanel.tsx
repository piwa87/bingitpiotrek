import React from 'react';
import '../styles/ControlPanel.css';

interface ControlPanelProps {
  input: string;
  setInput: (value: string) => void;
  onInsert: () => void;
  onSearch: () => void;
  onClear: () => void;
  trieType: 'basic' | 'alphabet' | 'tst';
  onChangeTrieType: (type: 'basic' | 'alphabet' | 'tst') => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  input,
  setInput,
  onInsert,
  onSearch,
  onClear,
  trieType,
  onChangeTrieType,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onInsert();
    }
  };

  return (
    <div className="control-panel">
      <section className="trie-selector">
        <h3>📊 Data Structure</h3>
        <div className="trie-options">
          <button
            className={`trie-btn ${trieType === 'basic' ? 'active' : ''}`}
            onClick={() => onChangeTrieType('basic')}
          >
            Basic Trie
          </button>
          <button
            className={`trie-btn ${trieType === 'alphabet' ? 'active' : ''}`}
            onClick={() => onChangeTrieType('alphabet')}
          >
            Alphabet Trie
          </button>
          <button
            className={`trie-btn ${trieType === 'tst' ? 'active' : ''}`}
            onClick={() => onChangeTrieType('tst')}
          >
            TST
          </button>
        </div>
      </section>

      <section className="input-section">
        <h3>🎯 Operations</h3>
        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a word..."
            className="input-field"
          />
        </div>
        <div className="button-group">
          <button onClick={onInsert} className="btn btn-insert">
            ➕ Insert
          </button>
          <button onClick={onSearch} className="btn btn-search">
            🔍 Search
          </button>
          <button onClick={onClear} className="btn btn-clear">
            🗑️ Clear
          </button>
        </div>
      </section>

      <section className="instructions">
        <h3>ℹ️ Instructions</h3>
        <ul>
          <li>Type a word and click <strong>Insert</strong></li>
          <li>Watch the tree structure grow in real-time</li>
          <li><strong>Search</strong> to traverse and highlight paths</li>
          <li>Compare different data structures</li>
        </ul>
      </section>
    </div>
  );
};
