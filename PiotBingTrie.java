public class PiotBingTrie {

	// Simple node object:

	private static class Node {
		private int value;
		private final Node[] next = new Node[R];
	}

	/** 
	 *	The magic number 123.
	 *	I know that the input is only lowecase letters of alphabet (a-z), 
	 * 	which get the byte[] numbers from 97 to 122.
	 */

	private static final int R = 123;
	private Node root = new Node();

	public int get(String wordToFind) {
		Node nextNode = get(root, wordToFind, 0);
		return (nextNode == null) ? 0 : nextNode.value;
	}

	private Node get(Node nextNode, String wordToFInd, int pointer) {
		if (nextNode == null) return null;
		if (pointer == wordToFInd.length()) return nextNode;
		char positionAt = wordToFInd.charAt(pointer);
		return get(nextNode.next[positionAt], wordToFInd, pointer + 1);
	}


	public Node put(Node newNode, String wordToInsert, int pointer) {
		if (newNode == null) newNode = new Node();
		
		if (pointer == wordToInsert.length()) {
			newNode.value++;
			return newNode;
		}
		newNode.value++;
		char positionAt = wordToInsert.charAt(pointer);
		newNode.next[positionAt] = put(newNode.next[positionAt], wordToInsert, pointer + 1);
		return newNode;
	}

	public void put(String wordToInsert) {
		root = put(root, wordToInsert, 0);
	}

	public static void main(String[] args) {

		Kattio io = new Kattio(System.in, System.out);
		PiotBingTrie trie = new PiotBingTrie();

		int numberOfLines = io.getInt();
		for (int i = 0; i < numberOfLines; i++) {

			String nextWord = io.getWord();
			io.println(trie.get(nextWord));
			trie.put(nextWord);
		}
		io.close();
	}
}