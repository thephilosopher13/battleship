import gameboardModule from "./gameboard";

const playerFactory = (string) => {

  const playerName = string
  const playerGameboard = gameboardModule.gameboardFactory()

    const alreadyHitCoords = [];

    const attack = (x, y, playersArray) => {
      if (hasAlreadyHit(x, y)) {
        return; // insert error handler here
      } else {
        const computer = playersArray[1]
        alreadyHitCoords.push(`${x},${y}`);
        computer.playerGameboard.receiveAttack(x, y);
      }
     };

    function getRandomNumberBetween1And10() {
      return Math.floor(Math.random() * 10) + 1;
    }

    const randomAttack = (playersArray) => {
      if (alreadyHitCoords.length === 100) {
        return; // insert error handler here
      }

      let randomX = getRandomNumberBetween1And10();
      let randomY = getRandomNumberBetween1And10();

      while (hasAlreadyHit(randomX, randomY)) {
        randomX = getRandomNumberBetween1And10();
        randomY = getRandomNumberBetween1And10();
      }

      const player = playersArray[0]

      alreadyHitCoords.push(`${randomX},${randomY}`);
      player.playerGameboard.receiveAttack(randomX, randomY);
      const coordinateBoxDiv = document.getElementById(
        `player1-coordinates${randomX},${randomY}`
      )
      coordinateBoxDiv.classList.add('attacked')

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
      playerGameboard,
      playerName,
      alreadyHitCoords,
      attack,
      randomAttack,
    };
};

export default playerFactory