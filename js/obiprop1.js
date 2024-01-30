const user = {
    '': 1,
    ' ': 1,       // 'id': 1, '0y': 2 모두 OK!
    123: 1,       // user[123], user['123'] OK, but user.123 is SyntaxError!!   // user[12345], user[12345n], user['12345'] OK, but user['12345n'] is undefined!
    true: 1,      // OK  user[true]  user.true
    id: 2,
    [`name`]: 'Hong',  // But, `name`: 'Hong'은 SyntaxError: Unexpected template string!
    [Symbol()]: 'Hong',   // OK But, Symbol(): 'Hong'은 SyntaxError: Unexpected token ':'
    [`${new Date()}`]: 365,    // OK! 'Sun Jul …': 365
    'my-friends': ['Han', 'Kim'],
    getInfo: () => `${this.id}-${this.name}`,       // OK! But, this is not user!
    getInfo() { return `${this.id}-${this.name}`; }, // OK! getInfo의 최종 <f.o>
}
console.log("---------");
console.log(Object.keys(user), Object.keys(user).length); // keys & 15, Symbol은 제외!!

console.log(Reflect.ownKeys(user), Reflect.ownKeys(user).length); // keys & 16 (+Symbol)

user.addr = 'Seoul';   // ⇐⇒ user = {...user, addr: 'Seoul'}
console.log('addr' in user, user.hasOwnProperty('addr')); // true true
console.log('Ref.has>', Reflect.has(user, 'addr'));  // true
console.log('obj.getOwnPropSym>', Object.getOwnPropertySymbols(user)); // [ Symbol() ]


delete user.addr;    // ⇔ Reflect.deleteProperty(user, 'addr');
console.log('addr' in user); // false


user[`${user.id}'s name`] = `Mr. ${user.name}`;     // prop생성시 snapshot!!(id 변해도 고정)
console.log('user entries=', Object.entries(user)); // Symbol은 제외!!

function myEntries(obj) {
    const rets = []; //[[k,v],[k,v],...]
    for (let k of Reflect.ownKeys(obj)) {
        console.log(k);
        rets.push([k, obj[k]]);
    }
    return rets;
}
console.log(myEntries(user));
console.log("-----------------");

console.log(Object.getOwnPropertyDescriptor(user, 'id'));  // value, writable,
console.log(Object.getOwnPropertyDescriptors(user));  // enumerable(속성 노출 여부), configurable
//enumerable=false
Object.defineProperty(user, 'age', { value: 39, writable: false });
// age는 writable, enumerable, configurable 모두 false ⇒ Object.keys()에서 제외!
// Object.keys(user) vs Object.values(user) vs Object.entries(user)
console.log(Object.getOwnPropertyDescriptors(user));
const park = Object.fromEntries([['id', 7], ['nm', 'Park']]);
const emp = Object.assign({ 'id': 100 }, user);
//같은 키가 있을땐 덮어씌움, 뒤가 우선하니까 
console.log(emp);
console.log({ 'id': 100 }, { ...user });
//  vs  new Object(user) vs  Object.create(user)    ⇒ ⇒ ⇒
// Object의 생성자함수에 매개변수에 object를 주면 그대로 반환!!
Object.preventExtensions(user); // 추가, 삭제, 읽기, 쓰기, 재정의
Object.seal(user);              // 추가, 삭제, 읽기, 쓰기, 재정의
Object.freeze(user);            // 추가, 삭제, 읽기, 쓰기, 재정의 (enumerable외 모두 false)
// 주의) 값을 할당해도 오류는 없다. 단, 하위(중첩) 객체까지 동결(freeze)하지 못한다!
user['my-friends'][0] = 'Choi';

// 피보나치 수열을 memoization하여 출력하는 함수를 작성해 보세요.
// 수열의 규칙은 f(n) = f(n - 2) + f(n - 1)  (단, n <= 1 일 때 f(n) = n)
// 즉, 0 ~ 9까지의 값은 각각 [0, 1, 1, 2, 3, 5, 8, 13, 21, 34] 이다.



