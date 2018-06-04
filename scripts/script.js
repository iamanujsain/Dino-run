var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var player = new component(10, 20, "white", canvas.width/2 - 50, canvas.height-20, 0);

//var randomY = randRange(40, canvas.height-20);
var groundY = 130;
var obstacle = new component(10, 20, "red", canvas.width, groundY, 1);

// Player jumps by clicking this button.
var jump = document.getElementById("jump");
jump.onclick = function() {
    if (player.y >= canvas.height - player.height && !player.moveup) {
        player.moveup = true;
    }
}

// Generates a random number between a certain range.
function randRange(min, max) {
    return Math.random() * (max - min) + min;
}

// (Object) gameArea - starts the game and updates the game area.
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

/**
 * (Object) component - for creating new components.
 * @param {int - width of the component} width 
 * @param {int - height of the component} height 
 * @param {string - color of the component} color 
 * @param {int - abscissa or the component's position} y 
 * @param {int - ordinate of the component's position} x 
 * @param {int - type of the component} type 
 */
function component(width, height, color, x, y, type) {
    this.moveup = false;
    this.type = type;
    this.x = x;
    this.y = y;
    this.dt = 0.7;
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
                    width = randRange(10, 50);
                    this.x = canvas.width;
                    this.y = 130; //randRange(130,140);
                }
                break;
        }
    }
    this.draw = function() {
        fillRect(this.x, this.y, width, height, color);
    }
}

/**
 * Draws a rectangle on the canvas.
 * @param {int - abscissa of the rectangle.} x 
 * @param {int - ordinate of the rectangle.} y 
 * @param {int - width of the rectangle.} w 
 * @param {int - height of the rectangle.} h 
 * @param {string - color of the rectangle.} color 
 */
function fillRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

/** Udates the game area. */
function updateGameArea() {
    gameArea.clear();
    player.draw();
    player.update();
    obstacle.draw();
    obstacle.update();
}


/** Starts the game. */
function startGame() {
    gameArea.start();
}

startGame();

