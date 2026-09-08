# MedFactory v1 (detailed) — React

Medical-affairs deck factory. Eight screens in one navigable shell:
dashboard, intake, pipeline, validation report, review workspace, revision diff,
rendering, delivery.

## Run

```bash
cd nestle          # wherever you unzipped this
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Drop into an existing app instead

Copy two files:

- `src/MedFactory.jsx` — the whole component, no dependencies beyond React
- `src/index.css` — design tokens, font import, keyframes (required)

```jsx
import MedFactory from './MedFactory.jsx';
import './index.css';

<MedFactory theme="dark" reviewerName="Munal" />
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `theme` | `'dark' \| 'light'` | `'dark'` | Initial direction. The sidebar toggle overrides it at runtime. |
| `reviewerName` | `string` | `'Munal'` | Reviewer shown in the review workspace and revision history. |

## How it is put together

**One component, two halves.** `renderVals()` does every calculation and returns a
flat view model; `render()` consumes it as JSX. Nothing is computed inline in the
markup, so the layout stays readable and the logic stays testable.

**Styling is inline, driven by CSS custom properties.** All colour and rule values
are `var(--acc)`, `var(--rule)`, `var(--ink)` and so on, declared in `index.css`.
Switching direction sets the light-mode token values directly on the root element
(`applyTheme`), so one write reskins every screen — no class swapping, no
re-render of the tree.

Two small helpers make that practical:

- `S(cssString)` parses a CSS declaration string into a React style object, so
  styles read the way CSS does. `merge(a, b)` combines several.
- `<Box css hover>` is a div (or any tag via `as`) with a hover style, since
  inline styles cannot express `:hover`.

**Navigation** is the `screen` state field, switched by `go(screen)`. The sidebar
"Screen flow" list jumps to any of the eight directly. The pipeline and rendering
screens run on intervals started by `go()` and cleared on unmount.

## The flow, end to end

Approve a topic in the dashboard queue → intake is prefilled → Start Generation
runs the pipeline live → skip to validation → Send to Reviewer → click a
paragraph, use **Instruction** → Send to AI → the diff screen → Accept Changes →
Approve All → rendering assembles → delivery.

## Notes

- Desktop-first: the shell has a 1280px minimum width and scrolls below that.
- Content is illustrative medical copy (T2D / GLP-1) with real trial figures used
  as sample data. Replace `SRC`, `DECKS`, `BLOCKS`, `SLIDES` and `LOG_SCRIPT` at
  the top of `MedFactory.jsx` with your API data.
- No state is persisted; a reload returns to the dashboard.
