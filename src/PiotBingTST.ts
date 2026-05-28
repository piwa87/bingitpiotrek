/**
 * Ternary Search Tree (TST) implementation.
 * 
 * A more memory-efficient alternative to Tries, especially for sparse alphabets.
 * Instead of an array of child pointers, each node has only 3 children:
 * - left: characters less than the current character
 * - mid: the next character in the sequence
 * - right: characters greater than the current character
 * 
 * Benefits:
 * - Uses significantly less memory for sparse datasets
 * - Good for competitive programming constraints
 * 
 * Tradeoffs:
 * - Slightly more complex logic
 * - Similar time complexity but with larger constants
 * 
 * Time Complexity:
 *   - insert: O(m * log(alphabet_size)) on average
 *   - search: O(m * log(alphabet_size)) on average
 *   - worst case: O(m * alphabet_size)
 * Space: O(n) where n is number of nodes (much less than Trie for sparse data)
 */
export class PiotBingTST {
  private root: TSTNode | null = null;

  /**
   * Check if a word exists in the tree.
   * @param word - The word to search for
   * @returns true if the word has been inserted, false otherwise
   */
  contains(word: string): boolean {
    return this.get(word) !== 0;
  }

  /**
   * Get the frequency count of a word.
   * @param word - The word to search for
   * @returns The frequency count, or 0 if not found
   */
  get(word: string): number {
    const node = this.findNode(word, this.root, 0);
    return node === null ? 0 : node.value;
  }

  /**
   * Insert a word (overwrites existing count).
   * @param word - The word to insert
   * @param value - The frequency count to set
   */
  put(word: string, value: number): void {
    this.root = this.insertNode(this.root, word, value, 0);
  }

  /**
   * Insert a word and increment the count of all prefixes.
   * Example: inserting "cat" increments: c, ca, cat
   * @param word - The word to insert
   */
  putAll(word: string): void {
    this.root = this.incrementAll(this.root, word, 0);
  }

  /**
   * Insert a word but only increment non-root nodes.
   * Useful for avoiding double-counting the root node.
   * @param word - The word to insert
   * @param value - Not used (kept for signature compatibility)
   */
  putAllButRoot(word: string, value: number): void {
    this.root = this.incrementAllButRoot(this.root, word, value, 0);
  }

  /**
   * Recursively find a node matching the word.
   */
  private findNode(word: string, node: TSTNode | null, index: number): TSTNode | null {
    if (node === null) {
      return null;
    }

    const currentChar = word[index];

    if (currentChar < node.char) {
      return this.findNode(word, node.left, index);
    } else if (currentChar > node.char) {
      return this.findNode(word, node.right, index);
    } else if (index < word.length - 1) {
      // Move to next character in the word
      return this.findNode(word, node.mid, index + 1);
    } else {
      // Found the complete word
      return node;
    }
  }

  /**
   * Recursively insert a node, setting its value to the specified number.
   */
  private insertNode(node: TSTNode | null, word: string, value: number, index: number): TSTNode {
    const currentChar = word[index];

    if (node === null) {
      node = new TSTNode(currentChar, value);
    }

    if (currentChar < node.char) {
      node.left = this.insertNode(node.left, word, value, index);
    } else if (currentChar > node.char) {
      node.right = this.insertNode(node.right, word, value, index);
    } else if (index < word.length - 1) {
      node.mid = this.insertNode(node.mid, word, value, index + 1);
    } else {
      node.value = value;
    }

    return node;
  }

  /**
   * Recursively insert and increment counts for all prefixes.
   */
  private incrementAll(node: TSTNode | null, word: string, index: number): TSTNode {
    const currentChar = word[index];

    if (node === null) {
      node = new TSTNode(currentChar, 1);
    }

    if (currentChar < node.char) {
      node.left = this.incrementAll(node.left, word, index);
    } else if (currentChar > node.char) {
      node.right = this.incrementAll(node.right, word, index);
    } else if (index < word.length - 1) {
      node.mid = this.incrementAll(node.mid, word, index + 1);
    }

    node.value++;
    return node;
  }

  /**
   * Recursively insert and increment counts for all prefixes except root.
   */
  private incrementAllButRoot(node: TSTNode | null, word: string, value: number, index: number): TSTNode {
    const currentChar = word[index];

    if (node === null) {
      node = new TSTNode(currentChar, value);
    }

    if (currentChar < node.char) {
      node.left = this.incrementAllButRoot(node.left, word, value, index);
    } else if (currentChar > node.char) {
      node.right = this.incrementAllButRoot(node.right, word, value, index);
    } else if (index < word.length - 1) {
      node.mid = this.incrementAllButRoot(node.mid, word, value, index + 1);
    }

    // Only increment if this is not the root node
    if (node !== this.root) {
      node.value++;
    }

    return node;
  }
}

/**
 * Represents a single node in the Ternary Search Tree.
 * Each node has at most 3 children: left, mid, right.
 */
class TSTNode {
  char: string;
  value: number;
  left: TSTNode | null = null;
  mid: TSTNode | null = null;
  right: TSTNode | null = null;

  constructor(char: string, value: number = 0) {
    this.char = char;
    this.value = value;
  }
}
