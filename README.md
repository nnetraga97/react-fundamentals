# Front-End Mastery: Fundamentals → Staff Engineer

A structured, hands-on practice repo for leveling up from "I've followed React tutorials" to staff-engineer-level front-end depth. Every module is built by hand in this repo — no copy-pasting from tutorials.

## How this works

- **One module at a time.** Each module lives in its own folder (`01-js-fundamentals/`, `02-dom-and-browser/`, ...) with exercises, a mini-project, and notes.
- **Learn by building, verify by explaining.** Each module ends with a set of "interview-depth" questions you should be able to answer out loud, because staff engineers explain the *why*, not just the *how*.
- **Git discipline as a habit.** Each module gets its own branch, small commits, and a merge to `main` when done — practicing real workflow, not just code.
- **Ramp, don't skip.** Early modules will feel easy; the point is filling gaps you don't know you have from tutorial-driven learning.

## Assumptions baked into this plan (veto anything)

- **Modern stack:** Vite for scaffolding, React 18+, Redux Toolkit (not legacy Redux), Vitest + React Testing Library for tests.
- **TypeScript introduced at Module 4** and used everywhere after. Modules 1–3 stay in plain JavaScript so language fundamentals aren't obscured by types.
- **Redux Toolkit is the primary state-management focus** (per repo name), with a comparison tour of Context, Zustand, and TanStack Query so you can argue trade-offs like a staff engineer.
- **Next.js/SSR appears near the end** as an architecture topic, not the foundation.

## Curriculum

### Phase 1 — Language & Platform (the gaps tutorials leave)

- [ ] **Module 1: JavaScript Core**
  Scope, closures, hoisting, `this` binding, prototypes and inheritance, ES6+ features (destructuring, spread, optional chaining), array methods (`map`/`filter`/`reduce` fluency), equality and coercion.
  *Mini-project: build a tiny utility library (your own `_.groupBy`, `debounce`, `deepClone`, event emitter) with hand-written tests.*

- [ ] **Module 2: Async JavaScript & the Event Loop**
  Callbacks → promises → async/await, microtasks vs macrotasks, `Promise.all/allSettled/race`, error handling patterns, AbortController, writing your own promise-based utilities.
  *Mini-project: implement `promiseWithRetry`, a concurrency-limited task queue, and predict-the-output event loop drills.*

- [ ] **Module 3: DOM, Browser & Network**
  DOM APIs without a framework, event propagation/delegation, `fetch`, forms, localStorage/sessionStorage, how the browser renders (parse → style → layout → paint → composite), HTTP basics, CORS.
  *Mini-project: a vanilla JS app (searchable/sortable data table with API fetch) — no React allowed.*

- [ ] **Module 4: TypeScript Essentials**
  Types vs interfaces, generics, unions and narrowing, `unknown` vs `any`, utility types (`Partial`, `Pick`, `Omit`, `Record`), typing functions and async code, strict mode.
  *Mini-project: convert Module 1's utility library to strict TypeScript.*

### Phase 2 — React, properly this time

- [ ] **Module 5: React Fundamentals**
  What React actually does (elements, reconciliation, the render cycle), JSX, components and props, state, events, conditional rendering, lists and keys (and *why* keys matter), controlled vs uncontrolled forms.
  *Mini-project: multi-step form with validation, built with Vite + TypeScript.*

- [ ] **Module 6: Hooks Deep Dive**
  `useState` batching and functional updates, `useEffect` (dependencies, cleanup, and when *not* to use it), `useRef`, `useContext`, `useReducer`, `useMemo`/`useCallback` (and when they're pointless), custom hooks, rules of hooks and why they exist.
  *Mini-project: build custom hooks (`useFetch`, `useDebounce`, `useLocalStorage`) and a small app composing them.*

- [ ] **Module 7: Component Patterns & Composition**
  Lifting state, composition vs prop drilling, compound components, render props vs hooks, error boundaries, portals, refs and `forwardRef`, when to split components.
  *Mini-project: a reusable component kit (modal, tabs, dropdown) with clean public APIs.*

### Phase 3 — State, Data & Routing

- [ ] **Module 8: Redux Toolkit**
  Why Redux exists (and when it's overkill), store/slices/actions/reducers, immutability via Immer, `createAsyncThunk`, selectors and memoization with Reselect, Redux DevTools, RTK Query for server state.
  *Mini-project: shopping cart / task manager with async data, optimistic updates, and normalized state.*

- [ ] **Module 9: The State-Management Landscape**
  Client state vs server state vs URL state, Context (and its re-render pitfalls), Zustand, TanStack Query — build the same small feature 3 ways and write up the trade-offs.
  *Deliverable: a written comparison you could present as a tech-choice proposal.*

- [ ] **Module 10: Routing & Data Fetching Architecture**
  React Router (nested routes, loaders, URL as state), pagination, caching and invalidation strategies, race conditions, suspense-based data fetching.
  *Mini-project: multi-page app with search params, protected routes, and cached API data.*

### Phase 4 — Quality & Performance

- [ ] **Module 11: Testing**
  Vitest fundamentals, React Testing Library philosophy (test behavior, not implementation), mocking APIs with MSW, testing hooks and async flows, a taste of Playwright for E2E.
  *Deliverable: retrofit meaningful test coverage onto the Module 8 or 10 project.*

- [ ] **Module 12: Performance**
  Profiling with React DevTools, unnecessary re-render diagnosis, `React.memo` done right, code splitting and `lazy`/`Suspense`, list virtualization, bundle analysis, Core Web Vitals (LCP/CLS/INP) and how to actually move them.
  *Mini-project: take a deliberately slow app and make it fast, with before/after measurements.*

### Phase 5 — Staff-Level Breadth

- [ ] **Module 13: Frontend System Design**
  Designing a component library / design system, feature folder architecture, API contract design, handling scale (10k-row tables, real-time updates), micro-frontend trade-offs, SSR/SSG/ISR and React Server Components concepts (Next.js tour).
  *Deliverable: written system-design answers to 2–3 classic prompts (design a news feed, design an autocomplete).*

- [ ] **Module 14: The Professional Layer**
  Accessibility (semantic HTML, ARIA, keyboard nav, screen-reader testing), security (XSS, CSRF, sanitization, CSP), tooling (ESLint, Prettier, CI with GitHub Actions on this repo), error monitoring and observability basics.
  *Deliverable: audit and harden a previous module's project.*

- [ ] **Module 15: Capstone**
  A production-grade app combining everything: TypeScript, Redux Toolkit + RTK Query, routing, tests, CI, accessibility pass, performance budget.
  *This is the portfolio piece — treated like a real product with a written design doc first.*

## Progress log

| Date | Module | Notes |
|------|--------|-------|
| 2026-07-05 | Plan created | Curriculum committed to README |
| 2026-07-05 | Module 1 (partial) | Closures exercise complete (13/13); `this` exercise partially done — backfill later |
| 2026-07-05 | Module 5 (core done) | Profile cards, keys, controlled forms, signup wizard mini-project |
| 2026-07-05 | Module 6 (partial) | useState/useEffect, localStorage, fetch; cleanup + custom hooks pending |
| 2026-07-05 | Module 8 started | Pivoted to Redux Toolkit — RTK + react-redux installed |

## Session ritual

1. Pick up the next unchecked module (or revisit a weak spot).
2. Concepts first — short explanation + annotated examples.
3. You write the exercises; code review follows like a real PR.
4. Mini-project, then the interview-depth questions.
5. Check the box, update the progress log, merge the branch.
