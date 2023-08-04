const shipModule = (() => {
  const shipFactory = (numberOfHitboxes) => {
    const ship = {
      hitboxes: [],
      length: numberOfHitboxes,
      hits: 0,
      isSunk: false,
    };

    for (let i = 1; i <= numberOfHitboxes; i++) {
      const hitbox = hitboxFactory();
      ship[`hitbox${i}`] = hitbox;
    }

    const sinkShip = function () {
      ship.isSunk = true;
    };

    ship.addHit = function () {
      // Loop through each hitbox and check if it's hit
      for (let i = 1; i <= numberOfHitboxes; i++) {
        if (this[`hitbox${i}`].isHit) {
          this.hits += 1;
          if (this.hits === this.length) {
            sinkShip();
          }
        }
      }
    };
    return ship;
  };

  return {
    shipFactory,
  };
})();

export default shipModule;

/*

1. create 'hitbox' factory with coordinates and isHit as the properties (with isHit initally false)
1.1. make a method inside hitboxFactory called 'setCoordinates'

1. create a factory function 'shipFactory' that has number of hitboxes as arguments
*/
