---
name: GEO Lernskripte
description: Interactive study scripts and exam cheatsheets for Geodesy and Geoinformatics (THWS), in a dark docs-style reader.
colors:
  night-bg: "#0F1117"
  night-sidebar: "#13161E"
  night-panel: "#161A23"
  night-hover: "#1A1F2A"
  night-line: "#1E222D"
  night-line-strong: "#2A3040"
  night-code: "#0B0D12"
  ink-primary: "#E6E8EE"
  ink-secondary: "#B6BDCB"
  ink-muted: "#8790A2"
  ink-dim: "#5D6577"
  lamp-blue: "#7AA2F7"
  trap-red: "#F7768E"
  merke-green: "#9ECE6A"
  example-violet: "#BB9AF7"
  info-amber: "#E0AF68"
  day-bg: "#FFFFFF"
  day-sidebar: "#F8F9FB"
  day-line: "#E6E8EC"
  day-ink: "#14161C"
  day-blue: "#2F5BD3"
  day-trap: "#C7354F"
  day-merke: "#3C8A2E"
  day-violet: "#7B4FD0"
  day-amber: "#A86A10"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 650
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "0.06em"
  mono:
    fontFamily: "'JetBrains Mono', ui-monospace, Consolas, monospace"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  pill: "99px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "28px"
  section: "56px"
components:
  button:
    backgroundColor: "{colors.night-hover}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  button-primary:
    backgroundColor: "{colors.lamp-blue}"
    textColor: "{colors.night-bg}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.md}"
    padding: "6px 10px"
  nav-item-active:
    backgroundColor: "rgba(122,162,247,.10)"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.md}"
    padding: "7px 10px"
  card:
    backgroundColor: "{colors.night-hover}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.lg}"
    padding: "16px 18px"
  quiz-option:
    backgroundColor: "{colors.night-hover}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.md}"
    padding: "11px 14px"
  input-gap:
    backgroundColor: "{colors.night-bg}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.md}"
    padding: "7px 10px"
    width: "150px"
---

# Design System: GEO Lernskripte

## Overview

**Creative North Star: "The Night Desk"**

A quiet, dark study desk for long, focused sessions at a laptop. The page is a lamp-lit sheet of content, and everything around it (sidebar, top bar, table of contents) sinks into near-black so the text, formulas and worked solutions carry the light. Nothing on screen competes with the material: no decorative imagery, no gradients, no gamified chrome. Colour shows up only to tell you something.

The structure follows a docs reader: a subject sidebar on the left, a single readable column in the middle, and a sticky scrollspy table of contents on the right. Density is moderate. Long-form text gets generous line height, while tables, cheatsheets and quiz blocks tighten up. A light theme ("Hell") mirrors every token for daylight, and a dedicated print mode turns the cheatsheet into a dense two-column A4 sheet.

**Key Characteristics:**
- Dark by default (`data-theme="dark"`), with a full light mirror and a separate print palette.
- One UI accent (Lamp Blue). Four further colours are reserved for callout meanings.
- Layering comes from tonal steps and 1px lines, not shadows.
- Inter for reading, JetBrains Mono for code; KaTeX math sits inline with the text.
- The printed A4 cheatsheet is a first-class output with its own type scale.

## Colors

A cool, blue-black night palette with one lamp-blue accent and four meaning-coded signal colours, tuned soft enough for hours of reading.

### Primary
- **Lamp Blue** (`lamp-blue`; light theme `day-blue`): the only UI accent. Active nav item tint, active TOC marker, chapter number ("Kapitel 1"), links, reading-progress bar, primary button, selected order chip, cheatsheet section titles. Also the Definition callout colour, the one place where accent and meaning overlap.

### Secondary (signal colours, callouts and feedback only)
- **Trap Red** (`trap-red` / `day-trap`): Klausurfalle callouts and wrong-answer states.
- **Merke Green** (`merke-green` / `day-merke`): Merke callouts, correct answers, the quiz header, finished-chapter state.
- **Example Violet** (`example-violet` / `day-violet`): Beispiel callouts and the Rechenweg (worked solution) label.
- **Info Amber** (`info-amber` / `day-amber`): Info callouts.

Each signal colour has a matching tinted background at 6–10% alpha (for example `rgba(247,118,142,.08)` for traps), used only as the fill of its own callout or feedback box.

