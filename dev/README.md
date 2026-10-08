# Dev track

From "I can fix bugs in an existing codebase" to **"I can build a full-stack TypeScript app from
scratch and explain how it works"**. Main track: 3–4 sessions a week.

The agent follows the root [`AGENTS.md`](../AGENTS.md) plus [`AGENTS.md`](AGENTS.md) in this folder.

## How it is organised

```
concepts/<NN-tech>/<id-name>/   one folder per concept: README.md (the task) + my example files
projects/<Pn-name>/             mini-projects from scratch, each with its own compose.yaml
templates/                      concept.md, project.md
```

- **Concept loop:** read the chapter → close it → write commented examples → exercise →
  predict the output of a snippet → flashcards → commit.
- **Every 5–8 concepts, a mini-project** that combines them, built from an empty folder with no
  tutorial. This is where "building from zero" is practised.
- **Capstone:** after Next.js, a real app in **its own repository** (the portfolio piece).
- **Everything runs in Docker** from day one (stage 0). The homelab track goes deeper later.

Task files are created when I reach them. If a file is missing, ask the agent to create it.

## Roadmap

### Stage 0: Tooling → [`concepts/00-tooling`](concepts/00-tooling/)
- [ ] 0.1 Docker minimum for dev: run a JS file and a server in a throwaway container
- [ ] 0.2 Node and npm: `package.json`, scripts, dependencies, `node_modules` in a volume

### Stage 1: JavaScript, the language → [`concepts/01-javascript`](concepts/01-javascript/)
- [ ] 1.1 Types, conversions and comparisons (`==` vs `===`)
- [ ] 1.2 Functions: declarations, expressions, arrows, hoisting
- [ ] 1.3 Objects, references and copying
- [ ] 1.4 Arrays and their methods (`map`, `filter`, `reduce`), destructuring, spread/rest
- [ ] 1.5 Scope and closures
- [ ] 1.6 `this`, `call`/`apply`/`bind`, arrow functions and `this`
- [ ] 1.7 Prototypes and classes
- [ ] 1.8 Errors: `try`/`catch`, custom errors, failing loudly
- [ ] 1.9 Promises
- [ ] 1.10 `async`/`await` and error handling
- [ ] 1.11 The event loop: microtasks vs. macrotasks
- [ ] 1.12 Modules: ES modules vs. CommonJS
- [ ] **P1** Node CLI: fetch data from a public API, transform it, print a report

### Stage 2: The web platform
- [ ] 2.1 How a page gets from URL to pixels (HTTP, HTML parsing, rendering)
- [ ] 2.2 DOM: find, create, change elements
- [ ] 2.3 Events: bubbling, delegation, `preventDefault`
- [ ] 2.4 Forms and user input
- [ ] 2.5 `fetch`, HTTP methods, status codes, headers, JSON
- [ ] 2.6 Browser storage, cookies, CORS (concepts)
- [ ] **P2** Vanilla todo app: DOM, events, `localStorage`, no framework
- [ ] **P3** Vanilla API app: loading, error and empty states

### Stage 3: TypeScript
- [ ] 3.1 Basic types, inference, `type` vs. `interface`
- [ ] 3.2 Union types and narrowing, discriminated unions
- [ ] 3.3 Typing functions; generics basics
- [ ] 3.4 `unknown` vs. `any`; typing API responses
- [ ] 3.5 Utility types: `Partial`, `Pick`, `Omit`, `Record`
- [ ] 3.6 `tsconfig`, `strict`, running TS (`tsc`, `tsx`)
- [ ] **P4** Convert P1 to TypeScript with `strict` on

### Stage 4: React (react.dev + Full Stack Open)
- [ ] 4.1 Components, JSX, props
- [ ] 4.2 State and the rendering model (render, commit, state as a snapshot)
- [ ] 4.3 Lists, keys, conditional rendering
- [ ] 4.4 Events and controlled forms
- [ ] 4.5 Lifting state up, composition
- [ ] 4.6 Effects: when to use them, when not, cleanup
- [ ] 4.7 Refs
- [ ] 4.8 Custom hooks
- [ ] 4.9 Context and reducers
- [ ] 4.10 Data fetching, and why libraries like TanStack Query exist
- [ ] 4.11 Testing components (React Testing Library)
- [ ] **P5** The todo app again, in React + TS; compare with P2
- [ ] **P6** P3 in React: custom hooks, context, component tests

### Stage 5: Node backend
- [ ] 5.1 An HTTP server with no framework
- [ ] 5.2 Express: routing, middleware, error handling
- [ ] 5.3 REST API design
- [ ] 5.4 Postgres in Compose; SQL basics; querying from Node
- [ ] 5.5 Validation at the boundary
- [ ] 5.6 Authentication: sessions vs. tokens, password hashing
- [ ] 5.7 API tests
- [ ] **P7** A Postgres-backed API for the P5 todo app, frontend connected

### Stage 6: Next.js
- [ ] 6.1 App Router, server vs. client components
- [ ] 6.2 Data fetching and caching
- [ ] 6.3 Route handlers and server actions
- [ ] 6.4 Authentication
- [ ] 6.5 Rendering modes: static, dynamic, streaming
- [ ] **Capstone** chosen and started in its own repo

### Stage 7: Ship it (meets the homelab track)
- [ ] 7.1 End-to-end tests with Playwright
- [ ] 7.2 CI with GitHub Actions: lint, test, build
- [ ] 7.3 Production Dockerfile (multi-stage)
- [ ] 7.4 Deploy to the home lab (needs homelab phase 3)

## What I can skip for now

Class components and lifecycle methods · Redux (until a real need) · webpack config ·
advanced type gymnastics (`infer`, complex conditional types) · GraphQL · micro-frontends.
