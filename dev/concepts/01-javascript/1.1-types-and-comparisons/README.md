# 1.1 Types, conversions and comparisons

**Why:** Half of the "weird JavaScript" bugs are implicit type conversion: `"5" + 1`, a form value
compared with a number, `if (count)` failing when `count` is `0`. Also a classic interview opener.
**Read:** javascript.info: [Data types](https://javascript.info/types),
[Type conversions](https://javascript.info/type-conversions),
[Basic operators](https://javascript.info/operators) (string concatenation and unary `+`),
[Comparisons](https://javascript.info/comparison) (~40 min)
**Skip:** BigInt details, Symbol (comes later), operator precedence table.
**Time box:** 45–60 min

## Write (material closed)

File: `examples.js`, run with my command from 0.1.

- [x] The 8 types, with `typeof` for each, including the `typeof null` quirk and why it is a quirk
- [ ] Implicit conversion with `+` vs. `-`, `*`, `/`: when strings win and when numbers win
- [ ] The full list of falsy values, and one bug that `if (value)` causes with a valid value
- [ ] `==` vs. `===`: three cases where they give different results
- [ ] `null` and `undefined` in comparisons: why `null >= 0` and `null == 0` disagree
- [ ] Checking for `NaN` correctly

## Done when

The tasks at the end of the four chapters are answered **in a comment block first**, then checked
by running them. Every wrong answer has a one-line comment explaining why it was wrong.

## Predict

```js
console.log(1 + "2");
console.log("3" - 1);
console.log(null == 0);
console.log(null >= 0);
console.log(undefined == null);
console.log(NaN === NaN);
console.log(typeof null);
```

<details><summary>Answer</summary>

```
12        "+" with a string concatenates
2         "-" only works on numbers, so "3" becomes 3
false     == treats null specially: equal only to undefined
true      >= converts null to 0, and 0 >= 0
true      the special pair for ==
false     NaN is not equal to anything, itself included; use Number.isNaN
object    a bug from the first version of JS, kept for compatibility
```

</details>

---

## What surprised me

## In my own words
