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
    return class OrangeUnit extends Unit {
      /**
        constructor()
        @description constructs the Unit class
      */
      constructor(position) {
        super(position, {fill: "orange"})
      }

      /**
       * get name()
       * @description get the name of the Unit
       */
      get name() {
        return "OrangeUnit"
      }

      /**
       * clone()
       * @description clone the unit
       */
      clone() {
        let temp = new OrangeUnit()
        temp._quantity = this._quantity;
        temp._position = this._position;
        temp._styles = this._styles;

        return temp;
      }
    }
  }
)
