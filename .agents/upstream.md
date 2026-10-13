# Upstream synchronization and local policy

This repository is a Git fork of [mattpocock/skills](https://github.com/mattpocock/skills), not a generated vendor directory. There is no upstream synchronization script. `scripts/sync-plugin-version.mjs` synchronizes package and plugin versions only; it does not generate skill frontmatter or Codex metadata.

## Imported revision

- Upstream: `https://github.com/mattpocock/skills.git`, branch `main`.
- Imported commit: [`49dd158d1076134a641b33efb035946536778336`](https://github.com/mattpocock/skills/commit/49dd158d1076134a641b33efb035946536778336).
- Package and plugin version: `1.3.1`, with upstream's unreleased changesets retained.
- Previous fork tip: `959a8e9f1edc3adbe2f7e3054bb6fbefa6696260`.
- Scope: all 83 intervening commits, 116 changed paths, integrated by fast-forward. The old fork tip was an upstream ancestor with no fork-only commits. No local security patches existed to reapply.

The import preserves upstream history, author attribution, `LICENSE`, and credits. It includes upstream's promotion of `implement-spec` and `retro`, new `pr` and beta `chief-of-staff` skills, removal of `resolving-merge-conflicts`, the `GLOSSARY.md` rename, and upstream workflows. Importing is not a security audit or permission to merge the review PR.

## Fork policy

`implement` is reachable by both model and user in this fork. Its model-facing description triggers implementation of agreed work from a spec, issue, or tickets. Claude Code uses the default invocation policy by omitting `disable-model-invocation`; Codex uses the default by omitting the `policy` block from `agents/openai.yaml`. Explicit `/implement` remains available.

Other skills retain upstream invocation policies. In particular, `implement-spec` stays user-invoked. `implement` retains upstream's implementation, validation, review, and current-branch commit instructions; it does not become a queue dispatcher.

Keep this customization as a fork commit. Merge upstream into the fork rather than replacing the tree or reinstalling from upstream. The upstream installation commands in `README.md` subscribe to upstream, not this fork. Updating globally installed skills is a separate action; an existing copy or running session does not acquire these changes automatically.

## Future updates

1. Start with a clean worktree and fetch `main` from the explicit upstream URL above.
2. Record the fetched commit ID and inspect the diff, including executable scripts, workflows, invocation metadata, plugin membership, and licensing.
3. Merge that reviewed commit into the fork. Preserve local commits and resolve conflicts by intent; do not reset the fork to upstream.
4. Keep `implement` model- and user-reachable in both harnesses. Reconcile its docs, both skill indexes, and `ask-matt` if upstream changes them.
5. Run `npm run check-implement-invocation`, `npm run check-plugin-version`, and `claude plugin validate . --strict`. The invocation regression tests must pass before publishing an update.
6. Update the imported revision above and open a review PR before merging or updating installed skills.

Claude Code `2.1.291` passes repository validation without errors, but `--strict` fails on an upstream warning: root `CLAUDE.md` is not loaded as installed plugin context. That file already existed before this import and is used for repository maintenance. Record the warning separately from invocation test failures; do not remove the repository instructions to silence it. The marketplace manifest passes its own strict validation.
