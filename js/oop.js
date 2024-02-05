const obj = {
    id: 1,
    name: 'Hong',
    f() {
      console.log('fffffff');
    },
  };
  // console.table(obj);
  const objProxy = new Proxy(obj, {
    set(target, prop, value) {
      console.log('proxy.set>>', prop, value);
      target[prop] = value;
    },
    get(target, prop) {
      console.log('proxy.get>>', prop);
      if (prop === 'id_name') return `${target['id']}. ${target['name']}`;
      return target[prop];
    },
  });
  objProxy.id = 100;
  console.log('obj.id>>', objProxy.id, obj['id']);
  console.log('obj.id>>', objProxy.id_name);
  objProxy.f();
  console.log('::>>', objProxy instanceof obj.constructor);
  
  class Animal {
    #name;
    constructor(name) {
      // console.log('Animal.constructor>>', name);
      this.#name = name || super.constructor.name;
      console.log('🚀  constructor:', super.constructor);
      console.log('🚀  prototype:', super.__proto__);
    }
  
    move() {
      console.log('MOV!!!');
    }
  
    getName() {
      return this.#name;
    }
  
    get name() {
      return this.#name;
    }
  }
  const dog = new Animal('Dog');
  console.log('🚀  dog:', dog.name, dog.getName());
  console.log('🚀  dog.const:', dog.constructor.name);
  console.log('ani::>', Animal.prototype);
  console.log('dog::>', dog.__proto__);
  console.log('dog.move::>', dog.__proto__.move());
  const cat = new Animal();
  console.log('🚀  cat:', cat.name);
  console.log('ok=', Object.keys(obj));
  console.log('ak=', Object.keys(dog));
  // for (let k in dog) console.log('k=', k);
  // console.log('oh=', obj.hasOwnProperty('id'));
  // console.log('dh=', dog.hasOwnProperty('id'));
  console.log('dog-ani>>>', dog instanceof Animal, typeof dog);
  console.log('ani-fn>>>', Animal instanceof Function, typeof Animal);
  
  const cls = new (class {
    constructor() {
      console.log('constructor!');
    }
    eat() {}
  })();
  
  console.log('cls>>', cls instanceof Object);
  console.log('--------------------------');
  Animal.prototype.f = function () {
    console.log('Animal.f>>', this.name);
  };
  // Object.setPrototypeOf(dog, { ...dog.__proto__, x: 1 });
  dog.f(); // Animal.f
  console.log('--------------------------');
  console.log('P1>>', obj.__proto__);
  console.log('P2>>', dog.__proto__);
  console.log(Object.getPrototypeOf(dog));
  
  console.log('***************************');
  console.log(Animal === dog.constructor);
  console.log(Animal.prototype === dog.__proto__);
  
  console.log('obj.proto>>', obj.__proto__);
  console.log('🚀  obj:', obj);
  console.log('TTT>>', new Object(obj));
  const objX = Object.create(obj);
  console.log('🚀  objX:', objX);
  console.log('🚀  objX.proto:', objX.__proto__);
  // console.log('obj.proto>>', obj.__proto__);
  
  Array.prototype.first = function () {
    return this[0];
  };
  Object.defineProperties(Array.prototype, {
    first: {
      get: function () {
        return this[0];
      },
    },
    last: {
      get: function () {
        return this[this.length - 1];
        // return this.slice(-1)[0];
      },
    },
  });
  const arr = [1, 2, 3];
  // console.log('first-old>>', arr.first());
  console.log('first-new>>', arr.first);
  console.log('last-new>>', arr.last);
  
  console.log('==============================');
  
  class Singleton {
    static #_instance;
  
    constructor() {
      if (Singleton.#_instance) return Singleton.#_instance;
      console.log('Singleton.constructor!!!');
      this.name = 'Singleton';
      Singleton.#_instance = this;
    }
  
    static getInstance() {
      // if (this.#_instance) return this.#_instance;
      // return new this();
      return this.#_instance || new this();
    }
  
    // overriding   cf. overloading: JS X
    toString() {
      return `[Singleton: ${this.name}]`;
    }
  }
  
  const s3 = Singleton.getInstance();
  console.log('🚀  s3:', s3);
  const s1 = new Singleton();
  const s2 = new Singleton();
  console.log(s1 === s2, s2 === s3, s3 === s1);
  console.log('toString>>', s3.toString());
  
  console.log('===============================');
  class Emp {
    #name;
    // constructor(name) {
    //   this.nm = name;
    // }
    set name(name) {
      this.#name = name;
    }
  
    get name() {
      return this.#name;
    }
  
    set fullName(name) {
      console.log('settter>>', name);
      [this.firstName, this.lastName] = name.split(' ');
    }
  
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  
    toString() {
      return `first: ${this.firstName}, last: ${this.lastName}`;
    }
  }
  const hong = new Emp('Senior Coding');
  hong.name = 'Steve';
  console.log('🚀  hong:', hong.name);
  // hong.setFullName('Steve Jobs');
  // console.log('🚀  hong11:', hong.toString());
  // console.log('🚀  hong22:', hong.getFullName());
  
  hong.fullName = 'Uncle Bob';
  console.log('🚀  hong33:', hong.fullName);
  
  // hong.fullName = 'Kildong Hong';
  // console.log(hong.fullName); // ?
  // console.log(Object.getOwnPropertyDescriptor(Emp.prototype, 'fullName'));
  
  console.log('***************************');
  class Pet {
    feed(nutrient) {
      console.log(`feed to ${this.name} :`, nutrient);
    }
  }
  
  function mixinPetFeed(mainClass) {
    Object.assign(mainClass.prototype, { feed: Pet.prototype.feed });
    return mainClass;
  }
  
  // class Dog extends Animal {
  class Dog extends mixinPetFeed(Animal) {
    constructor(name) {
      super(name);
    }
  
    bark() {
      console.log('bowwow!', this.name);
    }
  }
  
  // 1) method 1개
  // Object.assign(Dog.prototype, { feed: Pet.prototype.feed });
  
  // 2) 전체(다중상속)
  // Object.defineProperty(Pet.prototype, 'feed', { enumerable: true });
  // Object.assign(Dog.prototype, Pet.prototype);
  const jake = new Dog('Jake');
  jake.move();
  jake.bark();
  jake.feed('Banana');


  //class와 Array를 이용하여 Stack과 Queue를 구현하시오.
  //ex1) Stack
  a=[]
class Stack{
    push(int){
        a.push(int);
        console.log(a);
    }
    pop(){
        const curr =a.pop();
        return curr
    }
}
const stack = new Stack(); // or new Stack([1,2]); // (1,2)
stack.push(3); // 추가하기
console.log(stack.pop()); // 마지막에 추가된 하나 꺼내기
//ex2) Queue
b=[]
class Queue{
    enqueue(int){
        b.push(int);
        console.log(b);
    }
    dequeue(){
        const curr =b.shift();
        return curr
    }
}
const queue = new Queue();
queue.enqueue(3); // 추가하기
console.log(queue.dequeue()); // 추가한지 가장 오래된 - 먼저 들어간 - 하나 꺼내기


// ** iterable class **
function* gener() {
    const x = yield 1;
    const y = yield (x + 10);
    console.log('x y =', x, y);
    return x + y;
  }
  const it3 = gener();
  console.log(it3.next()); // { value: 1, done: false }
  console.log(it3.next());// { value: 13, done: false }
  
  console.log(it3.next(5)); 
  // x y = 13 5
  // { value: 18, done: true }




//   Array →→ List
const arrs = [1, 2, 3];
// 방법1) 역방향
let node2;
for (let i = arrs.length - 1; i >= 0; i -= 1) {
    console.log(i);//210
  node2 = { value: arr[i], rest: node2 };
  console.log(node2);
}

// 방법2) 순방향
let list;
let preNode;
for (let i = 0; i < arrs.length; i++) {
    console.log(i);//012
  const node = { value: arrs[i], rest: undefined };
  if (!list) {
    console.log(node,"list아님");
    list = node; 
  } else {
    console.log(node,"list임");
    preNode.rest = node;
    console.log("preNode.rest:",preNode.rest);
  }

  preNode = node;
  console.log("preNode",preNode);//012
}
