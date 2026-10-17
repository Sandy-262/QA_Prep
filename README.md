# QA Prep

A free, curated self-study path for QA / SDET interview prep — programming basics, testing fundamentals, UI and API automation, SQL, and CI/CD — plus a capstone project to tie it together, and an in-page Java/Python code playground to practice in.

**Live page:** https://sandy-262.github.io/QA_Prep/

## Why this exists

Resource lists get copy-pasted into notes apps and never looked at again. This repo turns the list into a single checklist page you can actually track progress on (checkboxes persist in your browser via `localStorage`), plus a spot to actually write and run code instead of just reading about it.

## Structure

No build step, no dependencies — plain files served as-is via GitHub Pages.

- `index.html` — page skeleton: header, theme toggle, playground markup, `<main>` mount point for the modules.
- `data.js` — all study-checklist content (modules, resources, capstone, footer). Edit this alone to change copy.
- `app.js` — renders `data.js` into the checklist and handles the progress/localStorage logic.
- `playground-data.js` — code-playground config: languages, [Wandbox](https://wandbox.org/) compiler ids, starter snippets.
- `playground.js` — builds the language picker from `playground-data.js`, runs code via the Wandbox API, renders output/errors.
- `theme.js` — the light/dark toggle (plus a small inline script in `index.html`'s `<head>` that applies a saved theme before first paint, to avoid a flash).
- `styles.css` — all presentation.

## The code playground

Runs Python and Java snippets through the free, public [Wandbox](https://wandbox.org/) compiler API (no signup, no key — sends your code to their servers to execute, so don't paste anything sensitive). To add a language, add an entry to `playground-data.js` with a compiler id from `https://wandbox.org/api/list.json`; the dropdown and run logic pick it up automatically.

Java note: the compiler API saves your code as `prog.java`, so the main class must be named `Main` **without** the `public` keyword (`class Main { ... }`) — that's baked into the starter snippet and called out in a comment.

## Updating

Edit the relevant file and push to `main` — GitHub Pages redeploys automatically within a minute or two.
