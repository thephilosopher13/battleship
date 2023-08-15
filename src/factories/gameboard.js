import shipFactory from "./ship";
import setupModule from "../ui/setup";


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
    gameBoard.isGameOver = false
    gameBoard.shipsPlacedCounter = 0

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

    const checkIfAllSlotsExist = (isVertical, ship, row, column) => {
      if (isVertical) {
        for (let i = 0; i < ship.length; i++) {
          if (!gameBoard[`coordinates${row + i},${column}`] || row + i > 10) {
            return true;
          }
        } 
      } else {
        for (let i = 0; i < ship.length; i++) {
          if (!gameBoard[`coordinates${row},${column + i}`] || column + i > 10) {
            return true;
          }
        }
      }
      return false;
    };
    
    
    

    const checkIfAnyShipSlotsTaken = (isVertical, ship, row, column) => {
      if (isVertical) {
        for (let i = 0; i < ship.length; i++) {
          if (row + i > 10 || gameBoard[`coordinates${row + i},${column}`].hasShip || (gameBoard[`coordinates${row + i},${column}`].hasShip) === undefined) {
            return true;
          }
        } 
      } else {
        for (let i = 0; i < ship.length; i++) {
          if (column + i > 10 || gameBoard[`coordinates${row},${column + i}`].hasShip || (gameBoard[`coordinates${row},${column + i}`].hasShip) === undefined) {
            return true;
          }
        }
      }
    }
    


    const isPlacementPossible = (ship, row, column, isVertical) => {
      if (checkIfPositionValid(row, column)) return false
      const shipFitCheck = isVertical ? checkIfShipFits(row, ship.length) : checkIfShipFits(column, ship.length)
      console.log(shipFitCheck)
      if (shipFitCheck) return false
      if (checkIfAllSlotsExist(isVertical, ship, row, column)) return false
      if (checkIfAnyShipSlotsTaken(isVertical, ship, row, column)) return false

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
    const placeShipAtCoordinates = (ship, isVertical, x, y, length, isPlayer) => {
      if (isVertical) {
        for (let i = x; i < (x + length); i++) {
          const coordinateBox = gameBoard[`coordinates${i},${y}`]
          if (isPlayer) {
            const coordinateBoxDiv = document.getElementById(`player1-coordinates${i},${y}`)
            coordinateBoxDiv.classList.add('has-ship')
          }
          coordinateBox.hasShip = true
          ship.hitboxes.push(coordinateBox);
        }
      } else {
        for (let i = y; i < (y + length); i++) {
          const coordinateBox = gameBoard[`coordinates${x},${i}`]
          if (isPlayer) {
            const coordinateBoxDiv = document.getElementById(`player1-coordinates${x},${i}`)
            coordinateBoxDiv.classList.add('has-ship')
          }
          coordinateBox.hasShip = true
          ship.hitboxes.push(coordinateBox);
        }
      }
      gameBoard.thisBoardsShips.push(ship)
      gameBoard.shipsPlacedCounter++
    }


    gameBoard.placeShip = (shipLength, x, y, isVertical, isPlayer) => {
        const ship = shipFactory(shipLength);

        if (isVertical) {
          if (!shipValidityCheck(gameBoard[`coordinates${x},${y}`], ship, x, y, true)) {
            return false
          } else {
            placeShipAtCoordinates(ship, true, x, y, shipLength, isPlayer)
          }
        } else {
          if (!shipValidityCheck(gameBoard[`coordinates${x},${y}`], ship, x, y, false)) {
            return false
          } else {
            placeShipAtCoordinates(ship, false, x, y, shipLength, isPlayer)
          }
        }
      }
    
    const shipPlacerForAI = (array, shipLength) => {
        const row = Math.floor(Math.random() * 10) + 1;
        const column = Math.floor(Math.random() * 10) + 1;
        const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false
        gameBoard.placeShip(shipLength, row, column, isVertical, false)
    }

    gameBoard.placeShipsRandomly = () => {

      while (gameBoard.thisBoardsShips.length === 0) {
        shipPlacerForAI(gameBoard.thisBoardsShips.length, 5)
      }
      while (gameBoard.thisBoardsShips.length  === 1) {
        shipPlacerForAI(gameBoard.thisBoardsShips.length, 4)
      }
      while (gameBoard.thisBoardsShips.length  === 2) {
        shipPlacerForAI(gameBoard.thisBoardsShips.length, 3)
      }
      while (gameBoard.thisBoardsShips.length  === 3) {
        shipPlacerForAI(gameBoard.thisBoardsShips.length, 3)
      }
      while (gameBoard.thisBoardsShips.length  === 4) {
        shipPlacerForAI(gameBoard.thisBoardsShips.length, 2)
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
                gameBoard.isGameOverActivator(gameBoard.thisBoardsShips)
            } 
        }
    }

    gameBoard.isGameOverActivator = (array) => {
      if (areAllSunk(array)) {
        gameBoard.isGameOver = true
      } else {
        return 
      }
    }

    gameBoard.initializeGameboardBoxes()

    return gameBoard
  }

  return {
    gameboardFactory
  }

})();

export default gameboardModule