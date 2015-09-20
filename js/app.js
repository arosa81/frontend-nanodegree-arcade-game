// CONSTANTS
var PLAYER_X_STARTLOC = (ctx.canvas.width/2)-50;
var PLAYER_Y_STARTLOC = 400;
var PLAYER_X_MOVEMENT = 100;
var PLAYER_Y_MOVEMENT = 85;
var BUG1_X_STARTLOC = getRandomIntInclusive(2, 600);
var BUG1_Y_STARTLOC = 63;
var BUG2_X_STARTLOC = getRandomIntInclusive(2, 600);
var BUG2_Y_STARTLOC = 145;
var BUG3_X_STARTLOC = getRandomIntInclusive(2, 600);
var BUG3_Y_STARTLOC = 145;
var BUG4_X_STARTLOC = getRandomIntInclusive(15, 20);
var BUG4_Y_STARTLOC = 230;
var GEM1_Y_STARTLOC = 63;
var GEM2_Y_STARTLOC = 145;
var GEM3_Y_STARTLOC = 230;
var WATER_Y_STARTLOC = 16;
var OFF_CANVAS_COORD = -100;

// Global variables
var pointTotal = 0;
var numBugs = 4;
var numGems = 3;

/**
* @name Enemy
* @description Represents an enemy
* @constructor
* @param {string} sprite - The bug image asset
* @param {integer} x - The x coordinate of an enemy
* @param {integer} y - The y coordinate of an enemy
* @param {integer} width - The width of an enemy
* @param {integer} height - The height of an enemy
*/
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.sprite = 'images/enemy-bug.png';
};

/**
* @name Enemy.prototype.update
* @description Updates enemy coordinates. Checks for collision with player and takes away game points
* @function
* @param {double} dt - time delta for smooth animation
*/
Enemy.prototype.update = function(dt) {
    // send the bug back to the starting point of the canvas
    var speed = getRandomIntInclusive(1, 10);
    if (this.x > ctx.canvas.width) {
      this.x = OFF_CANVAS_COORD;
    }
    // randomize speed again to get bugs moving differently
    if (this.x === OFF_CANVAS_COORD) {
      speed = getRandomIntInclusive(0, 5);
    }
    // Check for collision with player and sends him back home
    if (isBugCollision(this.x, this.y, this.width, this.height)) {
      player.x = PLAYER_X_STARTLOC;
      player.y = PLAYER_Y_STARTLOC;
      pointTotal -= 10;
      scorePoint.countPoint(pointTotal);
    }
    return this.x += speed + dt;
};

/**
* @name Enemy.prototype.render
* @description Draw the enemy on the screen, required method for game
* @function
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @name Player
* @description Represents the player
* @constructor
* @param {string} sprite - The player image asset
* @param {integer} x - The x coordinate of a player
* @param {integer} y - The y coordinate of a player
* @param {integer} width - The width of a player
* @param {integer} height - The height of a player
*/
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = 61;
  this.height = 60;
  this.sprite = "images/char-boy.png";
};

/**
* @name Player.prototype.setX
* @description Setter to update Player's x parameter
* @function
* @param {integer} x - update Player's x parameter
*/
Player.prototype.setX = function(x) {
  this.x = x;
};

/**
* @name Player.prototype.setY
* @description Setter to update Player's y parameter
* @function
* @param {integer} y - update Player's y parameter
*/
Player.prototype.setY = function(y) {
  this.y = y;
};

/**
* @name Player.prototype.update
* @description Updates player on screen. Check if player is hitting boundaries of the game screen and keeps him in.
* @function
* @param {double} dt - time delta for smooth animation
*/
Player.prototype.update = function(dt) {
    checkXBoundary(this.x, this.y);
    checkYBoundary(this.x, this.y);
    return this.y * dt;
};

