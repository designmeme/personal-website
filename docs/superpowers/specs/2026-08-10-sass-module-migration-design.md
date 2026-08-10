# Sass Module Migration Design

## Goal

Replace deprecated Sass `@import` rules and global built-in function calls so
the stylesheet remains compatible with Dart Sass 3.0 without changing the
site's intended styles.

## Scope

- Replace local stylesheet imports in `src/styles/main.scss` with the Sass
  module system.
- Expose shared variables and mixins through a single local module entrypoint.
- Update every stylesheet that consumes shared variables or mixins to use that
  entrypoint with an explicit namespace.
- Replace global color and map functions with `sass:color` and `sass:map` APIs.
- Preserve the external font stylesheet URL as a CSS import.

## Non-goals

- Redesigning styles, changing layout values, or changing component markup.
- Changing Sass or Gatsby package versions.
- Running automated tests or build verification; the user will validate the
  visual result manually.

## Design

`_variables.scss` and `_mixins.scss` remain the source of shared design
tokens and mixins. A new `_shared.scss` module forwards both files. Each
stylesheet that consumes shared tokens uses `@use "shared" as *`; this keeps
the existing token and mixin names intact while removing global import order as
an implicit dependency.

`main.scss` loads every local stylesheet with `@use`. Files that contain only
CSS rules compile in their existing order. `sass:color` and `sass:map` are
imported directly by the small set of files that call their APIs, and calls are
converted to the equivalent module-qualified operation.

The Google-hosted font URL remains a CSS `@import` because it is an external
stylesheet, not a Sass module.
