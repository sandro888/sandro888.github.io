let canvas = document.getElementById('snakeCanvas');
let ctx = canvas.getContext('2d');
let style = canvas.style;
const planet = new Image();
const rocket = new Image();
planet.src = 'css/anon.png';
rocket.src = 'css/ro.png'
style.marginLeft = "auto";
style.marginRight = "auto";
let parentStyle = canvas.parentElement.style;
parentStyle.textAlign = "center";
parentStyle.width = "100%";
let width = canvas.width;
let height = canvas.height;
let S = 20;           // square of one grid block
let score = 0;
let speed = 100;                     // snake  speed frame/per/second. 
let nextFrame = 0;
let snakeSize = 1;
let numberOfFoods = 1;

function changeFoodAmount()
{
  numberOfFoods = document.getElementById('food').value;
  
  console.log(numberOfFoods);
}





// by this fucntion player can determine speed/LVL of snake
function speedPick() {
  document.addEventListener("keyup", keyFunction);
  let novice = document.getElementById('novice')
  let inter = document.getElementById('inter')
  let ex = document.getElementById('ex')

  novice.addEventListener("click", Novice)
  function Novice() {
    if (novice) {
      speed = speed + 80;

    }
    novice.removeEventListener("click", Novice)
    inter.removeEventListener("click", Inter)
    ex.removeEventListener("click", Ex)

  }


  inter.addEventListener("click", Inter)
  function Inter() {
    if (inter) {
      speed = speed - 10;
    }
    novice.removeEventListener("click", Novice)
    inter.removeEventListener("click", Inter)
    ex.removeEventListener("click", Ex)
  }

  ex.addEventListener("click", Ex)
  function Ex() {
    if (ex) {
      speed = speed - 40;
    }
    novice.removeEventListener("click", Novice)
    inter.removeEventListener("click", Inter)
    ex.removeEventListener("click", Ex)
  }


}
speedPick();
function changeSize() {
  canvas = document.getElementById("snakeCanvas");
  this.line = document.getElementById("width").value;
  this.cols = document.getElementById("height").value;
  window.cnv = null;
  // resize the canvas
  canvas.width = line;
  canvas.height = cols;
  canvas.style.border = " 4px solid rgb(167, 157, 157)";
  width = canvas.width;
  height = canvas.height;
  if(height >400){
   canvas.height = 400
  }
  if(height <200){
   canvas.height = 200
  }
  if(width >600 ){
   canvas.width = 600
  }
  if(width <200 ){
   canvas.width = 200

  }
  width = canvas.width;
  height = canvas.height;
  

  localStorage.getItem("boards width", "board height");
  localStorage.setItem("boards widht", width);
  localStorage.setItem("boards height", height);
  if (canvas.getContext) {
    window.cnv = canvas.getContext("2d");
    dcanvas();
  }
  function dcanvas() {
    cnv.strokeStyle = "olive";
    // put the text in the canvas
  }


};
// by arrow keys changing snkaes direction
function keyFunction(event) {
  console.log("snake x: " + snake.board[0].x + ", y: " + snake.board[0].y);
  if (event.keyCode === 37) {// up
    snake.updateDirection(-1, 0);
  } else if (event.keyCode === 38) {// down
    snake.updateDirection(0, -1);
  } else if (event.keyCode === 39) { // left
    snake.updateDirection(1, 0);
  } else if (event.keyCode === 40) {// right
    snake.updateDirection(0, 1);
  }

}
// let snake = new Snake(); // createing Snake object
class Snake {
  constructor() {
    // snake starts moving at cordinates (x= 100, y=0) 
    this.board = [{ x: 100, y: 0 }];
    // at the beggining snake moves up to down
    this.DirectionX = 0 * S;
    this.DirectionY = 1 * S;

  }
  updateDirection(x, y) {
    // this prevents user to move snake reverse direction
    if (x + this.DirectionX != 0 && y + this.DirectionY != 0) {
      this.DirectionX = x * S;
      this.DirectionY = y * S;
    }
  };
  updateSnakePos() {
    // new cordinates equals old cordinates + current one
    let newPosX = this.board[0].x + this.DirectionX;

    let newPosY = this.board[0].y + this.DirectionY;

    if (newPosX < 0) {
      return "die";
    }
    if (newPosX > width - S) {
      return "die"
    }
    // if y cordintes is off from canvas it dies
    if (newPosY < 0) {
      return "die";
    }
    if (newPosY >height- S) {
      return "die"
    }

    // ifsankes hits himself this means snakes new position is alrady exist end game
    // = use filter to check ifarray contains a match cordinates
    let SelfCrash = this.board.filter(function (boardSegment) {
      return boardSegment.x === newPosX && boardSegment.y === newPosY;
    });
    if (SelfCrash.length > 0) {
      return "die";
    }



    // if snakes stays alive adding new cordinates 
    this.board.unshift({ x: newPosX, y: newPosY });
    // checking coediantes
    let snakePos = [newPosX, newPosY].toString();
    //comparing food coordinates to snake coordinates
    if (food.coordinatesArray.includes(snakePos)) {
      return "eat";
    }

    // If the snake didnt die or eat, it stays the same length.
    // So remove its last board segment from the array to stop drawing it we already moved it to the front with unshift()!
    this.board.pop();

  };
  drawSnake() {
    ctx.fillStyle = "#6c5ce7";
    this.board.forEach(function (boardSegment) {
      ctx.fillRect(boardSegment.x, boardSegment.y, S, S);
      // ctx.drawImage(rocket,boardSegment.x, boardSegment.y, S, S)
      localStorage.getItem("Speed");
      localStorage.setItem("Speed", 360/speed + 100);
  
  
      localStorage.getItem("Snakes Size");
      localStorage.setItem("Snake Size", snakeSize);
  
    });
  };
}
const body = document.body;
const btn = document.querySelectorAll('.button')[0];

