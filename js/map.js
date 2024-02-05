const hong = { id: 1, name: 'Hong' };
console.log(hong); 
const map = new Map([  [1, 11], [2, 22]  ]);
console.log(map); 
map.set('three', 333);  // {three: 333, four: [1,2]}
map.set('four', [1, 2, 3, 4]);
map.set(hong.name, hong);
map.set(hong, hong.name);
console.log(map);  // Map(6) {  1 => 11, 2 => 22, 'three' => 333, 'four' => [ 1, 2, 3, 4 ],        ?, ?}
console.log(map.get(hong));  // 'Hong'
map.delete(hong);
console.log((map.has(hong)));   // ?
map.has(hong.name); // ?
console.log((map.has(hong.name)));
map.clear();
console.log(map); 

map.set(1, 11).set(2, 22).set(3, 33);    // ⇐⇒ new Map([[1, 11], [2, 22], [3, 33]); 
console.log(map); 
console.log(map.entries());
console.log(map.keys());
console.log(map.values()); // { [ 1, 11 ], [ 2, 22 ], … };  { 1, 2, … };  { 11, 22, … }
const map2 = new Map([...map])           // Map(2) { 1 => 11, 2 => 22, 3 => 33 }
console.log(map2);
console.log(map); 
const map3 = new Map([...map, ...map2])  // Map(2) { 1 => 11, 2 => 22, 3 => 33 }
console.log(map3);


// 다음과 같이 부서와 직원 객체가 있을 때, deptMap과 empDept를 만들고,  개발팀 직원 이름 목록을 출력하시오. (key: id)
const hrTeam = {id: 1, dname: '인사팀'};
const devTeam = {id: 2, dname: '개발팀'};
const depts = [ hrTeam, devTeam ];
const hongs = {id: 1, name: 'Hong', dept: 1};
const kims = {id: 2, name: 'Kim', dept: 2};
const emps = [ hongs, kims, {id:3, name: 'Park', dept: 2}, {id: 4, name: 'Choi', dept: 2} ];
const deptMap=new Map ([[1,hrTeam],[2,devTeam]]);
const empMap=new Map  ([[1,hongs],[2,kims]]);
const empDept=new Map  ();
console.log(deptMap); // Map(2) { 1 => { id: 1, dname: '인사팀' }, 2 => { id: 2, dname: '개발팀' } }  ⇐ deptMap.get(2)
console.log(empMap); // Map(2) { 1 => {id: 1, name: 'Hong', dept: 1}, 2 => {id: 2, name: 'Kim', dept: 2}, … }
console.log(empDept); // Map(4) { { id: 1, name: 'Hong' } => { id: 1, dname: '인사팀' }, { id: 2, name: 'Kim' } => { id: 2, dname: '개발팀' }, { id: 3, name: 'Park' } => { id: 2, dname: '개발팀' }, { id: 4, name: 'Choi' } => { id: 2, dname: '개발팀' } }

// console.log(empDept.get(kims).dname); // '개발팀'

//이전 Array.prototype에 Set을 이용하여 uniqBy() 함수도 추가하시오.
Array.prototype.uniqBy = function(prop) { 
}
const hong1 = {id: 1, name: 'Hong', dept: 'HR'};
const kim1 = {id: 2, name: 'Kim', dept: 'Server'};
const lee = {id: 3, name: 'Lee', dept: 'Front'};
const park = {id: 4, name: 'Park', dept: 'HR'};
const ko = {id: 7, name: 'Ko', dept: 'Server'};
const loon = {id: 6, name: 'Loon', dept: 'Sales'};
const choi = {id: 5, name: 'Choi', dept: 'Front'};
const users = [ hong1, kim1, lee, park, ko, loon, choi ];
users.uniqBy('dept'); // [ 'HR', 'Server', 'Front', 'Sales' ]