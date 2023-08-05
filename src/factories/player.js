import gameboardModule from "./gameboard";

const playerFactory = () => {
    const alreadyHitCoords = [];

    const attack = (x, y, gameboard) => {
      if (hasAlreadyHit(x, y)) {
        return; // insert error handler here
      } else {
        alreadyHitCoords.push(`${x},${y}`);
        gameboard.receiveAttack(x, y);
      }
     };

    function getRandomNumberBetween1And10() {
      return Math.floor(Math.random() * 10) + 1;
    }

    const randomAttack = (gameboard) => {
      if (alreadyHitCoords.length === 100) {
        return; // insert error handler here
      }

      let randomX = getRandomNumberBetween1And10();
      let randomY = getRandomNumberBetween1And10();

      while (hasAlreadyHit(randomX, randomY)) {
        randomX = getRandomNumberBetween1And10();
        randomY = getRandomNumberBetween1And10();
      }

      alreadyHitCoords.push(`${randomX},${randomY}`);
      gameboard.receiveAttack(randomX, randomY);
    };

    const hasAlreadyHit = (x, y) => {
      for (let i = 0; i < alreadyHitCoords; i++) {
        if (alreadyHitCoords[i] === `${x},${y}`) {
          return true;
        } else {
          return false;
        }
      }
    };
    return {
      alreadyHitCoords,
      attack,
      randomAttack,
    };
};
