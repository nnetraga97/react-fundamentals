import { test } from "node:test";
import assert from "node:assert/strict";
import { makeCounter, once, memoize, createAccount, makeThreeGetters } from "./01-closures.js";

test("makeCounter: increments and decrements", () => {
  const c = makeCounter();
  assert.equal(c.increment(), 1);
  assert.equal(c.increment(), 2);
  assert.equal(c.decrement(), 1);
  assert.equal(c.current(), 1);
});

test("makeCounter: respects a custom start", () => {
  const c = makeCounter(10);
  assert.equal(c.increment(), 11);
});

test("makeCounter: two counters are independent", () => {
  const a = makeCounter();
  const b = makeCounter();
  a.increment();
  a.increment();
  assert.equal(a.current(), 2);
  assert.equal(b.current(), 0);
});

test("makeCounter: count is not exposed as a property", () => {
  const c = makeCounter();
  const props = Object.keys(c).filter((k) => typeof c[k] !== "function");
  assert.deepEqual(props, []);
});

test("once: runs the function a single time", () => {
  let calls = 0;
  const init = once(() => {
    calls += 1;
    return "ready";
  });
  assert.equal(init(), "ready");
  assert.equal(init(), "ready");
  assert.equal(init(), "ready");
  assert.equal(calls, 1);
});

test("once: passes arguments through on the first call", () => {
  const add = once((a, b) => a + b);
  assert.equal(add(2, 3), 5);
  assert.equal(add(100, 200), 5); // still the first result
});

test("memoize: caches by first argument", () => {
  let calls = 0;
  const square = memoize((n) => {
    calls += 1;
    return n * n;
  });
  assert.equal(square(4), 16);
  assert.equal(square(4), 16);
  assert.equal(square(5), 25);
  assert.equal(calls, 2);
});

test("memoize: works with non-primitive keys via Map", () => {
  const key = { id: 1 };
  let calls = 0;
  const f = memoize((obj) => {
    calls += 1;
    return obj.id;
  });
  assert.equal(f(key), 1);
  assert.equal(f(key), 1);
  assert.equal(calls, 1);
});

test("createAccount: deposit and withdraw", () => {
  const acct = createAccount(100);
  assert.equal(acct.deposit(50), 150);
  assert.equal(acct.withdraw(30), 120);
  assert.equal(acct.getBalance(), 120);
});

test("createAccount: rejects invalid operations", () => {
  const acct = createAccount(10);
  assert.throws(() => acct.deposit(0));
  assert.throws(() => acct.deposit(-5));
  assert.throws(() => acct.withdraw(999), /insufficient funds/);
});

test("createAccount: balance is truly private", () => {
  const acct = createAccount(100);
  assert.equal(acct.balance, undefined);
  acct.balance = 1_000_000; // attacker sets a property — must not affect real balance
  assert.equal(acct.getBalance(), 100);
});

test("makeThreeGetters: each getter remembers its own index", () => {
  const [f0, f1, f2] = makeThreeGetters();
  assert.equal(f0(), 0);
  assert.equal(f1(), 1);
  assert.equal(f2(), 2);
});

test("createAccount: withdraw is positive", () => {
  const acct = createAccount(0);
  assert.throws(() => acct.withdraw(-1000), /withdraw amount must be positive/);
});
