define(
  [
    "crafting/CraftingRegistry", "crafting/CraftingInput",
    "units/EmptyUnit",
    "game/Grid", "game/Slot", "d3"
  ],
  function(
    CraftingRegistry, CraftingInput,
    EmptyUnit,
    Grid, Slot, d3
  ) {
    /**
      Grid -- the snapping grid to snap Units to.
    */
    return class CraftingGrid extends Grid {
      /**
        constructor()
        @description constructs the snapping grid
        @param gridManager the grid manager that manages all the grids
        @param rows the number of rows in the grid
        @param columns the number of columns in the grid
      */
      constructor(crafter, gridManager, rows, columns) {
        super(gridManager, rows, columns)

        this._crafter = crafter
      }


      /**
       * convertToCraftingInput()
       * @description convert the crafting grid to a crafting input instance
       */
       convertToCraftingInput() {
         var grid = []
         for (var y = 0; y < this._rows; y++) {
           var row = []
           for (var x = 0; x < this._columns; x++) {
             if(this._slots[x][y].unit === null) {
               row.push(new EmptyUnit())
             } else {
               row.push(this._slots[x][y].unit)
             }
           }
           grid.push(row)
         }
         console.log(grid);
         return new CraftingInput(grid);
       }

       /**
        * consumeUnits()
        * @description consume the units after a crafted item is removed from the output
        *   slot
        */
      consumeUnits() {
        for (var y = 0; y < this._rows; y++) {
          for (var x = 0; x < this._columns; x++) {
            this._slots[x][y].destroyUnit();
          }
        }
      }


      /********************************************************
                          Getters and Setters
      *********************************************************/

      /**
        addUnit()
        @description adds a unit to a specified x, and y coordinate
          in the grid
        @param x the x coordinate to add the unit to
        @param y the y coordinate to add the unit to
        @param unit the unit to add
      */
      addUnit(x, y, unit) {
        this._slots[x][y].addUnit(unit, this._svg.layers.units);
        // look up the current formation of items in the CraftingRegistry
        var recipe = CraftingRegistry.lookup(this.convertToCraftingInput())
        if(recipe !== undefined) {
          this._crafter.outputUnit(recipe.output.clone())
        }
      }

      /**
        addUnitToSlot()
        @description adds a unit to a specified slot
        @param slot the slot to add the unit to
        @param unit the unit to add
      */
      addUnitToSlot(slot, unit) {
        slot.addUnit(unit, this._svg.layers.units);

        // look up the current formation of items in the CraftingRegistry
        var recipe = CraftingRegistry.lookup(this.convertToCraftingInput())
        if(recipe !== undefined) {
          this._crafter.outputUnit(recipe.output.clone())
        }
      }


    }
  }
)
