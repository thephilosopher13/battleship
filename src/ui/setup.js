import playerFactory from '../factories/player'


const setupModule = (() => {
    const shipsLengths = [5, 4, 3, 3, 2]
    let shipsPlacedCounter = 0

    let player = playerFactory('player1')
    let computer = playerFactory('computer')
    let players = [player, computer]
    let whoseTurnIsIt

    const createRotateButton = () => {
        const button = document.createElement('button')
        button.id = 'rotate-button'
        button.textContent = 'Rotate Ship'
        button.classList.add('false')
        button.addEventListener('click', () => {
            if (button.classList.contains('false')) {
                button.classList.remove('false')
                button.classList.add('true')
            } else {
                button.classList.remove('true')
                button.classList.add('false')
            }
        })

        return button
    }

    const coordinateBoxEventListener = (x, y) => {
        const button = document.getElementById('rotate-button')
        if (button.classList.contains('true')) {
            player.playerGameboard.placeShip(
                shipsLengths[shipsPlacedCounter],
                x,
                y,
                true,
                true
            )
            shipsPlacedCounter = player.playerGameboard.shipsPlacedCounter
            if (shipsPlacedCounter === 5) {
                startGame()
            }
        } else {
            player.playerGameboard.placeShip(
                shipsLengths[shipsPlacedCounter],
                x,
                y,
                false,
                true
            )
            shipsPlacedCounter = player.playerGameboard.shipsPlacedCounter
            if (shipsPlacedCounter === 5) {
                startGame()
            }
        }
    }

    const createGrid = () => {
        const gridContainer = document.createElement('div')
        gridContainer.classList.add('player1-grid')
        const gridDivTemplate = document.createElement('div')
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                const coordinateBox = gridDivTemplate.cloneNode()
                coordinateBox.id = `player1-coordinates${i},${j}`
                gridContainer.appendChild(coordinateBox)
                coordinateBox.addEventListener('click', () =>
                    coordinateBoxEventListener(i, j)
                )
            }
        }

        return gridContainer
    }

    const playerSetup = () => {
        const rotateButton = createRotateButton()
        const grid = createGrid()
        const contentDiv = document.getElementById('content')
        contentDiv.classList.add('setup')

        player = playerFactory('player1')
        computer = playerFactory('computer')
        players = [player, computer]
        whoseTurnIsIt
        shipsPlacedCounter = 0
 
        contentDiv.appendChild(rotateButton)
        contentDiv.appendChild(grid)
    }

    const computerSetup = () => {
        const computerGrid = generateComputerGrid()
        computer.playerGameboard.placeShipsRandomly()

        return computerGrid
    }

    const generateComputerGrid = () => {
        const gridContainer = document.createElement('div')
        gridContainer.classList.add('computer-grid')
        const gridDivTemplate = document.createElement('div')
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                const coordinateBox = gridDivTemplate.cloneNode()
                coordinateBox.id = `computer-coordinates${i},${j}`
                gridContainer.appendChild(coordinateBox)
            }
        }

        return gridContainer
    }

    const startGame = () => {
        const computerGrid = computerSetup()
        const contentDiv = document.getElementById('content')
        const rotateButton = document.getElementById('rotate-button')

        whoseTurnIsIt = 0

        contentDiv.classList.remove('setup')
        contentDiv.classList.add('game')
        rotateButton.remove()
        contentDiv.appendChild(computerGrid)

        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                const coordinateBox =
                    computer.playerGameboard[`coordinates${i},${j}`]
                const coordinateBoxDiv = document.getElementById(
                    `computer-coordinates${i},${j}`
                )
                if (coordinateBox.hasShip) {
                    coordinateBoxDiv.classList.add('has-ship')
                }
                coordinateBoxDiv.addEventListener('click', () => {
                    if (coordinateBoxDiv.classList.contains('attacked')) {
                        return false
                    }
                    player.attack(i, j, players)
                    coordinateBoxDiv.classList.add('attacked')
                    player.playerGameboard.isGameOverActivator(
                        player.playerGameboard.thisBoardsShips
                    )
                    if (checkIfGameOver(computer)) {
                        return endGame('Player')
                    } else {
                        switchTurn()
                    }
                    computer.randomAttack(players)
                    computer.playerGameboard.isGameOverActivator(
                        computer.playerGameboard.thisBoardsShips
                    )
                    if (checkIfGameOver(player)) {
                        return endGame('Computer')
                    } else {
                        switchTurn()
                    }
                })
            }
        }

        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                const coordinateBox = document.getElementById(
                    `player1-coordinates${i},${j}`
                )
                coordinateBox.removeEventListener('click', () =>
                    coordinateBoxEventListener(i, j)
                )
            }
        }
    }

    const switchTurn = () => {
        if (whoseTurnIsIt === 0) {
            whoseTurnIsIt = 1
        } else if (whoseTurnIsIt === 1) {
            whoseTurnIsIt = 0
        }
    }

    const checkIfGameOver = (currentPlayer) => {
        if (currentPlayer.playerGameboard.isGameOver) {
            return true
        } else {
            return false
        }
    }

    const endGame = (winningPlayer) => {
        const div = document.createElement('div')
        const modalDiv = div.cloneNode()
        const modalContentDiv = div.cloneNode()
        const modalContentText = document.createElement('p')
        const restartGameButton = document.createElement('button')
        const body = document.querySelector('body')

        modalDiv.id = 'modal'
        modalContentDiv.id = 'modal-content'
        modalContentText.id = 'modal-content-text'
        modalContentText.textContent = `${winningPlayer} wins!`
        restartGameButton.id = 'restart-button'
        restartGameButton.textContent = 'Reset Game'

        modalDiv.appendChild(modalContentDiv)
        modalContentDiv.appendChild(modalContentText)
        modalContentDiv.appendChild(restartGameButton)
        body.appendChild(modalDiv)

        restartGameButton.addEventListener('click', () => {
            modalDiv.innerHTML = ''
            modalDiv.remove()
            const contentDiv = document.getElementById('content')
            contentDiv.classList.remove('game')
            contentDiv.innerHTML = ''
            playerSetup()
        })
    }

    return {
        playerSetup,
        startGame,
    }
})()

export default setupModule
