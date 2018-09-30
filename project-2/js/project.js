const cvs = document.getElementById('snakeCanvas');
const ctx = cvs.getContext('2d');

// create the unit
const box = 32;

//initialize variables
let snake;
let fooding;
let board;

//game option default values
let options = {
    bordSize: 320,
    level: 15,
    apple: 1,
    snake: 1,
    score: 0 
};

//level option addeventlistener for input speed


//add eventlistener to reset button and reset all values of options


//add eventlistener to play button
start.addEventListener('click', function(){
    //print high score
    high.textContent = `Your High Score is: ${options.score}`;

    //rewrite new option values witch choosed by user

    //check input speed value

    
    options.bordSize = document.querySelector('#board').value;
    ctx.canvas.width = options.bordSize;
    ctx.canvas.height = options.bordSize;
    options.apple = document.querySelector('#apple').value;
    options.snake = document.querySelector('#snakelg').value;

    document.querySelector('#startImg').style.display = 'none'; //hide Start Image
    document.querySelector('#snake').style.display = 'inline'; //showing game

    //save option values to localstorage
    localStorage.setItem('options', JSON.stringify(options))

    //initialize classes
    snake = new Snake(1, 3, box);
    snake.start() //push snake array

    fooding = new Food('Img/apple.png', options.bordSize / box - 2, options.bordSize / box - 4, box);
    fooding.createFood() //push food array

    board = new Board(options.bordSize, options.bordSize, box);

    //call function
    draw();
})

// create the Board class
class Board {
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, this.x, this.y)
    }
}

// create the food class
class Food {
    constructor(foodImg, x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.foodImg = new Image();
        this.foodImg.src = foodImg;
        this.food = []
    }

    createFood(){
        for(let i=0; i<options.apple; i++){
            this.food.push({
                x : Math.floor((Math.random()*this.x)+1) * this.size,
                y : Math.floor((Math.random()*this.y)+3) * this.size
            }); 
        } 
    }

    draw(){
        this.food.forEach((item)=>{
                ctx.drawImage(this.foodImg, item.x, item.y);
        })
    }
}

// create the snake class
class Snake {
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.snakear = [];
    }

    start(){
        for(let i=0; i<options.snake; i++){
            this.snakear.push({
                x : this.x * this.size,
                y : (this.y+i) * this.size
            })
        }
    }

    draw(){
        for( let i = 0; i < this.snakear.length ; i++){
            ctx.fillStyle = ( i == 0 )? 'green' : 'white';
            ctx.fillRect(this.snakear[i].x,this.snakear[i].y,box,box);
            
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.snakear[i].x,this.snakear[i].y,box,box);
        }
    }

    newHead(newhead){
        this.snakear.unshift(newhead)
    }

    removeTail(){
        this.snakear.pop()
    }
    
}

//control the snake
let d;
document.addEventListener('keydown',direction);
function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != 'RIGHT'){
       
        d = 'LEFT';
    } else if(key == 38 && d != 'DOWN'){
        d = 'UP';
      
    } else if(key == 39 && d != 'LEFT'){
        d = 'RIGHT';
      
    } else if(key == 40 && d != 'UP'){
        d = 'DOWN';
        
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas
let loop = 0;
let matchApple = 0;
let score = 0;

function draw(){
    let id = requestAnimationFrame(draw)

    //game speed
    if(++loop < options.level){
        return
    }
    loop = 0;
    
    board.draw();
    fooding.draw();
    snake.draw();
    
    // old head position
    let snakeX = snake.snakear[0].x;
    let snakeY = snake.snakear[0].y;
    
    // which direction
    if( d == 'LEFT') snakeX -= box;
    if( d == 'UP') snakeY -= box;
    if( d == 'RIGHT') snakeX += box;
    if( d == 'DOWN') snakeY += box;
    
    // if the snake eats the food
    fooding.food.forEach((item)=>{
        if(snakeX == item.x && snakeY == item.y){
            score+=10;
            matchApple++;
            item.x = Math.floor((Math.random()*(options.bordSize / box - 2))+1) * box;
            item.y = Math.floor((Math.random()*(options.bordSize / box - 4))+3) * box;
            // we don't remove the tail
        }
    })

    if(matchApple == 0) {
        // remove the tail
        snake.removeTail();
    } else {
        matchApple = 0;
    }
    
    // add new Head
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // game over
    if(snakeX < 0 || snakeX > options.bordSize-box || snakeY < 2*box || snakeY > options.bordSize-box || collision(newHead,snake.snakear) && snake.snakear[0].x != box && snake.snakear[0].y != 3 * box){
        d = null;
        options.snake = snake.snakear.length; //save snake length
        localStorage.setItem('options', JSON.stringify(options)) //save snake length to localstorage

        //check hight score
        if(score > JSON.parse(localStorage.getItem('options')).score) {
            options.score = score;
            highscore.textContent = `Your High Score is: ${options.score}`; //print high score
            localStorage.setItem('options', JSON.stringify(options)) //save high score to localstorage
        }
        score = 0;
        cancelAnimationFrame(id)
        alert('Game Over')
    }
    
    //add snake new head
    snake.newHead(newHead);

    //print score
    ctx.fillStyle = 'white';
    ctx.font = '45px Changa one';
    ctx.drawImage(fooding.foodImg, box-10, box-15);

    //print line under score
    ctx.beginPath();
    ctx.fillText(score,2*box,1.6*box);
    ctx.strokeStyle='black';
    ctx.lineWidth = 5;
    ctx.moveTo(0, 64);
    ctx.lineTo(options.bordSize, 64);
    ctx.closePath();
    ctx.stroke();  
}

//check if there are options value to localstorage
if(localStorage.getItem('options')) {
    options = JSON.parse(localStorage.getItem('options'));

    //print high score
    highscore.textContent = `Your High Score is: ${options.score}`;

    ctx.canvas.width = options.bordSize;
    ctx.canvas.height = options.bordSize;

    document.querySelector('#startImg').style.display = 'none';
    document.querySelector('#snake').style.display = 'inline';

    
    document.querySelector('#speednumb').value = options.level;
    //check speed and set value of speed option
    if(options.level > 0 && options.level <=5) {
        document.querySelector('#level').value = 5;
    } else if(options.level > 5 && options.level <=10) {
        document.querySelector('#level').value = 10; 
    } else if(options.level > 10 && options.level <=20) {
        document.querySelector('#level').value = 10; 
    }
     
    document.querySelector('#board').value = options.bordSize;
    document.querySelector('#apple').value = options.apple;
    document.querySelector('#snakelg').value = options.snake;
    
    snake = new Snake(1, 3, box);
    snake.start()

    fooding = new Food('Img/apple.png', options.bordSize / box - 2, options.bordSize / box - 4, box);
    fooding.createFood()

    board = new Board(options.bordSize, options.bordSize, box);

    draw()
}
