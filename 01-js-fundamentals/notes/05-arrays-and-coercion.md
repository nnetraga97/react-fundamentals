# 05 — Array Method Fluency, Equality & Coercion

## The big three

React rendering is built on these — `items.map(item => <Row key={item.id} … />)` is the single most common line of React.

```js
const nums = [1, 2, 3, 4, 5];

nums.map(n => n * 2);        // [2,4,6,8,10]  — transform, same length, NEW array
nums.filter(n => n % 2);     // [1,3,5]        — keep some, NEW array
nums.reduce((acc, n) => acc + n, 0); // 15     — fold into ONE value (any shape)
```

`reduce` can build anything — the accumulator can be a number, object, array:

```js
// count occurrences
words.reduce((acc, w) => ({ ...acc, [w]: (acc[w] ?? 0) + 1 }), {});
// (note: spreading per iteration is O(n²); mutating a local acc is fine and faster:
words.reduce((acc, w) => { acc[w] = (acc[w] ?? 0) + 1; return acc; }, {});
```

**When NOT to use them:** if you need to bail out early, a `for…of` loop beats `filter`/`find` chains; if a `reduce` needs three reads to understand, a loop is better code. Method chains also allocate an intermediate array per step — irrelevant for 100 items, relevant for 100k.

## The rest of the toolkit

```js
arr.find(p)        // first match or undefined     arr.findIndex(p)
arr.some(p)        // does ANY match? → boolean     arr.every(p)
arr.includes(x)    // membership by ===
arr.flat(depth)    // un-nest                       arr.flatMap(f) = map+flat(1)
arr.slice(a, b)    // NON-mutating extract          arr.at(-1) // last element
arr.join(", ")     Array.from({length: n}, (_, i) => i)   // range
```

## Mutating vs non-mutating — critical for React

React/Redux detect changes by **reference comparison**. Mutating an array keeps the same reference → React sees "nothing changed".

| Mutates (avoid on state) | Non-mutating (safe) |
|---|---|
| `push`, `pop`, `shift`, `unshift` | `[...arr, x]`, `arr.slice(1)` |
| `splice` | `arr.filter(...)`, `toSpliced` |
| `sort`, `reverse` | `toSorted`, `toReversed`, `[...arr].sort()` |

```js
// sort gotcha: default sort is LEXICOGRAPHIC, even for numbers
[10, 9, 1].sort();            // [1, 10, 9] 😱
[10, 9, 1].toSorted((a, b) => a - b);  // [1, 9, 10]
```

## Equality: `===`, `==`, and `Object.is`

```js
1 === "1"          // false — no coercion, different types
1 == "1"           // true  — string coerced to number
null == undefined  // true  — the ONLY useful == case
NaN === NaN        // false! use Number.isNaN or Object.is
Object.is(NaN, NaN) // true (this is what React uses for state comparison)
```

Rule: **always `===`**. The one idiomatic exception some codebases allow: `x == null` to check "null or undefined" in one shot.

**Objects compare by reference, never by content:**

```js
{} === {}                    // false — two different objects
const a = { x: 1 }; const b = a;
a === b                      // true — same reference
```

This is why `useEffect(fn, [{ x: 1 }])` fires every render, and why memoization exists.

## Coercion: the rules behind the "wat"

Falsy values — memorize the complete list, everything else is truthy:
`false, 0, -0, 0n, "", null, undefined, NaN`

So `[]` and `{}` are **truthy** (they're objects), even though `[] == false` is `true` — because `==` converts the array to a primitive (`""` → `0`) first. Two different questions: *truthiness* (Boolean conversion) vs *loose equality* (ToPrimitive + numeric conversion).

```js
"5" + 1     // "51"  — + prefers string concatenation
"5" - 1     // 4     — - is numeric only
+"5"        // 5     — unary plus: explicit-ish conversion
[] + []     // ""    — both become ""
```

React gotcha: `{count && <Badge />}` renders a literal `0` when count is 0 (0 is falsy but renderable). Use `{count > 0 && <Badge />}`.

## Shallow vs deep copy

- Shallow: `{...obj}`, `[...arr]`, `Object.assign` — top level only.
- Deep: `structuredClone(obj)` (modern, built-in; handles Dates, Maps, cycles — not functions), or hand-rolled recursion (you'll write one in the mini-project).
- `JSON.parse(JSON.stringify(x))` is the legacy hack — silently drops `undefined`, functions, Dates become strings. Know why it's flawed.
