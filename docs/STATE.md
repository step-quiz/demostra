# Project 11 — Demostra-ho: living state

Agent-facing memory between sessions. English. Update it in the same commit as any change.
Spec: [`SPEC.md`](SPEC.md). Where they disagree, this file wins. Mathematical review log: [`REVISIO.md`](REVISIO.md).

## Status (2026-10-22): v1 built, not yet published

| Part | Status |
|---|---|
| Engines `blocs.js` (Proof Blocks checker), `figures.js` (16 SVG generators), `text.js` (pure, Node-tested) | DONE |
| Content: 16 theorems in `data/teoremes/` (all three rungs, hints, credits) | DRAFTED; math review by the user PENDING (`REVISIO.md`) |
| UI: `index.html` (list by course), `teorema.html` (Veure / Ordenar / Escriure, projector mode) | DONE, browser-checked under `file://` |
| Tests (`node tests/run-all.js`) | DONE, all green |
| Codes for «Escriure» (like geom's `GEO1-…`) | NOT IN v1 (user, 2026-10-22) |
| GitHub bootstrap (`unzip-upload.yml`, `tests.yml`, `_uploads/`), Cloudflare `demostra.step-quiz.net` | PENDING (user) |
| Card in `ins/index.html` | PENDING (after first public release) |

## Decisions approved by the user (2026-10-22)

1. Theorem list: the spec's 16, with `(a+b)²`, `(a−b)²` and `a² − b²` as separate theorems. Courses as in the
   table of the README (Pythagoras and the angle sum in 2n ESO).
2. No code in «Escriure» in v1.
3. Everything visible from the first release; the user reviews the mathematics in parallel (`REVISIO.md`).

## Technical and pedagogical decisions (agent)

- **Checker** (`blocs.js → valida`): priority trap → missing (headers first, then lines in model order) →
  dependency (first line, first missing dep) → header order → section. Only the first error is reported. The
  "which one" detail (missing line, missing dependency) is given the second time **the same kind** of error occurs
  (`st.errors[tipus]`).
- **Scaffold**: `bastida` headers (Cas base / Pas inductiu / Conclusió; Suposem el contrari / Busquem una
  contradicció / Conclusió). Every line of a scaffolded proof has a `seccio`. Level 1: headers fixed in the proof
  column from the start (lines may be placed anywhere; sections are checked). Level 2: headers are pieces. Level 3:
  as 2 plus the traps with `nivell: 3`. Direct proofs have no scaffold, so levels 1 and 2 coincide there.
- **Traps**: 1–2 at levels 1–2, 1–2 more at level 3. Typical kinds: example instead of proof, circular use of the
  claim, algebra slip, wrong assumption for contradiction, hypothesis "for all n" in induction.
- **Shuffle**: seeded by theorem, level and restart count; reshuffled until the good lines alone do not respect the
  dependencies (test: never valid for five seeds × three levels, and 200 seeds on a hand-made theorem).
- **Model proof** for «Escriure» = `ordreModel` with headers inserted before their first line (`Blocs.model`);
  no separate hand-written model text (the spec's `escriure.model` field is not used). Numbered continuously
  across sections.
- **Hints** (`pistes`): geom's ladder, revealed one at a time in «Escriure»: encàrrec → cas concret → figura (the
  Veure figure at a given step, ≤ 3-word caption) → on mirar → comprovació; `iDespres` is shown with the model
  proof. Number opened per theorem in `demostra:v1:pistes`.
- **KaTeX 0.16.11** copied from `operacions/vendor` (woff2 fonts only). Rendered with `katex.render` into DOM
  nodes (styles via CSSOM), so the CSP keeps `style-src 'self'` with no inline styles. Fonts load under `file://`
  (checked in Chromium).
- **Figures**: classes `.f-*` (dark mode via tokens). Every `n` in range × every step is checked for well-formed
  SVG and no `NaN`. No `xmlns` (inline SVG in HTML; also keeps the "no http string" repo test).
- **Drag**: mouse from anywhere on a block; touch only from the ⠿ handle (`touch-action: none` only there), so
  the page still scrolls on phones. Tap-tap uses insertion slots («Posa-la aquí»).
- **Origin of code**: Parsons ideas from `pycat/curs/activitats.js` (`initParsons`); hint ladder from
  `geom/js/ui/detall.js`. Both noted in the file headers; no runtime dependency.
- **Storage**: `demostra:v1:fet` (`{ id: { veure, ordenar: max level, escriure } }`), `demostra:v1:pistes`.

## Acceptance criteria (spec §9.7)

- [x] 14 (here 16) theorems through all three rungs.
- [x] Alternative valid orders are accepted (message «Hi ha més d’un ordre bo: el teu també ho és»).
- [x] Usable by phone, mouse and keyboard.
- [x] Projector mode for the «Veure» rung (`?projector=1` or the button; ← → move through the steps).
