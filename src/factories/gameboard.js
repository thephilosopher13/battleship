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
      coordinates: `${x},${y}`,
      isHit: false,
      hasShip: false,
      changeIsHit,
      changeHasShip,
    };
  };

  const gameboardFactory = () => {
    const gameBoard = {};
    gameBoard.thisBoardsShips = []

    gameBoard.initializeGameboardBoxes = () => {
      for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
          const coordinateBox = coordinateBoxFactory(i, j);
          gameBoard[`coordinates${i},${j}`] = coordinateBox;
        }
      }
    };

    const checkIfShipFits = (start, length) => {
        if (start + (length - 1) > 10) return true
    }

    const checkIfPositionValid = ((row, column) => (row < 1 || row > 10 || column < 1 || column > 10))

    const checkIfHasShip = (coordinateBox) => {
        if (coordinateBox.hasShip) return true
    }

    const checkIfNeighborFieldsTaken = (isVertical, ship, row, column) => {
      for (let i = 0; i < ship.length; i++) {
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            const check = isVertical ? ( row + x + i < 0 || row + x + i >= 11 || column + y < 1 || column + y >= 11 ) : ( row + x < 1 || row + x >= 11 || column + y + i < 1 || column + y + i >= 11 )
            if (check) continue
            const coordinates = isVertical ? gameBoard[`coordinates${row + x + i},${column + y}`] : gameBoard[`coordinates${row + x},${column + y + i}`]
            if (coordinates.hasShip) return true
          }
        }
      }
    }


    const isPlacementPossible = (ship, row, column, isVertical) => {
      if (checkIfPositionValid(row, column)) return false
      const shipFitCheck = isVertical ? checkIfShipFits(row, ship.length) : checkIfShipFits(column, ship.length)
      if (shipFitCheck) return false
      if (checkIfNeighborFieldsTaken(isVertical, ship, row, column)) return false

      return true
    }

    const shipValidityCheck = (coordinates, ship, row, column, isVertical) => {
      if (checkIfHasShip(coordinates)) {
        return false
      } else if (!isPlacementPossible(ship, row, column, isVertical)) {
        return false
      } else {
        return true
      }
    }

    // below is a helper function so that I only have to type the loop once
    const placeShipAtCoordinates = (ship, isVertical, primaryStartCoord, secondaryStartCoord, length) => {
      for (let i = primaryStartCoord; i < (primaryStartCoord + length); i++) {
        const coordinateBox = isVertical === true ? gameBoard[`coordinates${secondaryStartCoord},${i}`]  : gameBoard[`coordinates${i},${secondaryStartCoord}`];
        coordinateBox.hasShip = true
        ship.hitboxes.push(coordinateBox);
      } 
      gameBoard.thisBoardsShips.push(ship)
    }

    gameBoard.placeShip = (shipLength, startCoordinates, isVertical) => {
        const ship = shipFactory(shipLength);
        const [startX, startY] = startCoordinates;

        if (isVertical) {
          if (!shipValidityCheck(gameBoard[`coordinates${startX},${startY}`], ship, startX, startY, true)) {
            return // insert error here
          } else {
            placeShipAtCoordinates(ship, true, startY, startX, shipLength)
          }
        } else {
          if (!shipValidityCheck(gameBoard[`coordinates${startX},${startY}`], ship, startX, startY, false)) {
            return // insert error here
          } else {
            placeShipAtCoordinates(ship, false, startY, startX, shipLength)
          }
        }
      }
  

    const checkIfAttackIsValid = (x, y) => !(x < 1 || x >= 11 || y < 1 || y >= 11);

    const checkIfBoxIsAlreadyAttacked = (x, y) => {
        if (gameBoard[`coordinates${x},${y}`].isHit) {
            return false
        }
    }

    const findShipByCoordinates = (coordinates) => {
        for (const ship of gameBoard.thisBoardsShips) {
          for (const hitbox of ship.hitboxes) {
            if (hitbox.coordinates === coordinates) {
              return ship;
            }
          }
        }
        return null; // Return null if no ship with matching coordinates is found
      };

    const areAllSunk = (array) => array.every((obj) => obj.isSunk);
      
    gameBoard.receiveAttack = (x, y) => {
        checkIfAttackIsValid(x, y)

        if(gameBoard[`coordinates${x},${y}`]) {
            checkIfBoxIsAlreadyAttacked(x, y);
            gameBoard[`coordinates${x},${y}`].changeIsHit();
            if (gameBoard[`coordinates${x},${y}`].hasShip) {
                const ship = findShipByCoordinates(`${x},${y}`)
                ship.addHit()
                areAllSunk(gameBoard.thisBoardsShips)
                isGameOver(gameBoard.thisBoardsShips)
            } 
        }
    }

    const isGameOver = (array) => {
      if (areAllSunk(array)) {
        gameOverScenario()
      } else {
        return 
      }
    }

    gameBoard.gameOverScenario = () => {}

    return gameBoard
  }

  return {
    gameboardFactory
  }

})();

export default gameboardModule