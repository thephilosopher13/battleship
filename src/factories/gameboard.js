import shipFactory from "./ship";

const gameboardModule = (() => {

  const coordinateBoxFactory = (x, y) => {
    const changeIsHit = function () {
      this.isHit = true;
    };

    const changeHasShip = function () {
      this.hasShip = true;
    };

    return {
      coordinates: `${x}, ${y}`,
      isHit: false,
      hasShip: false,
      changeIsHit,
      changeHasShip,
    };
  };

  const gameboardFactory = () => {
    const gameBoard = {};

    const initializeGameboardBoxes = () => {
      for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
          const coordinateBox = coordinateBoxFactory(i, j);
          gameBoard[`coordinates${i},${j}`] = coordinateBox;
        }
      }
    };

    const checkIfShipFits = (start) => {
        if (start + length - 1 > 10) {
            return false
        }
    }

    const checkIfHasShip = (coordinateBox) => {
        if (coordinateBox.hasShip) {
            return false
        }
    }

    const placeShip = (shipLength, startCoordinates, isVertical) => {
        const ship = shipFactory(shipLength);
        const [startX, startY] = startCoordinates;

        if (isVertical) {
            checkIfShipFits(startY)
            for (let y = startY; y < (startY + shipLength), y++;) {
                const coordinateBox = gameBoard[`coordinates${startX},${y}`];
                checkIfHasShip(coordinateBox);
                coordinateBox.hasShip = true
                ship.hitboxes.push(coordinateBox);
            }
        } else {
            checkIfShipFits(startX)
            for (let x = startX; x < startX + shipLengthh; x++) {
                const coordinateBox = gameBoard[`coordinates${x},${startY}`];
                checkIfHasShip(coordinateBox);
                coordinateBox.hasShip = true
                ship.hitboxes.push(coordinateBox);
            }
        };

        return ship
    }

    const checkIfAttackIsValid = (x, y) => {
        if (x < 1 || x >= 11 || y < 1 || y >= 11) {
            return false
        }
    }

    const checkIfBoxIsAlreadyAttacked = (x, y) => {
        if (gameBoard[`coordinates${x},${y}`].isHit) {
            return false
        }
    }

    const findShipByCoordinates = (coordinates) => {
        for (const ship of Object.values(ships)) {
          for (const hitbox of ship.hitboxes) {
            if (hitbox.coordinates === coordinates) {
              return ship;
            }
          }
        }
        return null; // Return null if no ship with matching coordinates is found
      };
      
    

    const receiveAttack = (x: number, y: number) => {
        checkIfAttackIsValid(x, y)

        if(gameBoard[`coordinates${x},${y}`]) {
            checkIfBoxIsAlreadyAttacked(x, y);
            gameBoard[`coordinates${x},${y}`].changeIsHit();
            if (gameBoard[`coordinates${x},${y}`].hasShip) {
                const ship = findShipByCoordinates(`${x}, ${y}`)
                ship.addHit()
            }
        }
    }
}
})();
