//CONSTANTS
var PLAYER_X_STARTLOCATION = (ctx.canvas.width/2)-50;
var PLAYER_Y_STARTLOCATION = 400;
var PLAYER_X_MOVEMENT = 100;
var PLAYER_Y_MOVEMENT = 85;
var BUG1_X_STARTLOC = 0;
var BUG1_Y_STARTLOC = 63;
var BUG2_X_STARTLOC = 300;
var BUG2_Y_STARTLOC = 145;
var BUG3_X_STARTLOC = 75;
var BUG3_Y_STARTLOC = 145;
var BUG4_X_STARTLOC = 130;
var BUG4_Y_STARTLOC = 230;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
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
    if (this.x > ctx.canvas.width) {
      this.x = -90;
    }
    this.render();
    this.x += dt * this.speed;
    console.log("BUG x, y: " + this.x + ", " + this.y);
    console.log(isCollision(this.x, this.y, this.width, this.height));
    if (isCollision(this.x, this.y, this.width, this.height)) {
      player.x = PLAYER_X_STARTLOCATION;
      player.y = PLAYER_Y_STARTLOCATION;
    }
    // return this.x;
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
    ctx.fillStyle = "red";//rgba(255, 255, 255, 0)";
    ctx.fillRect(this.x+15, this.y+(171/2), this.width, this.height);
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

Player.prototype.setX = function(x) {
  this.x = x;
};

Player.prototype.setY = function(y) {
  this.x = y;
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.y < 16) {
      this.x = PLAYER_X_STARTLOCATION;
      this.y = PLAYER_Y_STARTLOCATION;
    }
    checkBoundary(this.x, this.y);
    console.log("PLAYER x, y: " + this.x + ", " + this.y);
    return this.y * dt;
};

function checkBoundary(x, y) {
  // Check left canvas boundary
  if (x <= 0) {
    player.setX(0);
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
  ctx.fillStyle = "blue";//rgba(255, 255, 255, 0)";
  ctx.fillRect(this.x+20, this.y+70, this.width, this.height);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy(BUG1_X_STARTLOC, BUG1_Y_STARTLOC, 50);
var bug2 = new Enemy(BUG2_X_STARTLOC, BUG2_Y_STARTLOC, 80);
var bug3 = new Enemy(BUG3_X_STARTLOC, BUG3_Y_STARTLOC, 60);
var bug4 = new Enemy(BUG4_X_STARTLOC, BUG4_Y_STARTLOC, 40);
var allEnemies = [bug1, bug2, bug3, bug4];
var player = new Player(PLAYER_X_STARTLOCATION, PLAYER_Y_STARTLOCATION);

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
