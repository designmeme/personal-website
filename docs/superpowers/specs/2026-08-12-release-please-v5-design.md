# Release Please v5 Migration Design

## Goal

Replace the deprecated Release Please GitHub Action with the current official
action while preserving the repository's existing Node release behavior.

## Scope

- Update `.github/workflows/release-please.yml` from
  `google-github-actions/release-please-action@v3` to
  `googleapis/release-please-action@v5`.
- Keep the existing `release-type: node` input.
- Ensure the workflow declares the permissions required to create and update
  release pull requests, tags, releases, and labels.
- Update the README to link to the maintained official action and describe the
  current workflow accurately.

## Non-goals

- Do not introduce manifest configuration files.
- Do not add a personal access token or repository secret.
- Do not change versioning, changelog generation, tagging, deployment, or npm
  publication behavior.
- Do not trigger a GitHub release or release pull request as part of this work.

## Design

The workflow continues to run on pushes to `main` and uses the repository's
built-in `GITHUB_TOKEN`. The action reference moves to the maintained
`googleapis/release-please-action` repository at major version 5. The existing
Node release strategy remains inline because this repository has one releasable
package and does not need advanced manifest configuration.

The workflow retains `contents: write` and `pull-requests: write`, and adds
`issues: write` to support Release Please's label management as documented by
the official action. The README points directly to the official action and
names the v5 workflow without suggesting that manifest configuration is
required.

## Validation

- Parse the workflow as YAML.
- Confirm the action reference uses the official repository at `@v5`.
- Confirm `release-type: node` and the required permissions remain present.
- Review the final diff to ensure unrelated README changes are preserved.
