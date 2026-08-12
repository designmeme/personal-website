# Dependency modernization design

## Goal

Modernize the personal Gatsby site to the latest compatible stable direct
dependencies, including Gatsby 5, React 19, MDX 2.3, Font Awesome 7, and the
current TypeScript toolchain. Preserve the current site behavior and Netlify
deployment configuration while making local development work reliably on the
current Node runtime.

## Scope

- Update every direct dependency and development dependency to its latest
  stable release compatible with Gatsby 5 and Node 22 through 25.
- Regenerate `package-lock.json` from the updated dependency graph.
- Replace Gatsby private/internal type imports with public API types or local
  types when no public equivalent exists.
- Correct the Gatsby node API and MDX component typings that currently fail
  type checking and that are affected by React 19 and MDX 3 types.
- Retain the existing `gatsby develop` default port. Document an override
  example for a port conflict, using port 8001.
- Add lightweight automated checks appropriate to this project: type checking,
  production build, and a development-server smoke check.

## Non-goals

- Migrating away from Gatsby, redesigning site pages, or changing content.
- Changing the default development port.
- Changing production hosting or redirect behavior.

## Implementation design

`package.json` remains the single package manifest. Gatsby and all Gatsby
plugins will be kept within their latest Gatsby 5-compatible releases.
React, React DOM, MDX, Font Awesome, Sass, TypeScript, and their type packages
will move to their latest stable releases subject to the package manager's peer
dependency validation. The manifest will declare the supported Node range so a
future unsupported runtime is caught during installation.

The `gatsby-node.ts` resolver will no longer import Gatsby implementation types
from `gatsby/dist`. Resolver inputs will be typed at the public boundary and
the queried sort and slug values will be narrowed before string operations.

The post template's MDX component map will use the types exported by the
current Gatsby 5-compatible MDX runtime (MDX 2.3). Local components will
accept the component-compatible props expected by MDX, avoiding casts that
conceal React 19 incompatibilities.

The README will describe normal local startup and include an explicit optional
port-override command for cases where another local service uses port 8000.
It will not prescribe a new default port.

## Verification

Before changing compatibility code, add focused regression tests where the
project tooling can exercise the affected behavior. Verify each fails before
the related implementation change and passes afterwards. Then run:

1. `npm run typecheck`
2. `npm run build`
3. `npm run develop -- --port 8001` and an HTTP smoke check against the
   started local server.

The build and development-server checks confirm that Gatsby can compile the
site, source MDX content, generate pages and serve the result with the updated
toolchain.