btn.addEventListener('mouseenter', () => {
	body.classList.add('show');
});

btn.addEventListener('mouseleave', () => {
	body.classList.remove('show');
});
let snake = new Snake()

class Food {
  constructor() {
    // food cordinates are random between 0 and the games width or height minus the size of each grid block
    this.coordinates_x = [];
    this.coordinates_y = [];
    this.coordinatesArray = [];
    for (let i = 0; i < numberOfFoods; i++) {
      console.log(numberOfFoods);
      //generating food coordinates
      this.coordinates_x[i] = getRandomGameCoordinate(width);
      this.coordinates_y[i] = getRandomGameCoordinate(height);
      //saving food coordinates array
      this.coordinatesArray[i] = [this.coordinates_x[i], this.coordinates_y[i]].toString();
      console.log("food: x= " + this.coordinates_x[i] + ", y= " + this.coordinates_y[i]);
    }
    console.log(this.coordinatesArray);
    // Function for generating a random whole number aligned on the game grid
    function getRandomGameCoordinate(range) {
      let squaresInRange = Math.floor(range/S);
      let randomCoor = Math.floor(Math.random()*squaresInRange)*S;
      return randomCoor;
    }
  }
  drawFood() {
    ctx.fillStyle = "#00a8ff";
    for (let i = 0; i < numberOfFoods; i++) {
      //drawing all foods
      ctx.drawImage(planet, this.coordinates_x[i], this.coordinates_y[i], S, S);
      localStorage.getItem("number of foods");
      localStorage.setItem("number of foods", numberOfFoods);
    }
  }
}

let food

let start = document.getElementById("start").addEventListener("click", () => {
  //creating food object
  food = new Food();
  Animation = requestAnimationFrame(animate);

})

// This function updates the game state and draws a single animation frame
function RunGame() {
  // Update the snake and save the result of its latest action
  let action = snake.updateSnakePos();

  // Ifthe snake returned "die", game over
  if (action === "die") {
    gameOver();
    return false;
  }

  // Otherwise the snake is still alive! So...
  // console.log(action);
  // Ifit successfully ate the food, update the score and reset the food!
  if (action === "eat") {
    score = score + 10
    food = new Food();
    snakeSize = snakeSize + 1

  }

  // Draw the snak teh score and the food for each animationframe (again, only ifthe snake isnt dead)
  drawScore();
  snake.drawSnake();
  food.drawFood();
  return true;

}

function drawScore() {
  ctx.fillStyle = "#eb3b5a";
  ctx.font = '40px sans-serif';
  ctx.fillText('Score: ' + score, 10, 50);
  let highscore = localStorage.getItem("highscore");
  let high = document.getElementById("high")
  high.style = "font-size:30px"
  high.textContent = highscore
  if (highscore !== null) {
    if (score > highscore) {
      localStorage.setItem("highscore", score);
    }
  }
  else {
    localStorage.setItem("highscore", score);
  }
}

// animation loop 
function animate(current) {
  // Repeat the loop without animating if it hasnt been long enough yet.
  if (current < nextFrame) {
    requestAnimationFrame(animate);
    return; // this ends the function, preventing the code below from running when it shouldnt
  }
  nextFrame = current + speed;
  // Clear the canvas between each animation frame
  ctx.clearRect(0, 0, 1000, 2000);

  // Repeat the animation loop forever, unless RunGame returns false for end game
  if (RunGame()) {
    // Repeat the animation loop forever (until we stop it)
    requestAnimationFrame(animate);
  }
}
function gameOver() {
  ctx.fillStyle = "#eb3b5a";
  ctx.font = '40px sans-serif';
  let ps = document.createElement('p')
  let scoreLast = document.getElementById('score')
  ps.textContent = score
  scoreLast.appendChild(ps)
  ps.style.display = "inline-block"
  // ctx.fillText('Final Score: ' + score, 100, 200); 
  // ctx.fillText('Refresh page ', 130, 180);
  // ctx.fillText('To Start New Game ', 80, 220);
  alert("Refresh page to start new game")
  // setTimeout(function () {location.reload()}, 3000)
  
}

