
// Type Conversions in JavaScript
// Remember:
// 1. Expressions are evaluated from left to right for binary operators
// 2. For binary operators both operands are evaluated before the operator is applied
// 3: Strings have `+` as operator for concatenation when one of the operands is a string
// 4: Other math operators will convert to numbers (Number(x) +x)


// Implicit Type Conversion (Type Coercion)
// JavaScript automatically converts types when performing operations with different types

// + is used for numbers and string concatenation
console.log('5' + 2); // '52' because + is a string operator and one of the operands is a string
console.log(5 + '2'); // '52' because + is a string operator and one of the operands is a string

console.log('5' - 2); // (+'5') - 2 = 5 - 2 = 3 because - is a math operator

console.log(1 + 2 + "3"); // (1 + 2) + "3" = 3 + "3" = "33" because + is a string operator and one of the operands is a string
console.log("1" + 2 + 3); // ("1" + 2) + 3 = "12" + 3 = "123" because + is a string operator and one of the operands is a string
// For math operators
console.log("6" * "2"); // (+"6") * (+"2") = 6 * 2 = 12 because * is a math operator
// NaN because Number("abc") = NaN and NaN is sticky (if any operand is NaN, the result is NaN)
console.log("6" / "abc"); // (+"6") / (+"abc") = 6 / NaN = NaN because NaN is sticky

// SPECIAL CASES
console.log(null + 1);  // Number(null) + 1 = 0 + 1 because + is a math operator and NONE is a string operand
console.log(undefined + 1); // Number(undefined) + 1 = NaN + 1 = NaN
console.log(true + 1); // Number(true) + 1 = 1 + 1 = 2
console.log("" - 1); // Number("") - 1 = 0 - 1 = -1
console.log(" 12 " * 2); // Number(" 12 ") * 2 = Number(12) [gets trimmed first] * 2 = 12 * 2 = 24
console.log(null + "1"); // String(null) + "1" = "null" + "1" = "null1" because + is a string operator and one of the operands is a string