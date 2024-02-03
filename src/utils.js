"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeApa = exports.makeAliases = void 0;
function invertName(input) {
    return "NOTIMPLEMENTED";
}
function getLastName(input) {
    var pattern = /^(\w+)/;
    var result = input.match(pattern);
    if (result) {
        return result[0];
    }
    else {
        throw Error("error getting last name");
    }
}
function formatYear(year, ogyear) {
    if (ogyear) {
        return "".concat(ogyear, "/").concat(year);
    }
    else {
        return year;
    }
}
function concatAuthorLastName(author) {
    var result = "";
    author.forEach(function (item) { return getLastName(item); });
    if (author.length < 1) {
        throw Error("Author array empty");
    }
    else if (author.length === 1) {
        result = author[0];
    }
    else if (author.length === 2) {
        result = "".concat(author[0], " & ").concat(author[1]);
    }
    else {
        result = "".concat(author[0], " et al.");
    }
    return result;
}
function concatAuthorFullName(author) {
    var result = "";
    if (author.length < 1) {
        throw Error("Author array empty");
    }
    else if (author.length === 1) {
        result = author[0];
    }
    else if (author.length === 2) {
        result = author.join(" & ");
    }
    else if (author.length > 2) {
        result =
            author
                .slice(0, -1) // Exclude the last author
                .join(", ") + " & ".concat(author.slice(-1));
    }
    return result;
}
function makeAliases(frontmatter) {
    var author = frontmatter.author;
    var year = frontmatter.year;
    var ogyear = frontmatter.ogyear;
    var _author = concatAuthorLastName(author);
    var _year = formatYear(year, ogyear);
    var template_one = "(".concat(_author, ", ").concat(_year, ")");
    var template_two = "".concat(_author.replace("&", "e"), " (").concat(_year, ")");
    return [template_one, template_two];
}
exports.makeAliases = makeAliases;
function makeApa(frontmatter) {
    if (frontmatter.type === "book") {
        var author = frontmatter.author;
        var year = frontmatter.year;
        var title = frontmatter.title;
        var publisher = frontmatter.publisher;
        var ogyear = frontmatter.ogyear;
        var _author = concatAuthorFullName(author);
        var _ogyear = ogyear
            ? " (Trabalho original publicado em ".concat(ogyear, ")")
            : "";
        //"{0} ({1}). _{2}_. {3}. (Trabalho original publicado em {4})"
        return "".concat(_author, " (").concat(year, "). _").concat(title, "_. ").concat(publisher, ".").concat(_ogyear);
    }
    if (frontmatter.type === "article") {
        //TODO
        var article_template = "{0}. ({1}). {2}. _{3}_, _{4}_({5}), {6}–{7}, {8}";
        throw Error("notimplemented");
    }
    if (frontmatter.type === "inbook") {
        //TODO
        throw Error("notimplemented");
    }
    throw Error("type unkown");
}
exports.makeApa = makeApa;
