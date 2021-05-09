define(
  [],
  function() {
    return class CraftingInput {
      /**
        constructor()
        @description constructs the recipe
        @param units a 3x3 array of units
      */
      constructor(units) {
        this.units = units;
      }

      /**
       * getKey()
       * @description get the string of inputs as a key
       */
      getKey() {
        var key = "";
        for (var y = 0; y < this.units.length; y++) {
          for (var x = 0; x < this.units[y].length; x++) {
            key += this.units[x][y].name + "_";
          }
        }
        console.log(key);
        return key;
      }

    }
  }
)
