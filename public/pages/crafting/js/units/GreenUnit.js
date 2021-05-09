define(
  [
    "units/Unit", "d3"
  ],
  function(Unit, d3) {
    /**
      Unit
      @description the basic unit that makes up every pipe
        The Unit can snap to the world grid.
    */
    return class GreenUnit extends Unit {
      /**
        constructor()
        @description constructs the Unit class
      */
      constructor(position = {x: 0, y: 0}) {
        super(position, {fill: "green"})
      }

      /**
       * get name()
       * @description get the name of the Unit
       */
      get name() {
        return "GreenUnit"
      }

      /**
       * clone()
       * @description clone the unit
       */
      clone() {
        let temp = new GreenUnit()
        temp._quantity = this._quantity;
        temp._position = this._position;
        temp._styles = this._styles;

        return temp;
      }

    }
  }
)
