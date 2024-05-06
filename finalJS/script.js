class Button {
  constructor(color, text, velX, velY) {
      const buttonSize = 100;
      this.x = Math.random() * (document.body.clientWidth - buttonSize);
      this.y = Math.random() * (document.body.clientHeight - buttonSize);
      this.velX = velX;
      this.velY = velY;
      this.color = color;
      this.text = text;
      this.width = buttonSize;
      this.height = buttonSize;
  }

  draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
  }

  update(document) {
      if (this.x + this.width >= document.body.clientWidth || this.x <= 0) {
          this.velX = -this.velX;
      }
      if (this.y + this.height >= document.body.clientHeight || this.y <= 0) {
          this.velY = -this.velY;
      }
      this.x += this.velX;
      this.y += this.velY;
  }

  isMouseOver(mouseX, mouseY) {
      return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const buttons = [
  new Button("#ff0000", "Increase", 5, 5),
  new Button("#0000ff", "Decrease", -5, -5)
];

let missedClicksCount = 0;
const missedClicksLimit = 3;
let currentVolume = 50;

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  buttons.forEach(button => {
      button.draw(ctx);
      button.update(document);
  });
  requestAnimationFrame(loop);
}

loop();

canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  let clicked = false;

  buttons.forEach(button => {
      if (button.isMouseOver(mouseX, mouseY)) {
          clicked = true;
          adjustVolume(button.text === "Increase");
          return;
      }
  });

  if (!clicked) {
      missedClicksCount++;
      if (missedClicksCount >= missedClicksLimit) {
          gameOver();
      }
  }
});

function adjustVolume(increase) {
  const volumeChange = Math.floor(Math.random() * 21) + 10 * (increase ? 1 : -1);
  currentVolume = Math.max(0, Math.min(100, currentVolume + volumeChange));
  alert((increase ? "Increased" : "Decreased") + " volume by " + Math.abs(volumeChange) + ". New volume: " + currentVolume + "!");
}

function gameOver() {
  document.getElementById('overlay').style.display = 'block';
  setTimeout(function () {
      document.getElementById('overlay').style.display = 'none';
      alert("You gotta be quicker!");
      resetGame();
  }, 2000);
}

function resetGame() {
  missedClicksCount = 0;
}
