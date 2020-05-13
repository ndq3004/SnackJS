const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const dialog = document.getElementById("game-over-dialog");

// create unit
const box = 32;

// load game
const ground = new Image();
ground.src = "img/ground.png";

const foodImage = new Image();
foodImage.src = "img/food.png";

// create snake
let snake = []
snake[0] = {
    x : 9 * box,
    y : 10 * box
}

// create food
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create score 
let score = 0;
//Init dialog
function initDialog(){
    dialog.style.top = 8 * box + 'px';
    dialog.style.left = 0 + 'px';
    //Display Score
    const scoreDisplay = document.getElementById("scoreDisplay");
    scoreDisplay.innerHTML = score;
    dialog.showModal()
    
    //Add event close
    const cancelBtn = document.getElementById("cancelBtn");
    cancelBtn.addEventListener('click', function(){
        dialog.close()
    })

    //add event continue
    const continueBtn = document.getElementById("continueBtn");
    continueBtn.addEventListener('click', function(){
        replay()
    })
}
//control snake
let d;
let dead = 0;

document.addEventListener("keydown", direction);

function direction(event){
    if(event.keyCode == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(event.keyCode == 38 && d != "DOWN"){
        d = "UP";
    }
    else if(event.keyCode == 39 && d != "LEFT"){
        d = "RIGHT";
    }
    else if(event.keyCode == 40 && d != "UP"){
        d = "DOWN";
    } 
}

//Draw everything to canvas
function draw(){
    ctx.drawImage(ground, 0, 0);
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
 
    ctx.drawImage(foodImage, food.x, food.y);

    //Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    //if snake eats food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }else{
        snake.pop();
    }
    
    //If dead
    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box){
        clearInterval(game);
        if(parseInt(localStorage.getItem("highScoreSnakeGame") || 0) < score){
            localStorage.setItem("highScoreSnakeGame", score);
        }
        setTimeout(initDialog(), 1000);
    }


    //Add new head
    let newHead = {
        x: snakeX,  
        y: snakeY
    }

    snake.unshift(newHead);
    

    ctx.fillStyle = "white"; 
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box, 1.6*box);

    ctx.fillStyle = "white";
    ctx.font = "25px Changa one";
    let lastHighScore = parseInt(localStorage.getItem("highScoreSnakeGame") || 0);
    let highScore = 'High score: ' + (lastHighScore > score ? lastHighScore : score);
    ctx.fillText(highScore, 8*box, 1.6*box);
}

let game = setInterval(draw, 100);

function replay(){
    window.location.reload();
}

