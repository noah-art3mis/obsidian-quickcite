# Obsidian QuickCite Plugin

Cite things quickly.

Uses obsidian's own \[\[backlink|alias\]\] syntax. Supports reference types: `book`, `inbook` (aka chapter) and `article` (aka papers)

## Usage

! Remember to set default folder in settings before using !

When you want to make new reference:

-   make a new note
-   generate the frontmatter
    -   `CTRL+P` to open pallete; type `cite book` or `cite article` or `cite chapter`
-   fill it in
    -   type each author as `Lastname, F.`
-   generate aliases.
    -   `CTRL+P` to open pallete; type `alias`
-   change the name of the note to whatever you will recall quickly

Done! Now when you want to cite something, write \[\[{note_name} and find the alias you need.

Functions:

-   generate bibliography
    -   will generate a list at the end of the file with all the backlinks in the file (deduplicated).

## notes

Stores citations as notes with data in the front matter. Notes have commonly used aliases. You have access to the data yourself and can change it if you want.

## you shouln't use this if

-   zotero integration works for you. i don't use zotero. some fields are better equipped than others to use it. i suppose the search function in the integration is very powerful but also slow.
-   cite hundreds of papers and can't keep track. use zotero for this.
    -   use if maybe you cite a few books over and over.

## todo

-   getlastname doesnt work
-   add tests
-   add function that makes new note
-   add article and inbook
-   refuse to generate aliases if info empty
-   apa is recognized as number for some reason
-   add check to change first name to L.
-   default settings don't work.
-   Make new files
    -   Vault
        -   Sample Reference
-   Generate references section
    -   MetadataCache
        -   check if links to folder
-   collapse multiple citation
