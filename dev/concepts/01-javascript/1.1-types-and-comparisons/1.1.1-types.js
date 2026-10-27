// Types
// There are 7 primitive types in JavaScript: number, bigint, string, boolean, undefined, null, and symbol.
// Everything else is an object type - including arrays and functions.
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

describe('Types', () => {
  describe('There are 7 primitives and everything else is an object', () => {
    it('typeof 42 = "number"', () => {
      assert.equal(typeof 42, "number");
    });
    it('typeof 42n = "bigint"', () => {
      assert.equal(typeof 42n, "bigint");
    });
    it('typeof "Hello" = "string"', () => {
      assert.equal(typeof "Hello", "string");
    });
    it('typeof true = "boolean"', () => {
      assert.equal(typeof true, "boolean");
    });
    it('typeof undefined = "undefined"', () => {
      assert.equal(typeof undefined, "undefined");
    });
    it('typeof null = "object"', (t) => {
      assert.equal(typeof null, "object");
      t.diagnostic(`- known quirk it was left as object for legacy reasons`);
    });
    it('typeof Symbol("sym") = "symbol"', (t) => {
      assert.equal(typeof Symbol("sym"), "symbol");
      t.diagnostic(`used for creating unique and immutable values for keys in objects`);
    });
    it('typeof {} = "object"', () => {
      assert.equal(typeof {}, "object");
    });
  });

  describe('Special cases', () => {
    it('typeof NaN = "number"', (t) => {
      assert.equal(typeof NaN, "number");
      t.diagnostic(`NaN is a special numeric value that represents "Not-a-Number"
        Still the type of NaN is "number"`);
    });
    it('typeof [] = "object"', (t) => {
      assert.equal(typeof [], "object");
      t.diagnostic('Arrays are also objects in JS');
    });
    it('typeof function () {} = "function"', (t) => {
      assert.equal(typeof function () { }, 'function');
      t.diagnostic(`function is an object type, but typeof returns 'function'
        so you know you can call it`);
    });

    describe('Why null is not an object:', () => {
      const myObj = {};
      myObj.name = "my obj name";
      it('an object can have properties (e.g. myObj.name)', () => {
        assert.equal(myObj.name, "my obj name");
      });
      it('however, null.name throws "TypeError: Cannot read properties of null (reading \'name\')"', () => {
        assert.throws(() => null.name, TypeError);
      });
    });

    describe('Difference between null and undefined', () => {
      it('`let x = null` intentionally sets "no value" for the variable', () => {
        let x = null;
        assert.equal(x, null);
      });
      it('while `let x;` gets set by JS to undefined', () => {
        let x;
        assert.equal(x, undefined);
      });
    });

  });

});
