function invertName(input: string): string {
	return "NOTIMPLEMENTED";
}

function getLastName(input: string): string {
	const pattern = /^(\w+)/;
	const result = input.match(pattern);

	if (result) {
		return result[0];
	} else {
		throw Error("error getting last name");
	}
}

function formatYear(year: string, ogyear: string): string {
	if (ogyear) {
		return `${ogyear}/${year}`;
	} else {
		return year;
	}
}

function concatAuthorLastName(author: string[]): string {
	let result = "";
	author.forEach((item) => getLastName(item));

	if (author.length < 1) {
		throw Error("Author array empty");
	} else if (author.length === 1) {
		result = author[0];
	} else if (author.length === 2) {
		result = `${author[0]} & ${author[1]}`;
	} else {
		result = `${author[0]} et al.`;
	}
	return result;
}

function concatAuthorFullName(author: string[]): string {
	let result = "";

	if (author.length < 1) {
		throw Error("Author array empty");
	} else if (author.length === 1) {
		result = author[0];
	} else if (author.length === 2) {
		result = author.join(" & ");
	} else if (author.length > 2) {
		result =
			author
				.slice(0, -1) // Exclude the last author
				.join(", ") + ` & ${author.slice(-1)}`;
	}
	return result;
}

export function makeAliases(frontmatter: any): string[] {
	const author = frontmatter.author;
	const year = frontmatter.year;
	const ogyear = frontmatter.ogyear;

	const _author = concatAuthorLastName(author);
	const _year = formatYear(year, ogyear);

	const template_one = `(${_author}, ${_year})`;
	const template_two = `${_author.replace("&", "e")} (${_year})`;

	return [template_one, template_two];
}

export function makeApa(frontmatter: any): string {
	if (frontmatter.type === "book") {
		const author = frontmatter.author;
		const year = frontmatter.year;
		const title = frontmatter.title;
		const publisher = frontmatter.publisher;
		const ogyear = frontmatter.ogyear;

		const _author = concatAuthorFullName(author);
		const _ogyear = ogyear
			? ` (Trabalho original publicado em ${ogyear})`
			: "";

		//"{0} ({1}). _{2}_. {3}. (Trabalho original publicado em {4})"
		return `${_author} (${year}). _${title}_. ${publisher}.${_ogyear}`;
	}
	if (frontmatter.type === "article") {
		//TODO
		const article_template =
			"{0}. ({1}). {2}. _{3}_, _{4}_({5}), {6}–{7}, {8}";
		throw Error("notimplemented");
	}
	if (frontmatter.type === "inbook") {
		//TODO
		throw Error("notimplemented");
	}
	throw Error("type unkown");
}
