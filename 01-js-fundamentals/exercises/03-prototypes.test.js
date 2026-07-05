import { test } from "node:test";
import assert from "node:assert/strict";
import { Shape, shapeMethods, makeShape, Animal, Dog, whereIs } from "./03-prototypes.js";

test("Shape: constructor function with prototype method", () => {
  const s = new Shape("circle");
  assert.equal(s.name, "circle");
  assert.equal(s.describe(), "I am a circle");
});

test("Shape: describe is SHARED on the prototype, not per-instance", () => {
  const a = new Shape("a");
  const b = new Shape("b");
  assert.equal(Object.hasOwn(a, "describe"), false, "describe must not be an own property");
  assert.equal(a.describe, b.describe, "all instances share one function");
  assert.equal(a.describe, Shape.prototype.describe);
});

test("makeShape: Object.create wiring", () => {
  const s = makeShape("square");
  assert.equal(s.describe(), "I am a square");
  assert.equal(Object.getPrototypeOf(s), shapeMethods);
  assert.equal(Object.hasOwn(s, "name"), true);
  assert.equal(Object.hasOwn(s, "describe"), false);
});

test("Animal: instance and static factory", () => {
  const a = new Animal("cat");
  assert.equal(a.speak(), "cat makes a sound");
  const b = Animal.create("owl");
  assert.ok(b instanceof Animal);
  assert.equal(b.speak(), "owl makes a sound");
});

test("Dog: extends Animal, overrides speak, adds fetch", () => {
  const d = new Dog("Rex", "lab");
  assert.equal(d.name, "Rex");
  assert.equal(d.breed, "lab");
  assert.equal(d.speak(), "Rex barks");
  assert.equal(d.fetch(), "Rex fetches!");
  assert.ok(d instanceof Dog);
  assert.ok(d instanceof Animal, "Dog instances are also Animals via the chain");
});

test("Dog: prototype chain is Dog.prototype → Animal.prototype", () => {
  assert.equal(Object.getPrototypeOf(Dog.prototype), Animal.prototype);
});

test("whereIs: own vs inherited vs missing", () => {
  const proto = { inheritedProp: 1 };
  const obj = Object.create(proto);
  obj.ownProp = 2;

  assert.equal(whereIs(obj, "ownProp"), "own");
  assert.equal(whereIs(obj, "inheritedProp"), "inherited");
  assert.equal(whereIs(obj, "nope"), "missing");
  assert.equal(whereIs(obj, "toString"), "inherited", "Object.prototype counts too");
});

test("whereIs: works on objects with a null prototype", () => {
  const bare = Object.create(null);
  bare.x = 1;
  assert.equal(whereIs(bare, "x"), "own");
  assert.equal(whereIs(bare, "toString"), "missing");
});
