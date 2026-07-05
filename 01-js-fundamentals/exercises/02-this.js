// Exercise 02 — `this` binding
// Part A: predict the output. Part B: implement the functions.
// Run: node --test exercises/02-this.test.js

/**
 * PART A — Predict before you run.
 * Fill in each string in this object with your prediction, e.g. "42" or
 * "undefined" or "TypeError". The tests check your predictions against reality.
 * NO RUNNING THE CODE FIRST. Reason it out from the four binding rules.
 *
 * The code being predicted (module scope, strict mode):
 *
 *   const obj = {
 *     value: 42,
 *     getValue() { return this.value; },
 *     getValueArrow: () => this?.value,
 *   };
 *
 *   line1: obj.getValue()
 *   line2: obj.getValueArrow()
 *   line3: const g = obj.getValue; g()   → what does accessing this.value do?
 *   line4: g.call(obj)
 *   line5: const bound = obj.getValue.bind({ value: 7 }); bound.call(obj)
 */
export const predictions = {
  line1: "", // your answer as a string: "42", "undefined", or "TypeError"
  line2: "",
  line3: "",
  line4: "",
  line5: "",
};

/**
 * PART B
 *
 * Implement your own `bind`: myBind(fn, thisArg, ...presetArgs)
 * returns a new function that calls fn with `this` = thisArg and
 * presetArgs prepended to any call-time args (partial application).
 * Do NOT use Function.prototype.bind. (call or apply are allowed.)
 *
 *   const greet = function (greeting, mark) { return `${greeting}, ${this.name}${mark}`; };
 *   const hiAda = myBind(greet, { name: "Ada" }, "Hi");
 *   hiAda("!"); // "Hi, Ada!"
 */
export function myBind(fn, thisArg, ...presetArgs) {
  // TODO
}

/**
 * Fix the broken timer WITHOUT using an arrow function inside start()
 * (pretend you're in a pre-ES6 codebase). The tick function must be the
 * regular function declared inside start. Hint: bind, or the
 * `const self = this` pattern.
 */
export const timer = {
  ticks: 0,
  start(intervalFn) {
    // intervalFn works like setInterval but is synchronous & controllable
    // in tests: it takes a callback and calls it several times.
    function tick() {
      this.ticks += 1; // ← broken: fix how tick is passed/bound below
    }
    intervalFn(tick); // TODO: fix this line (and/or tick) so `this` is the timer
  },
};
