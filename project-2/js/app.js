// window.onload = () =>{

let canvas = document.getElementById('snakeCanvas');
let ctx = canvas.getContext('2d');
let style = canvas.style;
const planet = new Image();
planet.src = 'css/anon.png';
style.marginLeft = "auto";
style.marginRight = "auto";
let parentStyle = canvas.parentElement.style;
parentStyle.textAlign = "center";
parentStyle.width = "100%";
let width =500;
let height =400;
let S = 20;           // square of one grid block
let score = 0;
let speed = 100;                     // snake  speed frame/per/second. 
let nextFrame = 0;          
let snakeSize = 1
let numberOfFoods = 1

localStorage.getItem("boards width", "board height");
localStorage.setItem("boards widht", width);
localStorage.setItem("boards height", height);

// by this fucntion player can determine speed/LVL of snake
function speedPick() {
  document.addEventListener("keyup", keyFunction);
  let novice = document.getElementById('novice')
  let inter = document.getElementById('inter')
  let ex = document.getElementById('ex')

  novice.addEventListener("click", Novice)
  function Novice() {
    if (novice) {
      speed = speed + 100;

    }
    novice.removeEventListener("click", Novice)
    inter.removeEventListener("click", Inter)
    ex.removeEventListener("click", Ex)

  }


  inter.addEventListener("click", Inter)
  function Inter() {
    if (inter) {
      speed = speed - 5;
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
function changeSize(){
  var canvas = document.getElementById("snakeCanvas");
  var line   = document.getElementById("width").value;
  var cols   = document.getElementById("height").value;
  window.cnv = null;  
  // resize the canvas
  this.Width = canvas.width = line ; 
  this.Height = canvas.height = cols ; 
  canvas.style.border = " 4px solid rgb(167, 157, 157)"; 
  if (canvas.getContext) { 
    window.cnv = canvas.getContext("2d");
    canvas();
  }


function canvas(){
      cnv.strokeStyle = "olive";
      // put the text in the canvas
}

// window.onload=function(){
//   changeSize();
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
let food = new Food();    // creating food object
class Snake{
  constructor(){
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
  updateSnakePos(){
    // new cordinates equals old cordinates + current one
    let newPosX = this.board[0].x + this.DirectionX;
  
    let newPosY = this.board[0].y + this.DirectionY;
  
    //  if x cordintes is off from canvas it dies 
    if(newPosX < 0) {
      return "die";
    }
    else if(newPosX > width - S) {
      return "die"
    }
    // if y cordintes is off from canvas it dies
    if(newPosY < 0) {
      return "die";
    }
    else if(newPosY > height - S) {
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
    if (newPosX === food.x && newPosY=== food.y) {
      return "eat";
    }
  
    // If the snake didnt die or eat, it stays the same length.
    // So remove its last board segment from the array to stop drawing it we already moved it to the front with unshift()!
    this.board.pop();
  
  };
}
// function Snake() {
//   // snake starts moving at cordinates (x= 100, y=0) 
//   this.board = [{ x: 100, y: 0 }];
//   // at the beggining snake moves up to down
//   this.DirectionX = 0 * S;
//   this.DirectionY = 1 * S;
// }

// This method updates the snakes direction alos used in Keyfunc function
// controling snakes direction
// Snake.prototype.updateDirection = function (x, y) {
//   // this prevents user to move snake reverse direction
//   if (x + this.DirectionX != 0 && y + this.DirectionY != 0) {
//     this.DirectionX = x * S;
//     this.DirectionY = y * S;
//   }
// };
let snake = new Snake()
// this method update snake cordinates
// Snake.prototype.updateSnakePos = function () {
//   // new cordinates equals old cordinates + current one
//   let newPosX = this.board[0].x + this.DirectionX;

//   let newPosY = this.board[0].y + this.DirectionY;

//   //  if x cordintes is off from canvas it dies 
//   if(newPosX < 0) {
//     return "die";
//   }
//   else if(newPosX > width - S) {
//     return "die"
//   }
//   // if y cordintes is off from canvas it dies
//   if(newPosY < 0) {
//     return "die";
//   }
//   else if(newPosY > height - S) {
//     return "die"
//   }

//   // ifsankes hits himself this means snakes new position is alrady exist end game
//   // = use filter to check ifarray contains a match cordinates
//   let SelfCrash = this.board.filter(function (boardSegment) {
//     return boardSegment.x === newPosX && boardSegment.y === newPosY;
//   });
//   if (SelfCrash.length > 0) {
//     return "die";
//   }



//   // if snakes stays alive adding new cordinates 
//   this.board.unshift({ x: newPosX, y: newPosY });
//   // checking coediantes
//   if (newPosX === food.x && newPosY=== food.y) {
//     return "eat";
//   }

//   // If the snake didnt die or eat, it stays the same length.
//   // So remove its last board segment from the array to stop drawing it we already moved it to the front with unshift()!
//   this.board.pop();

// };
// This method draws the snake using its coordinates

Snake.prototype.draw = function () {
  ctx.fillStyle = "#6c5ce7";
  this.board.forEach(function (boardSegment) {
    ctx.fillRect(boardSegment.x, boardSegment.y, S, S);

    localStorage.getItem("Speed");
    localStorage.setItem("Speed", speed);


    localStorage.getItem("Snakes Size");
    localStorage.setItem("Snake Size", snakeSize);

  });
};
// drawing food
Food.prototype.draw = function () {

  ctx.fillStyle = "#00a8ff";

  
  ctx.drawImage(planet,this.x, this.y, S, S);
  localStorage.getItem("number of foods");
  localStorage.setItem("number of foods", numberOfFoods);


};

function Food() {

  // food cordinates are random between 0 and the games width or height minus the size of each grid block
  this.x = getRandomGameCoordinate(this.Width);
  this.y = getRandomGameCoordinate(this.Height);
  console.log("FOOD: x= " + this.x + ", y= " + this.y);

  // Function for generating a random whole number aligned on the game grid
  function getRandomGameCoordinate(cor) {
    cor = Math.floor((Math.random() * S) );
    return S *Math.floor(Math.random() * (cor));
  }

}



let start = document.getElementById("start").addEventListener("click", () => {
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
  snake.draw();
  food.draw();
  
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
  ctx.clearRect(0, 0, 2000, 2000);

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
  ctx.fillText('Refresh page ', 130, 180);
  ctx.fillText('To Start New Game ', 80, 220);
}
//  }