/**
* @name Player.prototype.handleInput
* @description Handles key input to move the player in any x, y direction
* @function
* @param {string} direction - the direction the player moves
*/
Player.prototype.handleInput = function(direction){
  switch (direction) {
    case "left":
      this.x -= PLAYER_X_MOVEMENT;
      break;
    case "right":
      this.x += PLAYER_X_MOVEMENT;
      break;
    case "up":
      this.y -= PLAYER_Y_MOVEMENT;
      break;
    case "down":
      this.y += PLAYER_Y_MOVEMENT;
      break;
    default:
      return;
  }
};

/**
* @name Player.prototype.render
* @description Draw the player on the screen
* @function
*/
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @name Gem
* @description Represents a gem
* @constructor
* @param {string} sprite - The gem image asset
* @param {integer} x - The x coordinate of a gem
* @param {integer} y - The y coordinate of a gem
* @param {integer} width - The width of a gem
* @param {integer} height - The height of a gem
* @param {string} colour - The colour of a gem
*/
var Gem = function(x, y, colour) {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 50;
    this.colour = colour;
    this.sprite = 'images/Gem ' + this.colour + '.png';
};

/**
* @name Gem.prototype.setX
* @description Setter to update Gem's x parameter
* @function
* @param {integer} x - update Gem's x parameter
*/
Gem.prototype.setX = function(x) {
  this.x = x;
};

/**
* @name Gem.prototype.update
* @description updates the Gems coordinates when collision occurs and gives player game points
* @function
* @param {double} dt - time delta for smooth animation
*/
Gem.prototype.update = function(dt) {
  // Check for collision with player and send him back home
  if (isGemCollision(this.x, this.y, this.width, this.height)) {
    this.x = OFF_CANVAS_COORD;
    pointTotal += 5;
    scorePoint.countPoint(pointTotal);
  }
  if ((allGems[0].x === OFF_CANVAS_COORD) && (allGems[1].x === OFF_CANVAS_COORD) && (allGems[1].x === OFF_CANVAS_COORD)) {
    allGems.forEach(function(gem) {
      gem.setX(getRandomIntInclusive(2, 450));
    });
  }
};

/**
* @name Gem.prototype.render
* @description Draw the gem on the screen
* @function
*/
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @name Score
* @description Represents the games score
* @constructor
* @param {integer} score - The game score total
*/
var Score = function(score) {
  this.score = score;
};

/**
* @name Score.prototype.countPoint
* @description Setter to add or subtract points to the game score
* @function
* @param {integer} pointTotal - sets game score parameter whenever points are counted
*/
Score.prototype.countPoint = function(pointTotal) {
  this.score = pointTotal;
};

/**
* @name Score.prototype.render
* @description Draw the total game score on the screen
* @function
*/
Score.prototype.render = function() {
  ctx.font = "20px serif";
  var displayText = "Score: " + this.score;
  ctx.fillText(displayText,ctx.canvas.width-95,80);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Instantiating enemy objects
var allEnemies = [];
var allEnemiesX = [BUG1_X_STARTLOC, BUG2_X_STARTLOC, BUG3_X_STARTLOC, BUG4_X_STARTLOC];
var allEnemiesY = [BUG1_Y_STARTLOC, BUG2_Y_STARTLOC, BUG3_Y_STARTLOC, BUG4_Y_STARTLOC];
for (var i = 0; i < numBugs; i++) {
  allEnemies[i] = new Enemy(allEnemiesX[i], allEnemiesY[i]);
}

// Instantiating gem objects
var allGems = [];
var allGemsY = [GEM1_Y_STARTLOC, GEM2_Y_STARTLOC, GEM3_Y_STARTLOC];
var allGemsColour = ["Blue", "Green", "Orange"];
for (var i = 0; i < numGems; i++) {
  allGems[i] = new Gem(getRandomIntInclusive(2, 450), allGemsY[i], allGemsColour[i]);
}

// Instantiating player object
var player = new Player(PLAYER_X_STARTLOC, PLAYER_Y_STARTLOC);

// Instantiating game score object
var scorePoint = new Score(pointTotal);

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
