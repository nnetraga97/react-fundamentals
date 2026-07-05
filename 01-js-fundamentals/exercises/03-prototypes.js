// Exercise 03 — Prototypes & Classes
// Run: node --test exercises/03-prototypes.test.js

/**
 * PART A — constructor function style (pre-ES6).
 * Build Shape using a CONSTRUCTOR FUNCTION (not class):
 * - new Shape(name) stores name on the instance
 * - describe() lives on Shape.prototype (shared!) and returns "I am a <name>"
 */
export function Shape(name) {
  // TODO
}
// TODO: Shape.prototype.describe = ...

/**
 * PART B — the same, via Object.create. No `new`, no `class`.
 * makeShape(name) returns an object whose PROTOTYPE is shapeMethods,
 * with `name` as an own property.
 */
export const shapeMethods = {
  describe() {
    return `I am a ${this.name}`;
  },
};

export function makeShape(name) {
  // TODO (one line)
}

/**
 * PART C — class syntax with inheritance.
 * - class Animal: constructor(name); speak() returns "<name> makes a sound";
 *   a static create(name) factory that returns new Animal(name).
 * - class Dog extends Animal: speak() returns "<name> barks"; and a
 *   fetch() method returning "<name> fetches!". Dog's constructor takes
 *   (name, breed) and stores both.
 */
export class Animal {
  // TODO
}

export class Dog {
  // TODO — make it extend Animal
}

/**
 * PART D — chain walking.
 * Without using `in`, `instanceof`, or try/catch:
 * return an array of strings naming WHERE a property lives:
 *   whereIs(obj, key) →
 *     "own"        if obj has it as an own property
 *     "inherited"  if it's reachable via the prototype chain but not own
 *     "missing"    otherwise
 * Hint: Object.hasOwn / hasOwnProperty, and Object.getPrototypeOf for walking.
 */
export function whereIs(obj, key) {
  // TODO
}
