import React, { useCallback, useMemo, useState } from 'react';
import { PiotBingTrie, PiotBingWithAlphabet, PiotBingTST } from '../index';
import { TrieRenderer } from './components/TrieRenderer';
import { ControlPanel } from './components/ControlPanel';
import { StatsPanel } from './components/StatsPanel';
import './styles/App.css';

type TrieType = 'basic' | 'alphabet' | 'tst';

type HistoryEntry = {
  action: 'insert' | 'search';
  word: string;
  result: number;
  timestamp: number;
};

type TrieLike = PiotBingTrie | PiotBingWithAlphabet | PiotBingTST;

const createTrie = (type: TrieType): TrieLike => {
  if (type === 'basic') {
    return new PiotBingTrie();
  }
  if (type === 'alphabet') {
    return new PiotBingWithAlphabet();
  }
  return new PiotBingTST();
};

const normalizeWord = (value: string): string => value.trim().toLowerCase();

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const App: React.FC = () => {
  const [trieType, setTrieType] = useState<TrieType>('basic');
  const [trie, setTrie] = useState<TrieLike>(() => createTrie('basic'));
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [highlightedPath, setHighlightedPath] = useState('');
  const [status, setStatus] = useState('Ready. Insert a word to start exploring.');

  const changeTrieType = useCallback((newType: TrieType) => {
    setTrie(createTrie(newType));
    setTrieType(newType);
    setHistory([]);
    setHighlightedPath('');
    setInput('');
    setStatus(`Switched to ${newType.toUpperCase()} and reset state.`);
  }, []);

  const insertIntoTrie = useCallback((word: string) => {
    if (trieType === 'tst') {
      (trie as PiotBingTST).putAll(word);
      return;
    }

    if (trieType === 'alphabet') {
      (trie as PiotBingWithAlphabet).put(word);
      return;
    }

    (trie as PiotBingTrie).put(word);
  }, [trie, trieType]);

  const handleInsert = useCallback(() => {
    const word = normalizeWord(input);
    if (!word) {
      setStatus('Please enter a non-empty word.');
      return;
    }

    try {
      const countBefore = trie.get(word);
      insertIntoTrie(word);
      const countAfter = trie.get(word);

      setHistory((prev) => [
        ...prev,
        { action: 'insert', word, result: countAfter, timestamp: Date.now() },
      ]);
      setInput('');
      setHighlightedPath(word);
      setStatus(`Inserted "${word}". Count: ${countBefore} -> ${countAfter}.`);
    } catch (error) {
      setStatus(`Insert failed for "${word}": ${toErrorMessage(error)}`);
    }
  }, [input, insertIntoTrie, trie]);

  const handleSearch = useCallback(() => {
    const word = normalizeWord(input);
    if (!word) {
      setStatus('Please enter a non-empty word.');
      return;
    }

    try {
      const count = trie.get(word);
      setHighlightedPath(word);
      setHistory((prev) => [
        ...prev,
        { action: 'search', word, result: count, timestamp: Date.now() },
      ]);
      setStatus(`Search for "${word}": ${count}.`);
    } catch (error) {
      setStatus(`Search failed for "${word}": ${toErrorMessage(error)}`);
    }
  }, [input, trie]);

  const handleClear = useCallback(() => {
    changeTrieType(trieType);
  }, [trieType, changeTrieType]);

  const recentWords = useMemo(
    () => history.filter((entry) => entry.action === 'insert').map((entry) => entry.word),
    [history]
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Trie Visualization Lab</h1>
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
          <TrieRenderer
            trie={trie}
            highlightedPath={highlightedPath}
            trieType={trieType}
            recentWords={recentWords}
            status={status}
          />
        </main>
      </div>

      <footer className="app-footer">
        <p>Learn trie and TST behavior with visual and interactive feedback.</p>
      </footer>
    </div>
  );
};
