// Utility function to randomize stuff
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Checking left/right canvas boundaries and keeping player inside of them
function checkXBoundary(x, y) {
  if (x <= 0) {
    player.setX(0);
  }
  else if (x >= ctx.canvas.width-20) {
    player.setX((ctx.canvas.width-40)-player.width);
  }
}

// Checking top/bottom canvas boundaries and keeping player inside of them
// If player hits the water, game points are given to the player, and
// he is sent back to starting location
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

// checks to see if any collision occurs b/n bugs and player objects
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

// checks to see if any collision occurs b/n bugs and player objects
function isGemCollision(bugXCoord, bugYCoord, bugWidth, bugHeight) {
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
