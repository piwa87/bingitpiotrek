/**
 * Optimized Trie implementation with customizable alphabet.
 * 
 * This improves upon the basic Trie by:
 * - Abstracting the alphabet logic into its own class
 * - Supporting any custom alphabet (not hardcoded to a-z)
 * - Better separation of concerns
 * 
 * Time Complexity: Same as PiotBingTrie
 *   - insert: O(m)
 *   - search: O(m)
 * Space: O(n*R) where R is the alphabet size
 */
export class PiotBingWithAlphabet {
  private rootNode: TrieNode = new TrieNode();
  private alphabet: Alphabet;

  constructor(alphabetString: string = 'abcdefghijklmnopqrstuvwxyz') {
    this.alphabet = new Alphabet(alphabetString);
  }

  /**
   * Search for a word and return its frequency count.
   * @param word - The word to search for
   * @returns The frequency count, or 0 if not found
   */
  get(word: string): number {
    const node = this.findNode(word);
    return node === null ? 0 : node.value;
  }

  /**
   * Insert a word and increment its count.
   * @param word - The word to insert
   */
  put(word: string): void {
    this.rootNode = this.insertNode(this.rootNode, word, 0);
  }

  /**
   * Recursively find a node for a given word.
   */
  private findNode(word: string, node: TrieNode | null = this.rootNode, index: number = 0): TrieNode | null {
    if (node === null) {
      return null;
    }
    if (index === word.length) {
      return node;
    }
    const charIndex = this.alphabet.toIndex(word[index]);
    return this.findNode(word, node.next[charIndex], index + 1);
  }

  /**
   * Recursively insert a node and increment counts along the path.
   */
  private insertNode(node: TrieNode | null, word: string, index: number): TrieNode {
    if (node === null) {
      node = new TrieNode(this.alphabet.size);
    }

    if (index === word.length) {
      node.value++;
      return node;
    }

    node.value++;
    const charIndex = this.alphabet.toIndex(word[index]);
    node.next[charIndex] = this.insertNode(node.next[charIndex], word, index + 1);

    return node;
  }
}

/**
 * Manages character-to-index mapping for a custom alphabet.
 * 
 * This allows Tries to work with any alphabet, not just a-z.
 * For example: 0-9, special characters, Unicode, etc.
 */
export class Alphabet {
  private charToIndex: Map<string, number>;
  private indexToChar: string[];
  readonly size: number;

  constructor(alphabetString: string) {
    this.charToIndex = new Map();
    this.indexToChar = [];

    for (let i = 0; i < alphabetString.length; i++) {
      const char = alphabetString[i];
      this.charToIndex.set(char, i);
      this.indexToChar[i] = char;
    }

    this.size = alphabetString.length;
  }

  /**
   * Convert a character to its index in the alphabet.
   * @throws Error if character is not in the alphabet
   */
  toIndex(char: string): number {
    const index = this.charToIndex.get(char);
    if (index === undefined) {
      throw new Error(`Character '${char}' is not in the alphabet`);
    }
    return index;
  }

  /**
   * Convert an index back to its character.
   * @throws Error if index is out of bounds
   */
  toChar(index: number): string {
    if (index < 0 || index >= this.size) {
      throw new Error(`Index ${index} is out of bounds for alphabet of size ${this.size}`);
    }
    return this.indexToChar[index];
  }
}

/**
 * Represents a single node in the Trie with variable-size children array.
 */
class TrieNode {
  value: number = 0;
  next: Array<TrieNode | null>;

  constructor(alphabetSize: number) {
    this.next = Array(alphabetSize).fill(null);
  }
}
