
// Type Conversions in JavaScript
// Remember:
// 1. Expressions are evaluated from left to right for binary operators
// 2. For binary operators both operands are evaluated before the operator is applied
// 3: Strings have `+` as operator for concatenation when one of the operands is a string
// 4: Other math operators will convert to numbers (Number(x) +x)


// Implicit Type Conversion (Type Coercion)
// JavaScript automatically converts types when performing operations with different types

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

describe('Type Conversion and Implicit Type Conversion (Type Coercion)', () => {
  describe('Explicit type conversion', () => {
    describe('Number conversion', () => {
      it('Number(" 2 ") = 2', (t) => {
        assert.equal(Number(" 2 "), 2);
        assert.equal(typeof Number(" 2 "), "number");
        t.diagnostic`Spaces are trimmed when cast to Number`
      });
      it('Number("4 2") = NaN', (t) => {
        assert.equal(Number("4 2"), NaN);
        assert.equal(typeof Number("4 2"), "number");
        t.diagnostic`Spaces inside make the cast to Number say it's Not-a-Number`;
      });
      it('Number("abc") = NaN', (t) => {
        assert.equal(Number("abc"), NaN);
        assert.equal(typeof Number("abc"), "number");
        t.diagnostic`Casting strings to Number will evaluate to Not-a-Number`;
      });
      it('Number(true) = 1', (t) => {
        assert.equal(Number(true), 1);
        assert.equal(typeof Number(true), "number");
        t.diagnostic`Casting booleans will evaluate 1 for true and 0 for false`;
      });
      it('Number(NaN) = NaN', (t) => {
        assert.equal(Number(NaN), NaN);
        assert.equal(typeof Number(NaN), "number");
        t.diagnostic`Casting NaN will evaluate to NaN - remember that NaN !== NaN`;
      });
      it('Number(null) = 0', (t) => {
        assert.equal(Number(null), 0);
        assert.equal(typeof Number(null), "number");
        t.diagnostic`Casting null will evaluate to 0 - remember that null is a value intentionally assigned`;
      });
      it('Number(undefined) = NaN', (t) => {
        assert.equal(Number(undefined), NaN);
        assert.equal(typeof Number(undefined), "number");
        t.diagnostic`Casting undefined will evaluate to NaN - remember that undefined is a value assigned by JS`;
      });
    });

    describe('String conversion - all values transform to text: null->"null", true->"true", undefined->"undefined"', () => {
      it('String(" 2 ") = " 2 "', (t) => {
        assert.equal(String(" 2 "), " 2 ");
        assert.equal(typeof String(" 2 "), "string");
      });
      it('String(42) = "42"', (t) => {
        assert.equal(String(42), "42");
        assert.equal(typeof String(42), "string");
      });
      it('String(" ") = " "', (t) => {
        assert.equal(String(" "), " ");
        assert.equal(typeof String(" "), "string");
      });
      it('String(true) = "true"', (t) => {
        assert.equal(String(true), "true");
        assert.equal(typeof String(true), "string");
      });
      it('String(NaN) = "NaN"', (t) => {
        assert.equal(String(NaN), "NaN");
        assert.equal(typeof String(NaN), "string");
      });
      it('String(null) = "null"', (t) => {
        assert.equal(String(null), "null");
        assert.equal(typeof String(null), "string");
      });
      it('String(undefined) = "undefined"', (t) => {
        assert.equal(String(undefined), "undefined");
        assert.equal(typeof String(undefined), "string");
      });
    });
  });

  describe('Type coercion - implicit conversion', () => {
    it('"5" + 2 = "52"', (t) => {
      assert.equal("5" + 2, "52");
      assert.equal(typeof ("5" + 2), "string");
      t.diagnostic("Both operands are evaluated. + is used for string concat");
    });
    it('"abc" + 2 = "abc2"', (t) => {
      assert.equal("abc" + 2, "abc2");
      assert.equal(typeof ("abc" + 2), "string");
      t.diagnostic("Both operands are evaluated. + is used for string concat");
    });
    it('"5" - 2 = 3', (t) => {
      assert.equal("5" - 2, 3);
      assert.equal(typeof ("5" - 2), "number");
      t.diagnostic("If a Math operator is used it will convert to number");
    });
    it('"abc" * 2 = NaN', (t) => {
      assert.equal("abc" * 2, NaN);
      assert(isNaN("abc" * 2));
      t.diagnostic("If a Math operator is used it will try to convert to number");
    });
  });


    describe('Type coercion - special cases', () => {
      it('null + 2 = (+null) + 2 = 0 + 2 = 2', (t) => {
        assert.equal(null + 2, 2);
        assert.equal(typeof (null + 2), "number");
        t.diagnostic("+ is a math operand && 2 is number -> will try to Number(null)");
      });
      it('null + "a" = String(null) + "a" = "null" + "a" = "nulla"', (t) => {
        assert.equal(null + "a", "nulla");
        assert.equal(typeof(null + "a"), "string");
        t.diagnostic("+ is a string operand && 'a' is string -> will try to String(null)");
      });
      it('null - 2 = (+null) - 2 = 0 - 2 = -2', (t) => {
        assert.equal(null - 2, -2);
        assert.equal(typeof(null-2), "number");
        t.diagnostic("- is a math operator && 2 is number -> will try to Number(null)");
      });
      it('undefined + 2 = (+undefined) + 2 = NaN + 2 = NaN', (t) => {
        assert(isNaN(undefined + 2));
        t.diagnostic("+ is a math operator && 2 is number -> will try Number(undefined) = NaN");
      });
      it('undefined - 2 = (+undefined) - 2 = NaN - 2 = NaN', (t) => {
        assert(isNaN(undefined - 2));
        t.diagnostic("- is a math operator && 2 is number-> will try to Number(undefined) = NaN");
      });
      it('"a" + "b" = "ab"', (t) => {
        assert.equal("a" + "b", "ab");
        t.diagnostic("+ is a string operator && one operands is a string");
      });
      it('"a" - "b" = NaN', (t) => {
        assert(isNaN("a" - "b"));
        t.diagnostic("- is a math operator -> will try to Number('string') = NaN");
      });
      it('"" + "b" = "b"', (t) => {
        assert.equal("" + "b", "b");
        t.diagnostic("+ is a string operator -> will try to String('') = ''");
      });
      it('"" + 2 = "2"', (t) => {
        assert.equal("" + 2, "2");
        t.diagnostic("+ is a string operator -> will try to String('') = ''");
      });
      it('true + 2 = (+true) + 2 = 1 + 2 = 3', (t) => {
        assert.equal(true + 2, 3);
        t.diagnostic("+ is a math operator and +(true) = 1");
      });
      it('true + "a" = String(true) + "a" = "truea"', (t) => {
        assert.equal(true + "a", "truea");
        t.diagnostic("+ is a string operator and String(true) = 'true'");
      });
    });
});

