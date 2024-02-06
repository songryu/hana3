const lis = document.querySelectorAll('ul.subjects li');

const selectedDiv = document.querySelector('.selected');
console.log(selectedDiv);
const setSelectedSubjects = () => {
  const selectedSubject = [...lis]
    .filter(li => li.classList.contains('active'))
    .map(li => li.textContent);
  console.log('🚀  selectedSubject:', selectedSubject);
  if (selectedSubject?.length) {
    selectedDiv.innerHTML = selectedSubject.join('<br>');
    selectedDiv.classList.remove('hide');
    selectedDiv.classList.add('show');
  }
};

const selectSubject = evt => {
  const li = evt.currentTarget;
  console.log('🚀  li:', li);
  li.classList.toggle('active');

  setSelectedSubjects();
};
lis.forEach(li => li.addEventListener('click', selectSubject));

const users = [
    { id: 1, name: '홍길동', tel: '01088889991', addr: '서울' },
    { id: 2, name: '김길동', tel: '01088889992', addr: '부산' },
    { id: 3, name: '이길동', tel: '01088889993', addr: '서울' },
    { id: 4, name: '박길동', tel: '01088889994', addr: '서울' },
  ];
  

  const userTable = document.getElementById('userTableBody');
  
  // Iterate through the users array and dynamically create table rows
  users.forEach(user => {
    const row = userTable.insertRow('tr');
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.tel}</td>
      <td>${user.addr}</td>`});



  
  
  
  
  
  