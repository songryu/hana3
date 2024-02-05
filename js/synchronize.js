
setTimeout( function() {
    console.log('task1', new Date()); //3초후에

    setTimeout( function() {
      console.log('task2', new Date()); //2초후에
      setTimeout( function() {
        console.log('task3', new Date());
        console.log('END>>', new Date());
      }
      , 1000 );
    }
    , 2000);
  }
  , 3000);
  console.log('START', new Date());
  import { rand } from './utils/index.js';
  const promi = new Promise((resolve, reject) => {
    
    setTimeout(() => {
      const now = Date.now();
      if (now % 2 === 0) resolve(console.log('fulfill', now));
      else reject(new Error('어디로?'));
    }, 1000);
  });
  
  console.log(promi);
  
  promi.then(
    succ => console.log('Resolve!', succ, promi),
    err => console.log('Reject!', err, promi)
  );
  

  function Promise(cb) {
    const thenFns = [];
    const catchFns = [];
    const finalFns = [];
  
    cb(succ => thenRecur(succ), err => catchRecur(err));
  
    Promise.prototype.then = fn => {
      thenFns.push(fn); return this;
    };
  
    Promise.prototype.catch = fn => {
      catchFns.push(fn); return this;
    };
  
    Promise.prototype.finally = fn => {
      finalFns.push(fn); return this;
    };
  
    const finalRunner = () => {
      for (const f of finalFns) f();
    };
  
    const catchRecur = preErr => {
      this.state = 'rejected';
      const fn = catchFns.shift();
      if (!fn) {
        finalRunner();
        if (preErr instanceof Error) throw preErr;
        else throw new Error(preErr);
      }
  
      try {
        fn(preErr);
        return finalRunner();
      } catch (error) {
        catchRecur(error);
      }
    };
    const thenRecur = preRet => {
        const fn = thenFns.shift();
        if (!fn) {
          this.state = 'fulfilled';
          return finalRunner();
        }
    
        if (preRet instanceof Promise) {
          preRet
            .then(res => {
              const r = fn(res);
              console.log('🚀  r:', r);
              r.catch(e => {
                catchRecur(e);
              });
            })
            .then(thenRecur)
            .catch(err => {
              catchRecur(err);
            });
        } else {
          try {
            const ret = fn(preRet);
            thenRecur(ret);
          } catch (error) {
            catchRecur(error);
          }
        }
      };
    
      cb(
        succ => thenRecur(succ),
        err => catchRecur(err)
      );
    
      this.state = 'pending';
    }
    
// const assert = require('assert'); // CJS
import assert from 'assert'; // ESM

class Collection {
  #arr;
  constructor(...args) {
    this.#arr = Array.isArray(args[0]) ? args[0] : args;
  }

  get _arr() {
    return this.#arr;
  }

  push(value) {
    this.#arr.push(value);
    return this;
  }

  get peek() {
    return this.#arr.at(-1);
  }

  get poll() {
    if (this.#isQueue()) {
      return this.dequeue();
    } else {
      return this.#arr.pop();
    }
  }

  clear() {
    this.#arr = []; // 또는 this.#arr.length = 0;
  }

  toArray() {
    return [...this.#arr]; // 또는 this.#arr.slice(0)
  }

  remove() {
    this.#arr.pop();
  }

  get peek() {
    return this.#arr.at(-1);
  }

  get poll() {
    if (this.#isQueue()) {
      return this.dequeue();
    } else {
      return this.#arr.pop();
    }
  }

  get isEmpty() {
    return !!this.length;
  }

  #isQueue() {
    return this.constructor.name === 'Queue';
  }

  get size() {
    return this.#arr?.length;
  }

  // toString() {
  //   return `${this.constructor.name}(${this.size}) ${JSON.stringify(
  //     this.#arr
  //   )}`;
  // }
}

class Stack extends Collection {
  pop() {
    return this._arr.pop();
  }
}

class Queue extends Collection {
  enqueue(value) {
    this.push(value);
    return this;
  }

  dequeue() {
    return this._arr.shift();
  }
}

//exam
// 아래 코드가 오류가 없으면 통과!
const stack = new Stack();
stack.push(1).push(2).push(3).push(5);
assert.deepStrictEqual(stack.toArray(), [1, 2, 3, 5]);
stack.pop();
assert.strictEqual(stack.peek, 3);
stack.remove();
assert.strictEqual(stack.poll, 2);
assert.deepStrictEqual(stack.toArray(), [1]);

const queue = new Queue();
queue.enqueue(1).enqueue(3).enqueue(5);
queue.dequeue();
assert.deepStrictEqual(queue.toArray(), [3, 5]);
assert.strictEqual(queue.poll, 3);
assert.deepStrictEqual(queue.toArray(), [5]);

if (!stack.isEmpty) stack.clear();
if (queue.size) queue.clear();
assert.deepStrictEqual(stack.toArray(), []);
assert.deepStrictEqual(queue.toArray(), []);





//promise
const vals = [1, 2, 3];

vals.forEach(a => randTime(a).then(console.log));


Promise.all(vals.map(randTime))
  .then(console.table);


Promise.all([randTime(1), Promise.reject('Error!')])
  .then(console.table)
  .catch(console.error);



const randtime = new Promise(resolve => {
  const sec = rand(1, 4) * 500;
  setTimeout(() => resolve(sec), sec);
});

const randTime = () =>
  new Promise(resolve => {
    const sec = rand(1, 4) * 500;
    setTimeout(() => {
      console.log('sec=', sec);
      resolve(sec);
    }, sec);
  });
//동시 실행했지만 테스크큐엔 각각들어옴
const isParellel = true;
console.time('promi');
if (isParellel) {
  Promise.all([randTime(), randTime(), randTime()]).then(() =>
    console.timeEnd('promi')
  );
} else {
  randTime()
    .then(x => {
      return randTime();
    })
    .then(x => {
      return randTime();
    })
    .then(x => {
      return randTime();
    })
    .then(() => console.timeEnd('promi'));
}
