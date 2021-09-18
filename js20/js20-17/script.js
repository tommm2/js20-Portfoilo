const rules = document.getElementById('rules')
const rules_btn = document.getElementById('rules-btn')
const close_btn = document.getElementById('close-btn')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const start_container = document.getElementById('start-container')
const start = document.getElementById('start')
const loser_container = document.getElementById('lose-container')
const play_again = document.getElementById('play-again')

let score = 0

const brickRowCount = 9
const brickColumnCount = 5

// Create ball props
const ball = {
  // x、y除2是要讓球在canvas的中心點
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 5,
  dy: -5
}

// Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0
}

// Create brick props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
}

// Create bricks
const bricks = []
for(let i = 0; i < brickRowCount; i++) {
  // 初始化bricks
  bricks[i] = []
  for(let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo }
  }
}

// Draw paddle on cavavs
function drawPaddle() {
  ctx.beginPath()
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
  ctx.fillStyle = '#0080FF'
  ctx.fill()
  ctx.closePath()
}
  
// Draw ball on canvas
function drawBall() {
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
  ctx.fillStyle = '#0080FF'
  ctx.fill()
  ctx.closePath()
}

// Draw score on canvas
function drawScore() {
  ctx.font = '20px Arial'
  ctx.fillText(`Score: ${score}`, canvas.width - 100 , 30)
}

// Draw bricks on canvas
function drawBricks() {
  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath()
      ctx.rect(brick.x, brick.y, brick.w, brick.h)
      ctx.fillStyle = brick.visible ? '#0080FF' : 'transparent'
      ctx.fill()
      ctx.closePath()
    })
  })
}

// Movie paddle on canvas
function moviePaddle() {
  // 增加移動的距離
  paddle.x += paddle.dx
  
  // 如果移動範圍x軸超過canvas右邊界線，把paddle X軸位置設成 (canvas 總寬度 - paddle的寬度)，沒減paddle會不見
  if(paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w
  }
  // 如果paddle超出canvas的左邊界線，將paddle x設成 0
  if(paddle.x < 0) {
    paddle.x = 0
  }
}

// Movie ball on canvas
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // 偵測左右邊界，如果撞到就反彈回來
  if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    // 這段是為了讓球球反彈
    ball.dx *= -1 
  }

  // 偵測上下邊界，如果撞到就反彈回來 
  if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1
  }

  // 撞到paddle後會反彈
  if(ball.x - ball.size > paddle.x &&
     ball.x + ball.size < paddle.x + paddle.w &&
     ball.y + ball.size > paddle.y
  ) {
      ball.dy = -ball.speed
  }

  // 撞到brick後會反彈，並且brick會消失
  bricks.forEach(column => {
    column.forEach(brick => {
      if(brick.visible) {
        if(
          ball.x - ball.size > brick.x &&  // brick左側檢查
          ball.x + ball.size < brick.x + brick.w && // brick右側檢查
          ball.y + ball.size > brick.y && // brick上側檢查
          ball.y - ball.size < brick.y + brick.h // brick下側檢查
        ) {
          ball.dy *= -1
          brick.visible = false
          increaseScore()
        }
      }
    })
  })

  // 如果撞到canvas底部就重新開始遊戲
  if(ball.y + ball.size > canvas.height) {
    loser_container.classList.add('show')
    score = 0
    showAllBricks()
  }
}

// Increase score
function increaseScore() {
  score++
  // 如果score除以 brickColumnCount * brickRowCount 的餘數等於0 將所有brick重製
  if(score % (brickColumnCount * brickRowCount) === 0) {
    document.querySelector('.lose-container>h2').innerText = 'You Win!'
    score = 0

    showAllBricks()
  }
}

// Show all bricks
function showAllBricks() {
  bricks.forEach(column => {
    column.forEach(brick => {
      brick.visible = true
    })
  })
}

// Draw everything
function draw() {
  // clear canvas 要把原本paddle在地位置的樣式去除掉，這樣在移動時才不會連成一條線
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()
  drawPaddle()
  drawScore()
  drawBricks()
}

// Update canvas drawing and animation
function update() {
  moviePaddle()
  moveBall()
  // Draw everything
  draw()

  requestAnimationFrame(update)
}

draw()

// Keydown event 這個是按住鍵盤後觸發
function keyDown(e) {
  if(e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed
  } else if(e.key === 'Left ' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed
  }
}

// KeyUp event 這個是按一次觸發一次
function keyUp(e) {
  // 將dx設成0，讓paddle可以在沒按住方向見的前況下停住(因為padddle.dx = 0)
  if(e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left ' || e.key === 'ArrowLeft') {
    paddle.dx = 0
  }
}

// Event Listener
rules_btn.addEventListener('click', () => { rules.classList.add('show') })
close_btn.addEventListener('click', () => { rules.classList.remove('show') })
play_again.addEventListener('click', () => {
  loser_container.classList.remove('show')
  score = 0
  showAllBricks()
})
start.addEventListener('click', () => {
  start_container.style.display = 'none'
  update()
})
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)
