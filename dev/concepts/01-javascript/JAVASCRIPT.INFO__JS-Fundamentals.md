<!-- note_key: 4b5d98361961 -->
<!-- note_type: AnkiOpsQA -->
Q: What is the primary purpose of the `"use strict"` directive in JavaScript and what production risk does omitting it carry?
A: `"use strict"` forces the engine to execute code in modern ES5+ mode, disabling legacy permissive behaviors and converting silent failures into explicit runtime errors. Without it, mispelling a variable name during assignment (e.g., `usrRole = "Admin"`) silently creates a new global variable on `window`/`globalThis`, polluting global memory and potentially overwriting application state.

```js
"use strict";

let userRole = "Guest";
// With "use strict", assigning an undeclared variable throws a runtime error:
// usrRole = "Admin"; // ReferenceError: usrRole is not defined
```

---

<!-- note_key: 41badbb0636b -->
<!-- note_type: AnkiOpsQA -->
Q: What main legacy issues does `"use strict"` resolve in JavaScript?
A: 1. Blocks accidental creation of global variables when `let`/`const`/`var` is omitted (throws `ReferenceError`).
2. Prevents writing to read-only properties or non-extensible objects (throws `TypeError`).
3. Forbids duplicate parameter names in functions and reserves future keywords (`implements`, `interface`, `private`).

---

<!-- note_key: 84bbddda61c1 -->
<!-- note_type: AnkiOpsQA -->
Q: How does Automatic Semicolon Insertion (ASI) create a bug with multiline `return` statements?
A: If the returned expression starts on a new line after `return`, ASI automatically inserts a semicolon `;` immediately after `return`. The function executes `return;` (returning `undefined`) and ignores the block below.

```js
function getPayload() {
  return
  {
    status: 200
  };
}

console.log(getPayload()); // undefined
```

---

<!-- note_key: 1414ba85fa89 -->
<!-- note_type: AnkiOpsQA -->
Q: What are the selection criteria for `const`, `let`, and `var` in modern JavaScript?
A: - **`const` (~90% default):** Use for any variable whose reference binding must remain fixed. It prevents accidental reassignment.
- **`let`:** Use exclusively when the variable's value must be reassigned (e.g., loop counters, state flags) within block scope (`{}`).
- **`var` (Avoid):** Has function scope and suffers from unpredictable hoisting.

```js
// Fixed binding:
const API_URL = "https://api.example.com";
const userConfig = { timeout: 5000 };
userConfig.timeout = 10000; // Allowed (mutating contents), but `userConfig = {}` throws TypeError

// Re-assigned binding:
let attempts = 0;
attempts += 1;
```

---

<!-- note_key: 20c812ec3c51 -->
<!-- note_type: AnkiOpsQA -->
Q: What risks are associated with using `var` instead of `let`/`const`?
A: 1. **No Block Scope:** `var` leaks outside `if`/`for` blocks, which can accidentally overwrite outer scope variables.
2. **Undefined Hoisting:** Accessing a `var` before its declaration returns `undefined` instead of throwing an error, masking logical bugs.
3. **Re-declaration:** `var x = 1; var x = 2;` is allowed without warnings, leading to accidental overwrites.

```js
if (true) {
  var leakedVar = "Visible outside IF block!";
  let blockVar = "Isolated in block!";
}

console.log(leakedVar); // "Visible outside IF block!"
// console.log(blockVar); // ReferenceError: blockVar is not defined
```

---

<!-- note_key: bb33e42524e0 -->
<!-- note_type: AnkiOpsQA -->
Q: What is the Temporal Dead Zone (TDZ) and how does `let`/`const` hoisting differ from `var`?
A: TDZ is the time window between entering a scope and reaching the exact line where a `let` or `const` variable is declared and initialized. Although `let` and `const` declarations are hoisted at compile time, they remain uninitialized in the TDZ; accessing them inside the TDZ throws a `ReferenceError`. Conversely, `var` is hoisted and automatically initialized with `undefined`.

```js
// TDZ (Temporal Dead Zone):
// console.log(score); // ReferenceError: Cannot access 'score' before initialization
let score = 100;
```

---

<!-- note_key: 823cb7c3f1e1 -->
<!-- note_type: AnkiOpsQA -->
Q: How does internal object mutability work with `const`?
A: `const` guarantees that the variable's memory reference cannot be rebound to another value. However, it does **not** freeze the internal contents of objects or arrays referenced by that variable.

