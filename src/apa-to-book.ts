// import newNote from "newNote.json";

// interface noteBook {
// 	type: "book";
// 	aliases?: string[];
// 	author: string[];
// 	year: number | "n. d.";
// 	title: string;
// 	publisher: string;
// 	ogyear?: number;
// 	apa?: string;
// }

// function makeNewRefNote(): string {
// 	let note: object = {
// 		type: "",
// 		aliases: "",
// 		author: "",
// 		year: "",
// 		title: "",
// 		publisher: "",
// 		ogyear: "",
// 		apa: "",
// 	};

// 	return JSON.stringify(note);
// }

// function parseNote(note: string)
// note.type = type;
// note.author = "";

// function jsonToNoteBook(input: string): noteBook {}

// function checkYearOrNd(input: string): number | "n. d." {
// 	return "n. d.";
// }
// function checkMultipleAuthors(input: string): string[] {
// 	return ["Derrida, J."];
// }

// function isOgyearEarlierThanYear() {}

// function addItalics(input: string): string {
// 	return "_" + input + "_";
// }
// function removeItalics(input: string): string {
// 	return input.replace("/_/g", "");
// }

// function trimDotFromEnd(input: string) {
// 	return input.replace(/\.$/, "");
// }

// function parseApa(book: string): noteBook {
// 	const regexPattern = /(.*)\s*(\(\d{4})\)\.(.*?)\.(.*?)\.\s*(\(.*?\))?/;
// 	const authorsRegex = /((?:[\w,\s\.]+, )+[\w,\s\.]+)+((?:& [\w,\s\.]+)?)/;
// 	const ogyearRegex = /\b(\d{4})\b/;

// 	const match = book.match(regexPattern);
// 	const [author, year, title, publisher, ogyear] = match
// 		? match
// 		: ["error", "error", "error", "error", "error"];

// 	const authorResult = author.match(authorsRegex);
// 	const yearResult = checkYearOrNd(year);
// 	const titleResult = removeItalics(title);
// 	const publisherResult = trimDotFromEnd(publisher);
// 	const ogyearResult = ogyear.match(ogyearRegex)?.[0] || "";

// 	const result = {
// 		type: "book",
// 		aliases: [""],
// 		author: authorResult!,
// 		year: yearResult,
// 		title: titleResult,
// 		publisher: publisherResult,
// 		ogyear: parseInt(ogyearResult),
// 		apa: "",
// 	};

// 	result.apa = generateApa(result);
// 	result.aliases = generateAliases(result);

// 	return result;
// }

// function main(book: string) {
// 	const result = parseApa(book);
// 	console.log(result);
// }

// const example: noteBook = {
// 	type: "book",
// 	aliases: ["Derrida (1991)", "(Derrida, 1991)"],
// 	author: ["J Derrida"],
// 	year: 1991,
// 	title: "A farmácia de Platão",
// 	publisher: "Iluminuras",
// 	ogyear: 1972,
// 	apa: "Derrida, J. (1991). _A farmácia de Platão_. Iluminuras. (Original publicado em 1972)",
// };

// function generateApa(book: noteBook) {
// 	let ogyear = "";
// 	if (book.ogyear) {
// 		ogyear = `(Trabalho original publicado em ${book.ogyear})`;
// 	}
// 	return `${book.author} (${book.year}). ${book.title}. ${book.publisher}. ${ogyear}`;
// }

// function generateAliases(book: noteBook) {
// 	let year = "";
// 	let names: string[] = [];

// 	book.author.forEach((item) => {
// 		names.push(extractLastName(item));
// 	});

// 	if (book.ogyear) {
// 		year = `${book.ogyear}/${book.year}`;
// 	} else {
// 		year = book.year.toString();
// 	}

// 	if (names.length === 1) {
// 		return [`(${names[0]}, ${year})`, `${names[0]}, (${year})`];
// 	} else {
// 		const namesResult = "açlskdaçlsdk"; // TODO
// 		return [`(${namesResult}, ${year})`, `${namesResult}, (${year})`];
// 	}
// }

// function extractLastName(fullName: string): string {
// 	const names = fullName.split(" ");
// 	const lastName = names[names.length - 1];
// 	return lastName;
// }

// const book1 =
// 	"Derrida, J. (1991). _A farmácia de Platão_. Iluminuras. (Original publicado em 1972)";
// const book2 =
// 	"Jorge, M. A. C. & Travassos, N. P. (2018). _Transexualidade: o corpo entre o sujeito e a ciência_. Zahar.";
// const book3 =
// 	"Jorge, M. A. C., Derrida, J. & Travassos, N. P. (2018). _Transexualidade: o corpo entre o sujeito e a ciência_. Zahar.";
// main(book1);
// console.log(generateApa(example));
