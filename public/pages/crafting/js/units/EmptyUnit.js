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
      constructor(position) {
        super(position, {fill: "green"})
      }

      /**
       * get name()
       * @description get the name of the Unit
       */
      get name() {
        return "EmptyUnit"
      }

    }
  }
)
