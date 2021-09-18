const addUserBtn = document.getElementById('add_user');
const dobuleBtn = document.getElementById('double');
const showMillionBtn = document.getElementById('show_million');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate');
const deleteBtn = document.getElementById('delete');
const main = document.getElementById('main');

let data = [];
let inverseClick = false;

// Fetch api 
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }
  addData(newUser);
}

//Double user money
function doubleMoney(){
  data = data.map(user => {
    return { ...user, money: user.money *　2};
  })
  updateDOM();
}

//Show Millionaries
function showMillionUser() {
  data = data.filter(item => item.money > 1000000)
  updateDOM();
}

// Sort user
function sortByUser(){
  inverseClick = !inverseClick;
  data.sort((a, b) => {
    return (!inverseClick ? b.money - a.money : a.money - b.money);
  })
  updateDOM();
}

// Calculate total Money
function calculateMoney() {
  
  const wealth = data.reduce((acc, user) => (acc += user.money), 0)
  const elememt = document.createElement('span');
  elememt.classList.add('total');
  elememt.innerHTML = `<h3>Total : <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(elememt);
}

// Add obj to data
function addData(obj){
  data.push(obj);
  updateDOM()
}

// Updata DOM
function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
    main.appendChild(element);
  })
}

// Format money
function formatMoney(money) {
  return '$ ' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Delete User
function deleteUser() {
  data = [];
  updateDOM();
}

// Event listener
addUserBtn.addEventListener('click', getRandomUser);
deleteBtn.addEventListener('click', deleteUser);
dobuleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByUser);
showMillionBtn.addEventListener('click', showMillionUser);
calculateBtn.addEventListener('click', calculateMoney);
