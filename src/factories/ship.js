const shipFactory = (numberOfHitboxes) => {
    const ship = {
        hitboxes: [],
        length: numberOfHitboxes,
        hits: 0,
        isSunk: false,
    };
  

    const sinkShip = function() {
        ship.isSunk = true
    }

    ship.addHit = function(x, y) {
        this.hits += 1;
            if (this.hits === this.length) {
                sinkShip()
            }
        }

    return ship
}

export default shipFactory