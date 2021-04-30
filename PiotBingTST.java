/**
 *  This is a tryout with ternary search tree.
 *  It doesn't solve the problem correctly.
 *
 */

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class PiotBingTST {

	public static class TST<Value> {

		private static class Node {
			private char c;
			private Node left, mid, right;
			private int val;
		}

		private Node root;

		public TST() {
		}

		public boolean contains(final String key) {
			return get(key) != 0;
		}

		private Node get(final Node x, final String key, final int d) {
			if (x == null) {
				return null;
			}
			final char c = key.charAt(d);
			if (c < x.c) {
				return get(x.left, key, d);
			} else if (c > x.c) {
				return get(x.right, key, d);
			} else if (d < key.length() - 1) {
				return get(x.mid, key, d + 1);
			} else {
				return x;
			}
		}

		public int get(final String key) {
			final Node x = get(root, key, 0);
			if (x == null) {
				return 0;
			}
			return x.val;
		}

		private Node put(Node x, final String key, final int val, final int d) {
			final char c = key.charAt(d);
			if (x == null) {
				x = new Node();
				x.c = c;
				x.val = val;
			}
			if (c < x.c) {
				x.left = put(x.left, key, val, d);
			} else if (c > x.c) {
				x.right = put(x.right, key, val, d);
			} else if (d < key.length() - 1) {
				x.mid = put(x.mid, key, val, d + 1);
			} else {
				x.val = val;
			}
			return x;
		}

		public void put(final String key, final int val) {
			root = put(root, key, val, 0);
		}

		private Node putAll(Node x, final String key, final int val, final int d) {
			final char c = key.charAt(d);
			if (x == null) {
				x = new Node();
				x.c = c;
				x.val = val;
			}
			if (c < x.c) {
				x.left = putAll(x.left, key, val, d);
			} else if (c > x.c) {
				x.right = putAll(x.right, key, val, d);
			} else if (d < key.length() - 1) {
				x.mid = putAll(x.mid, key, val, d + 1);
			}
			x.val++;
			return x;
		}

		public void putAll(final String key) {
			root = putAll(root, key, 0, 0);
		}

		private Node putAllButRoot(Node x, final String key, final int val,
				final int d) {
			final char c = key.charAt(d);
			if (x == null) {
				x = new Node();
				x.c = c;
				x.val = val;
			}
			if (c < x.c) {
				x.left = putAllButRoot(x.left, key, val, d);
			} else if (c > x.c) {
				x.right = putAllButRoot(x.right, key, val, d);
			} else if (d < key.length() - 1) {
				x.mid = putAllButRoot(x.mid, key, val, d + 1);
			}
			if (x != root) {
				x.val++;
			}
			return x;
		}

		public void putAllButRoot(final String key, final int val) {
			root = putAllButRoot(root, key, val, 0);
		}
	}

	public static void main(final String[] args) throws NumberFormatException,
	IOException {

		final TST<Integer> st = new TST<Integer>();

		final BufferedReader sc = new BufferedReader(new InputStreamReader(
				System.in));
		// BufferedReader sc = new BufferedReader(new FileReader("3.in"));

		final int n = Integer.parseInt(sc.readLine());

		final String firstWord = sc.readLine();
		final char p = firstWord.charAt(0);
		System.out.println(0);
		st.put(firstWord, 1);

		for (int i = 1; i < n; i++) {
			final String word = sc.readLine();
			if (!st.contains(word)) { // new word!
				System.out.println(st.get(word));
				if (word.charAt(0) == p) {
					st.putAll(word);
				} else {
					st.putAllButRoot(word, 0);
				}
			} else { // word exists
				System.out.println(st.get(word));
				if (word.charAt(0) == p) {
					st.putAll(word);
				} else {
					st.putAllButRoot(word, 0);
				}
			}
		}
	}
}