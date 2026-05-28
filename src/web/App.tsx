import React, { useState, useCallback } from 'react';
import { PiotBingTrie, PiotBingWithAlphabet, PiotBingTST } from '../index';
import { TrieRenderer } from './components/TrieRenderer';
import { ControlPanel } from './components/ControlPanel';
import { StatsPanel } from './components/StatsPanel';
import './styles/App.css';

export const App: React.FC = () => {
  const [trieType, setTrieType] = useState<'basic' | 'alphabet' | 'tst'>('basic');
  const [trie, setTrie] = useState<any>(new PiotBingTrie());
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ action: string; word: string; timestamp: number }[]>([]);
  const [highlightedPath, setHighlightedPath] = useState<string>('');

  const changeTrieType = useCallback((newType: 'basic' | 'alphabet' | 'tst') => {
    if (newType === 'basic') {
      setTrie(new PiotBingTrie());
    } else if (newType === 'alphabet') {
      setTrie(new PiotBingWithAlphabet());
    } else {
      setTrie(new PiotBingTST());
    }
    setTrieType(newType);
    setHistory([]);
    setHighlightedPath('');
  }, []);

  const handleInsert = useCallback(() => {
    if (input.trim()) {
      try {
        const count = trie.get(input);
        trie.put(input);
        setHistory((prev) => [
          ...prev,
          { action: 'insert', word: input, timestamp: Date.now() },
        ]);
        setInput('');
        setHighlightedPath(input);
      } catch (e) {
        console.error('Insert error:', e);
      }
    }
  }, [input, trie]);

  const handleSearch = useCallback(() => {
    if (input.trim()) {
      try {
        const count = trie.get(input);
        setHighlightedPath(input);
        console.log(`Found "${input}": ${count} occurrences`);
      } catch (e) {
        console.error('Search error:', e);
      }
    }
  }, [input, trie]);

  const handleClear = useCallback(() => {
    changeTrieType(trieType);
  }, [trieType, changeTrieType]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌳 Trie Visualization Lab</h1>
        <p>Interactive algorithm exploration for data structure learning</p>
      </header>

      <div className="app-container">
        <aside className="sidebar">
          <ControlPanel
            input={input}
            setInput={setInput}
            onInsert={handleInsert}
            onSearch={handleSearch}
            onClear={handleClear}
            trieType={trieType}
            onChangeTrieType={changeTrieType}
          />
          <StatsPanel trie={trie} history={history} />
        </aside>

        <main className="main-content">
          <TrieRenderer trie={trie} highlightedPath={highlightedPath} trieType={trieType} />
        </main>
      </div>

      <footer className="app-footer">
        <p>
          Learn about Tries, Ternary Search Trees, and other data structures through interactive visualization
        </p>
      </footer>
    </div>
  );
};
