const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const textBox = document.getElementById('text-box');
const voiceSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const main = document.getElementById('main');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
]

data.forEach(createBox);

// Create Text box
function createBox(item) {
  const { image, text } = item;
  const element = document.createElement('div');
  element.classList.add('box');
  element.innerHTML = `
    <img src="${image}" alt="${text}">
    <p class="info">${text}</p>
  `;

  // Box listener
  element.addEventListener('click', () => {
    setTextMsg(text);
    speakText();

    element.classList.add('active');
    setTimeout(() => element.classList.remove('active'), 800);
  })

  main.appendChild(element);  
}

// Init speech synth
const message = new SpeechSynthesisUtterance(); 

// Store Voices
let voices = [];

function setSpeech() {
  return new Promise(
    function (resolve, reject) {
      let synth = window.speechSynthesis;
      let id;

      id = setInterval(() => {
        if (synth.getVoices().length !== 0) {
          resolve(synth.getVoices());
          clearInterval(id);
        }
      }, 10);
    }
  )
}

let s = setSpeech();
s.then((voice) => {
  voices = voice;
  getTheVoices();
}); 

function getTheVoices() {
  voices.forEach(voice => {
    const { name, lang } = voice;
    const option = document.createElement('option');
    option.value = name;
    option.innerText = `${name} ${lang}`;
    voiceSelect.appendChild(option);
  })
}

// Set text
function setTextMsg(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Change voice
voiceSelect.addEventListener('change', (e) => {
  message.voice = voices.find(voice => voice.name === e.target.value);
});


speechSynthesis.addEventListener('voiceschanged', getTheVoices);

// Toggle the text box
toggleBtn.addEventListener('click', () => textBox.classList.toggle('show'));

// Close the text box
closeBtn.addEventListener('click', () => textBox.classList.remove('show'));

// Read the textarea word
readBtn.addEventListener('click', () => {
  setTextMsg(textarea.value);
  speakText();
})
