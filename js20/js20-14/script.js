const clearBtn = document.getElementById('clear')
const showBtn = document.getElementById('show')
const cardsContainer = document.getElementById('cards-container')
const addContainer = document.getElementById('add-container')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const current = document.getElementById('current')
const hideBtn = document.getElementById('hide')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer')
const addCardBtn = document.getElementById('add-card')

// Keep track of current page
let currentActiveCard = 0

// Store DOM cards
const cardsEl = []

// Store card data
const cardsData = JSON.parse(localStorage.getItem('cardsData')) === null ? [] : JSON.parse(localStorage.getItem('cardsData'))

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createSingleCard(data, index))
}

// Create Single card
function createSingleCard(data, index) {
  const cardElement = document.createElement('div')
  cardElement.classList.add('card')
  
  if(index === 0) {
    cardElement.classList.add('active')
  }

  cardElement.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${data.question}</p>
      </div>
      <div class="inner-card-back">
        ${data.answer}
      </div>
    </div>
  `
  
  cardElement.addEventListener('click', () => cardElement.classList.toggle('show-answer'))

  // Add to DOM card
  cardsEl.push(cardElement)

  cardsContainer.appendChild(cardElement)
}

// Show current of text
function UpdateCurrentText() {
  if(cardsData.length === 0) {
    current.innerText = ''
  } else {
    current.innerText = `${currentActiveCard + 1}/${cardsData.length}`
  }
}

UpdateCurrentText()
createCards()

// Event listener
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left'

  currentActiveCard++;

  if(currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1
  }
  
  cardsEl[currentActiveCard].className = 'card active'
  UpdateCurrentText()
})

prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right'

  currentActiveCard--;

  if(currentActiveCard < 0) {
    currentActiveCard = 0
  }
  cardsEl[currentActiveCard].className = 'card active'
  UpdateCurrentText();
})

showBtn.addEventListener('click', () => addContainer.classList.add('show'))

hideBtn.addEventListener('click', () => addContainer.classList.remove('show'))

addCardBtn.addEventListener('click', () => {
  const question = questionEl.value
  const answer = answerEl.value

  if(question.trim() && answer.trim()) {
    const cardData = { question, answer }
    cardsData.push(cardData)
    localStorage.setItem('cardsData', JSON.stringify(cardsData))

    questionEl.value = ''
    answerEl.value = ''

    addContainer.classList.remove('show')
    window.location.reload()
  }
})

clearBtn.addEventListener('click', () => {
  localStorage.clear()
  cardsContainer.innerHTML = ''
  current.innerText = ''
  
  window.location.reload()
})
