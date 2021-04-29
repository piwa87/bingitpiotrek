import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.CharBuffer;

public class PiotBingTrie {
    public static void main(String[] args) throws IOException {

        BufferedReader sc = new BufferedReader(new InputStreamReader(System.in));

        TrieST st = new TrieST();
        int n = Integer.parseInt(sc.readLine());

        for (int i = 0; i < n; i++) {
            String word = sc.readLine();    
            System.out.println(st.get(word));
            st.put(word);
        }
    }

    public static class TrieST {

        private static final int R = 123;
        private Node root = new Node();

        public TrieST() {
        }

        private static class Node {
            private int val;
            private Node[] next = new Node[R];
        }

        public boolean contains(String key) {
            return get(key) != 0;
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
            char c = key.charAt(d);
            return get(x.next[c], key, d + 1);
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
            char c = key.charAt(d);
            x.next[c] = put(x.next[c], key, d + 1);
            return x;
        }
    }
}