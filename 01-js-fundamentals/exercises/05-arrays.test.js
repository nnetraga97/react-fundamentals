import { test } from "node:test";
import assert from "node:assert/strict";
import {
  paidRevenue,
  pendingCustomers,
  groupBy,
  topOrders,
  flatten,
  coercionPredictions,
} from "./05-arrays.js";

const orders = [
  { id: 1, customer: "Ada", total: 100, status: "paid", items: ["kb"] },
  { id: 2, customer: "Bob", total: 50, status: "pending", items: ["mouse"] },
  { id: 3, customer: "Ada", total: 25, status: "refunded", items: ["cable"] },
  { id: 4, customer: "Cy", total: 300, status: "paid", items: ["gpu", "psu"] },
  { id: 5, customer: "Bob", total: 75, status: "pending", items: ["ssd"] },
  { id: 6, customer: "Dee", total: 10, status: "pending", items: ["tape"] },
];

test("paidRevenue: sums only paid orders", () => {
  assert.equal(paidRevenue(orders), 400);
  assert.equal(paidRevenue([]), 0);
});

test("pendingCustomers: unique, first-appearance order", () => {
  assert.deepEqual(pendingCustomers(orders), ["Bob", "Dee"]);
  assert.deepEqual(pendingCustomers([]), []);
});

test("groupBy: groups by derived key", () => {
  assert.deepEqual(groupBy([6.1, 4.2, 6.3], Math.floor), { 6: [6.1, 6.3], 4: [4.2] });
  const byStatus = groupBy(orders, (o) => o.status);
  assert.equal(byStatus.paid.length, 2);
  assert.equal(byStatus.pending.length, 3);
  assert.equal(byStatus.refunded.length, 1);
});

test("topOrders: sorted desc, correct size, input untouched", () => {
  const before = orders.map((o) => o.id).join(",");
  const top2 = topOrders(orders, 2);
  assert.deepEqual(
    top2.map((o) => o.id),
    [4, 1],
  );
  assert.equal(orders.map((o) => o.id).join(","), before, "input array was mutated!");
});

test("flatten: respects depth", () => {
  assert.deepEqual(flatten([1, [2, [3, [4]]]], 1), [1, 2, [3, [4]]]);
  assert.deepEqual(flatten([1, [2, [3, [4]]]], 2), [1, 2, 3, [4]]);
  assert.deepEqual(flatten([1, [2, [3, [4]]]], Infinity), [1, 2, 3, 4]);
  assert.deepEqual(flatten([], 1), []);
  assert.deepEqual(flatten([1, 2], 0), [1, 2]);
});

test("flatten: .flat and .flatMap are banned", () => {
  const src = flatten.toString();
  assert.ok(!/\.flat(Map)?\(/.test(src), "implement it yourself with reduce + recursion");
});

// ---- coercion predictions ----

// helpers keep the intentional ==/=== comparisons out of static analysis
const looseEq = (x, y) => x == y;
const strictEq = (x, y) => x === y;

const reality = {
  a: JSON.stringify("5" + 3),
  b: String("5" - 3),
  c: String(looseEq([], false)),
  d: String(strictEq([], false)),
  e: String(Boolean([])),
  f: String(looseEq(null, undefined)),
  g: String(strictEq(null, undefined)),
  h: String(NaN === NaN),
  i: String(0.1 + 0.2 === 0.3),
  j: JSON.stringify(typeof null),
};

for (const key of Object.keys(reality)) {
  test(`coercion prediction "${key}"`, () => {
    assert.notEqual(coercionPredictions[key], "", "fill in your prediction first");
    assert.equal(coercionPredictions[key], reality[key]);
  });
}