```js
const settings = { theme: "dark" };
settings.theme = "light"; // Allowed! (Internal mutation)
// settings = { theme: "light" }; // TypeError: Assignment to constant variable.
```

---

<!-- note_key: 8520add0a2ba -->
<!-- note_type: AnkiOpsQA -->
<!-- tags: data_types -->
Q: How many types are in js and what are they?
A: 7 primitives \+ 1 non-primitive (object)

```js
// primitives
typeof 123.12; // 'number' (1)
typeof 1234n; // 'bigint' (2)
typeof "true"; // 'string' (3)
typeof true; // 'boolean' (4)
typeof null; // 'object' (5)
typeof undefined; // 'undefined' (6)
typeof Symbol("id"); // 'symbol' (7)

// non primitive data type
typeof Math; // 'object' (8)
```

`null` is not an object; it's an error in `typeof`. It's a standalone type that has only one value: `null`

---

<!-- note_key: 3476181c0e28 -->
<!-- note_type: AnkiOpsQA -->
<!-- tags: data_types -->
Q: What are the 2 `special numeric values`
A: - `Infinity` = division by 0

```js
alert(1 / 0); // Infinity
```

- `NaN` - computational error - a result of an incorrect or an undefined mathematical operation

```js
alert("string" / 2); // NaN
```

---

<!-- note_key: 1184ffe63732 -->
<!-- note_type: AnkiOpsQA -->
<!-- tags: data_types -->
Q: What does `NaN is sticky` means
A: It means if there is a NaN in a math expression it propagates to the end result

```js
alert ( 3 * 3 + "a" / 2 ); // NaN because "a"/2 is NaN
```

---

<!-- note_key: 5f29c19e903d -->
<!-- note_type: AnkiOpsQA -->
<!-- tags: data_types -->
Q: What is the difference between `null` and `undefined`
A: While both are data types `null` means "unknown", "nothing", "empty". `null` data type has only one value: `null` and `undefined` means that "value is not assigned".

`null` is assigned to a variable intentionally while `undefined` is assigned by JS

To INITIALIZE a variable with nothing use `null` while `undefined` is reserved as the `default value for unassigned things`

```js
let a = null; // it's initialized
let b; // gets undefined by default
```

---

<!-- note_key: 0848079a4d93 -->
<!-- note_type: AnkiOpsQA -->
<!-- tags: data_types -->
Q: Why `typeof null` prints `object`?
A: This is an officially recognized error in `typeof` but kept for compatibility.

To demonstrate it's not an object we know that any object has properties. If we try to set a property to `null` it will throw an error

```js
let myNullObj = null;
myNullObj.name = "my null object";

TypeError: Cannot set properties of null (setting 'name')
```

---

<!-- note_key: 90a0bfbc1d43 -->
<!-- note_type: AnkiOpsQA -->
<!-- tags: data_types -->
Q: What does `typeof function() {}` return and why?
A: ```js
typeof function() {}
'function'
```

While 'function' is still an object `typeof` returns `function` so you know you can call it with ().

---

<!-- note_key: 6deebe843016 -->
<!-- note_type: AnkiOpsQA -->
<!-- tags: data_types -->
Q: What type does `NaN` have?
A: ```js
typeof NaN
'number' // although NaN means "Not A Number"
```

---

<!-- note_key: 97befe5cfa1c -->
<!-- note_type: AnkiOpsQA -->
<!-- tags: data_types -->
Q: Is `NaN == NaN` ?
A: `NaN` is a placeholder for computational error. JS cannot establish if 2 computational errors are the same.

```js
NaN === NaN;
false;

NaN == NaN;
false;

"6 0" / 2;
NaN;

"6 0" / 2 == "8 0" / 2; // although both are NaN
false;

Number.isNaN(" 6 0 " / 2); // Use Number.isNaN instead
true;
```

---

<!-- note_key: 363e9414d5d7 -->
<!-- note_type: AnkiOpsQA -->
<!-- tags: data_types -->
Q: What is type coercion and how would you explain it. Give example
A: As opposed to explicit conversion such as Number(value), String(value), Boolean(value)
type coercion is the implicit conversion done by JS when an operation is applied to 2 or more operands.

