var sheet = document.getElementById("canvas"); //getting the canvas from the HTML
var pen = sheet.getContext("2d"); //getting the 2d renderer
var width = sheet.width, height = sheet.height;
window.addEventListener("keydown", eventHandler, false);

//food that appears randomly to be eaten
class food{
    constructor(){
        this.xPos = Math.floor(Math.random()*(width/20))*20; //scaling the position (x- co-ordinate) of food 
        this.yPos = Math.floor(Math.random()*(height/20))*20; //scaling the position (y- co-ordinate) of food 
    }

    show(){
        pen.fillStyle = "#dc143c"
        pen.strokeStyle = "#ffa07a"
        pen.fillRect(this.xPos, this.yPos, 20, 20);
        pen.strokeRect(this.xPos, this.yPos, 20, 20);
    }
    
}

//snake body
class bodyPart{
    constructor(x, y, part){
        this.xPos = x;
        this.yPos = y;
        this.type = part;
    }

    show(){
        pen.fillStyle = this.type == 0 ? "#337f22" : "#ffffff";
        pen.strokeStyle = "#ffa07a"
        pen.fillRect(this.xPos, this.yPos, 20, 20);
        pen.strokeRect(this.xPos, this.yPos, 20, 20);
    }
}

var mouse = new food();
var body = [];
var xSpeed = 1, ySpeed = 0;
var animLoop = setInterval(draw, 100); // loops the draw function every 100ms
body.push(new bodyPart(width/2, height/2, 0));

//Length of snake grows on eating thatg mouse food
function grow(){
    var x = body[0].xPos;
    var y = body[0].yPos;
    body.unshift(new bodyPart(x + xSpeed*20, y + ySpeed*20, 0));
}
var score = 0;
//what if snake eats the food
function eats(){
    if(body[0].xPos == mouse.xPos && body[0].yPos == mouse.yPos){
        mouse = new food();
        score++;
        grow();
        body[1].type = 1;
    }
}
//what if head of snake strikes the edge
function edges(){
    if(body[0].xPos < 0)
        body[0].xPos = width - 20;
    else if(body[0].xPos > width -20)
        body[0].xPos = 0;
    else if(body[0].yPos < 0)
        body[0].yPos = height - 20;
    else if(body[0].yPos > height -20)
        body[0].yPos = 0;
}

function move(){
    for(var i = body.length -1; i > 0; --i){
        body[i].xPos = body[i -1].xPos;
        body[i].yPos = body[i -1].yPos;
    }
    body[0].xPos += 20*xSpeed;
    body[0].yPos += 20*ySpeed;
}

function die(){
    for(var i = 0; i < body.length -1; ++i)
    {
        if(body[body.length -1].xPos == body[i].xPos && body[body.length -1].yPos == body[i].yPos)
        {
            console.log("over");
            document.getElementById("over").innerHTML = "You Lose!";
            clearInterval(animLoop);
            break;
        }
    }
}

// Controlling the Snake
function eventHandler(event){
    var key = event.keyCode;
    console.log(event);
    if((key == 65 || key == 37 || event == 'left') && xSpeed == 0){
        xSpeed = -1;
        ySpeed = 0;
    }
    else if((key == 68 || key == 39 || event == 'right') && xSpeed == 0){
        xSpeed = 1;
        ySpeed = 0;
    }
    else if((key == 83 || key == 40 || event == 'down') && ySpeed == 0){
        xSpeed = 0;
        ySpeed = 1;
    }
    else if((key == 87 || key == 38 || event == 'up') && ySpeed == 0){
        xSpeed = 0;
        ySpeed = -1;
    }
    else if(key == 32 && !pause){
        clearInterval(animLoop);
        pause = true;
    }
    else if(key == 32 && pause){
        animLoop = setInterval(draw, 100);
        pause = true;
    }
}

function draw(){
    pen.fillStyle = "#000000";
    pen.fillRect(0, 0, width, height);

    mouse.show();
    for(var i = 0; i < body.length; ++i)
        body[i].show();
    move();
    eats();
    edges();
    die();
    document.getElementById("score").innerHTML = score;
}
