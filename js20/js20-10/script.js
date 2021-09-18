const musicContaienr = document.getElementById('music-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const audio = document.getElementById('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const timestamp = document.getElementById('timestamp');

const songs = ['jazz', 'piano', 'drum'];
let songIndex = 0;

loadSong(songs[songIndex]);

// Update song details
function loadSong(item) {
  title.innerText = item;
  audio.src = `./mp3/${item}.mp3`;
  cover.src = `./img/${item}.jpg`;
}

// Play Song
function playedSong() {
  musicContaienr.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause Song
function pausedSong() {
  musicContaienr.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
}

// Next song 
function nextSong() {
  songIndex++;
  // 如果songIndex 的值 > songs裡的值 把songIndex歸零
  if(songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playedSong();
}

// Prev song
function prevSong() {
  songIndex--;

  if(songIndex < 0) {
    songIndex = songs.length - 1 ;
  }
  loadSong(songs[songIndex]);
  playedSong();
}

// Update progress
function updateProgress(e) {
  const { duration, currentTime} = e.srcElement;
  const time = (currentTime / duration) * 100;
  // 更新progress的進度
  progress.style.width = `${time}%`;

  let mins = Math.floor(audio.currentTime / 60 );
  if(mins < 10) {
    mins = '0' + String(mins)
  }

  let secs = Math.floor(audio.currentTime % 60)
  if(secs < 10) {
    secs = '0' + String(secs);
  }

  timestamp.innerText = `${mins}:${secs}`;
}

// Set progress time
function setProgress(e) {
  // 表示元素的內部寬度，這邊的this就是 progress-container
  const width = this.clientWidth;
  // 指滑鼠到外層容器的距離
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;

}

// Event lisitener
playBtn.addEventListener('click', () => {
  const isPlaying = musicContaienr.classList.contains('play');

  if(isPlaying) {
    pausedSong();
  } else {
    playedSong();
  }
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
// Click om progress bar
progressContainer.addEventListener('click', setProgress);
