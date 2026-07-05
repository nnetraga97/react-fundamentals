# 03 — Prototypes & Classes

## The core idea

Every object has a hidden internal link to another object: its **prototype**. When you read a property that the object doesn't have, JavaScript walks up this **prototype chain** until it finds it or hits `null`.

```js
const animal = { eats: true };
const rabbit = Object.create(animal); // rabbit's prototype = animal
rabbit.hops = true;

rabbit.eats;  // true  — not on rabbit; found on animal via the chain
rabbit.hops;  // true  — own property
Object.getPrototypeOf(rabbit) === animal; // true
```

That's the whole inheritance model. Everything else is syntax on top of it.

- **Reading** walks the chain. **Writing** does not — `rabbit.eats = false` creates an *own* property on `rabbit`, shadowing `animal.eats`.
- `Object.keys` / spread only see **own** enumerable properties; `in` and property reads see the chain.
- The chain typically ends at `Object.prototype` (where `toString`, `hasOwnProperty` live), then `null`.

## Constructor functions (the pre-2015 way)

```js
function Dog(name) {
  this.name = name;              // own property, per-instance
}
Dog.prototype.bark = function () {   // shared — ONE function for all dogs
  return `${this.name} says woof`;
};

const rex = new Dog("Rex");
rex.bark();                      // found via chain: rex → Dog.prototype
rex instanceof Dog;              // true — checks if Dog.prototype is in rex's chain
```

Methods go on the prototype so a thousand dogs share one `bark` function instead of carrying a thousand copies.

## `class` is (mostly) syntax over the same machinery

```js
class Dog {
  constructor(name) { this.name = name; }
  bark() { return `${this.name} says woof`; }   // → Dog.prototype.bark
  static species() { return "canine"; }          // → on Dog itself, not instances
  #secret = "hidden";                            // true private field (not closure, not convention)
}

class Puppy extends Dog {
  constructor(name) {
    super(name);        // must call before touching `this`
  }
  bark() {
    return super.bark() + "!";  // parent method via prototype chain
  }
}
```

What `extends` sets up: `Puppy.prototype`'s prototype is `Dog.prototype`. Instance lookup chain: `puppy → Puppy.prototype → Dog.prototype → Object.prototype → null`.

Differences from function-style (why "mostly" syntax): class bodies are always strict mode, classes can't be called without `new`, class declarations are not hoisted (TDZ applies), and methods are non-enumerable.

## Prototypal vs classical inheritance

Classical (Java/C#): classes are blueprints; objects are stamped from them; the blueprint is a separate compile-time thing.

Prototypal (JavaScript): there are **only objects**. "Inheritance" is a live delegation link between objects. If you mutate `Dog.prototype` at runtime, every existing dog instantly sees the change — because they *delegate to* it, they didn't *copy from* it.

## Why React cares

- React moved from class components to function components + hooks — you'll still read class components in older codebases and interview questions (`extends React.Component`, `super(props)`, lifecycle methods).
- Understanding "reading walks the chain, writing creates own properties" is the mental model behind why spread copies are shallow, and why mutating shared objects causes spooky action at a distance in state management.
