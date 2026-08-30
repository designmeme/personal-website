# SCSS Theme Tokens and Dark Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add system-aware, manually selectable dark mode while preserving the existing SCSS-based site styling.

**Architecture:** Keep SCSS as the primary styling system and introduce semantic CSS custom properties for runtime theme colors. A small theme utility owns resolution and persistence, while Gatsby SSR injects a defensive pre-paint script and the header renders the accessible toggle.

**Tech Stack:** Gatsby 5, React 19, TypeScript, Sass, Vitest, browser `matchMedia` and `localStorage` APIs.

## Global Constraints

- Keep the existing SCSS styling system for layout, content, syntax highlighting, and print styles.
- Do not add Tailwind CSS, `@tailwindcss/typography`, or shadcn/ui in this phase.
- Support `light`, `dark`, and `system` choices; default to the system preference.
- Avoid hydration mismatches and minimize theme flash during SSR.
- Preserve routes, content, Netlify behavior, and existing visual identity.

---

### Task 1: Add tested theme resolution utilities

**Files:**
- Create: `src/lib/theme.ts`
- Create: `src/lib/theme.test.ts`

**Interfaces:**
- `ThemePreference = "light" | "dark" | "system"`
- `resolveTheme(preference, systemIsDark): "light" | "dark"`
- `getStoredTheme(storage): ThemePreference`

- [x] Write tests for explicit light/dark, system resolution, invalid storage, and missing storage.
- [x] Implement pure utilities and a namespaced storage key.
- [x] Run `npm run test -- src/lib/theme.test.ts`.

### Task 2: Add SSR-safe theme initialization and React toggle

**Files:**
- Create: `src/components/theme-toggle.tsx`
- Modify: `gatsby-ssr.tsx`
- Modify: `src/components/header.tsx`
- Create or modify: `src/components/theme-toggle.test.tsx`

**Interfaces:**
- `ThemeToggle` renders an accessible control for the three preferences.
- SSR initialization runs before body paint and never throws when browser APIs are unavailable.

- [x] Add a defensive inline initialization script to `onRenderBody`.
- [x] Implement client state synchronization with `localStorage` and `matchMedia`.
- [x] Add the toggle to the site header without changing existing navigation.
- [x] Test initial rendering and preference changes.

### Task 3: Convert semantic colors to theme tokens

**Files:**
- Modify: `src/styles/_variables.scss`
- Modify: `src/styles/_typography.scss`
- Modify: `src/styles/_header.scss`
- Modify: `src/styles/_footer.scss`
- Modify: `src/styles/_page.scss`
- Modify: `src/styles/_post.scss`
- Modify: `src/styles/_blog.scss`
- Modify: `src/styles/_table.scss`
- Modify: `src/styles/_code.scss`
- Modify: `src/styles/_subnav.scss`
- Modify: `src/styles/_footnotes.scss`
- Modify: `src/styles/_layout.scss`
- Modify: `src/styles/_print.scss`

- [x] Define light defaults and dark overrides for page, text, muted, border, surface, link, and code surfaces.
- [x] Replace runtime semantic color declarations with `var(--color-...)` while retaining Sass-only values for color math.
- [x] Add `color-scheme` and transitions that respect `prefers-reduced-motion`.
- [x] Ensure print output uses light paper/background tokens.

### Task 4: Verify the theme across Gatsby output

**Files:**
- Modify: `README.md`

- [x] Document system default, manual toggle, and reset-to-system behavior.
- [x] Run `npm run test && npm run typecheck && npm run build`.
- [x] Start `npm run develop -- --port 8001` and verify `curl --fail http://localhost:8001/blog/`.
- [x] Run `git diff --check` and inspect generated page output for hydration/build errors.
