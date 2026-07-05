// Exercise 04 — Modern syntax
// Run: node --test exercises/04-modern-syntax.test.js
// Each function has a CONSTRAINT — the point is fluency with the syntax,
// not just producing the right value.

/**
 * Extract, in ONE destructuring statement:
 * - the user's name
 * - the user's city (nested under address), defaulting to "Unknown"
 *   when address or city is missing
 * - the FIRST tag from the tags array, as firstTag
 * Return { name, city, firstTag }.
 * Constraint: exactly one `const ... = user;` line. No dot access after it.
 * (Hint: `address: { city } = {}` handles a missing address.)
 */
export function extractUserInfo(user) {
  // TODO
}

/**
 * Immutably update a nested state object:
 * given state = { user: { name, settings: { theme, fontSize } }, items: [...] }
 * return a NEW state with settings.theme replaced by newTheme.
 * Constraints: no mutation of `state` (tests check!), no structuredClone,
 * no JSON tricks — spread syntax only.
 */
export function withTheme(state, newTheme) {
  // TODO
}

/**
 * Merge configs: returns defaults overridden by overrides, except that
 * null/undefined values in overrides do NOT override (but 0, "", false DO).
 * Constraint: use ?? somewhere meaningful; no if statements.
 *
 *   mergeConfig({ port: 3000, debug: false }, { port: 0, debug: null })
 *   → { port: 0, debug: false }
 */
export function mergeConfig(defaults, overrides) {
  // TODO
}

/**
 * safeGet(obj, "a.b.c") → obj.a.b.c, or undefined anywhere along the way.
 * Constraint: implement with .split + .reduce + optional chaining, ≤ 3 lines.
 */
export function safeGet(obj, path) {
  // TODO
}

/**
 * Build a summary string with a template literal:
 * formatOrder({ id: 7, items: ["a","b"], total: 30 })
 *   → "Order #7: 2 items, total $30.00"
 * formatOrder({ id: 8, items: ["a"], total: 5 })
 *   → "Order #8: 1 item, total $5.00"
 * Constraints: one return statement, one template literal, .toFixed(2).
 */
export function formatOrder(order) {
  // TODO
}

/**
 * dedupe(list) — return a new array with duplicates removed, order preserved.
 * Constraint: use Set, one line.
 */
export function dedupe(list) {
  // TODO
}

/**
 * countBy(list, fn) — group-count array items by the key fn returns.
 * Constraint: use a Map, return the Map.
 *
 *   countBy(["apple","avocado","banana"], w => w[0])
 *   → Map { "a" → 2, "b" → 1 }
 */
export function countBy(list, fn) {
  // TODO
}
