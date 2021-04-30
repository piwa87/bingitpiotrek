
import junit.framework.TestCase;

import org.junit.Test;

public class PiotBingTrieTest extends TestCase {

	@Test
	public void test() {
		final PiotBingTrie trieST = new PiotBingTrie();
		TestCase.assertEquals(0, trieST.get("person"));
		trieST.put("person");
		TestCase.assertEquals(0, trieST.get("kimi"));
		trieST.put("kimi");
		TestCase.assertEquals(1, trieST.get("per"));
		trieST.put("per");
		TestCase.assertEquals(1, trieST.get("pers"));
		trieST.put("pers");
		TestCase.assertEquals(1, trieST.get("kim"));
		trieST.put("kim");
		TestCase.assertEquals(3, trieST.get("pe"));
		trieST.put("pe");
		TestCase.assertEquals(0, trieST.get("z"));
		trieST.put("z");
		TestCase.assertEquals(1, trieST.get("z"));
		trieST.put("z");
		TestCase.assertEquals(2, trieST.get("z"));
		trieST.put("z");
		TestCase.assertEquals(0, trieST.get("zzz"));
		trieST.put("zzz");
		TestCase.assertEquals(0, trieST.get("performance"));
		trieST.put("performance");
		TestCase.assertEquals(0, trieST.get("perforation"));
		trieST.put("perforation");
	}

	@Test
	public void testTwo() {
		final PiotBingWithAlphabet trieST = new PiotBingWithAlphabet();
		TestCase.assertEquals(0, trieST.get("person"));
		trieST.put("person");
		TestCase.assertEquals(0, trieST.get("kimi"));
		trieST.put("kimi");
		TestCase.assertEquals(1, trieST.get("per"));
		trieST.put("per");
		TestCase.assertEquals(1, trieST.get("pers"));
		trieST.put("pers");
		TestCase.assertEquals(1, trieST.get("kim"));
		trieST.put("kim");
		TestCase.assertEquals(3, trieST.get("pe"));
		trieST.put("pe");
		TestCase.assertEquals(0, trieST.get("z"));
		trieST.put("z");
		TestCase.assertEquals(1, trieST.get("z"));
		trieST.put("z");
		TestCase.assertEquals(2, trieST.get("z"));
		trieST.put("z");
		TestCase.assertEquals(0, trieST.get("zzz"));
		trieST.put("zzz");
		TestCase.assertEquals(0, trieST.get("performance"));
		trieST.put("performance");
		TestCase.assertEquals(0, trieST.get("perforation"));
		trieST.put("perforation");
	}
}