### Neutral
- **Night Background** (`night-bg`): page and reading-column ground; also the PWA theme colour.
- **Sidebar Night** (`night-sidebar`): sidebar, table headers, tab track; one step up from the page.
- **Panel Night** (`night-panel`): cards, quiz, Rechenweg and cheatsheet section containers.
- **Hover Night** (`night-hover`): hover fill and inline-code background.
- **Hairline** (`night-line`) / **Strong Hairline** (`night-line-strong`): all borders and dividers; the strong one marks hover and emphasis.
- **Code Night** (`night-code`): code blocks and code-line quiz options; the darkest surface.
- **Ink ramp**: `ink-primary` for headings and bold, `ink-secondary` for body copy, `ink-muted` for leads and meta, `ink-dim` for group labels and counters.

### Named Rules
**The Semantic Colour Rule.** Red, green, violet and amber always carry their meaning (trap, merke/correct, example/worked solution, info) and are never used decoratively. Blue is the UI accent and also means Definition. A new feature that needs colour uses Lamp Blue or the neutrals.

**The Mirror Rule.** Every colour token has a light-theme counterpart and a print value. A new token isn't finished until all three exist.

## Typography

**Body Font:** Inter (with system-ui, -apple-system, Segoe UI, Roboto)
**Mono Font:** JetBrains Mono (with ui-monospace, Consolas)
**Math:** KaTeX's own fonts, inline (`$…$`) and display (`$$…$$`).

**Character:** A neutral, highly legible sans that disappears behind the content, plus a coding mono that keeps Python and SQL readable. Hierarchy comes from weight and size, never from a second display face.

### Hierarchy
- **Display** (700, 30px, 1.2, −0.02em): subject title (h1). 25px below 880px wide.
- **Headline** (650, 22px, −0.01em): chapter titles (h2), with 56px space above; preceded by a small Lamp Blue "Kapitel n" label (12px, 600).
- **Title** (600, 17px): sections inside a chapter (h3); h4 is 15px/600 in secondary ink.
- **Body** (400, 16px, 1.65): reading text in secondary ink, with bold in primary ink. The column caps at 740px (about 75ch).
- **Label** (600, 11–12px, 0.05–0.06em, uppercase): sidebar groups, TOC heading, callout titles, quiz and Rechenweg headers, cheatsheet section titles.
- **Mono** (400, 13.5px, 1.6): code blocks. Inline code is 0.86em with a hover-night fill and 1px border.

### Named Rules
**The Plain Heading Rule.** Headings contain no formulas; the TOC is generated from them.

**The Print Scale Rule.** The print cheatsheet has its own scale (body 8.2px, section titles 9px, code 7.8px). Screen sizes never leak into print.

## Layout

A three-zone grid: a 272px sticky sidebar, a centred content area holding a 740px reading column, and a 220px sticky TOC with a 40px gap. The content area is padded 36px 28px 120px. A sticky, blurred top bar holds the breadcrumb and the "Interaktives Lernskript / Klausur-Cheatsheet" segmented tabs, with a 2px reading-progress line beneath.

- Below 1180px the TOC disappears and the column takes the full width.
- Below 880px the sidebar becomes an off-canvas drawer (min(300px, 86vw)) with a scrim. The tabs wrap to a full-width second row and padding drops to 22px 16px.
- The cheatsheet flows in CSS columns (2 × min 340px, 24px gap) with sections that never split. In print it becomes a strict two-column grid on A4 with 10mm × 9mm margins.
- Spacing is a loose 4px rhythm: 4/8/12/16 inside components, 28px page gutters, 56px before chapters.

## Elevation & Depth

The system is flat. Depth comes from tonal steps (code → page → sidebar → panel → hover) and 1px hairlines. The only shadows are functional: a 1px ring on the active tab, and a large diffuse shadow under the mobile drawer to separate it from the page. The top bar uses an 88% background with a 10px backdrop blur so content scrolls under it legibly.

### Shadow Vocabulary
- **Active tab ring** (`box-shadow: 0 0 0 1px var(--line2)`): the selected segment of the tab switcher.
- **Drawer lift** (`box-shadow: 0 0 40px rgba(0,0,0,.4)`): mobile sidebar only.

### Named Rules
**The Hairline Rule.** Containers are separated by 1px lines and one tonal step, never by drop shadows.

## Shapes

