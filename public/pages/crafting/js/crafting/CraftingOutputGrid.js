define(
  [
    "game/Slot", "game/Grid", "crafting/CraftingOutputSlot", "d3"
  ],
  function(Slot, Grid, CraftingOutputSlot, d3) {
    /**
      Grid -- the snapping grid to snap Units to.
    */
    return class CraftingOutputGrid extends Grid {
      /**
        constructor()
        @description constructs the snapping grid
        @param craftingGrid the grid to craft the units in
        @param gridManager the grid manager that manages all the grids
        @param rows the number of rows in the grid
        @param columns the number of columns in the grid
      */
      constructor(crafter, gridManager) {
        super(gridManager, 1, 1)

        this._slots = new CraftingOutputSlot(crafter, gridManager, this._position)
      }

      /********************************************************
                          Graphics Methods
      *********************************************************/
      /**
        addGraphicsTo()
        @description adds the graphics to a parent svg object
        @param parent the svg to add the graphics to
      */
      addGraphicsTo(parent) {
        parent.append(() => this._svg.group.node())
        this._slots.addGraphicsTo(this._svg.layers.slots);
      }

      /**
        initSVG()
        @description initializes the attributes and styles of the grid's svgs
      */
      initSVG() {
        this._slots.initSVG()
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
        this._slots.addUnit(unit, this._svg.layers.units)
      }

      /**
        addUnitToSlot()
        @description adds a unit to a specified slot
        @param slot the slot to add the unit to
        @param unit the unit to add
      */
      addUnitToSlot(slot, unit) {
        console.warn("Function addUnitToSlot unavailable for CraftingOutputGrid");
      }


      /**
        getClosestSlot()
        @description get the closest slot to the given unit
        @param unit the unit to find the closest slot to
      */
      getClosestSlot(unit) {
        return this._slots;
      }

      /**
        snapToClosestSlot()
        @description snap a given unit to the closest slot
        @param unit the unit to snap to the closest slot
      */
      snapToClosestSlot(unit) {
        console.warn("Function snapToClosestSlot unavailable for CraftingOutputGrid");
      }

      /**
        moveTo()
        @description moves the grid to a new position
        @param position position to move to
      */
      moveTo(position) {
        this._slots.position = {
          x: position.x,
          y: position.y
        }
      }
    }
  }
)
