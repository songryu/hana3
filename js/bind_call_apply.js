function f(id){
    console.log(this,id,this.name)
}
const obj ={name:'Hong'};
const bf=f.bind (obj);
bf(1);
bf(3,'song');

//array 의 a
//call은 하나씩 따로줌