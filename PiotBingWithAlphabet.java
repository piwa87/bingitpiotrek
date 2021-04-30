public class PiotBingWithAlphabet {

    private static Alphabet alphabet = new Alphabet("abcdefghijklmnopqrstuvwxyz");
    private Node root = new Node();

    public PiotBingWithAlphabet() {
    }

    private static class Node {
        private int val;
        private Node[] next = new Node[alphabet.R];
    }

    public int get(String key) {
        Node x = get(root, key, 0);
        if (x == null)
            return 0;
        return x.val;
    }

    private Node get(Node x, String key, int d) {
        if (x == null)
            return null;
        if (d == key.length())
            return x;
        int i = alphabet.toIndex(key.charAt(d));
        return get(x.next[i], key, d + 1);
    }

    public void put(String key) {
        root = put(root, key, 0);
    }

    public Node put(Node x, String key, int d) {
        if (x == null)
            x = new Node();
        if (d == key.length()) {
            x.val++;
            return x;
        }
        x.val++;
        int i = alphabet.toIndex(key.charAt(d));
        x.next[i] = put(x.next[i], key, d + 1);
        return x;
    }

    public static class Alphabet {

        private char[] alphabet;
        private int[] inverse;
        private final int R;

        public Alphabet(String alpha) {

            alphabet = alpha.toCharArray();
            R = alpha.length();
            inverse = new int[123];
            for (int i = 0; i < inverse.length; i++)
                inverse[i] = -1;

            for (int c = 0; c < R; c++)
                inverse[alphabet[c]] = c;
        }

        public int toIndex(char c) {
            return inverse[c];
        }

        public char toChar(int index) {
            return alphabet[index];
        }
    }

    public static void main(String[] args) {

        Kattio io = new Kattio(System.in, System.out);

        PiotBingWithAlphabet trie = new PiotBingWithAlphabet();

        int numberOfLines = io.getInt();

        for (int i = 0; i < numberOfLines; i++) {
            String word = io.getWord();
            io.println(trie.get(word));
            trie.put(word);
        }
        
        io.close();
    }
}