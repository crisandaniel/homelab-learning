# 1.2 Functions: declarations, expressions, arrows

**Why:** Functions are values in JS: passed as callbacks, returned from other functions, stored in
variables. React components, event handlers and Express middleware are all just functions.
Hoisting differences explain a whole class of "is not a function" / "cannot access before
initialization" errors.
**Read:** javascript.info: [Functions](https://javascript.info/function-basics),
[Function expressions](https://javascript.info/function-expressions),
[Arrow functions, the basics](https://javascript.info/arrow-functions-basics) (~35 min)
**Skip:** nothing; `this` in arrows is only mentioned here and covered properly in 1.6.
**Time box:** 45–60 min

## Write (material closed)
File: `examples.js`.
- [ ] The same small function written three ways: declaration, expression, arrow
- [ ] Default parameters, and what a function returns when it has no `return`
- [ ] A function passed as an argument (callback) and called by another function
- [ ] Hoisting: calling each of the three forms **before** its definition, with a comment on what
      happens and why
- [ ] When to use which form (my own rule, in a comment)

## Done when
The tasks at the end of the three chapters are solved without the chapter open, and
`examples.js` runs and prints a labelled line for each case above (wrap the failing calls in
`try`/`catch` and print `error.name`).

## Predict

```js
console.log(a());
console.log(typeof b);
try { c(); } catch (e) { console.log(e.name); }

function a() { return "a"; }
var b = function () { return "b"; };
const c = () => "c";
```

<details><summary>Answer</summary>

```
a                function declarations are hoisted with their body: callable before the line
undefined        `var b` is hoisted but the assignment is not, so b is undefined at that point
ReferenceError   `const c` exists but is in the "temporal dead zone" until its line runs
```
</details>

---

## What surprised me

## In my own words
