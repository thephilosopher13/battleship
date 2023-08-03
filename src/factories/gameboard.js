import shipModule from "./ship";

const gameboardModule = (() => {

    const coordinateBoxFactory = (x, y) => {

        const changeIsHit = function() {
            this.isHit = true
        }

        return {
            coordinates: `${x}, ${y}`,
            isHit: false,
            changeIsHit
        }
    }

    const gameboardFactory = () => {
        const gameBoard = {}

        const initializeGameboardBoxes = () => {
            for (let i = 1; i <= 10; i++) {
                for (let j = 1; j <= 10; j++){
                    const coordinateBox = coordinateBoxFactory(i, j)
                    gameBoard[`coordinates${i},${j}`] = coordinateBox
                }
            }
        }

        const placeShip = ()
    }

})();