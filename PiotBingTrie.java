public class PiotBingTrie {

	private static class Node {
		private int value;
		private final Node[] next = new Node[PiotBingTrie.ARRAY_SIZE];
	}

	public static void main(final String[] args) {
		final Kattio kattio = new Kattio(System.in, System.out);
		final PiotBingTrie piotBingTrie = new PiotBingTrie();
		final int lineCount = kattio.getInt();
		// Moved variable decl. out of loop: Only one variable needed, not one
		// per iteration. Should save some resources, since they can be reused.
		String nextWord;
		for (int lineIndex = 0; lineIndex < lineCount; lineIndex++) {
			nextWord = kattio.getWord();
			// TODO Try to refactor the put method to return the count when
			// putting. Remember to increment the count AFTER you have found out
			// the count, because we do not count the token you are putting.
			// When the new put method works, put it in where the get is in this
			// line:
			kattio.println(piotBingTrie.get(nextWord));
			// ... and remove this line:
			piotBingTrie.put(nextWord);
		}
		kattio.close();
	}

	// See how compact this is with the right nomenclature and declaration. You
	// don't need any comments. And you don't need to call it R. What is R?
	// Nobody knows. Everybody can understand ARRAY_SIZE
	private static final int ARRAY_SIZE = 'z' + 1;

	private Node rootNode = new Node();

	private Node get(final Node nextNode, final String wordToFind,
			// TODO <- A better name for this variable would be "searchString" or just
			// "string". The advantage of that name would be that it clearly indicates
			// what type of an object it is. Word is not a class. String is.
			final int indexInWord) {
		if (nextNode == null) {
			return null;
		}
		if (indexInWord == wordToFind.length()) {
			return nextNode;
		}
		final char positionAt = wordToFind.charAt(indexInWord);
		return get(nextNode.next[positionAt], wordToFind, indexInWord + 1);
	}

	public int get(final String wordToFind) {
		// TODO Is this next line doing anything?
		final Node nextNode = get(rootNode, wordToFind, 0);
		return nextNode == null ? 0 : nextNode.value;
	}

	public Node put(Node newNode,
	// TODO <- Why do you have newNode as an argument? At what time do you
	// actually have the node you want to insert? You are creating
	// the object below if it does not exist. Does it ever exist?
			final String wordToInsert, final int pointer
	// TODO Pointer is probably a bad name for this variable, because it does
	// not say anything. In Java, all but the simple types are pointers. :-)
	// "currentIndex" or "currentIndexInWord" or even "currentIndexInString"
	// would be better.
	) {
		if (newNode == null) {
			newNode = new Node();
		}
		if (pointer == wordToInsert.length()) {
			newNode.value++;
			return newNode;
		}
		newNode.value++;
		final char positionAt // TODO Find a better name. What does the variable
								// contain? Maybe "currentIndexInNodeArray"?
		= wordToInsert.charAt(pointer);
		newNode.next[positionAt] = put(newNode.next[positionAt], wordToInsert,
				pointer + 1);
		return newNode;
	}

	public void put(final String wordToInsert) {
		rootNode = put(rootNode, wordToInsert, 0);
	}
}