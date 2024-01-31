function hello() {
    const [name] = arguments;
    console.log(`hello,${name}!`, arguments);
    return `hello,${name}!`
}
//arguments array 형태의 객체 
hello('songryu', 'kim')
const hi = hello;
hi('song');
console.log("---------------");


// 모든 함수는 반환 값(return value)를 갖는다?
function printFnReturnValue(fn) { console.log(fn.name, "ddd", fn()); }
const ret = printFnReturnValue(hello);
console.log(ret);
console.log("---------------");

function printFnReturnValue(...args) {
    console.log('args:', args);
    const [fn, nm] = args;
    console.log(fn.name, fn(nm));
}

printFnReturnValue(hi, 'Lee');



const f1 = function ff(x, isLast) {
    console.log(x);
    if (isLast) return;
    else ff('efg', true);
};

f1();  // OK
//   ff();  // Error! ff is not defined!

//async await 해야함
// async function af(){
//     return 1;
// }

// (async function () {
//     await fetch();
// })(); // cf. React's useEffect


console.log("---------------");
function fff1(a) {
    return function (b) {
        for (let i = 1; i < 10; i += 1)
            console.log(`${a}*${i}=${a * i}`);
    };
}
const fff2 = a => (b) => {
    for (let i = 1; i < 10; i += 1)
        console.log(`${a}*${i}=${a * i}`);
    return a*b
};
//a를 받는 함수가 b 를 받는 함수를 리턴함

const gugu2 = fff2(3);
console.log(gugu2(4));


globalThis.y=10;
//var y=10;
function bfn(x){
    console.log(x,this.y);
}
bfn(9);
bfn.bind({y:999})(7);
//this 를 다른걸로 binding 


// $btn1.addEventListener('click', function () {
//     console.log('Click11!!!!!', this); // button
//   });
// //비동기 함수 , 부모의 디스가 btn 자신
//   $btn2.addEventListener('click', () => {
//     console.log('Click22!!!!!', this); // window
//   });
  //부모의 this(밖에 ) 가 나의 this
  //btn1 윈도우에 존재하니까 윈도우 


  const obj = {
    name: 'ObjName',
    bark1() {
      console.log('1=', this.name);
      const self = this; //둘다 메소드, 객체 안의 함수 
      setTimeout( function() {
        console.log('11=', this.name);//그때당시 this는 모름 
        console.log('11=', self.name);//그래서 self에 담아서 
      }, 1000);
      console.log('xxxx'); //1초후에 여기 함수 실행해줘
    },
    bark2() {
      console.log('2=', this.name);
      setTimeout(() => { //화살표함수의 this 는 부모 obj ,신경쓸필요없이 callback 
        console.log('22=', this.name);
      }, 1000);
    },
  };
  //함수가 소멸되지 전까지 self는 사라질 수 없음 
  //클로저
  obj.bark1();//인스턴스
  obj.bark2();//obj 의 전역 브라우저에선 윈도우 노드에선 모듈
  //arrow 프로토타입 못가짐


  // < 함수의 호출 방식과 this >

  //화살표 함수는 new 를 쓸 수가 없음
  //this 는 글로벌, 전역.

// ⇔ function declareFn(name) {
    const expressFn = function(name) {
        // if, 'use strict'?
        this.name = name;
        console.log("expressFn",this," new.target", new.target, this.name, name);
      }
      
      
      const arrowFn = (name) => {
        this.name = name;
        console.log("arrowFn",this, "new.target" ,new.target," this.name", this.name,"name", name);
      } //전역임. 브라우저에서 실행하면 부모의 this 윈도우
      //모듈에서 실행하면 모듈 
      
      expressFn('expfn');
    //   arrowFn('afn');
      
      const dfn = new expressFn('D');
      //new 하면 전역아니고 인스턴스가 생김. 그 인스턴스. 객체를 만듬 
    //   const afn = new arrowFn('A'); // error!
    console.log("globalThis",globalThis.name)
      //globalThis expfn
  


  //<고차함수>
  // const f1 = function(f,val){
  //  return f(val);
//}
const f10 = (f, val) => f(val);
f10(console.log, 'f100');

// const f2 = function(f){
//   return function(...args) {
//             console.log(f…)
//         };
// }   // Curring
const f2 = (f) => (...args) => 
console.log("f.name",f.name,"fargs", f(...args));
f2(Math.max)(1, 3, 2, 5, 4);

const X = f2(Math.max);
X(1, 3, 2, 10, 4); //args로 들어감


const ff = f10; //같은 힙의 주소를 보고 있음
const fns = [f10, f2];


//unary 함수 
const arr = ['1', '2', '3'];
//map(function(item,idx)){})
//function parseInt(str)==>number
const rets = arr.map(parseInt);
console.log(rets);   // [ 1, NaN, NaN ]
//arr.map(function(item,idx,this))
//parseInt('1',0,[1,2,3])
//parseInt('2',1,[1,2,3])
//parseInt('3',2,[1,2,3])

/*new 안해도 메모리에 잡힘. 정적변수
class Dog(){
    static x=10;
    names='d';
}
Dog.X
*/

const unary = fn => fn.length === 1
   ? fn
   : (arg) => fn(arg);

const rets2 = arr.map(unary(parseInt));
console.log(rets2);   // [ 1, 2, 3 ]


const cb=item=>parseInt(item);

const unaryCb=unary(cb);
const unaryParseInt=unary(parseInt);
console.log(arr.map(unaryCb));
console.log(arr.map(unaryParseInt));


//함수를 한번만 실행하게 하는 once 함수를 작성하시오.

function once(f){
    //@Todo call once  
    let didRun = false;
    return function(...args){
        return f.apply(this,args);
        //f.bind(thisValue)(...args);
        //f.apply(thisValue,args);
    };
}
const thisObj1={id:100};
const thisObj2 = { id: 200 };
function fff(x,y){
    console.log(`금일 운행금지 차량은 끝번호 ${x},${y}입니다! ${this.id}`);
}
const fn=once(fff);
//binding => fn 한테 전달 
console.log(fff.call(thisObj1,1,6));
console.log(fn.call(thisObj2, 2, 7)); // 금일 운행금지 차량은 끝번호 1, 6입니다!
console.log(fn(1, 6)); // 금일 운행금지 차량은 끝번호 1, 6입니다!
console.log(fn(2, 7)); // undefined
console.log(fn(3, 8)); // undefined
