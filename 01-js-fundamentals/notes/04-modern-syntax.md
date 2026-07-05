# 04 — Modern Syntax (ES6+) You Must Be Fluent In

React code is written almost entirely in these constructs. Fluency means you can read and write them without slowing down.

## Destructuring

```js
// Objects — by name, with rename, default, and nesting
const { name, age: years, role = "dev" } = user;
const { address: { city } } = user;         // nested (throws if address is undefined!)

// Arrays — by position
const [first, second, ...rest] = list;
const [, runnerUp] = podium;                 // skip elements

// Function parameters — this IS how React props work
function Profile({ name, avatarUrl, onSelect }) { /* ... */ }

// Swap without a temp
[a, b] = [b, a];
```

## Spread & rest

Same `...` token, opposite directions: **spread** unpacks, **rest** collects.

```js
const merged = { ...defaults, ...overrides };  // later keys win
const copy = [...arr];                          // SHALLOW copy
const nums = [...a, 4, ...b];

function log(first, ...others) {}               // rest: collects extra args
```

**Shallow means shallow.** `{ ...state }` creates a new outer object, but nested objects are still the *same references*:

```js
const state = { user: { name: "Ada" }, count: 1 };
const next = { ...state };
next.user.name = "Bob";
state.user.name;   // "Bob" 😱 — same inner object
// Correct immutable nested update:
const fixed = { ...state, user: { ...state.user, name: "Bob" } };
```

This one fact is the root of half of all Redux/React state bugs.

## Optional chaining `?.` and nullish coalescing `??`

```js
const city = user?.address?.city;        // undefined instead of TypeError
user?.onSave?.();                        // call only if it exists

const port = config.port ?? 3000;        // only null/undefined trigger fallback
const port2 = config.port || 3000;       // ⚠️ 0, "", false ALSO trigger fallback
```

`??` vs `||` is a classic bug source: `count || "N/A"` turns a legitimate `0` into `"N/A"`.

## Template literals

```js
const msg = `Hello ${user.name}, you have ${count} item${count === 1 ? "" : "s"}`;
```

## Shorthand & computed properties

```js
const name = "Ada";
const obj = {
  name,                    // shorthand: name: name
  greet() {},              // method shorthand
  [`key_${id}`]: value,    // computed key
};
```

## Default parameters

```js
function fetchPage(url, { page = 1, limit = 20 } = {}) {}
// the `= {}` matters: allows calling fetchPage(url) with no second arg
```

## Modules

```js
export function helper() {}         // named — many per file, import by exact name
export default function Button() {} // default — one per file, importer names it
import Button, { helper } from "./button.js";
```

Convention in React codebases: components are often default exports; utilities are named exports. Named exports refactor more safely (renames are checked).

## `Map` and `Set`

```js
const seen = new Set([1, 2, 2, 3]);      // {1, 2, 3} — uniqueness
seen.has(2);                              // O(1)

const cache = new Map();                  // ANY key type, insertion order kept
cache.set(objKey, result);
```

Use `Map` over plain objects when keys aren't strings or you need reliable iteration/size; use `Set` for membership checks and dedup (`[...new Set(arr)]`).
