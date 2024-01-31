const arr=[1,2,3];
console.log({...arr});
console.log(arr.entries());
console.log(arr.length)

const a = Array(3); // ⇔ new Array(3) ⇔ [,,,]

// const arr = [1, 2, 3];
// const arr = Array(1, 2, 3); // Array(...args)
// const arr = new Array(1, 2, 3); 다같음

const ar2 = Array(5).fill(1);
console.log(ar2)
ar2.fill('X');
console.log(ar2)
ar2.fill('Y', 1);    // from index 1
console.log(ar2)
ar2.fill('Z', 2, 4); // 2이상 ~ 4미만
console.log(ar2)
ar2.fill(0, -4, -1); // 5-1이상 ~ 5-1미만
console.log(ar2)


const ar3 = Array.from(arr); // no-ref
console.log(ar3)//123
const ar4 = Array.from([...arr, 4, 5]);
console.log(ar4)//12345
const ar55=Array.from({length:5}, (_, i)=> i + 1);
//Array(5)
console.log(ar55);
console.log(Array.from(Array(5).keys())); //[ 0, 1, 2, 3, 4 ]
console.log((Array(5).fill().map((_, i) => i + 1)))
//[ 1, 2, 3, 4, 5 ]
// [...Array(5)].map((_,i) => i + 1);
// cf. Array(5).map((a,i) => i + 1);
// loop method(map, filter, forEach..)는 empty 제외!!
const ar5 = [ ... 'abcdef'];
console.log(ar5);
//[ 'a', 'b', 'c', 'd', 'e', 'f' ]
const ar6 = ['ab,cd'.split(',')];
console.log(ar6);
//[ [ 'ab', 'cd' ] ]
const ar7 = [...'ab,cd'.split(',')];
console.log(ar7);
//[ 'ab', 'cd' ] ...차이 

const stack = [];
stack.push(1); // stack = [...stack, 1]
stack.push(2); // length(2) 반환!
console.log(stack);
const curr = stack.pop();
console.log(curr); // pop된 요소(2) 반환!
console.log(stack);
console.log("---------------")
const queue = [];
queue.unshift(1); // q = [1, ...queue]
console.log(queue);
queue.unshift(2,3); // [2,3, ...queue]
console.log(queue);
const curr1 = queue.pop();
console.log(curr1);
console.log(queue);
console.log(queue.shift());
console.log(queue);
// const [, ...shifted] = queue;

console.log("---------------")
const aa = [1, 2, 3];
console.log(aa.join(', '));
aa[10] = 10; // [1, 2, 3, empty x 7, 10] 
                  // length = 11
console.log(aa);
aa['1'] = 22; // 숫자형 문자열도 허용!
                   // [1, 22, 3, empty x 7, 10] 
console.log(aa);
delete aa[2]; // [1, 22, empty x 8, 10]
console.log(aa);
aa['a'] = 'AAA'; // index가 이니라 property
console.log(aa);
aa.b = 'BBB';    // property 동적 추가
console.log(aa);
aa[2.3] = 23;
console.log(aa);
aa[-1] = -1;console.log(aa);
console.log(aa.length); // ?

const orr = [1, 2, 3, 2, 3];
for (const item of orr){console.log(item)};

for (const [idx,item] of orr.entries()) {
    console.log(idx,item);
}
orr.forEach((item,idx)=>console.log(idx,item));
const mret1=orr.map((item,idx)=>console.log(idx,item));

console.log(orr.some( (a, idx) => a === 1 )); // 하나라도 있으면 true
console.log(orr.some( a => a === 5 )); // false
console.log(orr.every( (a, idx) => a > 0 )); // true
console.log(orr.every( a => a % 2 === 0 )); // false
console.log(orr.find((item,idx)=>item===2));


const a78 = [7, 8];
const a88 = [1, 2, [...a78]];
console.log("a88",a88);//[ 1, 2, [ 7, 8 ] ]
const a99 = [1, 2, a78];
console.log(a99);//[ 1, 2, [ 7, 8 ] ]
a78[1] = 9;
console.log(a99);//[ 1, 2, [ 7, 9 ] ]
const arr2 = arr.concat([4, 5]);
console.log(arr2);
const arr3 = arr.concat(4, 5);
const arr4 = arr.concat(arr2);
const arr5 = [...arr, ...arr3];
arr.concat([5, 6, [7, 8]]);
arr.concat(5, 6, [7, 8]);


// sort() 또는 sort(cb)
// Unicode 정렬, cb: callback function

a5 = [1, 5, 4, 11, 7];
a5.sort(); // a5 = [1, 11, 4, 5, 7]
console.log(a5);
a5 = [1, 5, 4, 11, 7];
console.log(
    a5.sort((a,b)=>{
        console.log('a,b=',a,b,a-b);
        return a>b?1:-1;
    }));
a5.sort((a, b) => a - b); // [1, 4, 5, 7, 11]
//-4 1 -7 4
console.log("ㅇㅇㄹㅁㄴㅇ",a5);
a5.sort((a, b) => b - a); // [11, 7, 5, 4, 1]
console.log(a5);

a6 = ['Kim', 'Lee', 'Hong'];
a6.sort(); // a6 = ['Hong', 'Kim', 'Lee']
console.log(a6);
a6.sort((a, b) => b - a); // ?
console.log(a6);
a6.sort((a, b) => b > a); // ?
console.log(a6);
console.log("----------");
a6.sort((a, b) => b > a ? 1 : -1);
console.log(a6);
a6.sort((a, b) => b > a ? 1 : (b < a ? -1 : 0));
console.log(a6);
a6.sort().reverse();  // descending
console.log(a6);


const arr22 = [1, 2, 3, 4, 5];
// ex1) [2,3]을 추출            `
console.log(arr22.slice(1,3));
// ex2) [3]부터 모두 다 추출
console.log(arr22.slice(2));
// ex3) [2,3,4] 제거하기
console.log(arr22.splice(1,3));
console.log("제거후",arr22);
// ex4) 복원하기
arr22.splice(1, 0, 2, 3, 4);
console.log("복원",arr22);
// ex5) [3] 부터 끝까지 제거하기
arr22.splice(2);
console.log(arr22);
// ex6) 복원하기
arr22.splice(2, 0, 3, 4,5);
console.log("복원",arr22);
// ex7) [1,2, 'X', 'Y', 'Z', 4, 5] 만들기
arr22.splice(2, 1,'X', 'Y', 'Z');
console.log(arr22);