- `+` is a Math and String operator -> JS will look at the operands and
   - if one operand is a `string` will try to make the other one a `string`
even if the other is a `number`
   - if one operand is a `number` will try to make the other one a `number`

```js
"a" + 2 // "a" \+ String(2) = "a2"
2 + null // 2 \+ Number(null) = 2 \+ 0 = 2
```

- `- % /` are Math operators -> JS will try to make them Numbers

```js
4 - "  2   " // 4 - Number("  2  ") = 4 - 2 = 2
4 - "4 2" // 4 - Number("4 2") = 4 - NaN = NaN
```

---

<!-- note_key: a70408843b93 -->
<!-- note_type: AnkiOpsQA -->
<!-- tags: data_types -->
Q: Why does `assert.equal(Number("abc"), NaN)` pass in node:assert/strict, even though NaN === NaN is false?
A: We know that NaN == NaN is false. A simple explanation is that `Number('abc') = NaN` but is a different NaN than: `Number('xyz')`. And `assert.equal` compares `value & type.

---

<!-- note_key: 05b907ee9e58 -->
<!-- note_type: AnkiOpsQA -->
Q: Why is explicit type conversion preferred over implicit type coercion in production?
A: Explicit conversion (`Number()`, `String()`, `Boolean()`) is clear, predictable, and self-documenting. Implicit coercion produces unexpected results: the `+` operator favors string concatenation if any operand is a string (`"10" + 2` -> `"102"`), whereas `-` forces numeric subtraction (`"10" - 2` -> `8`). Unconverted HTML form inputs (always strings) cause mathematical calculation bugs.

```js
const rawInput = "42";

// Explicit conversion (Safe)
const age = Number(rawInput); // 42 (number)

// Unary plus conversion
const count = +rawInput; // 42 (number)

// Implicit coercion risks:
const concatResult = "10" + 2; // "102" (string)
const mathResult = "10" - 2;   // 8 (number)
```

---

<!-- note_key: 78b260ee95ba -->
<!-- note_type: AnkiOpsQA -->
Q: Why does `typeof null` return `"object"` and how do you accurately check for `null` in code?
A: `typeof null === "object"` is a historical bug from JavaScript's first implementation, where values were stored in 32-bit units with `000` type tags denoting objects (and `null` was represented as the null pointer `0x00`). To check if a value is strictly `null`, use strict equality: `val === null`.

```js
console.log(typeof null); // "object"
console.log(null === null); // true
```

---

<!-- note_key: 3d598cd49659 -->
<!-- note_type: AnkiOpsQA -->
Q: How do `null` and `undefined` differ during numeric conversion?
A: `null` represents an explicit absence of value and converts to numeric `0`. `undefined` represents an uninitialized or missing value and converts to `NaN` (Not-a-Number), which propagates `NaN` through any subsequent arithmetic operation.

```js
console.log(Number(null));      // 0
console.log(Number(undefined)); // NaN

console.log(null + 5);      // 5
console.log(undefined + 5); // NaN
```

---

<!-- note_key: 4984032f50cb -->
<!-- note_type: AnkiOpsQA -->
Q: What is the asymmetry of `NaN !== NaN` and how should you check for NaN?
A: According to IEEE 754 standards, `NaN` represents an undefined numerical result. Because an invalid numerical result is not guaranteed to equal another invalid numerical result, `NaN` is not equal to any value, including itself (`NaN === NaN` is `false`). Use `Number.isNaN(val)` or `Object.is(val, NaN)` for accurate checks.

```js
console.log(typeof NaN);        // "number"
console.log(NaN === NaN);       // false
console.log(Number.isNaN(NaN)); // true
```

---

<!-- note_key: 9f3d76c12ee6 -->
<!-- note_type: AnkiOpsQA -->
Q: Why should strict equality (`===`) always be used instead of loose equality (`==`)?
A: Strict equality (`===`) checks both value and data type without implicit coercion. Loose equality (`==`) attempts to convert operands to a common type first, producing counterintuitive results like `"0" == false` (`true`), `"" == 0` (`true`), or `[] == false` (`true`), which can compromise validation logic and security checks.

```js
const inputString = "0";

