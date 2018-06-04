var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var jump = document.getElementById("jump");

var player = new component(10, 20, "white", canvas.width/2 - 50, canvas.height-20, 0);
var randomy = getRandomArbitrary(40, canvas.height-20);
var obstacle = new component(10, 20, "red", canvas.width, randomy, 1);

jump.onclick = function() {
    if (player.y >= canvas.height - player.height && !player.moveup) {
        player.moveup = true;
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var gameArea = {
    canvas: document.getElementById("myCanvas"),
    
    start: function() {
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 30);
    },

    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.moveup = false;
    this.type = type;
    this.x = x;
    this.y = y;
    this.dt = 0.4;
    this.xSpeed = -3;
    this.ySpeed = -7;
    this.width = width;
    this.height = height;
    this.color = color;
    this.gravity = .7;
    this.update = function() {
        switch (type) {     /** Case: 0 for the player and 1 for obstacle. */
            case 0:
                if (this.moveup) {
                    this.y += this.ySpeed;
                    this.ySpeed += this.gravity*this.dt;
                    if (this.y >= canvas.height - this.height) {
                        this.moveup = false;
                        this.y = canvas.height-this.height;
                        this.ySpeed = -7;
                    }
                }
                break;
            case 1:
                this.x += this.xSpeed;
                if (this.x+this.width < 0) {
                    this.x = canvas.width;
                    this.y = getRandomArbitrary(40, canvas.height);
                }
                break;
        }
    }
    this.draw = function() {
        fillRect(this.x, this.y, width, height, color);
    }
}

function fillRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function updateGameArea() {
    gameArea.clear();
    player.draw();
    player.update();
    obstacle.draw();
    obstacle.update();
}



function startGame() {
    gameArea.start();
}

startGame();