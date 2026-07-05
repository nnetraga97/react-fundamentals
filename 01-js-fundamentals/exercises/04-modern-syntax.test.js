import { test } from "node:test";
import assert from "node:assert/strict";
import {
  extractUserInfo,
  withTheme,
  mergeConfig,
  safeGet,
  formatOrder,
  dedupe,
  countBy,
} from "./04-modern-syntax.js";

test("extractUserInfo: full object", () => {
  const user = {
    name: "Ada",
    address: { city: "London", zip: "1" },
    tags: ["admin", "founder"],
  };
  assert.deepEqual(extractUserInfo(user), {
    name: "Ada",
    city: "London",
    firstTag: "admin",
  });
});

test("extractUserInfo: missing address and empty tags", () => {
  const user = { name: "Bob", tags: [] };
  assert.deepEqual(extractUserInfo(user), {
    name: "Bob",
    city: "Unknown",
    firstTag: undefined,
  });
});

test("withTheme: updates nested value", () => {
  const state = {
    user: { name: "Ada", settings: { theme: "light", fontSize: 14 } },
    items: [1, 2],
  };
  const next = withTheme(state, "dark");
  assert.equal(next.user.settings.theme, "dark");
  assert.equal(next.user.settings.fontSize, 14);
  assert.equal(next.user.name, "Ada");
  assert.deepEqual(next.items, [1, 2]);
});

test("withTheme: does NOT mutate, and copies each level it changes", () => {
  const state = {
    user: { name: "Ada", settings: { theme: "light", fontSize: 14 } },
    items: [1, 2],
  };
  const next = withTheme(state, "dark");
  assert.equal(state.user.settings.theme, "light", "original mutated!");
  assert.notEqual(next, state);
  assert.notEqual(next.user, state.user);
  assert.notEqual(next.user.settings, state.user.settings);
  assert.equal(next.items, state.items, "untouched branches should keep the same reference");
});

test("mergeConfig: falsy-but-valid values override, nullish do not", () => {
  assert.deepEqual(
    mergeConfig({ port: 3000, debug: true, name: "app" }, { port: 0, debug: null, name: undefined }),
    { port: 0, debug: true, name: "app" },
  );
  assert.deepEqual(mergeConfig({ a: 1 }, { b: "" }), { a: 1, b: "" });
});

test("safeGet: happy path and missing links", () => {
  const obj = { a: { b: { c: 42 } } };
  assert.equal(safeGet(obj, "a.b.c"), 42);
  assert.equal(safeGet(obj, "a.x.c"), undefined);
  assert.equal(safeGet(obj, "nope"), undefined);
  assert.equal(safeGet(null, "a"), undefined);
});

test("formatOrder: pluralization and money formatting", () => {
  assert.equal(
    formatOrder({ id: 7, items: ["a", "b"], total: 30 }),
    "Order #7: 2 items, total $30.00",
  );
  assert.equal(formatOrder({ id: 8, items: ["a"], total: 5.5 }), "Order #8: 1 item, total $5.50");
  assert.equal(formatOrder({ id: 9, items: [], total: 0 }), "Order #9: 0 items, total $0.00");
});

test("dedupe: removes duplicates, keeps order", () => {
  assert.deepEqual(dedupe([3, 1, 3, 2, 1]), [3, 1, 2]);
  assert.deepEqual(dedupe([]), []);
  const input = [1, 2];
  assert.notEqual(dedupe(input), input, "must return a new array");
});

test("countBy: groups counts into a Map", () => {
  const result = countBy(["apple", "avocado", "banana"], (w) => w[0]);
  assert.ok(result instanceof Map);
  assert.equal(result.get("a"), 2);
  assert.equal(result.get("b"), 1);
  assert.equal(result.size, 2);
});

test("countBy: works with object keys", () => {
  const evenOdd = countBy([1, 2, 3, 4, 5], (n) => n % 2 === 0);
  assert.equal(evenOdd.get(true), 2);
  assert.equal(evenOdd.get(false), 3);
});
