const user = { id: 1, name: 'P', age: 33 };
const { name: n, age = 30 } = { name: 'Lee' }

const fn = ({ age }) => age;
const { age2: age3 = fn(user) } = { age22: 20 };
//age2=30,age3=33
function f(a, b, ...c) {
    console.log('a:', [...arguments]);
    for (const x of c) {
        console.log('ccc>>', x)
    }
}
f(1, 2, 3, 4);
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
for (let i of arr) {
    console.log(i);
    if (i > 5) break;
    console.log(i);
}

for (let i = 0.1; i < 1; i = i + 0.1) {
    console.log(i.toFixed(1));
    //console.log(+i.toFixed(1));
}

function addPoints(a, b) {
    const aD = (a.toString().split('.')[1] || '').length;
    const bD = (b.toString().split('.')[1] || '').length;
    const maxDecimals = Math.max(aD, bD);
    
    const alen=a.toString().length;
    const blen=b.toString().length;
    const len=alen>blen?alen:blen;

    console.log(+(a+b).toFixed(len-2));
    console.log(parseFloat((a + b).toFixed(maxDecimals)));
}
//parseFloat : 문자열을 실수로 바꿈 
addPoints(0.21354, 0.1) 


//다음 user 객체에서 passwd 프로퍼티를 제외한 데이터를 userInfo 라는 변수에 할당하시오.
const user1 = {id: 1, name: 'Hong', passwd: 'xxx', addr: 'Seoul'}
const { passwd, ...userInfo } = user;
console.log(userInfo); 
// 출력결과: {id: 1, name: 'Hong', addr: 'Seoul'}

//다음 arr에서 3개의 id를 id1, id2, id3로 할당하시오. 
const arr1 = [[{id: 1}], [{id:2}, {id:3}]]
const id1 = arr1[0][0].id;
const id2 = arr1[1][0].id;
const id3 = arr1[1][1].id;
console.log(id1,id2,id3); 
// 출력결과: 1 2 3
