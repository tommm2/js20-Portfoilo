const settingBtn = document.getElementById('settings-btn');
const settingForm = document.getElementById('settings-form');
const settings = document.getElementById('settings');
const select =  document.getElementById('difficulty');
const word =  document.getElementById('word');
const inputText = document.getElementById('text');
const timeEl =  document.getElementById('time');
const scoreEl = document.getElementById('score');
const endGameContainer = document.getElementById('end-game-container');

let words = [];

// Init random word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// time SetInterval
let timeInterval = setInterval(updateTime, 1000);

// Init difficult
let difficulty = localStorage.getItem('difficulty') ? localStorage.getItem('difficulty') : 'medium';

select.value = localStorage.getItem('difficulty') ? localStorage.getItem('difficulty') : 'medium';

// start foucs
inputText.focus();

// Generate random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add random word to DOM
function addToDom() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

// Update Score
function updateScore() {
  score++;
  scoreEl.innerText = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerText = time + 's';

  if(time === 0 ) {
    clearInterval(timeInterval);
    endGameContainer.style.display = 'flex';
    gameOver();
  }
}

// Show end screen
function gameOver() {
  endGameContainer.innerHTML = `
    <h1>Time ran out !</h1>
    <p> your score is ${score}</p>
    <button class="reload" onclick="location.reload()">Reload</button>
  `
}

// Fetch api to get 20 words and push in the array
fetch('https://random-word-api.herokuapp.com/word?number=20')
.then(res => res.json())
.then(data => {
  for(let i = 0; i < 20; i++) {
    words.push(data[i]);
  }
  addToDom();
});


// Event Listener
inputText.addEventListener('input', e => {
  if(e.target.value === randomWord) {
    addToDom();
    updateScore();

    if(difficulty === 'easy') {
      time += 6;
    } else if(difficulty === 'medium') {
      time += 4;
    } else {
      time += 2;
    }
    updateTime();
    // clear
    text.value = '';
  }
})

select.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
})

settingBtn.addEventListener('click', () => {
  settings.classList.toggle('hide')
})
