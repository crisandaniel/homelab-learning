# 1.3 Objects, references and copying

**Why:** "I changed this object and something else changed too" is one of the most common JS bugs.
React state updates only work if you create **new** objects instead of mutating old ones, so this
concept is the base of stage 4.
**Read:** javascript.info: [Objects](https://javascript.info/object),
[Object references and copying](https://javascript.info/object-copy) (~35 min)
**Skip:** the "Garbage collection" chapter (optional reading, not needed now).
**Time box:** 45–60 min

## Write (material closed)
File: `examples.js`.
- [x] Dot vs. bracket access, computed keys, the `in` operator, `for...in`
- [x] Primitives copied by value vs. objects copied by reference, shown side by side
- [x] `===` on two objects with the same content vs. two variables pointing at the same object
- [x] Shallow copy (spread or `Object.assign`) vs. deep copy (`structuredClone`): where the shallow
      copy still shares data
- [x] `const` with an object: what it prevents and what it does not
- [x] A function that mutates its argument by accident, and the fixed version

## Done when
A function `updateUser(user, changes)` returns a **new** user with the changes applied and leaves
the original untouched, including a nested object inside `user` (e.g. `address`).
Checked with `console.assert` lines that compare the original before and after the call:
no assertion fails.

## Predict

```js
const a = { name: "Ana", tags: ["x"] };
const b = a;
const c = { ...a };

b.name = "Bob";
c.tags.push("y");

console.log(a.name);
console.log(a.tags.length);
console.log(a === c);
console.log(a.tags === c.tags);
```

<details><summary>Answer</summary>

```
Bob     b is the same object as a, not a copy
2       spread is shallow: c.tags is the same array as a.tags
false   c is a new object
true    ...but its nested array is shared
```
</details>

---

## What surprised me
- didn't have an explanation about obj.x vs obj[x] until now

## In my own words
- to remember: shallow copy vs structuredClone()
- assign a primitive to another primitive will copy the value to a new reference in memory (stack)
- assign an object to another variable will create a new variable pointing to the same reference in memory (a new remote control to the same reference)
- { ...obj } will return a new shallow copy of the `obj`
- { ...obj, ...objNew } will return a new shallow copy of `obj` and then merge with another shallow copy of `objNew`;
  common keys will take the values from `objNew` e.g. { ...{a: 1, b: 2, c: 3}, ...{b: 3, d: 4}} = {a: 1, b: 3, c: 3, d: 4}
- for (key in obj) -> JS will sort ascending keys if they are numbers; else will be left as they were written
