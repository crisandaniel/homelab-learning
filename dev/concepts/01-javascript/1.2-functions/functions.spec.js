
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");


describe('Functions', () => {
  it('Function declaration', (t) => {

    const retVal = functionDeclaration(); // call the function before it gets declared
    assert.equal(retVal, undefined);
    
    function functionDeclaration() {
      console.log("Function Declaration");
    };
    t.diagnostic(functionDeclaration.toString());
    t.diagnostic('-> gets hoisted (can be called before declaration)');
    t.diagnostic('-> if no return statement it will return undefined');
    t.diagnostic('-> personal preference: when called from a different file - you know they are hoisted and call them anytime');
  });

  it('Function Expressions', (t) => {
    assert.throws(() => functionExpression(), {
      name: 'ReferenceError',
      message: "Cannot access 'functionExpression' before initialization"
    });
    const functionExpression = function() {
      console.log("Function Expression");
    };
    assert.equal(functionExpression(), undefined);
    t.diagnostic(functionExpression.toString());
    t.diagnostic('-> const is hoisted but not initialized (TDZ): must be called after it\'s defined');
    t.diagnostic('-> called before will throw: ReferenceError: Cannot access \'functionExpression\' before initialization');
    t.diagnostic('-> personal preference: when called from the same file - definitions on top, calling below');
  });

  it('Arrow Function', (t) => {
    const arrowFunction = () => 2
    assert.equal(arrowFunction(), 2);
    t.diagnostic(arrowFunction.toString());
    t.diagnostic('-> personal preference: when defining callbacks, on the spot functions');
  });


  describe('Returning values', () => {
    it('JS adds a (;) after return => this means that if the return value is on a new line OR empty the function returns undefined', (t) => {
      function returnOnNewLine() { 
        return // will return here with undefined;
          true;
      }
      function returnEmpty(t) { 
        return // will return undefined
      }
      assert.equal(returnOnNewLine(), undefined);
      assert.equal(returnEmpty(), undefined);
      t.diagnostic(returnOnNewLine.toString());
      t.diagnostic(returnEmpty.toString());
    });
  });

  describe('Arguments', () => {
    it('arguments and ...args', (t) => {
      const myFunc = function(a, b="b", ...args) { // call: myFunc("aaa", "bbb", "ccc", 'ddd')
        return [arguments, args, b]; // [{'0': 'aaa', '1': 'bbb', '2': 'ccc', '3': 'ddd'}, ['ccc', 'ddd'], 'bbb']
      }

      assert.deepEqual(Array.from(myFunc("aaa", "bbb", "ccc", "ddd")[0]), ['aaa', 'bbb', 'ccc', 'ddd']);
      assert.deepEqual(myFunc("aaa")[2], 'b');
      assert.deepEqual(myFunc("aaa", "bbb", "ccc", "ddd")[1], ['ccc', 'ddd']);
      t.diagnostic(myFunc.toString());
      t.diagnostic('`arguments` -> how the function was called (not the default values like b="b")');
      t.diagnostic('`args` -> extra arguments given when calling the function');
    });
  });

  describe('Arguments as functions - Callbacks', () => {
      function myMath(a, b, callback) {
        console.log(`input: ${a} and ${b}`);
        return callback(a, b);
      };
      function myAddCallback(a, b) {
        const res = a + b;
        console.log(`a + b = ${res}`);
        return res;
      };
      function myProdCallback(a, b) {
        const res = a * b;
        console.log(`a * b = ${res}`);
        return res
      }
    it('inversion of control - a function decides when and if to call another function (callback)', (t) => {
      assert.equal(myMath(2, 3, myAddCallback), 5);
      assert.equal(myMath(2, 3, myProdCallback), 6);
      t.diagnostic(myMath.toString())
      t.diagnostic(myAddCallback.toString())
      t.diagnostic(myProdCallback.toString())
    });
  });
});

   
    
