const buttonSize = 100;
const buttonVelocityX = 5; 
const buttonVelocityY = 5; 
const maxLives = 3; 

let currentVolume = 50;
let lives = maxLives;

class Button {
  constructor(color, text, velX, velY) {
    this.x = Math.random() * (document.body.clientWidth - buttonSize);
    this.y = Math.random() * (document.body.clientHeight - buttonSize);
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.text = text;
    this.width = buttonSize;
    this.height = buttonSize;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 20px Arial"; 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
  }

  update() {
    if (
      this.x + this.width >= document.body.clientWidth ||
      this.x <= 0
    ) {
      this.velX = -this.velX;
    }
    if (
      this.y + this.height >= document.body.clientHeight ||
      this.y <= 0
    ) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  isMouseOver(mouseX, mouseY) {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    );
  }
}


const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false; 

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);


const buttons = [];

const increaseVolumeBtn = new Button("#ff0000", "Increase", buttonVelocityX, buttonVelocityY);
const decreaseVolumeBtn = new Button("#0000ff", "Decrease", -buttonVelocityX, -buttonVelocityY);

buttons.push(increaseVolumeBtn, decreaseVolumeBtn);

function loop() {
  ctx.clearRect(0, 0, width, height);

  for (const button of buttons) {
    button.draw();
    button.update();
  }

  requestAnimationFrame(loop);
}

loop();

canvas.addEventListener("click", function (event) {
  var mouseX = event.clientX;
  var mouseY = event.clientY;
  let clicked = false;

  for (const button of buttons) {
    if (button.isMouseOver(mouseX, mouseY)) {
      clicked = true;
      adjustVolume(button.text === "Increase");
      break;
    }
  }

  if (!clicked) {
    loseLifeIfApplicable(); 
  }
});

function adjustVolume(increase) {
  var volumeChange = Math.floor(Math.random() * 21) + 10;

  if (!increase) {
    volumeChange *= -1;
  }

  var newVolume = Math.max(0, Math.min(100, currentVolume + volumeChange));

  currentVolume = newVolume;

  alert(
    (increase ? "Increased" : "Decreased") +
    " volume by " +
    Math.abs(volumeChange) +
    ". New volume: " +
    newVolume +
    "!"
  );
}

function loseLifeIfApplicable() {
  lives--;
  if (lives === 0) {
    gameOver();
  } else {
    updateLivesDisplay();
  }
}

function gameOver() {
  alert("Game over!");
  resetGame();
}

function resetGame() {
  lives = maxLives;
  updateLivesDisplay();
}

function updateLivesDisplay() {
  
  
}


function gameOver() {
  document.getElementById('overlay').style.display = 'block'; 
  setTimeout(function() {
    document.getElementById('overlay').style.display = 'none'; 
    alert("You gotta be quicker!");
    resetGame();
  }, 2000);
}








