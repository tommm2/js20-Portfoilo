const projectLink = document.querySelectorAll('.project-info > a')
const projectContainer = document.getElementById('project-container')
const goTop = document.getElementById('go-top')
const audioToggler = document.getElementById('audio-toggler')
const audio = document.getElementById('audio')
const timeContainer = document.getElementById('time-container')
const time = document.getElementById('time')

let data = []

// set audio volume
audio.volume = 0.4

// Set date
function setDate() {
  var d = new Date();
  var t = d.toLocaleString();
  time.innerHTML = t;
}

setInterval(() => {
  setDate()
}, 1000)

// store image 、 link data
function storeData() {
  for(let i = 1; i <= 20; i++) {
    let prop = {
      demo: `https://tommm2.github.io/js20-${i}/`,
      github: `https://github.com/tommm2/js20-${i}`,
      img: `./images/js20-${i}.JPG`
    }
    data.push(prop)
  }
}

// Paused Song
function pauseSong() {
  audioToggler.classList.add('pause')
  audio.pause()
}

// Play Song
function playSong() {
  audioToggler.classList.remove('pause')
  audio.play()
}

// Updata DOM 
function updateDOM() {
  data.forEach((item, index) => {
    const project = document.createElement('div')
    project.setAttribute('class', 'project')
    if(index === 14) {
      project.style.backgroundImage = 'url("./images/no-provide.jpg")'
      project.innerHTML = `
        <div class="no-provide"><span>暫時沒做</span></div>
      `
    } else {
      project.style.backgroundImage = `url('${item.img}')`
      project.innerHTML = `
        <div class="project-info" onclick="">
          <a href="${item.github}" target="_blank">Github</a>
          <a href="${item.demo}" target="_blank">Demo</a>
        </div>
      `
    }
    projectContainer.appendChild(project)
  })
}

storeData()
updateDOM()

// Event listener
window.addEventListener('scroll', () => {
  const { scrollTop } = document.documentElement;
  if(scrollTop > 200) {
    goTop.classList.add('show');
  } else {
    goTop.classList.remove('show')
  }
})

goTop.addEventListener('click', () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
})

audioToggler.addEventListener('click', () => {
  const isPause = audioToggler.classList.contains('pause')
  if(isPause) {
    playSong()
  } else {
    pauseSong()
  }
})

timeContainer.addEventListener('click', () => {
  timeContainer.classList.toggle('hide')
})
