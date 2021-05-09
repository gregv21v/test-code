define(
  [],
  function() {
    /**
     * ItemRegistry -- Keeps track of all the types of units in the game
     */
    return class UnitRegistry {
      static units = {}

      /**
        registerItem()
        @description registers a unit by name
        @param unit the unit to register
      */
      static register(unit) {
        this.units[unit.name] = unit;
      }


      /**
        lookup()
        @description look up a unit by name
        @param name the name of the unit
      */
      static lookup(name) {
        return this.units[name];
      }

    }
  }
)
