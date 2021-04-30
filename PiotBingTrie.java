import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

// TODO Rename all variables to something meaningful
public class PiotBingTrie {

	public static class TrieST {

		// TODO This is getting complicated. This is an inner-inner class.
		// We can refactor it later.
		private static class Node {
			private int val;
			private final Node[] next = new Node[TrieST.R];
		}

		// TODO This is a magic number. Add explanation. Why 123?
		private static final int R = 123;
		private Node root = new Node();

		// TODO This method is not used as I can see
		public boolean contains(final String key) {
			return get(key) != 0;
		}

		private Node get(final Node x, final String key, final int d) {
			if (x == null) {
				return null;
			}
			if (d == key.length()) {
				return x;
			}
			final char c = key.charAt(d);
			return get(x.next[c], key, d + 1);
		}

		public int get(final String key) {
			final Node x = get(root, key, 0);
			if (x == null) {
				return 0;
			}
			return x.val;
		}

		public Node put(Node x, final String key, final int d) {
			if (x == null) {
				x = new Node();
			}
			if (d == key.length()) {
				x.val++;
				return x;
			}
			x.val++;
			final char c = key.charAt(d);
			x.next[c] = put(x.next[c], key, d + 1);
			return x;
		}

		public void put(final String key) {
			root = put(root, key, 0);
		}
	}

	public static void main(final String[] args) throws IOException {
		final BufferedReader sc = new BufferedReader(new InputStreamReader(
				System.in));
		final TrieST st = new TrieST();
		final int n = Integer.parseInt(sc.readLine());
		for (int i = 0; i < n; i++) {
			final String word = sc.readLine();
			// TODO use buffered writer as provided by kattis kattio
			System.out.println(st.get(word));
			st.put(word);
		}
	}
}