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
  


  