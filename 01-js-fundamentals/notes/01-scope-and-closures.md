# 01 — Scope, Hoisting & Closures

## Scope: where a variable is visible

JavaScript has three kinds of scope:

- **Global scope** — visible everywhere.
- **Function scope** — `var` lives here. A `var` declared anywhere in a function is visible in the *whole* function.
- **Block scope** — `let` and `const` live here. Visible only inside the nearest `{ }`.

```js
function demo() {
  if (true) {
    var a = 1;   // function-scoped
    let b = 2;   // block-scoped
  }
  console.log(a); // 1
  console.log(b); // ReferenceError: b is not defined
}
```

## Hoisting: what actually happens

Before executing a scope, the engine registers all declarations in it. But *how* they're registered differs:

```js
console.log(x); // undefined       — var is hoisted AND initialized to undefined
console.log(y); // ReferenceError  — let is hoisted but NOT initialized
var x = 1;
let y = 2;
```

The zone between the start of the block and the `let`/`const` declaration is the **temporal dead zone (TDZ)**. The variable exists but touching it throws.

Function *declarations* are hoisted with their body — you can call them before they appear. Function *expressions* and arrow functions assigned to variables follow the variable's rules:

```js
works();        // fine — declaration hoisted with body
fails();        // TypeError: fails is not a function (var hoisted as undefined)

function works() {}
var fails = function () {};
```

## Closures: functions remember where they were born

A **closure** is a function bundled with references to its outer (lexical) scope. The function keeps those variables alive even after the outer function has returned.

```js
function makeCounter() {
  let count = 0;            // lives on after makeCounter returns
  return function () {
    count += 1;             // this inner fn "closes over" count
    return count;
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2

const other = makeCounter();
other();   // 1  — each call creates a fresh scope
```

Key facts:

- Closures capture **variables, not values**. The inner function sees the variable's *current* value at call time, not a snapshot from creation time.
- Each invocation of the outer function creates a **new** scope. Two counters don't share state.
- Closures are JavaScript's native mechanism for **private state** — there's no way to reach `count` from outside.

## The classic loop bug

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i)); // 3, 3, 3
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j)); // 0, 1, 2
}
```

With `var` there is **one** shared `i` (function-scoped); all three callbacks close over the same variable, which is `3` by the time they run. With `let`, the spec creates a **fresh binding per iteration**, so each callback closes over its own `j`.

## Why React cares

- Every render of a function component is a function call. Props, state, and everything you define inside are **captured by closure** in that render's handlers and effects.
- A **stale closure** bug: an effect or interval keeps using the `count` from the render in which it was created, because that's the variable it closed over. This is why `useEffect` has a dependency array and why functional updates (`setCount(c => c + 1)`) exist.

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1); // ← closes over THIS render's count; stuck at count+1 forever
  }, 1000);
  return () => clearInterval(id);
}, []); // empty deps = the closure is never refreshed
```

You'll fix this class of bug for real in Module 6. For now: understand *mechanically* why that snippet is broken.
