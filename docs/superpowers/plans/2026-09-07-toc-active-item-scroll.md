# TOC Active Item Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the active table-of-contents link visible by smoothly scrolling the TOC's internal scroll area when the active heading changes.

**Architecture:** `Toc` keeps a ref to its root element, and `TocList` marks the active anchor with `aria-current="location"`. A focused helper performs the guarded `scrollIntoView` call, and an effect finds the active anchor within the TOC after React commits each `activeId` change.

**Tech Stack:** React 19, TypeScript, Gatsby Link, Vitest

**Spec:** `docs/superpowers/specs/2026-09-07-toc-active-item-scroll-design.md`

## Global Constraints

- Preserve the existing `IntersectionObserver` logic and active-link styling.
- Use `scrollIntoView({ behavior: 'smooth', block: 'nearest' })`.
- Do not scroll for an empty active ID or when `useScrollActive` is false.
- Do not restart the existing Gatsby development server on port 8001.

---

### Task 1: Keep the active TOC link visible

**Files:**
- Create: `src/components/toc.test.tsx`
- Modify: `src/components/toc.tsx:1-106`

**Interfaces:**
- Consumes: the existing `activeId: string` state and `useScrollActive: boolean` prop.
- Produces: `scrollActiveTocItem(element: HTMLElement | null, enabled: boolean): void` and an `aria-current="location"` marker on the active link.

- [ ] **Step 1: Write the failing helper tests**

```tsx
import {describe, expect, it, vi} from "vitest"

import {scrollActiveTocItem} from "./toc"

describe("scrollActiveTocItem", () => {
    it("smoothly reveals the active TOC item at the nearest edge", () => {
        const scrollIntoView = vi.fn()
        const element = {scrollIntoView} as unknown as HTMLElement

        scrollActiveTocItem(element, true)

        expect(scrollIntoView).toHaveBeenCalledWith({
            behavior: "smooth",
            block: "nearest",
        })
    })

    it("does not scroll when active scrolling is disabled", () => {
        const scrollIntoView = vi.fn()
        const element = {scrollIntoView} as unknown as HTMLElement

        scrollActiveTocItem(element, false)

        expect(scrollIntoView).not.toHaveBeenCalled()
    })

    it("does not scroll without an active element", () => {
        expect(() => scrollActiveTocItem(null, true)).not.toThrow()
    })
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- src/components/toc.test.tsx`

Expected: FAIL because `scrollActiveTocItem` is not exported from `toc.tsx`.

- [ ] **Step 3: Implement the helper and active-link ref flow**

Add the helper to `src/components/toc.tsx`:

```tsx
export const scrollActiveTocItem = (element: HTMLElement | null, enabled: boolean) => {
    if (!element || !enabled) return

    element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
    })
}
```

Mark only the active `Link`:

```tsx
<Link
    aria-current={tocId === activeId ? 'location' : undefined}
    to={item.url}
    className={`block mb-2 not-hover:text-muted ${activeClass}`}
>
    {item.title}
</Link>
```

In `Toc`, attach a ref to the root TOC element and invoke the helper after the active item is rendered:

```tsx
const tocRef = useRef<HTMLDivElement>(null)

useEffect(() => {
    const activeLink = tocRef.current?.querySelector<HTMLAnchorElement>('a[aria-current="location"]') ?? null
    scrollActiveTocItem(activeLink, useScrollActive && activeId !== '')
}, [activeId, useScrollActive])
```

Attach `tocRef` to the root `<div>` around the title and `TocList`.

- [ ] **Step 4: Run focused and full automated verification**

Run: `npm test -- src/components/toc.test.tsx`

Expected: 3 tests pass.

Run: `npm test && npm run typecheck`

Expected: all tests pass and TypeScript exits with code 0.

- [ ] **Step 5: Verify behavior in the existing browser tab**

Use `http://localhost:8001/blog/rss-feed/` at the desktop breakpoint. Scroll the body to a late section such as `참고 자료`, confirm the active TOC link becomes visible inside the right-side TOC, then scroll back to an early section and confirm the TOC smoothly follows upward without moving the page unexpectedly.

- [ ] **Step 6: Commit the implementation**

```bash
git add src/components/toc.tsx src/components/toc.test.tsx
git commit -m "fix(toc): keep active item visible"
```
