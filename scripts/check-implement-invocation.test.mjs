import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("implement is discoverable by the model and remains user-reachable", () => {
  const skill = read("skills/engineering/implement/SKILL.md");
  const frontmatter = skill.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(frontmatter, "implement must have frontmatter");
  assert.match(frontmatter[1], /^name: implement$/m);
  assert.doesNotMatch(frontmatter[1], /^disable-model-invocation:/m);
  assert.doesNotMatch(frontmatter[1], /^user-invocable:\s*false/m);
  assert.match(frontmatter[1], /^description:.*Use when.*spec.*tickets/m);
});

test("Codex uses the same default implicit invocation policy", () => {
  const metadata = read("skills/engineering/implement/agents/openai.yaml");
  assert.match(metadata, /display_name: "Implement"/);
  assert.doesNotMatch(metadata, /^policy:|allow_implicit_invocation:/m);
});

test("both skill indexes list implement only under Model-invoked", () => {
  for (const path of ["README.md", "skills/engineering/README.md"]) {
    const source = read(path);
    const engineering =
      path === "README.md"
        ? source.split("### Engineering")[1].split("### Productivity")[0]
        : source;
    const [user, model] = engineering.split(/(?:\*\*|## )Model-invoked/);
    assert.doesNotMatch(user, /\[implement\]\(/, path);
    assert.match(model, /\[implement\]\([^)]*implement\/SKILL\.md\)/, path);
    assert.equal((engineering.match(/\[implement\]\(/g) ?? []).length, 1, path);
  }
});

test("the docs and router describe autonomous invocation", () => {
  assert.match(
    read("docs/engineering/implement.md"),
    /Type `\/implement`, or the agent reaches for it automatically/,
  );
  assert.match(
    read("skills/engineering/ask-matt/SKILL.md"),
    /`\/implement` is model-invoked/,
  );
});
