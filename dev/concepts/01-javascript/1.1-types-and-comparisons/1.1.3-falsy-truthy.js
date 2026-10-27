
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
// List of Falsy and Truthy values in JavaScript
// Falsy/Truthy means a value converted to Boolean by JS


describe(`Falsy / Truthy - values converted to Boolean by JS`, () => {
  describe(`There are 8 falsy values`, () => {
    it("Boolean(false) = false", (t) => {
      assert.equal(Boolean(false), false);
    });

    describe('Special types "null", "undefined" and "NaN"', () => {
      it(`Boolean(null) = false`, (t) => {
        assert.equal(Boolean(null), false);
      });
      it(`Boolean(undefined) = false`, (t) => {
        assert.equal(Boolean(undefined), false);
      });
      it(`Boolean(NaN) = false`, (t) => {
        assert.equal(Boolean(NaN), false);
      });
    })

    describe('Number types conversions to Boolean', () => {
      it(`Boolean(0) = false`, (t) => {
        assert.equal(Boolean(0), false);
      });

      it(`Boolean(-0) = false`, (t) => {
        assert.equal(Boolean(-0), false);
        t.diagnostic('Because -0 is the same as 0');
      });

      it(`Boolean(0n) = false`, (t) => {
        assert.equal(Boolean(0n), false);
        t.diagnostic('Because 0n is the same as 0');
      })

      it('Boolean(111) = true', (t) => {
        assert.equal(Boolean(111), true);
        t.diagnostic('Any non-zero and not-NaN will evaluate true')
      });
    });

    describe('String types conversions to Boolean', () => {
      it('Boolean("") = false', (t) => {
        assert.equal(Boolean(""), false);
      });
      it('Boolean(" ") = true', (t) => {
        assert.equal(Boolean(" "), true);
        t.diagnostic('Any non-empty strings evaluate true')
      });
    });

    describe('Object types conversions to Boolean', () => {
      it('Boolean({}) = true', (t) => {
        assert.equal(Boolean({}), true);
        t.diagnostic('Any object, even empty ones will evaluate true');
      });
      it('Boolean([]) = true', (t) => {
        assert.equal(Boolean([]), true);
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
              '+null >= 0 -> 0 >= 0 -> true' `)
          })
        });
        describe('When input is undefined', () => {
          it('Should return false', (t) => {
            assert.equal(isGreaterThanOrEqualToZero(undefined), false);
            t.diagnostic(`It will do
              '+undefined >= 0 -> NaN >= 0 -> false.
              Therefore condition 'input !== undefined' is redundant`)
          })
        });
        describe('When input is NaN', () => {
          it('Should return false', (t) => {
            assert.equal(isGreaterThanOrEqualToZero(NaN), false);
            t.diagnostic(`It will do
              'NaN !== null (true) and NaN >= 0 (false).`)
          })
        });


      });

      describe('Given the function ')
    });
  })
})
