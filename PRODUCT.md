# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primarily one person: the author, a Geodesy and Geoinformatics student at THWS, using it to prepare for exams. The site and repo are public, so classmates may come across it, but nothing is designed for them. Main setting: laptop at a desk, in long sessions spent working through chapters, Rechenwege (worked solutions) and mini-checks before an exam.

## Product Purpose

GEO Lernskripte (repo `geohud`) turns scattered course material (lecture scripts, slides, exercises, model solutions, past exams) into one interactive study script plus a printable exam cheatsheet per subject. Success means passing the exams: this semester's (3rd semester), the retakes (Mathematik I, Objektorientierte Programmierung, Landmanagement I), and later semesters' exams too, so the format has to keep absorbing new subjects.

## Positioning

The content is built from this programme's own sources and past exams (Altklausuren). Exam patterns are reproduced as checks, every worked number is re-checked in Python, and known exam weaknesses are flagged. A generic study tool couldn't honestly claim this, because its content isn't tied to these exact exams.

## Operating Context

- Content is written in German and follows the lecture terminology.
- Sources: GoodNotes notes, iCloud storage of originals and past exams, and the THWS Moodle (elearning.thws.de). Each subject lists its sources.
- Per subject: "Interaktives Lernskript" tab (chapters, TOC with scrollspy, foldable Rechenweg boxes, quizzes) and "Klausur-Cheatsheet" tab (also printed on A4, two columns).
- Reading progress is stored locally per chapter id.

## Capabilities and Constraints

- Static site with no build step: `index.html`, `subjects.js` (subject register), `content/<id>.js` (full subject content), `studyData.js` (older "missions", shown as legacy chapters until a full script exists). PWA with service worker and manifest. Deployed via GitHub Pages from `main`.
- Rendering: KaTeX for math, highlight.js for code, dark and light themes, print CSS.
- Content block types: headings, paragraphs, math, lists, tables, code, callouts (def/trap/merke/ex/info), steps, quizzes (mc/gap/bug/order, including code puzzles), formula with variables, recipe, figure, html.
- Hard rules: chapter and subject ids never change (they key saved progress); bump `version` in `subjects.js` and `VERSION` in `sw.js` after updates; no formulas in headings; every number is verified by computation.
- The UI moved from a gamified HUD (XP, levels, missions) to a docs-style UI on 2026-11-26. Gamification is legacy, not a goal.
- Subjects covered so far: Ausgleichsrechnung in full. Mathematik I, OOP and Landmanagement I as legacy missions. Six more subjects are still to do.

## Evidence on Hand

- Real course material and past exams, used as sources and cited per subject. Local paths are kept in PROGRESS.md, which is gitignored; keep them out of public files.
- No testimonials, users, or usage numbers exist. Don't invent any.

## Product Principles

1. Exam-first: structure, checks and cheatsheets mirror what the exam actually asks.
2. Correctness over coverage: a worked number that hasn't been verified doesn't ship.
3. One format for every subject, so adding the next semester's subjects is mostly writing content.
4. Built for long, focused desk sessions: readable, low-noise, with easy navigation between chapter, worked solution and check.
5. The printed cheatsheet is a first-class output, not an afterthought.
