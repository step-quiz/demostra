# Project 11 — Demostra-ho: specification

> Copied from `SPEC-step-quiz-9-projects.md` §9, §5.1 and §5.2 (2026-10-22). The shared rules of that document
> apply and are summarised here; decisions taken later are in [`STATE.md`](STATE.md), which overrides this file.
> Where this file and `CLAUDE.md` disagree, `CLAUDE.md` wins.

## Shared rules (summary of the master spec §2–§4)

- Static only (HTML + CSS + vanilla JS), no build step, no backend. **Must work under `file://`** (double click):
  classic scripts with one namespace per file and the dual export wrapper, no ES modules, no `fetch`, no Workers.
- No network at runtime (no CDN, fonts, analytics). Privacy: no personal data; `localStorage` only, every access in
  `try/catch`, fully usable without storage. Keys `demostra:v1:<what>`.
- Everything the student sees is in Catalan; identifiers and comments in Catalan; agent docs in English.
- Content CC BY-NC-SA 4.0, code MIT (`LICENSE`, `LLICENCIA.md` from `step-quiz-commons/fitxers/`).
- Never `[skip ci]`, `[ci skip]` or `[cf-pages-skip]` in any commit message.
- Tests before delivery; tests recompute results independently of the code under test. Docs follow code.
- Seeded RNG (FNV-1a → mulberry32, from `prova1eso/assets/js/atzar.js`); never `Math.random` for anything
  reproducible. URL readers tolerate garbage.
- Pedagogy: one action per screen state, ≤ ~40 words of instructions, feedback names the mistake (≤ 2 messages),
  no gamification noise, every route ends in a "beauty moment", hints never give the answer.
- Interaction triad (drag, tap-then-tap, keyboard); Pointer Events with `setPointerCapture`; `touch-action: none`
  only on the board; targets ≥ 44 px touch / ≥ 24 px mouse; `aria-live` feedback; colour never the only carrier;
  animations ≤ 300 ms and off under `prefers-reduced-motion`; dark mode via tokens; print black on white, A4 15 mm.
- Cache busting with `?v=<content hash>` (`tools/versio.py`), checked by a test.
- Catalan maths typography: decimal comma (inputs accept `,` and `.`), `·` and `:`, `«…»`, typographic `’`.

## 9. Project 11: Demostra-ho

**Repo:** `demostra`. **Curriculum:** 4t ESO (algebraic identities, Pythagoras, irrationality, primes) to Batxillerat (induction, contradiction, inequalities, derivative from the definition, Bolzano).

### 9.1 Pedagogical intent

Three rungs per theorem, which is the missing intermediate step between reading a proof and writing one:

1. **Veure.** A proof without words revealed step by step and *parameterised*. For example, a slider `n` for the sum of odd numbers, so the student sees the pattern grow.
2. **Ordenar.** The proof's lines are shuffled, with 1–2 trap lines among them. The student assembles a valid proof. This is a Parsons-style task for proofs, called "Proof Blocks" in the research literature (Poulsen et al., Univ. of Illinois, 2022).
3. **Escriure.** On paper. On screen: a self-check rubric, then the model proof.

### 9.2 Data model (`data/teoremes/<id>.js`, aggregated into `window.DEMOSTRA`)

```js
{ id: 'senars', titol: 'La suma dels senars', curs: '3ESO', bloc: 'nombres',
  enunciat: 'La suma dels $n$ primers nombres senars és $n^2$.',
  veure: { figura: 'senars',              // name of a pure SVG generator: figura(n, pas) -> SVG string
           n: { min: 1, max: 8, inicial: 4 },
           panells: [ { pas: 1, text: 'Un quadrat d’1 × 1.' }, { pas: 2, text: 'Hi afegim una L de 3.' } ] },
  ordenar: {
    tipus: 'directa' | 'induccio' | 'absurd',
    bastida: [ { id: 'h1', text: 'Cas base', fix: true }, { id: 'h2', text: 'Pas inductiu', fix: true } ], // locked headers (scaffold)
    linies: [ { id: 'a', tex: '…', deps: [] }, { id: 'b', tex: '…', deps: ['a'] }, … ],
    conclusio: 'f',
    trampes: [ { id: 't1', tex: '…', motiu: 'Fa servir el que vols demostrar.' } ],
    ordreModel: ['a', 'b', 'c', 'd', 'e', 'f'] },
  escriure: { guio: ['Digues què vols demostrar.', 'Digues què fas servir.', '…'], model: '…' },
  pistes: { … },                          // §5.1
  credit: 'Idea clàssica, coneguda des de l’antiguitat.' }
```

