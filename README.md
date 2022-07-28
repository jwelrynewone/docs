# NibiruChain/gitbook-docs              <!-- omit in toc -->

This repository houses the documentation for the Nibiru gitbook. Pushing to the master branch currently deploys [here](https://nibiru-3.gitbook.io/nibiru-docs/8SHUbqPdzCKhKDWYDUXy). To make changes to the site, simply open a PR.

# ⚙️ — Contribution Guidelines                  <!-- omit in toc -->

- [Markdown](#markdown): Syntax for Gitbook
- [SUMMARY.md](#summarymd): To edit the table of contents, edit [SUMMARY.md](nibiru-book/SUMMARY.md).
- [Front Matter](#front-matter): Describes how to include optional front matter
- [GLOSSARY.md](#glossarymd): Defines terms to be specified as annotations in search

## Markdown

Most of the files for GitBook use the Markdown syntax by default. GitBook infers your pages's structure from it. The syntax used is similar to the [GitHub Flavored Markdown syntax](https://guides.github.com/features/mastering-markdown/). One can also opt for the [AsciiDoc syntax](asciidoc.md).

##### Example of a chapter file

``` markdown
# Title of the chapter

This is a great introduction.

## Section 1

Markdown will dictates _most_ of your **book's structure**

## Section 2

...

```

## SUMMARY.md 

GitBook uses a `SUMMARY.md` file to define the structure of chapters and subchapters of the book. The `SUMMARY.md` file is used to generate the book's table of contents.

The format of `SUMMARY.md` is just a list of links. The link's title is used as the chapter's title, and the link's target is a path to that chapter's file.

Adding a nested list to a parent chapter will create subchapters.

##### Simple example

```markdown
# Summary

* [Part I](part1/README.md)
  * [Writing is nice](part1/writing.md)
  * [GitBook is nice](part1/gitbook.md)

* [Part II](part2/README.md)
  * [We love feedback](part2/feedback_please.md)
  * [Better tools for authors](part2/better_tools.md)

----

* [Last part without title](part3/title.md)
```

Each chapter has a dedicated page (`part#/README.md`) and is split into subchapters.

Parts are just groups of chapters and do not have dedicated pages, but according to the theme, it will show in the navigation.


## Front Matter

Pages can contain an optional front matter. It can be used to define the page's description. The front matter must be the first thing in the file and must take the form of valid YAML set between triple-dashed lines. Here is a basic example:

```yaml
---
description: This is a short description of my page
---

# The content of my page
...
```

The front matter can define variables of your own, they will be added to the [page variable](templating/variables.md) so you can use them in your templating.

---

## GLOSSARY.md

Allows you to specify terms and their respective definitions to be displayed as annotations. Based on those terms, GitBook will automatically build an index and highlight those terms in pages.

The `GLOSSARY.md` format is a list of `h2` headings, along with a description paragraph:

```markdown
## Term
Definition for this term

## Another term
With it's definition, this can contain bold text
and all other kinds of inline markup ...
```


---

Reference the (now deprecated) [GitbookIO/gitbook repo](https://github.com/GitbookIO/gitbook) for additional documentation on editting a gitbook locally. 
