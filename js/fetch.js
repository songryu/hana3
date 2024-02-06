// under node v18
// import fetch from 'node-fetch';     // browser에서는 생략(자체제공) 
// npm i node-fetch                                     // node> npm i node-fetch

const sampleUrl = 'https://jsonplaceholder.typicode.com/users/1';
// const isAsyncAwait=true;
// if (isAsyncAwait) {
//     const res= await fetch(sampleUrl);
//     const data= await res.json();
//     console.log(data);
// }
// else{
//     fetch(sampleUrl)
//     .then(res=>res.json())
//     .then(data=>console.log('data>>',data));
// }

// const myFetch = url => fetch(url).then(res => res.json());

// // myFetch를 이용하는 코드
// myFetch(sampleUrl).then(user => {
//   console.log('user>>>', user);
// });
const promiFetch=url=>new Promise
((resolve,reject)=>{});
//Promise를 리턴하니까 await해야함. resolve가 주는 값을 받을 수가 있음
const asyncFetch=async url=>{
    const res=await fetch(url);
    return await res.json();
};
// const data1=await promiFetch(sampleUrl);
// const data2=await asyncFetch(sampleUrl);
// console.log("data1",data1);
// console.log("data2",data2);

// const rets=[sampleUrl,sampleUrl2].map(async url=>{
//     const res=await fetch(url);
//     const data=await res.json(url);
//     return data;
// })



//exam
const f = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  
    if (!res.ok) throw new Error("Failt to Fetch!!");
  
    // 2초 sleep
  await new Promise(resolve => setTimeout(resolve, 2000));

  // resolve 실행 프로미스 then 이 됐다. then == await 
  // 프로미스의 then을 await로 표현했다
  const data = await res.json();

  return data.name;
  };
  
//   console.log(await f());

  //리백토링

//   setTimeout( function() {
//     console.log('depth1', new Date());
//     setTimeout( function() {
//       console.log('depth2', new Date());
//       setTimeout( function() {
//         console.log('depth3', new Date());
//         throw new Error('Already 3-depth!!');
//       }, 3000 );
//     }, 2000);
//   }, 1000);
  
  
//   console.log('START!', new Date());

const depthTime=depth=>new Promise((resolve,reject)=>
{
    setTimeout(()=>{
        console.log('depth'+depth,new Date());
       
        if (depth>=3) reject (
            new Error ('Already 3-depth!!'));
        
            resolve(depth+1);
        },depth*1000)
    });
try{
    const r1=depthTime(1);
    const r2= depthTime(2);
    const r3= depthTime(3);
}catch(err){
console.error(err);
}


depthTime(1).then(console.log);


  console.log('START!', new Date());


  const examurl = 'https://jsonplaceholder.typicode.com/posts?userId=1';
  const myFetch = url => fetch(url).then(res => res.json());

// // myFetch를 이용하는 코드
myFetch(examurl).then(userId => {
    console.log('userId>>>', userId);
    const arr =userId;
});
console.log(arr[0])