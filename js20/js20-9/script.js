const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const form = document.getElementById('form');
const delBtn = document.getElementById('delete-btn');
const hint = document.getElementById('hint-message');

let transcations = JSON.parse(localStorage.getItem('transcation'));

// Update balance, income and expense
function updateValues() {
  const amountArr = transcations.map(item => item.amount);
  
  // Update total
  const total = amountArr.reduce((acc, item) => (acc += item), 0).toFixed(2);
  
  // Update income
  const income = amountArr
  .filter(item => item > 0)
  .reduce((acc, item) => (acc += item), 0)
  .toFixed(2);

  // Update expense
  const expense = amountArr
  .filter(item => item < 0)
  .reduce((acc, item) => (acc += item), 0)
  .toFixed(2);
  
  balance.innerText = `$${total}`;
  moneyPlus.innerText= `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}

// Add new transcation
function addNewTranscation(e) {
  e.preventDefault();
  if(text.value.trim() === '' || amount.value.trim() === '') {
    alert('Plese make sure text and amount are not empty');
  } else {
    const transcationObj = {
      id: Math.floor(Math.random() * 1000000),
      text: text.value,
      amount: Number(amount.value),
    }
    transcations.push(transcationObj);
    showHint(transcationObj);
    localStorage.setItem('transcation', JSON.stringify(transcations));
    initDom();
  }
}

// show the hint
function showHint(item) {
  hint.innerText = `You add the ${item.text} - $${item.amount}`;
  hint.classList.add('show');
  setTimeout(()=> {
    hint.classList.remove('show')
  },3000);
}

// Delete transcation
function removeTranscation(id) {
  transcations = transcations.filter(item => item.id !== id);
  localStorage.setItem('transcation', JSON.stringify(transcations));
  initDom();
}

// Add the DOM
function addTranscationsDom(transcations) {
  // Get the sign
  const sign = transcations.amount < 0 ? '-' : '+';

  const element = document.createElement('li');
  
  // Add the different class
  if(transcations.amount < 0) {
    element.classList.add('minus');
  } else {
    element.classList.add('plus');
  }

  element.innerHTML = `
    ${transcations.text} <span>${sign}${Math.abs(transcations.amount)}</span>
    <button id="delete-btn" class="delete-btn" onclick="removeTranscation(${transcations.id})">x</button>
  `;

  list.appendChild(element);
}

// Init app
function initDom() {
  list.innerHTML = '';
  transcations.forEach(addTranscationsDom);
  updateValues();
}

initDom();

// Event listeners
form.addEventListener('submit', addNewTranscation);
