# Release Please v5 Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the deprecated Release Please action with the official v5 action while preserving the current Node release flow.

**Architecture:** Keep the single-package configuration inline in the GitHub Actions workflow. Update only the action reference and documented permissions, then align the README with the maintained action and existing Release PR workflow.

**Tech Stack:** GitHub Actions YAML, Release Please Action v5, Markdown

## Global Constraints

- Keep `release-type: node` inline in the workflow.
- Continue running on pushes to `main` with the built-in `GITHUB_TOKEN`.
- Do not add manifest configuration, a PAT, npm publication, or deployment changes.
- Preserve unrelated README edits already present in the worktree.

---

### Task 1: Upgrade the Release Please workflow and documentation

**Files:**
- Modify: `.github/workflows/release-please.yml`
- Modify: `README.md`

**Interfaces:**
- Consumes: Conventional Commit messages pushed to `main` and GitHub's built-in `GITHUB_TOKEN`.
- Produces: Release PR updates and GitHub releases through `googleapis/release-please-action@v5` using the Node release strategy.

- [ ] **Step 1: Record the legacy references that must fail the migration check**

Run:

```bash
rg -n "google-github-actions/release-please-action|release-please-action@v3" .github/workflows/release-please.yml README.md
```

Expected: matches in both the workflow and README, proving that the deprecated action is still referenced.

- [ ] **Step 2: Update the workflow**

Set the workflow permissions and action step to:

```yaml
permissions:
  contents: write
  issues: write
  pull-requests: write

steps:
  - uses: googleapis/release-please-action@v5
    with:
      release-type: node
```

- [ ] **Step 3: Update the README release section**

Point the implementation link to:

```text
https://github.com/googleapis/release-please-action
```

Describe that pushes to `main` update a Release PR and merging that PR creates the changelog, version bump, tag, and GitHub release. Keep the workflow path as `/.github/workflows/release-please.yml`.

- [ ] **Step 4: Verify the migrated references and required settings**

Run:

```bash
rg -n "google-github-actions/release-please-action|release-please-action@v3" .github/workflows/release-please.yml README.md
rg -n "googleapis/release-please-action@v5|release-type: node|issues: write|pull-requests: write|contents: write" .github/workflows/release-please.yml
```

Expected: the first command returns no matches; the second command returns all five required workflow settings.

- [ ] **Step 5: Parse the workflow and inspect the final diff**

Run:

```bash
ruby -e 'require "yaml"; YAML.load_file(".github/workflows/release-please.yml"); puts "workflow YAML valid"'
git diff --check
git diff -- .github/workflows/release-please.yml README.md
```

Expected: YAML parsing succeeds, `git diff --check` produces no output, and the diff contains only the intended Release Please migration plus any pre-existing README edits.

- [ ] **Step 6: Commit the migration if requested**

```bash
git add .github/workflows/release-please.yml README.md
git commit -m "ci: migrate release please action to v5"
```
