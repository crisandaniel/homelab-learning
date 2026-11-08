const { describe, it } = require("node:test");
const assert = require("node:assert/strict");



describe(`Equality`, () => {
  describe('==  vs ===', () => {
    it('"0" == 0 --> true', (t) => {
      assert.equal("0" == 0, true);
      t.diagnostic(`JS will try to convert operands to a common type.
      In this case +"0" == 0 --> 0 == 0 --> true`);
    });
    it('"0" === 0 --> false', (t) => {
      assert.equal("0" === 0, false);
      t.diagnostic(`=== does not convert: string vs number are different types --> false`);
    });
  });

  describe('null vs undefined', () => {
    it('(null == undefined) = true ; (null === undefined) = false', (t) => {
      assert.equal(null == undefined, true);
      assert.equal(null === undefined, false);
      t.diagnostic(`Both represent "empty" but they have different types thus ===  fails`);
    });
  });

  describe('|| vs && vs ??', () => {
    it('false || undefined || "" || 0 || "a" = "a"', (t) => {
      assert.equal(false || undefined || "" || 0 || "a", "a");
      t.diagnostic('|| evaluates from left to right and RETURNS the first truthy value');
      t.diagnostic(`false --> false  
        Boolean(undefined) --> false 
        Boolean("") --> false 
        Boolean(0) --> false 
        Boolean("a") --> true`);
    });
    it(`false || undefined || "" = ""`, (t) => {
      assert.equal(false || undefined || "", "");
      t.diagnostic('If all operands are falsy, returns the last one');
    });

    it('true && "" && 1 = ""', (t) => {
      assert.equal(true && "" && 1, "");
      t.diagnostic(`&& evaluates from left to right and returns the first falsy one`);
    });
    it('true && "a" && 1 = 1', (t) => {
      assert.equal(true && "a" && 1, 1);
      t.diagnostic(`if all operands are truthy returns the last one`);
    });

    it('null ?? undefined ?? false = false', (t) => {
      assert.equal(null ?? undefined ?? false, false);
      assert.equal(null ?? undefined ?? "", "");
      t.diagnostic(`returns the first element which is not null or undefined`);
    });
  });

  describe('special cases', () => {
    it('"0" == 0 = true ; "0" === 0 = false', () => {
      assert.equal("0" == 0, true);
      assert.equal("0" === 0, false);
    });
    it('null == 0 = false ; null === "" = false', (t) => {
      assert.equal(null == 0, false);
      t.diagnostic(`JS considers null equal to null or undefined`);
      assert.equal(null === "", false);
    });
    it('null == undefined = true ; null === undefined = false', () => {
      assert.equal(null == undefined, true);
      assert.equal(null === undefined, false);
    });
    it('false == 0 = true; false === 0 = false', (t) => {
      assert.equal(false == 0, true);
      t.diagnostic('When == is used it will try to convert them to the same type: +(false) = 0 == 0 --> true');
      assert.equal(false === 0, false);
      t.diagnostic('=== compares types and returns false if not same type');
    });
  });

  describe('>, >=, <, <=', () => {
    it('null >= 0 = true ; null == 0 false', (t) => {
      assert.equal(null >= 0, true);
      assert.equal(null == 0, false);
      t.diagnostic('>= is a math operator and JS will try to convert it: +null = 0 >= 0 --> true');
      t.diagnostic('however, null is only equal (==) to null and undefined: null == 0 --> false');
    })
  });
});