### 9.3 Proof Blocks semantics

- The reference proof is a **DAG** over line ids: `deps` lists the lines a line uses.
- **A submission (an ordered list) is correct iff:**
  1. it contains every non-trap line exactly once;
  2. it contains no trap line;
  3. every line's `deps` appear earlier.

  Any topological order is accepted, not just `ordreModel`.
- **Feedback after «Comprova»: only the first violation**, to keep cognitive load low.
  - A trap line: show its `motiu`.
  - A missing line: «falta un pas». Say which one only on the second attempt.
  - A dependency violation: highlight the line, «aquest pas fa servir una cosa que encara no has dit». Name the missing dependency on the second attempt.
- **Scaffold fading.**
  - Level 1: `bastida` headers are locked in place.
  - Level 2: the headers must be placed too.
  - Level 3: more trap lines.
- **UI.**
  - Two columns: «Peces» and «La teva demostració». On a phone they stack.
  - Drag, tap-tap, or keyboard (Space selects, ↑/↓ move, Enter inserts or removes).
  - Port `pycat/curs/activitats.js` (`initParsons`) as the starting point; record the origin in the file header.
  - Render lines with KaTeX (local).

### 9.4 Visual proofs

- Each figure is a pure function `figura(n, pas) → SVG string`, drawn by code in this repo.
- **Do not copy drawings from books** (e.g. the MAA's *Proofs Without Words*). The mathematical ideas are classical and free; the drawings are not. Credit the idea when it is attributable (e.g. «idea atribuïda a Nicòmac de Gerasa»).

### 9.5 Initial content (≈ 14 theorems; the AI drafts, **the user validates the mathematics** before release)

- **ESO 3r–4t:**
  - the sum of the first `n` odd numbers is `n²`;
  - Gauss's sum `1 + … + n`;
  - `(a+b)²`, `(a−b)²`, `a² − b²` by areas;
  - Pythagoras by rearrangement;
  - the angle sum of a triangle;
  - √2 is irrational (contradiction);
  - there are infinitely many primes (Euclid);
  - even · anything is even.
- **Batxillerat:**
  - by induction: the sum of cubes is `(1+…+n)²` (Nicomachus, with a visual), the geometric sum, `2ⁿ > n`;
  - AM–GM (semicircle visual);
  - `(x²)' = 2x` from the definition;
  - a Bolzano application (a root exists in an interval).

Keep a review log `docs/REVISIO.md`, one row per theorem: drafted, reviewed by the user, published.

### 9.6 Tests

- Per theorem:
  - ids are unique;
  - the DAG is acyclic;
  - `ordreModel` is a valid topological order;
  - every non-trap line is an ancestor of `conclusio`, so no decorative lines;
  - no trap id appears in any `deps`;
  - the seeded initial shuffle is **not** already valid;
  - every `tex` renders with KaTeX in Node (`katex.renderToString`, `throwOnError: true`);
  - figure generators return well-formed SVG for every `n` in range (simple XML well-formedness check).
- The checker passes a unit table of submissions: correct, alternative valid order, trap included, line missing, dependency violated.

### 9.7 Acceptance criteria

- [ ] 14 theorems through all three rungs.
- [ ] Alternative valid orders are accepted.
- [ ] Usable by phone, mouse and keyboard.
- [ ] Projector mode for the «Veure» rung.


## Shared components used here (master spec §5.1–§5.2)

### 5.1 Hint ladder (Projects 11, 19, 21; optionally 2 and 3)

Port the pattern from `geom` (`js/ui/detall.js`, data in `js/data/guies-dades.js`). Do not depend on `geom` at runtime: copy the code and note the origin in the file header.

```js
pistes: {
  encarrec:  '…',   // 0 · reformulate the task: what must you produce?
  concreta:  '…',   // 1 · particularise: try numbers, a special case
  figura:    'img/…' | { construccio: [...] },  // 2 · the key picture, ≤ 3 words
  tanca:     '…',   // 3 · what to look at, never the conclusion
  comprovacio: '…', // numerical prediction to check one's own answer
  iDespres:  '…'    // generalisation / next question
}
```

Levels are revealed one at a time and the revealed level is remembered per item.

### 5.2 Step reveal ("veure" panels)

Same mechanism as `geom`'s demos: a sequence of panels revealed one at a time, each with an optional "Prova-ho primer al paper" prompt before the content.

