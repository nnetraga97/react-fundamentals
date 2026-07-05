# Module 1: JavaScript Core

The goal of this module: after finishing it, nothing about scope, `this`, prototypes, or array methods should feel like magic. This is the foundation everything in React sits on — hooks are closures, components are functions, and most "weird React bugs" are actually JavaScript misunderstandings.

## How to work through this module

1. **Read the notes in order** (`notes/01` → `notes/05`). Read actively — type the examples into a Node REPL and mess with them.
2. **Do the exercises** (`exercises/`). Each file has stubbed functions with failing tests. Make them pass:

   ```bash
   cd 01-js-fundamentals
   node --test                 # run everything
   node --test exercises/01-closures.test.js   # run one file
   ```

   Don't peek at solutions online. Struggling is the mechanism by which this works.
3. **Build the mini-project** (`mini-project/README.md`) — your own utility library, including your own tiny test harness.
4. **Answer the interview-depth questions below out loud** (or in writing). If you can't explain it simply, go back to the notes.

## Checklist

- [ ] Notes 01–05 read, examples experimented with
- [ ] Exercise 01: closures — all tests pass
- [ ] Exercise 02: `this` binding — all tests pass
- [ ] Exercise 03: prototypes & classes — all tests pass
- [ ] Exercise 04: modern syntax — all tests pass
- [ ] Exercise 05: array methods & coercion — all tests pass
- [ ] Mini-project complete with hand-written test harness
- [ ] Interview questions answered out loud

## Interview-depth questions

You're done with this module when you can answer these without notes:

1. What is a closure, and where does React rely on them? (Hint: what does a stale closure bug in `useEffect` look like?)
2. Explain the difference between `var`, `let`, and `const` in terms of scope and the temporal dead zone — not just "use const".
3. Walk through the four rules of `this` binding. Why does passing a method as a callback lose `this`, and what are two ways to fix it?
4. Why do arrow functions behave differently with `this`? Why did class components need `this.handleClick = this.handleClick.bind(this)`?
5. What actually happens when you write `new Foo()`? Describe all four steps.
6. What's the difference between prototypal inheritance and classical inheritance? What is `class` in JavaScript really doing?
7. When would `map` + `filter` be the wrong choice versus `reduce` or a plain loop?
8. Why is `[] == false` true but `[] === false` false? When is `==` ever acceptable?
9. What's the difference between shallow copy and deep copy? Why does `{...state}` only protect you one level deep — and why does that matter enormously for React and Redux?
10. What is hoisting, precisely? What gets hoisted: declarations, initializations, both?
