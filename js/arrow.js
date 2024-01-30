//화살표함수 
function f(a){
    return a**2;
} //functiont 테이블에만 등록 , 전역. 얘는 블록 스코프를 뚫고 올라감 
const f3 = a => a**2;
//declaritive 에만 잡힘. 이 블록 스코프에서만 쓸 수 있음. 
//functiont 테이블에만 등록필요없으면 화살표 함수로 사용하면 됨 
console.log(f(3))
console.log(f3(3))


const af2=(a,b)=>{
    const c=a**2;
    return Math.sqrt(c);
}
console.log(af2(4,2));