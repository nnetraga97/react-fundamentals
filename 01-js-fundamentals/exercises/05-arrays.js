// Exercise 05 — Array methods, equality & coercion
// Run: node --test exercises/05-arrays.test.js
// Sample data used by several functions:
//   orders = [{ id, customer, total, status: "paid" | "pending" | "refunded", items: [...] }]

/**
 * Total revenue of PAID orders only.
 * Constraint: one expression — filter + reduce (or a single reduce).
 */
export function paidRevenue(orders) {
  // TODO
}

/**
 * Names of customers with at least one pending order — no duplicates,
 * in first-appearance order.
 * Constraint: no loops; array methods + Set.
 */
export function pendingCustomers(orders) {
  // TODO
}

/**
 * groupBy(list, fn) — like countBy but keeps the items:
 *   groupBy([6.1, 4.2, 6.3], Math.floor) → { "6": [6.1, 6.3], "4": [4.2] }
 * Return a plain object. Constraint: single reduce, no spread inside the
 * reducer (mutate the accumulator — it's local, that's fine).
 */
export function groupBy(list, fn) {
  // TODO
}

/**
 * Top N orders by total, descending. Must NOT mutate the input array.
 * Constraint: toSorted (or a copied sort) + slice.
 */
export function topOrders(orders, n) {
  // TODO
}

/**
 * flatten(arr, depth) — flatten nested arrays `depth` levels.
 * Constraint: implement it YOURSELF with reduce + recursion.
 * Array.prototype.flat / flatMap are banned (tests check).
 *
 *   flatten([1, [2, [3, [4]]]], 1) → [1, 2, [3, [4]]]
 *   flatten([1, [2, [3, [4]]]], Infinity) → [1, 2, 3, 4]
 */
export function flatten(arr, depth = 1) {
  // TODO
}

/**
 * PART B — coercion predictions.
 * Fill in each string with EXACTLY what the expression evaluates to,
 * using these encodings: numbers as "7", strings with quotes like "\"51\"",
 * booleans as "true"/"false". Reason it out — don't run it first.
 */
export const coercionPredictions = {
  a: "", // "5" + 3
  b: "", // "5" - 3
  c: "", // [] == false
  d: "", // [] === false
  e: "", // Boolean([])
  f: "", // null == undefined
  g: "", // null === undefined
  h: "", // NaN === NaN
  i: "", // 0.1 + 0.2 === 0.3
  j: "", // typeof null
};
