import gameboardModule from "../gameboard"

describe('Gameboard', () => {
    let gameboard

    beforeEach (() => {
        gameboard = gameboardModule.gameboardFactory()
        gameboard.initializeGameboardBoxes()
        gameboard.placeShip(3, [2,4], true)
        
    })

    test('check if certain box exists', () => {
        expect((gameboard[`coordinates2,3`]).coordinates).toBe(`2,3`)
    })

    test('check if default isHit is false', () => {
        expect((gameboard[`coordinates2,3`]).isHit).toBe(false)
    })

    test('check if default isHit is false', () => {
        expect((gameboard[`coordinates2,3`]).isHit).toBe(false)
    })

    test('check if default hasShip is false', () => {
        expect((gameboard[`coordinates2,3`]).hasShip).toBe(false)
    })

    test('check if ship has correct length', () => {
        expect((gameboard.thisBoardsShips[0]).length).toBe(3)
    })

    test('check if ship has correct hitboxes', () => {
        expect((((gameboard.thisBoardsShips[0]).hitboxes)[0]).coordinates).toBe("2,4")
        expect((((gameboard.thisBoardsShips[0]).hitboxes)[2]).coordinates).toBe("2,6")
    })

    test('check if receiveAttack is working properly', () => {
        gameboard.receiveAttack(2,4)
        gameboard.receiveAttack(2,5)
        expect((gameboard.thisBoardsShips[0]).hits).toBe(2)
    })

    test('check if ship sinking works properly', () => {
        gameboard.receiveAttack(2,4)
        gameboard.receiveAttack(2,5)
        gameboard.receiveAttack(2,6)
        expect((gameboard.thisBoardsShips[0]).isSunk).toBe(true)
    })
    
})