console.log(inputString === 0); // false (Safe)
console.log(inputString == 0);  // true (Risky)
```

---

<!-- note_key: ccb47db3c6aa -->
<!-- note_type: AnkiOpsQA -->
Q: Why is `null >= 0` evaluated as `true` while `null == 0` evaluates as `false`?
A: Relational comparison operators (`>`, `<`, `>=`) convert `null` to the number `0`, resulting in `0 >= 0` (`true`). However, the loose equality operator `==` follows a specific ECMAScript rule: `null` only loosely equals `undefined` and undergoes no numeric coercion against `0`.

```js
console.log(null > 0);  // false
console.log(null == 0); // false
console.log(null >= 0); // true
```

---

<!-- note_key: fce26a66a9cb -->
<!-- note_type: AnkiOpsQA -->
Q: How does string comparison work on numeric strings like `"2" > "12"`?
A: When both operands are strings, JavaScript performs a lexicographical comparison character-by-character according to Unicode character codes (`'2'` > `'1'`), without converting the strings to numbers.

```js
console.log("2" > "12"); // true
```

---

<!-- note_key: fb21f81ff541 -->
<!-- note_type: AnkiOpsQA -->
Q: What is the difference between logical OR (`||`) and Nullish Coalescing (`??`)?
A: `||` falls back to the right operand for any *falsy* value (`0`, `""`, `false`, `null`, `undefined`, `NaN`). `??` falls back only when the left operand is strictly `null` or `undefined`, preserving valid business data like `0` (e.g., volume level 0) or `""`.

```js
const userSettings = { volumeLevel: 0 };

// Incorrect fallback with || (overwrites valid 0):
const volumeBad = userSettings.volumeLevel || 50; // 50

// Correct fallback with ?? (preserves 0):
const volumeGood = userSettings.volumeLevel ?? 50; // 0
```

---

<!-- note_key: caffb56e5e99 -->
<!-- note_type: AnkiOpsQA -->
Q: What happens if you combine `??` with `&&` or `||` without explicit parentheses?
A: The JavaScript specification throws a `SyntaxError` to prevent operator precedence ambiguity.

```js
// const result = 1 && 2 ?? 3; // SyntaxError: Unexpected token '??'
const result = (1 && 2) ?? 3; // 2
```

---

<!-- note_key: f5bfeab3560c -->
<!-- note_type: AnkiOpsQA -->
Q: How does short-circuit evaluation work for `||` and `&&` operators?
A: Logical operators evaluate left-to-right and return the actual value of the last evaluated operand, not a simple boolean:
- **`A || B`:** Evaluates `A`. If `A` is *truthy*, short-circuits and returns `A`. If *falsy*, evaluates and returns `B`.
- **`A && B`:** Evaluates `A`. If `A` is *falsy*, short-circuits and returns `A`. If *truthy*, evaluates and returns `B`.

```js
console.log("Alex" || "User"); // "Alex"
console.log("" || "User");     // "User"
console.log(0 && "User");      // 0
console.log(1 && "User");      // "User"
```

---

<!-- note_key: 1e0bc4a02fc8 -->
<!-- note_type: AnkiOpsQA -->
Q: When should you use a ternary operator (`?`) vs `if/else` vs `switch`?
A: - **Ternary (`?`):** Use exclusively for concise, single-line value assignments based on a condition.
- **`if / else`:** Use for complex multi-line logic or when performing side-effects (API calls, state updates).
- **`switch`:** Use when comparing a single expression against a discrete set of fixed values.

```js
const role = "ADMIN";
const access = role === "ADMIN" ? "Full" : "Limited"; // Single line assignment
```

---

<!-- note_key: 7b82b025d0ab -->
<!-- note_type: AnkiOpsQA -->
Q: What are the main implementation pitfalls of `switch` statements?
A: 1. **Fall-through Effect:** Omitting `break` causes execution to flow sequentially into subsequent cases regardless of whether their conditions match.
2. **Strict Type Matching:** `switch` uses strict equality (`===`), so string `"1"` will not match numeric case `1`.

```js
const inputCode = "1";

