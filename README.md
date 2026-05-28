# Algorithms: Trie & Ternary Search Tree Educational Library

A TypeScript implementation of classic string search data structures for learning and teaching algorithm design.

## Structures Included

### 1. **PiotBingTrie** - Basic Trie
A straightforward implementation using a fixed-size character array (26 chars for a-z).

**Best for**: Learning Trie fundamentals, simplicity-first approach

**Characteristics**:
- Fixed alphabet size (a-z)
- O(m) insertion and search where m = word length
- Space: O(n × 26) where n = number of nodes
- Good cache locality due to array storage

```typescript
const trie = new PiotBingTrie();
trie.put('apple');
console.log(trie.get('app')); // 1 (prefix found, "apple" contains it)
```

---

### 2. **PiotBingWithAlphabet** - Flexible Trie
An improved version that abstracts the alphabet logic, supporting custom character sets.

**Best for**: Production use, educational exploration of design patterns, Unicode/custom alphabets

**Characteristics**:
- Customizable alphabet (pass any string: "0-9", "a-z", Unicode, etc.)
- Alphabet class encapsulates character-to-index mapping
- Same time complexity as basic Trie
- Better separation of concerns
- Flexible for different use cases

```typescript
const trie = new PiotBingWithAlphabet('abcdefghijklmnopqrstuvwxyz');
const digitTrie = new PiotBingWithAlphabet('0123456789');

trie.put('hello');
digitTrie.put('12345');
```

---

### 3. **PiotBingTST** - Ternary Search Tree
A more memory-efficient structure using binary search on characters (left/mid/right children).

**Best for**: Sparse datasets, competitive programming, memory-constrained environments

**Characteristics**:
- 3 children per node (left < current, mid = next char, right > current)
- O(m × log(alphabet_size)) avg time
- Space: O(n) - much less than Trie for sparse data
- More complex logic but worth it for large datasets
- Supports `putAll()` and `putAllButRoot()` for prefix counting

```typescript
const tst = new PiotBingTST();
tst.putAll('cat');  // Increments c, ca, cat
tst.putAll('car');  // Increments c, ca, car
console.log(tst.get('ca')); // 2 (both words share prefix)
```

---

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn

### Install
```bash
npm install
```

### Compile TypeScript
```bash
npm run build
```

### Run Tests
```bash
npm test

# Watch mode for development
npm run test:watch
```

### Development (auto-compile)
```bash
npm run dev
```

---

## Usage Examples

### Basic Trie Usage
```typescript
import { PiotBingTrie } from './src/index';

const trie = new PiotBingTrie();

// Before inserting "apple", searching for any prefix returns 0
console.log(trie.get('app'));  // 0

trie.put('apple');
console.log(trie.get('apple')); // 1 (inserted once)
console.log(trie.get('app'));   // 1 (prefix counted)
console.log(trie.get('appl'));  // 1 (another prefix)
console.log(trie.get('banana')); // 0 (not in trie)

trie.put('apple');
console.log(trie.get('apple')); // 2 (inserted twice)
```

### Solving the Kattis Problem
This library was originally built to solve a competitive programming problem: counting word frequencies while handling prefix searches.

```typescript
import { PiotBingTrie } from './src/index';

const trie = new PiotBingTrie();
const input = ['person', 'person', 'app', 'app', 'apple'];

for (const word of input) {
  console.log(trie.get(word));  // Frequency before this insertion
  trie.put(word);               // Add the word
}
// Output: 0, 1, 0, 1, 0
```

### Comparing Structures
```typescript
import { PiotBingTrie, PiotBingWithAlphabet } from './src/index';

const trie1 = new PiotBingTrie();
const trie2 = new PiotBingWithAlphabet();

const words = ['algorithm', 'algorithms', 'alter', 'alter'];

for (const word of words) {
  trie1.put(word);
  trie2.put(word);
  console.log(`Trie1: ${trie1.get(word)}, Trie2: ${trie2.get(word)}`);
}
```

---

## Algorithm Complexity Reference

| Operation | Trie | TST |
|-----------|------|-----|
| Search | O(m) | O(m log k) |
| Insert | O(m) | O(m log k) |
| Space | O(nR) | O(n) |

Where:
- m = length of word
- n = number of nodes
- R = alphabet size (26 for a-z)
- k = alphabet size (in comparisons)

---

## Learning Resources

### What is a Trie?
A Trie (prefix tree) is a tree-like data structure optimized for string operations:
- **Prefix queries**: Find all words starting with "app" in one traversal
- **Fast lookups**: O(m) where m is word length, independent of dictionary size
- **Shared prefixes**: Common prefixes share nodes ("cat", "car" share "ca")

### When to Use Each Structure?

**Use PiotBingTrie when:**
- You're learning Trie concepts
- Your alphabet is fixed and small (a-z)
- You prioritize simplicity and clarity
- You want predictable memory access patterns

**Use PiotBingWithAlphabet when:**
- You need to support different alphabets
- You're building production code
- You want clean separation of concerns
- You might swap implementations later

**Use PiotBingTST when:**
- Your alphabet is sparse (only a few chars per node)
- Memory is constrained
- You need to optimize space vs. time tradeoff
- You're solving competitive programming problems

---

## Project Structure

```
src/
├── index.ts                 # Main export
├── PiotBingTrie.ts          # Basic Trie implementation
├── PiotBingWithAlphabet.ts  # Flexible Trie with Alphabet class
├── PiotBingTST.ts           # Ternary Search Tree
└── implementations.test.ts  # Jest tests for all three
```

---

## Performance Benchmarking

Run your own benchmarks by creating a test file:

```typescript
import { PiotBingTrie, PiotBingWithAlphabet, PiotBingTST } from './src/index';

const words = /* load your word list */;

console.time('Trie');
const trie = new PiotBingTrie();
for (const word of words) trie.put(word);
console.timeEnd('Trie');

console.time('Trie with Alphabet');
const alphabetTrie = new PiotBingWithAlphabet();
for (const word of words) alphabetTrie.put(word);
console.timeEnd('Trie with Alphabet');

console.time('TST');
const tst = new PiotBingTST();
for (const word of words) tst.putAll(word);
console.timeEnd('TST');
```

---

## From Java to TypeScript: Key Changes

**Language Features Used**:
- **Classes**: Same as Java but simpler syntax
- **Generics**: Not used (would be `<Value>` in Java, not needed here)
- **Null safety**: TypeScript `| null` instead of Java's lack of union types
- **Access modifiers**: `private`, `public` work the same way
- **Array initialization**: `Array(size).fill(null)` instead of `new Type[size]`

**TypeScript Improvements**:
- Better type safety with union types (`TrieNode | null`)
- Cleaner method syntax without explicit return type declaration in many cases
- No need for getters/setters boilerplate
- String methods built-in (`.charCodeAt()`, `.length` property vs Java's `.charAt()` and `.length()`)

---

## Next Steps: Building the Educational App

This library is the foundation for an interactive learning platform:

1. **REST API**: Expose these data structures via endpoints
2. **Visualization**: Use D3.js to animate tree insertions
3. **Performance Dashboard**: Real-time benchmarking and comparison
4. **Interactive Challenges**: "Fix the code" exercises, optimization quizzes
5. **Problem Library**: Real competitive programming problems

---

## License

MIT - Free to use and modify for educational purposes

---

## Author

Original Java implementations: Algorithm Design Course Assignment  
TypeScript port and documentation: Educational Enhancement
