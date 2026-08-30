# SCSS Theme Tokens and Dark Mode Design

## Goal

Add system-aware and manually selectable dark mode to the Gatsby personal site
without replacing the existing content-oriented SCSS system.

## Decision

Keep SCSS for layout, typography, post content, syntax highlighting, and print
styles. Replace semantic light-theme color usages with CSS custom properties,
and expose a small `ThemeToggle` component that stores the user's explicit
choice in `localStorage`. When no explicit choice exists, the browser's
`prefers-color-scheme` preference determines the theme.

Tailwind CSS, `@tailwindcss/typography`, and shadcn/ui are not added in this
phase. The project has a mature global SCSS/content styling layer and no
current need for a component primitive library. They can be evaluated later
for new interactive UI without forcing a content-style rewrite.

## Theme behavior

- Default: follow `prefers-color-scheme`.
- Toggle choices: `light`, `dark`, and `system`.
- Persist only explicit choices under a namespaced local-storage key.
- Apply `data-theme` to the document root only for explicit choices; remove it
  for `system`.
- An inline SSR head script reads the stored choice before paint to prevent a
  light/dark flash. It must be defensive when storage or `matchMedia` is not
  available.
- The toggle is keyboard accessible and exposes its current choice through
  `aria-label` and `aria-pressed`/menu semantics.

## Styling boundaries

- `src/styles/_variables.scss` defines light and dark semantic tokens.
- Existing Sass variables remain available where compile-time color operations
  are required; runtime-facing declarations use `var(--color-...)`.
- `src/styles/_prism-jetbrain-dark.scss` remains the source for dark code
  blocks, while page background, text, links, tables, cards, and borders use
  theme tokens.
- Print styles explicitly retain a light paper background and readable text.

## Verification

- Unit tests cover theme resolution and persistence logic without a browser.
- Typecheck and Vitest must pass.
- Gatsby production build must pass.
- A development-server smoke check verifies `/blog/` returns HTTP 200.
- Manual browser QA checks system theme, all three toggle choices, reload
  persistence, keyboard focus, MDX content, code blocks, and print preview.
