//CONSTANTS
var PLAYER_X_STARTLOC = (ctx.canvas.width/2)-50;
var PLAYER_Y_STARTLOC = 400;
var PLAYER_X_MOVEMENT = 100;
var PLAYER_Y_MOVEMENT = 85;
var BUG1_X_STARTLOC = 0;
var BUG1_Y_STARTLOC = 63;
var BUG2_X_STARTLOC = 300;
var BUG2_Y_STARTLOC = 145;
var BUG3_X_STARTLOC = 45;
var BUG3_Y_STARTLOC = 145;
var BUG4_X_STARTLOC = 130;
var BUG4_Y_STARTLOC = 230;
var WATER_LOC = 16;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Multiply any movement by the dt parameter
Enemy.prototype.update = function(dt) {
    // send the bug back to the starting point of the canvas
    var speed = getRandomIntInclusive(100, 400);
    if (this.x > ctx.canvas.width) {
      this.x = -90;
    }
    this.render();
    if (this.x < 0) {
      speed += getRandomIntInclusive(300, 700)*dt;
    }

    this.x += dt * speed;
    // Check for collision with player and send him back home
    if (isCollision(this.x, this.y, this.width, this.height)) {
      player.x = PLAYER_X_STARTLOC;
      player.y = PLAYER_Y_STARTLOC;
    }
};

// checks to see if any collision occurs b/n bugs and player objects
function isCollision(bugXCoord, bugYCoord, bugWidth, bugHeight) {
  var bugXHitCoord = bugXCoord+15;
  var bugYHitCoord = bugYCoord+(171/2);
  var playerXHitCoord = player.x+20;
  var playerYHitCoord = player.y+70;
  // referencing algorithm from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (bugXHitCoord < playerXHitCoord + player.width &&
   bugXHitCoord + bugWidth > playerXHitCoord &&
   bugYHitCoord < playerYHitCoord + player.height &&
   bugHeight + bugYHitCoord > playerYHitCoord)
	  return true;
	else
		return false;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.sprite = "images/char-boy.png";
  this.x = x;
  this.y = y;
  this.width = 61;
  this.height = 60;
};

// Setter to update Player's x value
Player.prototype.setX = function(x) {
  this.x = x;
};

// Setter to update Player's y value
Player.prototype.setY = function(y) {
  this.y = y;
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    checkBoundary(this.x, this.y);
    return this.y * dt;
};

function checkBoundary(x, y) {
  // Check left canvas boundary
  if (x <= 0) {
    player.setX(0);
  }
  else if (x >= ctx.canvas.width-20) {
    player.setX((ctx.canvas.width-40)-player.width);
  }
  else if (y > PLAYER_Y_STARTLOC) {
    player.setY(PLAYER_Y_STARTLOC);
  }
  else if (y < WATER_LOC) {
    player.setX(PLAYER_X_STARTLOC);
    player.setY(PLAYER_Y_STARTLOC);
  }
}

Player.prototype.handleInput = function(direction){
  switch (direction) {
    case "left":
      //TO DO: move left
      this.x -= PLAYER_X_MOVEMENT;
      break;
    case "right":
      //TO DO: move left
      this.x += PLAYER_X_MOVEMENT;
      break;
    case "up":
      //TO DO: move left
      this.y -= PLAYER_Y_MOVEMENT;
      break;
    case "down":
      //TO DO: move left
      this.y += PLAYER_Y_MOVEMENT;
      break;
    default:
      return;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy(BUG1_X_STARTLOC, BUG1_Y_STARTLOC);
var bug2 = new Enemy(BUG2_X_STARTLOC, BUG2_Y_STARTLOC);
var bug3 = new Enemy(BUG3_X_STARTLOC, BUG3_Y_STARTLOC);
var bug4 = new Enemy(BUG4_X_STARTLOC, BUG4_Y_STARTLOC);
var allEnemies = [bug1, bug2, bug3, bug4];
var player = new Player(PLAYER_X_STARTLOC, PLAYER_Y_STARTLOC);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Utility function to randomize stuff
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 100)) + min;
}