switch (inputCode) {
  case 1:
    console.log("Number");
    break;
  default:
    console.log("Type mismatch"); // Executes default! ("1" !== 1)
}
```

---

<!-- note_key: c15e692a18a7 -->
<!-- note_type: AnkiOpsQA -->
Q: Why can a `switch` statement offer performance advantages over an `if...else if` chain?
A: A `switch` evaluates a single expression against discrete constant values. In many JS engines, large `switch` statements can be optimized internally using lookup tables, whereas `else if` chains must evaluate conditions sequentially one by one.

---

<!-- note_key: 144677281bf9 -->
<!-- note_type: AnkiOpsQA -->
Q: How do loop selections differ between `for`, `while`, and `do...while`?
A: - **`for`:** Use when the exact number of iterations is known or when iterating array indices.
- **`while`:** Use when the iteration count is unknown, depending on a dynamic condition evaluated *before* each pass.
- **`do...while`:** Use when the loop body must execute *at least once guaranteed*, evaluating the condition *after* the first run.

```js
let count = 0;
do {
  count++;
} while (count < 0);
console.log(count); // 1 (Executed once)
```

---

<!-- note_key: c8a0fa395d33 -->
<!-- note_type: AnkiOpsQA -->
Q: What happens to the Event Loop when a synchronous infinite loop executes?
A: Because JavaScript runs on a single main thread, a synchronous infinite loop never yields control back to the execution stack. It completely blocks the Event Loop, preventing UI rendering, click events, or asynchronous callbacks from executing, freezing the page ("Page Unresponsive").

---

<!-- note_key: 6fe3eec3cfb8 -->
<!-- note_type: AnkiOpsQA -->
Q: How can you break out of deeply nested loops in JavaScript?
A: A standard `break` only terminates the innermost loop. To break out of an outer loop simultaneously, attach a syntactic Label to the outer loop and pass it to `break`.

```js
outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outerLoop; // Terminates the outer loop!
    }
  }
}
```

---

<!-- note_key: e906a3e32eb2 -->
<!-- note_type: AnkiOpsQA -->
Q: What are the key operational differences between Function Declarations, Function Expressions, and Arrow Functions?
A: - **Function Declaration:** Fully hoisted; can be called before its definition in code.
- **Function Expression:** Defined dynamically when execution reaches its line; not hoisted.
- **Arrow Functions (`() => {}`):** Concise syntax; lacks its own `this`, `arguments`, `.prototype`, or constructor capability.

```js
// Function Declaration (Hoisted)
console.log(add(2, 3)); // 5
function add(a, b) {
  return a + b;
}

// Arrow Function (Concise callback)
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2); // [2, 4, 6]
```

---

<!-- note_key: e67d703e5d92 -->
<!-- note_type: AnkiOpsQA -->
Q: Why shouldn't Arrow Functions be used as object methods?
A: Arrow Functions do not bind their own `this` context; they inherit `this` lexically from the outer scope in which they were defined. When used as an object method, `this` points to the outer context (`window` or `undefined` in strict mode) rather than the object instance.

```js
const user = {
  name: "Alex",
  getNameBad: () => this.name,        // undefined
  getNameGood() { return this.name; } // "Alex"
};

console.log(user.getNameBad());  // undefined
console.log(user.getNameGood()); // "Alex"
```

---

<!-- note_key: 5c712985f192 -->
<!-- note_type: AnkiOpsQA -->
Q: Why can't Arrow Functions be used as constructors with `new`?
A: Arrow Functions lack the internal `[[Construct]]` slot and do not possess a `.prototype` property. Attempting to call an Arrow Function with `new` throws a `TypeError`.

```js
const Person = (name) => { this.name = name; };
// new Person("Alex"); // TypeError: Person is not a constructor
```

---

<!-- note_key: defffa8522e1 -->
<!-- note_type: AnkiOpsQA -->
Q: How do `.bind()`, `.call()`, and `.apply()` affect Arrow Functions?
A: Because Arrow Functions bind `this` lexically at creation time and have no local `this` binding, methods like `.bind()`, `.call()`, or `.apply()` are ignored. They cannot alter an Arrow Function's `this` context.

---

<!-- note_key: dfb58b9f3051 -->
<!-- note_type: AnkiOpsQA -->
Q: Do Arrow Functions have their own `arguments` object?
A: No. Arrow Functions do not have a local `arguments` object. If `arguments` is accessed inside an Arrow Function, it will resolve to the `arguments` object of the nearest non-arrow enclosing function. To capture arguments in an Arrow Function, use rest parameters (`...args`).

```js
const showArgs = (...args) => {
  console.log(args); // [1, 2, 3]
};
showArgs(1, 2, 3);
```
