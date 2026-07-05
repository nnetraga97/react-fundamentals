# 02 — `this` Binding

`this` is NOT "the object the function belongs to". It is determined by **how a function is called**, not where it's defined. There are four rules, checked in this order of precedence:

## 1. `new` binding

```js
function Person(name) {
  this.name = name;      // `this` = the freshly created object
}
const p = new Person("Ada");
```

What `new Foo(args)` actually does — memorize these four steps:

1. Creates a brand-new empty object.
2. Sets that object's prototype to `Foo.prototype`.
3. Calls `Foo` with `this` bound to the new object.
4. Returns the new object (unless `Foo` explicitly returns a different *object*).

## 2. Explicit binding — `call`, `apply`, `bind`

```js
function greet(greeting) { return `${greeting}, ${this.name}`; }
const user = { name: "Ada" };

greet.call(user, "Hi");        // "Hi, Ada"   — call now, args listed
greet.apply(user, ["Hi"]);     // "Hi, Ada"   — call now, args as array
const bound = greet.bind(user); // new function, permanently bound
bound("Hi");                    // "Hi, Ada"
```

`bind` returns a **new function** whose `this` can never be changed again (even by `call`).

## 3. Implicit binding — the call-site object

```js
const obj = {
  name: "Ada",
  say() { return this.name; },
};
obj.say(); // "Ada" — called as obj.say(), so this = obj
```

**The famous gotcha:** the binding depends on the *call site*, so detaching the method loses it:

```js
const f = obj.say;
f();                     // undefined — plain call, rule 4 applies
setTimeout(obj.say, 0);  // same problem — setTimeout calls it plainly
```

Fixes: `setTimeout(() => obj.say())` or `setTimeout(obj.say.bind(obj))`.

This is exactly why React class components needed `this.handleClick = this.handleClick.bind(this)` — the event system calls your handler as a plain function.

## 4. Default binding

A plain function call: `this` is `undefined` in strict mode (modules and classes are always strict), or the global object in sloppy mode.

## Arrow functions: no `this` at all

Arrow functions don't have their own `this`. They inherit it **lexically** — from the scope where they were *written*, like any other closed-over variable. `call`/`bind` cannot change it.

```js
const timer = {
  seconds: 0,
  start() {
    setInterval(() => {
      this.seconds++;   // `this` = timer, inherited from start()'s scope
    }, 1000);
  },
};
```

Rule of thumb: **arrow functions for callbacks, regular functions/methods when you need dynamic `this` or `new`.** Arrow functions cannot be constructors.

## Predict-the-output drill

Work these out before running them (they're in exercise 02):

```js
const obj = {
  value: 42,
  getValue() { return this.value; },
  getValueArrow: () => this?.value,
};
obj.getValue();        // ?
obj.getValueArrow();   // ?  (hint: where was the arrow *written*?)
const g = obj.getValue;
g();                   // ?
g.call(obj);           // ?
```
