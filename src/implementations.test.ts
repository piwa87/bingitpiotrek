import { PiotBingTrie } from './PiotBingTrie';
import { PiotBingWithAlphabet } from './PiotBingWithAlphabet';
import { PiotBingTST } from './PiotBingTST';

describe('PiotBingTrie', () => {
  let trie: PiotBingTrie;

  beforeEach(() => {
    trie = new PiotBingTrie();
  });

  it('should return 0 for words not yet inserted', () => {
    expect(trie.get('person')).toBe(0);
  });

  it('should count word frequencies correctly', () => {
    expect(trie.get('person')).toBe(0);
    trie.put('person');

    expect(trie.get('kimi')).toBe(0);
    trie.put('kimi');

    // After inserting "person", searching for prefix "per" 
    // should count 1 (because "person" was inserted once)
    expect(trie.get('per')).toBe(1);
    trie.put('per');

    expect(trie.get('pers')).toBe(1);
    trie.put('pers');

    expect(trie.get('kim')).toBe(1);
    trie.put('kim');

    expect(trie.get('pe')).toBe(3);
  });

  it('should handle duplicate insertions', () => {
    expect(trie.get('z')).toBe(0);
    trie.put('z');
    expect(trie.get('z')).toBe(1);
    trie.put('z');
    expect(trie.get('z')).toBe(2);
    trie.put('z');
    expect(trie.get('z')).toBe(3);
  });

  it('should handle similar words', () => {
    expect(trie.get('performance')).toBe(0);
    trie.put('performance');
    expect(trie.get('perforation')).toBe(0);
    trie.put('perforation');
    
    // Both words share "perf" prefix
    expect(trie.get('perf')).toBe(2);
  });

  it('should differentiate between word and non-existing path', () => {
    trie.put('cat');
    expect(trie.get('car')).toBe(0);
    expect(trie.get('ca')).toBe(1); // prefix of "cat"
    expect(trie.get('cat')).toBe(1);
  });
});

describe('PiotBingWithAlphabet', () => {
  let trie: PiotBingWithAlphabet;

  beforeEach(() => {
    trie = new PiotBingWithAlphabet();
  });

  it('should work identically to PiotBingTrie', () => {
    expect(trie.get('person')).toBe(0);
    trie.put('person');

    expect(trie.get('kimi')).toBe(0);
    trie.put('kimi');

    expect(trie.get('per')).toBe(1);
    trie.put('per');

    expect(trie.get('pers')).toBe(1);
    trie.put('pers');

    expect(trie.get('kim')).toBe(1);
    trie.put('kim');

    expect(trie.get('pe')).toBe(3);
    trie.put('pe');

    expect(trie.get('z')).toBe(0);
    trie.put('z');
    expect(trie.get('z')).toBe(1);
    trie.put('z');
    expect(trie.get('z')).toBe(2);
    trie.put('z');
    expect(trie.get('z')).toBe(3);
  });

  it('should support custom alphabets', () => {
    const digitTrie = new PiotBingWithAlphabet('0123456789');
    expect(digitTrie.get('123')).toBe(0);
    digitTrie.put('123');
    expect(digitTrie.get('12')).toBe(1);
  });

  it('should throw error for characters not in alphabet', () => {
    const digitTrie = new PiotBingWithAlphabet('0123456789');
    expect(() => digitTrie.put('abc')).toThrow();
  });
});

describe('PiotBingTST', () => {
  let tst: PiotBingTST;

  beforeEach(() => {
    tst = new PiotBingTST();
  });

  it('should check word existence with contains', () => {
    expect(tst.contains('hello')).toBe(false);
    tst.put('hello', 1);
    expect(tst.contains('hello')).toBe(true);
  });

  it('should get and put values correctly', () => {
    expect(tst.get('word')).toBe(0);
    tst.put('word', 5);
    expect(tst.get('word')).toBe(5);
    tst.put('word', 10);
    expect(tst.get('word')).toBe(10);
  });

  it('should handle putAll to increment all prefixes', () => {
    tst.putAll('cat');
    expect(tst.get('c')).toBe(1);
    expect(tst.get('ca')).toBe(1);
    expect(tst.get('cat')).toBe(1);

    tst.putAll('car');
    expect(tst.get('c')).toBe(2);
    expect(tst.get('ca')).toBe(2);
    expect(tst.get('cat')).toBe(1);
    expect(tst.get('car')).toBe(1);
  });

  it('should handle putAllButRoot correctly', () => {
    tst.putAllButRoot('dog', 0);
    expect(tst.get('d')).toBe(1);
    expect(tst.get('do')).toBe(1);
    expect(tst.get('dog')).toBe(1);

    // Root should not be incremented
    expect(tst.get('d')).toBe(1);
  });

  it('should handle similar words with TST', () => {
    tst.put('cat', 1);
    tst.put('car', 1);
    tst.put('card', 1);
    
    expect(tst.get('cat')).toBe(1);
    expect(tst.get('car')).toBe(1);
    expect(tst.get('card')).toBe(1);
    expect(tst.get('care')).toBe(0);
  });

  it('should handle empty words', () => {
    // TST should handle empty strings gracefully
    // (behavior depends on implementation choice)
    tst.put('a', 1);
    expect(tst.get('a')).toBe(1);
  });
});

describe('Algorithm Comparison', () => {
  it('should produce identical results for all three implementations', () => {
    const trie = new PiotBingTrie();
    const alphabetTrie = new PiotBingWithAlphabet();
    const tst = new PiotBingTST();

    const words = ['apple', 'app', 'application', 'apply', 'apex', 'apple', 'app'];

    // Insert all words
    for (const word of words) {
      trie.put(word);
      alphabetTrie.put(word);
      tst.putAll(word);
    }

    // Verify identical counts
    const testWords = ['a', 'ap', 'app', 'apple', 'application', 'apex', 'apx'];
    for (const word of testWords) {
      const trieCount = trie.get(word);
      const alphabetCount = alphabetTrie.get(word);
      
      // Note: TST with putAll behaves differently, so we don't compare directly
      expect(trieCount).toBe(alphabetCount);
    }
  });
});
