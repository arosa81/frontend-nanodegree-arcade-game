/**
* @name getRandomIntInclusive
* @description Utility function to randomize stuff
* @function
* @param {integer} min - minimum number to use in randomizer
* @param {integer} max - minimum number to use in randomizer
*/
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
* @name checkXBoundary
* @description Checking left/right canvas boundaries and keeping player inside of them
* @function
* @param {integer} x - x coordinate on canvas
* @param {integer} y - y coordinate on canvas
*/
function checkXBoundary(x, y) {
  if (x <= 0) {
    player.setX(0);
  }
  else if (x >= ctx.canvas.width-20) {
    player.setX((ctx.canvas.width-40)-player.width);
  }
}

/**
* @name checkYBoundary
* @description Checking top/bottom canvas boundaries and keeping player inside of them. Sending player to start location when he touches the water and giving game points.
* @function
* @param {integer} x - x coordinate on canvas
* @param {integer} y - y coordinate on canvas
*/
function checkYBoundary(x, y) {
  if (y > PLAYER_Y_STARTLOC) {
    player.setY(PLAYER_Y_STARTLOC);
  }
  else if (y <= WATER_Y_STARTLOC) {
    player.setX(PLAYER_X_STARTLOC);
    player.setY(PLAYER_Y_STARTLOC);
    pointTotal += 10;
    scorePoint.countPoint(pointTotal);
  }
}

/**
* @name isBugCollision
* @description checks to see if any collision occurs b/n bugs and player objects
* @function
* @param {integer} bugXCoord - x coordinate of bug on canvas
* @param {integer} bugYCoord - y coordinate of bug on canvas
* @param {integer} bugWidth - width value of a bug
* @param {integer} bugHeight - height value of a bug
*/
function isBugCollision(bugXCoord, bugYCoord, bugWidth, bugHeight) {
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

/**
* @name isGemCollision
* @description checks to see if any collision occurs b/n gem and player objects
* @function
* @param {integer} gemXCoord - x coordinate of bug on canvas
* @param {integer} gemYCoord - y coordinate of bug on canvas
* @param {integer} gemWidth - width value of a bug
* @param {integer} gemHeight - height value of a bug
*/
function isGemCollision(gemXCoord, gemYCoord, gemWidth, gemHeight) {
  var gemXHitCoord = gemXCoord+15;
  var gemYHitCoord = gemYCoord+(171/2);
  var playerXHitCoord = player.x+20;
  var playerYHitCoord = player.y+70;
  // referencing algorithm from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (gemXHitCoord < playerXHitCoord + player.width &&
   gemXHitCoord + gemWidth > playerXHitCoord &&
   gemYHitCoord < playerYHitCoord + player.height &&
   gemHeight + gemYHitCoord > playerYHitCoord)
	  return true;
	else
		return false;
}
