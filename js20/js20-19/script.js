const draggable_list = document.getElementById('draggable-list')
const check = document.getElementById('check')

const richestPeople = [
  'Bill Gates',
  'Jeff Bezos',
  'Wareen Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Micheal Bloomberg',
  'Larry Page'
]

// Store list items
const listItems = []

let dragStartIndex;
createList()

// Create people to the list
function createList() {
  [...richestPeople]
  .map(item => ({ value: item, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(item => item.value)
  .forEach((person, index) => {
    const element = document.createElement('li');
    element.setAttribute('data-index', index)
    element.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="drag-info" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `
    listItems.push(element)
    draggable_list.appendChild(element)
  })
  addEventListeners()
}

function dragStart() {
  // Element.closest() 匹配特定選擇器且離當前元素元素最近的父元素（也可以是当前元素本身）。如果匹配不到，则返回 null。
  dragStartIndex = +this.closest('li').getAttribute('data-index')
}

function dragEnter() {
  this.classList.add('over')
}

function dragLeave() {
  this.classList.remove('over')
}

function dragOver(e) {
  e.preventDefault();
  
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index')
  swapItems(dragStartIndex, dragEndIndex)

  this.classList.remove('over')
}

// 將抓起的位置與放下的位置對調
function swapItems(startIndex, endIndex) {
  const itemStart = listItems[startIndex].querySelector('.drag-info')
  const itemEnd = listItems[endIndex].querySelector('.drag-info')
  
  listItems[startIndex].appendChild(itemEnd)
  listItems[endIndex].appendChild(itemStart)
}

function checkOrder() {
  listItems.forEach((item, index) => {
    const personName = item.querySelector('.drag-info').innerText.trim()
    if(personName !== richestPeople[index]) {
      item.classList.add('wrong')
    } else {
      item.classList.remove('wrong')
      item.classList.add('right')
    }
  })
}

function addEventListeners() {
  const drag_info = document.querySelectorAll('.drag-info')
  const dragListItems = document.querySelectorAll('.draggable-list li')

  drag_info.forEach(drag => {
    drag.addEventListener('dragstart', dragStart)
  })

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver)
    item.addEventListener('drop', dragDrop)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave',dragLeave)
  })
}

check.addEventListener('click', checkOrder)
