
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");


describe('Objects', () => {
  describe('Objects vs Primitives', () => {
    const myObj = { name: "my name" };
    let myVar = "my var";

    it('const will not guarantee that keys or values will not change', () => {
      assert.equal(myObj.name, "my name");
      myObj.name = "my new fancy name";
      assert.equal(myObj.name, "my new fancy name");
    });
    it('a variable containing a primitive will also hold the value', (t) => {
      let myNewVar = myVar; // a new variable is copied on another memory location with the same value; copy by value 
      myNewVar = "my new var"; // when we modify the new variable
      assert.equal(myVar, "my var"); // the old variable remains the same
      assert.equal(myNewVar, "my new var"); // while the new variable has the new value 
    });

    it('an object keeps a reference to the memory address where values are being stored', (t) => {
      let myNewObj = myObj // a new object points to the same address as the old object; now we have 2 variable names pointing to the same memory address; copy by reference
      myNewObj.name = "my new name"; // when we modify the object
      assert.equal(myObj.name, "my new name"); // the old object also gets modified because JS will look at the same reference from memory
      assert.equal(myNewObj.name, "my new name"); 
    })
  });

  describe('Look left of the dot -> this', () => {
    let level_0 = {
      val: "level_0",
      getLevel() { return this.val },
      level_1: { 
        val: "level_1",
        getLevel() { return this.val },
      }
    };
    it('level_0.getLevel() = "level_0"', (t) => {
      assert.equal(level_0.getLevel(), "level_0");
      t.diagnostic('level_0.getLevel() -> left of getLevel() is level_0 object -> this refers to level_0 object')
    });
    it('level_0.level_1.getLevel() = "level_1"', (t) => {
      assert.equal(level_0.level_1.getLevel(), "level_1");
      t.diagnostic('level_0.level_1.getLevel() -> left of getLevel() is level_1 object -> this refers to level_1 object');
    });
  });

  describe('Access key values: . vs []', () => {
    const myKey = "abc"
    const myObjWithKeys = { 
      abc: 1,
      myKey: 2
    }
    it('calling with . will look for a key with that name', (t) => {
      assert.equal(myObjWithKeys.abc, 1);
      assert.equal(myObjWithKeys.myKey, 2);
    });
    it('calling with [] will evaluate what is inside the brackets', (t) => {
      assert.equal(myObjWithKeys["abc"], 1);
      assert.equal(myObjWithKeys[myKey], 1); // myKey = "abc" ->  myObjWithKeys["abc"] -> 1
    });
    it('iterate over object keys', (t) => {
      t.diagnostic('for (let k in myObjWithKeys) - will iterate over each key in myObjWithKeys');
        for (let k in myObjWithKeys) {
          assert.equal(typeof k, 'string');
          t.diagnostic(`${k} is a ${typeof k} 
            - values can be accessed using brackets myObjWithKeys[k]: ${myObjWithKeys[k]}
            - but myObjWithKeys.k doesn't because JS looks for a key named "k" -> doesn't evaluate k's value`);
        }
    });
    it('if key is a string it can be accessed using .(dot): myObj.abc', () => {
      assert.equal(myObjWithKeys.abc, 1);
    });
    it('dynamic key values', (t) => {
      const myDynamicKey = (x) => x % 2 === 0 ? 'even' : 'odd';
      const myObj = {
        [myDynamicKey(10)]: 'this is an even key',
        [myDynamicKey(11)]: 'this is an odd key'
      }
      assert.equal('even' in myObj, true);
      assert.equal('odd' in myObj, true);
      t.diagnostic('Keys inside brackets [] are being evaluated first');
    });
    it('in vs undefined', (t) => {
      let myObj1 = {
        a: undefined
      };
      assert.equal(myObj1.a === undefined, true);
      assert.equal(myObj1.b === undefined, true);
      assert.equal('a' in myObj1, true);
      assert.equal('b' in myObj1, false);
      t.diagnostic(`If a key is undefined myObj1 = {a: undefined}  then 
        - myObj1.b is '${myObj1.b}' same as myObj1.a ${myObj1.a} - both 'undefined' although b is not a key 
        - 'b' in myObj1 shows correct: ${'b' in myObj1}
        `);
    });
  });

  describe('Object comparison', () => {
    let obj1 = { a: "a" }; // has its own reference in memory and values
    let obj2 = { a: "a" }; // has its own reference in memory and values 
    let obj3 = obj1; // make a reference to the same object in memory
    let obj4 = { ...obj1 } // make a shallow copy of obj1 => new reference


    it('Two objects are not equal even if they have the same structure because they have different memory referrences', (t) => {
      t.diagnostic(`
        let obj1 = { a: "a" }; // has its own reference in memory and values
        let obj2 = { a: "a" }; // has its own reference in memory and values 
        let obj3 = obj1; // make a reference to the same object in memory
        let obj4 = { ...obj1 } // make a shallow copy of obj1 => new reference`);

      assert.equal(obj1 === obj2, false);
      t.diagnostic(`obj1 === obj2 is false - because references don't point to the same memory address`);
      assert.deepEqual(obj1, obj2) 
      t.diagnostic('although when comparing their key:value pairs are the same');
      assert.equal(obj1 === obj3, true);
      t.diagnostic('but obj1 === obj3 is true - because obj3 is a reference to the same memory location as obj1');
      assert.equal(obj1 === obj4, false);
      t.diagnostic('while obj1 === obj4 is false - because a shallow copy creates a new reference in memory and copies the object');
      assert.deepEqual(obj1, obj4);
      t.diagnostic(`although obj1 ${JSON.stringify(obj1)} and obj4 ${JSON.stringify(obj4)} have the same key:value pairs`);
    });
  });

  // Written by the AI mentor on request (1.3, shallow vs. deep copy)
  describe('Shallow copy vs. deep copy', () => {
    it('spread copies only the first level: nested objects are shared', (t) => {
      const original = { a: "a", nested: { x: 1 } };
      const shallow = { ...original };

      assert.equal(original === shallow, false);               // new outer object
      assert.equal(original.nested === shallow.nested, true);  // same inner object

      shallow.a = "changed";
      shallow.nested.x = 99;

      assert.equal(original.a, "a");       // first level was copied: original untouched
      assert.equal(original.nested.x, 99); // the bug: nested change leaks into the original
      t.diagnostic('spread copies the reference of "nested", not the object itself');
    });

    it('structuredClone copies every level: nothing is shared', (t) => {
      const original = { a: "a", nested: { x: 1 } };
      const deep = structuredClone(original);

      assert.equal(original === deep, false);
      assert.equal(original.nested === deep.nested, false);

      deep.nested.x = 99;

      assert.equal(original.nested.x, 1);  // original untouched
      assert.deepEqual(original, { a: "a", nested: { x: 1 } });
      t.diagnostic('structuredClone creates new objects at every level');
    });
  });

  // Written by the AI mentor on request (1.3: const with objects)
  describe('const with an object', () => {
    it('const blocks reassigning the variable, not changing the object', () => {
      const user = { name: "Ana" };
      user.name = "Bob";
      assert.equal(user.name, "Bob");
      assert.throws(() => { user = { name: "Cris" }; }, TypeError);
    });
  });

  // addTag: my versions from the chat (syntax fixed by the AI mentor)
  describe('Mutating an argument by accident', () => {
    function addTagBroken(user, newTag) {
      user.tag = newTag;
      return user;
    }
    function addTag(user, newTag) {
      return { ...user, tag: newTag };
    }

    it('broken version changes the original and returns the same object', () => {
      const myUser = { name: "original", tag: "tag1" };
      const result = addTagBroken(myUser, "tag2");
      assert.equal(result === myUser, true);
      assert.equal(myUser.tag, "tag2");
    });

    it('fixed version returns a new object and leaves the original alone', () => {
      const myUser = { name: "original", tag: "tag1" };
      const result = addTag(myUser, "tag2");
      assert.equal(result === myUser, false);
      assert.equal(result.tag, "tag2");
      assert.equal(myUser.tag, "tag1");
    });
  });

  // Written by the AI mentor on request (1.3 "Done when")
  describe('Done when: updateUser(user, changes)', () => {
    function updateUser(user, changes) {
      return {
        ...user,
        ...changes,
        address: { ...user.address, ...changes.address },
      };
    }
    const makeUser = () => ({ name: "Ana", address: { city: "Cluj", zip: "400000" } });

    const cases = [
      { changes: { name: "Bob" },
        expected: { name: "Bob", address: { city: "Cluj", zip: "400000" } } },
      { changes: { address: { city: "Iași" } },
        expected: { name: "Ana", address: { city: "Iași", zip: "400000" } } },
      { changes: { name: "Bob", address: { zip: "700000" } },
        expected: { name: "Bob", address: { city: "Cluj", zip: "700000" } } },
    ];

    for (const { changes, expected } of cases) {
      it(`applies ${JSON.stringify(changes)} without touching the original`, () => {
        const user = makeUser();
        const updated = updateUser(user, changes);

        assert.deepEqual(updated, expected);
        assert.notEqual(updated, user);                  // new outer object
        assert.notEqual(updated.address, user.address);  // new nested object
        assert.deepEqual(user, makeUser());              // original untouched
      });
    }
  });
});