const fibonacci = memoized(function A(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (n === 2) return 1;
    if (n === 3) return 2;
    return fibonacci(n - 2) + fibonacci(n - 1);
});


function memoized(fn) { // 범용 memoization function
    const memoizedTable = {}; // {3: 3 * 2, 2: 2 * 1, 1: 1}
    return function B(k) {
        console.log(memoizedTable);
        return memoizedTable[k] || (memoizedTable[k] = fn(k));
    };
}

console.log(fibonacci(5)); //5
console.log(fibonacci(7));//13


const arr = [100, 200, 300, 400, 500, 600, 700];
// 배열의 인덱스 출력 1
for (const index in arr) {
    console.log('Index:', index);
}

// 배열의 값 출력 2
for (const value of arr) {
    console.log('Value:', value);
}

const obj = { name: 'lim', addr: 'Yongsan', level: 1, role: 9, receive: false };

// 3. for-in문을 사용하여 프로퍼티 이름(키)을 출력하시오.
for (const k in obj) {
    console.log('objkey:', k);
}
// 4. for-in문을 사용하여 프로퍼티 값을 출력하시오.
for (const k in obj) {
    console.log('objkey:', obj[k]);
}

// 5. for-of문을 사용하여 프로퍼티 값을 출력하시오.
function myEntries(obj) {
    for (let k of Reflect.ownKeys(obj)) {
        console.log(obj[k]);
    }
}
myEntries(obj);

for (const k in Object.keys(obj)) {
    console.log('objkey:', k);
}

// 6. level 프로퍼티가 열거(entries)되지 않도록 설정하시오.
//  // Object.defineProperty
console.log("----------------------")
console.log("전", Object.entries(obj));
Object.defineProperty(obj, 'level', { enumerable: false });
console.log("후", Object.entries(obj));
console.log("----------------------")
// 7. role 프로퍼티는 읽기전용으로 설정하시오. // Object.freeze
console.log(Object.entries(obj));
Object.defineProperty(obj, 'role', { writable: false });
obj.role = 'XXXXXXXX';
console.log(Object.entries(obj));

console.log("----------------------")
//[['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]] 배열을 객체로 만드시오. (makeObjectFromArray)
// ex1();

const orgArray = [
    ['A', 10, 20],
    ['B', 30, 40],
    ['C', 50, 60, 70],
];
function makeObjectFromArray(arr) {
    const retObj = {};
    for (const [k, ...v] of arr) {
        console.log(k, "ddd", v)
        retObj[k] = v;
    }
    return retObj;
}
function makeArrayFromObject(obj) {
    const retArr = [];
    for (const k in obj) {
        console.log(k);
        retArr.push([k, ...obj[k]]);
    }
    return retArr;
}
//[['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]] 배열을 객체로 만드시오. (makeObjectFromArray)

const newObj = makeObjectFromArray(orgArray);
console.log('🚀  newObj:', newObj);

console.log("----------------------")
//위에서 만든 객체를 다시 배열로 만드시오. (makeArrayFromObject)
const newArr = makeArrayFromObject(newObj);
console.log('🚀  newArr:', newArr);


console.log("----------------------")
//원시값(primitive)만을 갖는 객체 kim을 복사하는 프로그램을 Object의 클래스 메소드 또는 spread(...) 연산자를 사용하지 말고 작성하시오.

function ex3() {
    const kim = { nid: 3, nm: 'Hong', addr: 'Pusan' };

    function copyObject(obj) {
        const retObj = {};
        for (const k in obj) {
            console.log("----", k)
            retObj[k] = obj[k];
        }
        return retObj;
    }

    const newKim = copyObject(kim);
    console.log('🚀  copiedKim:', newKim);
    newKim.addr = 'Daegu';
    console.log(kim.addr, newKim.addr); //바뀜
    console.log(kim.addr !== newKim.addr); // true면 통과!
}
ex3();