/**
 * Basic Trie implementation using a fixed-size character array.
 * 
 * This is a simple yet efficient data structure for storing and searching strings.
 * It uses an array of size 26 (a-z) to store child nodes.
 * 
 * Time Complexity:
 *   - insert: O(m) where m is the length of the word
 *   - search: O(m)
 *   - space: O(n*26) where n is the number of nodes
 */
export class PiotBingTrie {
  private static readonly ALPHABET_SIZE = 26; // 'a' to 'z'

  private rootNode: TrieNode = new TrieNode();

  /**
   * Search for a word and return how many times it appears before this insertion.
   * @param word - The word to search for
   * @returns The frequency count before insertion
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
    const charIndex = word.charCodeAt(index) - 'a'.charCodeAt(0);
    return this.findNode(word, node.next[charIndex], index + 1);
  }

  /**
   * Recursively insert a node and increment counts along the path.
   * The count represents how many words pass through or end at this node.
   */
  private insertNode(node: TrieNode | null, word: string, index: number): TrieNode {
    if (node === null) {
      node = new TrieNode();
    }

    if (index === word.length) {
      node.value++;
      return node;
    }

    node.value++;
    const charIndex = word.charCodeAt(index) - 'a'.charCodeAt(0);
    node.next[charIndex] = this.insertNode(node.next[charIndex], word, index + 1);

    return node;
  }
}

/**
 * Represents a single node in the Trie.
 * Each node can have up to 26 children (one for each letter).
 */
class TrieNode {
  value: number = 0;
  next: Array<TrieNode | null> = Array(26).fill(null);
}
