import * as refs from "./test_help";
import * as utils from "../src/utils";

// describe("", () => {
// 	test("", () => {
// 		expect(1).toBe(1);
// 	});
// });

// describe("util helpers", () => {

// 	test("getlastname", () => {
// 		expect(utils.getLastName("Derrida, J.")).toBe("Derrida");
// 	});
// 	test("formatyear_og", () => {
// 		expect(utils.formatYear("2022", "1929")).toBe("1929/2022");
// 	});
// 	test("formatyear no og", () => {
// 		expect(utils.formatYear("2022", "")).toBe("2022");
// 	});

// 	test("concat last zero", () => {
// 		expect(utils.concatAuthorLastName([""])).toThrow(Error));
// 	});

// 	test("concat last one", () => {
// 		expect(utils.concatAuthorLastName(["Derrida, J."])).toBe("2022");
// 	});
// 	test("concat last two", () => {
// 		expect(utils.concatAuthorLastName(["Derrida, J.", "Rorty, R."])).toBe("2022");
// 	});
// 	test("concat last three", () => {
// 		expect(utils.concatAuthorLastName(["Derrida, J.", "Rorty, R."])).toBe("2022");
// 	});
// });

describe("test aliases", () => {
	test("book one author", () => {
		expect(utils.makeAliases(refs.book_one_author)).toBe(
			refs.book_one_author.aliases
		);
	});
	test("book one author org", () => {
		expect(utils.makeAliases(refs.book_one_author_ogyear)).toBe(
			refs.book_one_author_ogyear.aliases
		);
	});
	test("book_two_authors", () => {
		expect(utils.makeAliases(refs.book_two_authors)).toBe(
			refs.book_two_authors.aliases
		);
	});
});

// describe("test apa generator", () => {
// 	test("", () => {
// 		expect(1).toBe(1);
// 	});
// });}