Gently rounded and consistent: 10px (`lg`) for containers (cards, code blocks, tables, quiz, Rechenweg, cheatsheet sections), 8px (`md`) for callouts, options and chips, 6–7px for buttons, nav items, tabs and inputs, and fully round for badges and status dots. Callouts add a 3px left bar in their signal colour. Dashed borders have one meaning: something unfinished or not yet chosen (legacy notice, unselected order chip, hidden Rechenweg steps).

## Components

Interactive pieces are **tactile and confident**: anything you can press reads as a solid, filled object, clearly distinct from the reading surfaces around it, and still without shadows.

### Named Rules
**The Pressable Rule.** Everything clickable sits on the hover-night fill with a strong hairline at rest. Hover adds a Lamp Blue border and a 8–14% Lamp Blue tint. Press moves it down 1px. Keyboard focus shows a 2px Lamp Blue outline with 2px offset. Transitions run 0.15s on colour and 0.08s on the press.

### Buttons
- **Shape:** gently rounded (7px).
- **Default:** hover-night fill, strong-hairline border, primary ink, 13.5px/500 text, 8px 14px padding. Hover: Lamp Blue border and a 14% Lamp Blue tint.
- **Primary:** Lamp Blue fill and border, 600 weight; text is night-bg in dark mode and white in light mode. Hover mixes 14% ink into the blue.
- **Ghost:** transparent with a hairline border, muted 12px text (theme toggle, "Übersicht"). Hover strengthens border and text. Ghost buttons deliberately stay quiet.
- **Disabled:** 45% opacity, no hover or press.

### Navigation
- **Sidebar items:** 14px secondary ink, 7px radius, a 6px status dot (filled Lamp Blue = full script, hollow ring = legacy, grey = todo). Hover gets hover-night fill; active gets a Lamp Blue tint at 10% with primary ink.
- **TOC:** 13px muted links on a 1px left rail; sub-items indent to 24px. The active link turns primary ink with a Lamp Blue rail segment.
- **Tabs:** segmented control on a sidebar-night track; the active segment is panel-night with a 1px ring.

### Cards / Containers
- **Subject cards:** hover-night fill, strong-hairline border, 10px radius, 16px 18px padding, 15px/600 title, 13px muted meta and a 4px progress bar. Hover: Lamp Blue border and an 8% Lamp Blue tint; press moves down 1px.
- **Callouts:** hairline border, 3px left bar and a tinted fill in the signal colour, uppercase signal-colour label.
- **Rechenweg (steps):** panel container with a violet uppercase label and step counter. Steps reveal one at a time, separated by dashed lines, with a 0.25s fade-up.

### Inputs / Fields
- **Gap input:** page fill, strong-hairline border, 7px radius, mono 14px, 150px wide.
- **Feedback:** tinted green or red box with a 40%-alpha border in the signal colour; fades in over 0.2s.

### Quiz (signature component)
A panel with a green uppercase header. Options are full-width pressable rows (hover-night fill, strong hairline, primary ink, 11px 14px padding) following the Pressable Rule. A correct answer turns green (border plus Merke tint), a wrong one red (border plus trap tint), and once the right answer is found the untouched options fade to 60%. "Bug" code lines sit on the code surface with line numbers in dim ink and take the same green or red tint. Order chips are filled and dashed until chosen, then solid Lamp Blue with a Lamp Blue tint.

### Badges
Pill badges (11px, hairline border, muted). The "full" status variant uses a Lamp Blue text and border at 50% alpha.

## Do's and Don'ts

### Do:
- **Do** keep Lamp Blue as the single UI accent, and keep each signal colour tied to its callout meaning (The Semantic Colour Rule).
- **Do** separate surfaces with one tonal step plus a 1px hairline (The Hairline Rule).
- **Do** keep the reading column at 740px or less, with body text at 16px and 1.65 line height.
- **Do** give every new token a light-theme and a print value (The Mirror Rule).
- **Do** give every new clickable element the Pressable Rule's fill, hover tint, 1px press and focus outline.

### Don't:
- **Don't** use red, green, violet or amber for decoration, emphasis or branding.
- **Don't** add drop shadows to cards or panels; the drawer lift is the only large shadow.
- **Don't** put formulas in headings (The Plain Heading Rule).
- **Don't** reintroduce gamified chrome (XP, levels, mission HUD); the docs reader replaced it on 2026-11-26.
- **Don't** let screen type sizes into the print cheatsheet (The Print Scale Rule).
