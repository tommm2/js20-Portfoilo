const msgEl = document.getElementById('msg')
const randomNumber = getRandomNumber()

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new window.SpeechRecognition()

// Start recognition and game
recognition.start()

// Capture recognition and game
function onSpeak(e) {
  const msg = e.results[0][0].transcript

  writeMessage(msg)
  checkNumber(msg)
}

// Write what ueer speak
function writeMessage(msg) {
  msgEl.innerHTML = `
  <div>You Said:</div>
  <span class="box">${msg}</span>
  `
}

// Check msg is number or not
function checkNumber(msg) {
  const num = +msg

  if(Number.isNaN(num)) {
    msgEl.innerHTML = `
      <span class="box">${msg}</span>
      <div>This is not a number</div>
    `
  }

  if(num < 1 || num > 100) {
    msgEl.innerHTML += `
    <div>Number must between 1 and 100</div>
    `
    return
  }
  if(num > randomNumber) {
    msgEl.innerHTML += `
    <div>TOO HIGH</div>
    `
  } else if(num < randomNumber) {
    msgEl.innerHTML += `
    <div>TOO LOW</div>
    `
  } else if(num === randomNumber) {
    msgEl.innerHTML += `
    <div>Congratulation，the number is ${num}</div>
    <button class="play-again" id="play-again">Play again</button>
    `
  }
 
}

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1
}

// Speak result
recognition.addEventListener('result', onSpeak)

// when recongition is end, triggle start event
recognition.addEventListener('end', () => recognition.start())
document.body.addEventListener('click', e => {
  if(e.target.id === 'play-again') {
    window.location.reload()
  }
})
