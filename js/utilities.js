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
