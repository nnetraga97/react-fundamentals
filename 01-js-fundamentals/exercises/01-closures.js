// Exercise 01 — Closures
// Implement each function so the tests in 01-closures.test.js pass:
//   node --test exercises/01-closures.test.js
// Rule: no global variables. All state must live in closures.

/**
 * Returns a counter object with increment/decrement/current methods.
 * The count must be private — unreachable from outside.
 *
 *   const c = makeCounter();      // starts at 0 (or the given start value)
 *   c.increment(); // 1
 *   c.increment(); // 2
 *   c.decrement(); // 1
 *   c.current();   // 1
 */
export function makeCounter(start = 0) {
  // TODO
  let counter = start;
  function increment() {
    counter++;
  }
  function decrement() {
    counter--;
  }
  function current() {
    return counter;
  }
  return { increment, decrement, current };
}

/**
 * Takes a function fn and returns a new function that only ever runs fn ONCE.
 * Later calls return the first call's result without running fn again.
 *
 *   const init = once(() => { console.log("boot"); return 42; });
 *   init(); // logs "boot", returns 42
 *   init(); // returns 42, logs nothing
 */
export function once(fn) {
  // TODO
}

/**
 * Memoize: returns a wrapped fn that caches results by its FIRST argument.
 * If called again with the same first argument, return the cached result
 * without calling fn. (Use a Map for the cache.)
 *
 *   const slowSquare = (n) => { heavyWork(); return n * n; };
 *   const fast = memoize(slowSquare);
 *   fast(4); // computes, 16
 *   fast(4); // cached, 16 — slowSquare NOT called again
 */
export function memoize(fn) {
  // TODO
}

/**
 * Bank account with truly private balance.
 * - deposit(amount): adds; returns new balance. Throws Error on amount <= 0.
 * - withdraw(amount): subtracts; returns new balance.
 *   Throws Error("insufficient funds") if amount > balance.
 * - getBalance(): returns current balance.
 * The balance must NOT be a property on the returned object.
 */
export function createAccount(initialBalance = 0) {
  // TODO
}

/**
 * The loop bug, fixed by YOU.
 * Return an array of THREE functions. Calling the first returns 0,
 * the second returns 1, the third returns 2.
 * Constraint: you must build the array with a loop (any kind).
 */
export function makeThreeGetters() {
  // TODO
}
