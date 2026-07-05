# Mini-project: `tiny-utils` — your own utility library

Build a small utility library from scratch, **including the test harness**. No `node:test`, no libraries — part of the exercise is understanding what a test framework actually is (spoiler: it's a loop, a try/catch, and some closures).

## Structure

```
mini-project/
  harness.js      ← your test framework (~30 lines)
  tiny-utils.js   ← the library
  tiny-utils.test.js  ← tests, written with YOUR harness
```

Run with plain `node tiny-utils.test.js`.

## Step 1 — the harness (`harness.js`)

Export two functions:

- `test(name, fn)` — runs `fn`; prints `✓ name` on success, `✗ name` plus the error message on failure. Keeps running after failures.
- `expect(actual)` — returns an object with matchers:
  - `.toBe(expected)` — `Object.is` comparison, throws with a useful message showing actual vs expected
  - `.toEqual(expected)` — deep equality (write the recursive comparison yourself — arrays, objects, primitives; don't worry about Maps/Sets/cycles)
  - `.toThrow()` — expects `actual` to be a function that throws

At the end of the run, print a summary: `N passed, M failed`, and `process.exitCode = 1` if anything failed.

Notice what you're using to build it: `test` collects results in a closed-over array; `expect` returns an object of closures over `actual`. This is Module 1's material, applied.

## Step 2 — the library (`tiny-utils.js`)

Implement, in this order (roughly increasing difficulty):

1. **`groupBy(list, keyFn)`** — you wrote this in exercise 05; re-implement without looking.
2. **`pick(obj, keys)` / `omit(obj, keys)`** — new object with only/all-but the given keys.
3. **`debounce(fn, ms)`** — returns a wrapped fn that only fires after `ms` of silence; each call resets the timer. The eventual call uses the **latest** arguments.
4. **`throttle(fn, ms)`** — fires immediately, then ignores calls for `ms`.
5. **`deepClone(value)`** — recursive clone of plain objects, arrays, and primitives. Bonus: handle `Date` and `Map`.
6. **`deepEqual(a, b)`** — you already wrote most of it in the harness; extract/reuse.
7. **`EventEmitter`** — a class with `on(event, cb)`, `off(event, cb)`, `once(event, cb)`, `emit(event, ...args)`. Store listeners in a `Map<string, Set<fn>>`.

## Step 3 — tests

Every utility gets tests written with your harness, including edge cases:

- `debounce`/`throttle`: test with a fake clock — pass `setTimeout`/`now` in, or simply use real short timeouts (10ms) and `await new Promise(r => setTimeout(r, 25))` (an async preview of Module 2).
- `deepClone`: mutating the clone must not affect the original — at any depth.
- `EventEmitter`: `off` during `emit`, `once` really fires once, multiple listeners fire in order.

## Definition of done

- [ ] `node tiny-utils.test.js` prints all-green and a summary
- [ ] You can explain where every closure in `debounce` and the harness lives
- [ ] `deepClone(deepClone(x))` round-trips your test fixtures
- [ ] Code reviewed (ask for a review like it's a PR)
