# Dependency Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the Gatsby site to current compatible packages and make it compile, build, and serve on the current Node runtime.

**Architecture:** Keep Gatsby 5 and the existing site structure. Upgrade direct dependencies together, replace the Gatsby private resolver type, and conform the MDX component map to React 19 and Gatsby 5-compatible MDX 2.3 types.

**Tech Stack:** Gatsby 5.16, React 19, MDX 2.3, TypeScript, Vitest, Netlify adapter.

## Global Constraints

- Keep Gatsby and Gatsby plugins on their current latest Gatsby 5-compatible releases.
- Use React 19 and the latest stable direct dependencies that satisfy peer dependencies; retain `@mdx-js/react` at 2.3 because Gatsby 5's MDX plugin does not support MDX 3.
- Support Node versions `>=22 <26`.
- Do not change the default Gatsby development port.
- Document `npm run develop -- --port 8001` only as a port-conflict override.
- Do not change site content, routes, redirects, or Netlify hosting behavior.

---

## File Structure

- `package.json`: dependency versions, Node range, test script.
- `package-lock.json`: regenerated dependency graph.
- `src/lib/post-order.ts`: safe one-based post order helper.
- `src/lib/post-order.test.ts`: helper regression tests.
- `gatsby-node.ts`: uses public/local types only.
- `src/templates/post.tsx`: MDX 2.3 component-map typing.
- `README.md`: optional port-override instructions.

### Task 1: Update dependencies and introduce a regression test

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `src/lib/post-order.test.ts`

**Interfaces:**
- Produces: `getPostOrder(slugs: readonly string[], slug: unknown): number | null`.
- Produces: `npm run test`, which runs Vitest once.

- [x] **Step 1: Write the failing regression test**

```ts
import { describe, expect, it } from "vitest"
import { getPostOrder } from "./post-order"

describe("getPostOrder", () => {
  it("returns a one-based order for a known slug", () => {
    expect(getPostOrder(["intro", "advanced"], "advanced")).toBe(2)
  })

  it("returns null for a missing or non-string slug", () => {
    expect(getPostOrder(["intro"], undefined)).toBeNull()
    expect(getPostOrder(["intro"], "missing")).toBeNull()
  })
})
```

- [x] **Step 2: Verify the test fails because the helper has not been created**

Run: `npm run test -- src/lib/post-order.test.ts`

Expected: FAIL with a module-resolution error for `./post-order`.

- [x] **Step 3: Update the package manifest and lockfile**

Run `npx npm-check-updates -u`, then install with `npm install`. Retain only the Gatsby 5-compatible package version if a latest peer dependency is incompatible. Add `"engines": { "node": ">=22 <26" }`, a `"test": "vitest run"` script, and Vitest 4 as a development dependency. Run `npm ls` and resolve every unmet peer dependency without `--force` or `--legacy-peer-deps`.

- [ ] **Step 4: Commit the dependency baseline**

Run: `git add package.json package-lock.json src/lib/post-order.test.ts && git commit -m "build: modernize dependency toolchain"`

### Task 2: Correct Gatsby resolver compatibility

**Files:**
- Create: `src/lib/post-order.ts`
- Modify: `gatsby-node.ts:1-3,88-100`
- Test: `src/lib/post-order.test.ts`

**Interfaces:**
- Consumes: `getPostOrder(slugs: readonly string[], slug: unknown): number | null`.
- Produces: `MdxFrontmatter.order` as a number or null without imports from `gatsby/dist`.

- [x] **Step 1: Implement the helper**

```ts
export function getPostOrder(
  slugs: readonly string[],
  slug: unknown,
): number | null {
  if (typeof slug !== "string") return null
  const index = slugs.indexOf(slug)
  return index === -1 ? null : index + 1
}
```

- [x] **Step 2: Verify the focused test passes**

Run: `npm run test -- src/lib/post-order.test.ts`

Expected: PASS with two tests.

- [x] **Step 3: Update the resolver**

Remove `IGatsbyResolverContext` imported from `gatsby/dist/schema/type-definitions`. Type the resolver context through Gatsby's exported node API type and replace `subject.sort.indexOf(source.slug) + 1 || null` with `getPostOrder(subject.sort, source.slug)`. Do not add a type assertion for `source.slug`.

- [x] **Step 4: Verify type checking**

Run: `npm run typecheck`

Expected: no diagnostics from `gatsby-node.ts`.

- [ ] **Step 5: Commit the resolver update**

Run: `git add gatsby-node.ts src/lib/post-order.ts src/lib/post-order.test.ts && git commit -m "fix: type Gatsby post ordering"`

### Task 3: Correct MDX component compatibility

**Files:**
- Modify: `src/templates/post.tsx:1-45`
- Modify when required: `src/components/mdx-link.tsx`, `src/components/mdx-fix-span.tsx`, `src/components/mdx-img.tsx`

**Interfaces:**
- Produces: an `MDXComponents` map accepted by `MDXProvider` under React 19 and MDX 2.3.

- [x] **Step 1: Record the pre-change type failure**

Run: `npm run typecheck`

Expected: FAIL at `MDXProvider components={shortcodes}`.

- [x] **Step 2: Type the component map with MDX's exported type**

```ts
import { MDXProvider, type MDXComponents } from "@mdx-js/react"

const shortcodes: MDXComponents = {
  Link,
  sup,
  FontAwesomeIcon,
  GoogleAdPostMiddle,
  a: MdxLink,
  span: MdxFixSpan,
  img: MdxImg,
}
```

If a local component does not match, use the corresponding `React.ComponentPropsWithoutRef<"a" | "span" | "img">` props type rather than `any` or a cast.

- [x] **Step 3: Verify the tests and type checking**

Run: `npm run test && npm run typecheck`

Expected: both commands pass.

- [ ] **Step 4: Commit the MDX compatibility change**

Run: `git add src/templates/post.tsx src/components/mdx-link.tsx src/components/mdx-fix-span.tsx src/components/mdx-img.tsx && git commit -m "fix: align MDX components with React 19"`

### Task 4: Document and verify local development

**Files:**
- Modify: `README.md:16-26`

**Interfaces:**
- Consumes: unchanged `npm run develop` default behavior.
- Produces: a documented port-conflict command using port 8001.

- [x] **Step 1: Add the port-conflict instructions**

Add this text beneath the normal development command:

```md
기본 포트(8000)를 다른 로컬 서비스가 사용 중이면 다음처럼 포트를 지정해 실행할 수 있습니다.

```shell
npm run develop -- --port 8001
```
```

- [x] **Step 2: Run full static verification**

Run: `npm run test && npm run typecheck && npm run build`

Expected: all commands exit with status 0.

- [x] **Step 3: Smoke-test Gatsby on an override port**

Run `npm run develop -- --port 8001` in one terminal. When Gatsby reports the local URL, run `curl --fail --silent --show-error http://localhost:8001/blog/ -o /dev/null`. Stop only the Gatsby process started for this test.

Expected: the curl command exits with status 0.

- [ ] **Step 4: Commit documentation**

Run: `git add README.md && git commit -m "docs: document development port override"`
