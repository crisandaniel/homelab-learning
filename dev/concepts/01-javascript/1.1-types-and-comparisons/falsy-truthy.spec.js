
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
// List of Falsy and Truthy values in JavaScript
// Falsy/Truthy means a value converted to Boolean by JS


describe(`Falsy / Truthy - values converted to Boolean by JS`, () => {
  describe(`There are 8 falsy values`, () => {
    it("1. Boolean(false) = false", (t) => {
      assert.equal(Boolean(false), false);
    });

    describe('Special types "null", "undefined" and "NaN"', () => {
      it(`2. Boolean(null) = false`, (t) => {
        assert.equal(Boolean(null), false);
      });
      it(`3. Boolean(undefined) = false`, (t) => {
        assert.equal(Boolean(undefined), false);
      });
      it(`4. Boolean(NaN) = false`, (t) => {
        assert.equal(Boolean(NaN), false);
      });
    })

    describe('0, 0n and "" evaluate to false', () => {
      it(`5. Boolean(0) = false ; 6. Boolean(-0) = false`, (t) => {
        assert.equal(Boolean(0), false);
        assert.equal(Boolean(-0), false);
        t.diagnostic('-0 is the same');
        t.diagnostic('Any non-zero and not-NaN will evaluate true')
      });
      it(`7. Boolean(0n) = false`, (t) => {
        assert.equal(Boolean(0n), false);
        t.diagnostic('Because 0n is for bigInt as 0 is for number');
      })
      it('8. Boolean("") = false', (t) => {
        assert.equal(Boolean(""), false);
      });
    });
  });

  describe('Any non 0 and non-empty strings evaluate to true', () => {
    it('Boolean(" ") = true ; Boolean(111) = true', (t) => {
      assert.equal(Boolean(" "), true);
      assert.equal(Boolean(111), true);
    });
  });

  describe('Object types conversions to Boolean', () => {
    it('Boolean({}) = true ; Boolean([]) = true', (t) => {
      assert.equal(Boolean({}), true);
      assert.equal(Boolean([]), true);
      t.diagnostic('Any object, even empty ones will evaluate true');
      t.diagnostic('[] is an object and thus evaluates true even if empty')
    });
  });

  describe('Special cases and caveats', () => {
    describe(`Given the function that returns true for any number >= 0`, () => {
      const isGreaterThanOrEqualToZero = function (input) {
        return input !== null
          && input >= 0;
      }
      describe('When input is 0', () => {
        it('Should return true', (t) => {
          assert.equal(isGreaterThanOrEqualToZero(0), true);
          t.diagnostic(`Only 'if (input)' would be wrong because Boolean(0) = false`)
        })
      });
      describe('When input is null', () => {
        it('Should return false', (t) => {
          assert.equal(isGreaterThanOrEqualToZero(null), false);
          t.diagnostic(`Check 'input !== null' is required because
            '+null >= 0 --> 0 >= 0 --> true' `)
        })
      });
      describe('When input is undefined', () => {
        it('Should return false', (t) => {
          assert.equal(isGreaterThanOrEqualToZero(undefined), false);
          t.diagnostic(`It will do
            '+undefined >= 0 --> NaN >= 0 --> false'.
            Therefore condition 'input !== undefined' is redundant`)
        })
      });
      describe('When input is NaN', () => {
        it('Should return false', (t) => {
          assert.equal(isGreaterThanOrEqualToZero(NaN), false);
          t.diagnostic(`It will do
            'NaN !== null (true) and NaN >= 0 (false)'.`)
        })
      });
    });
  })
})
