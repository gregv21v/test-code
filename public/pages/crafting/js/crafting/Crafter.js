define(
  [
    "crafting/CraftingOutputGrid",
    "crafting/CraftingGrid",
    "game/Slot"
  ],
  function(CraftingOutputGrid, CraftingGrid, Slot) {
    /**
     * Crafter - a gui that manages crafting
     */
    return class Crafter {
      /**
        constructor()
        @description constructs the crafter
        @param gridManager the grid manager to manage the grids
        @param position the position to put the crafter
      */
      constructor(gridManager, position) {
        this._position = position;
        this._gridManager = gridManager
        this._craftingGrid = new CraftingGrid(this, gridManager, 3, 3);
        this._outputSlot = new CraftingOutputGrid(this, gridManager);

        this._gridManager.addGrid(this._craftingGrid)
        this._gridManager.addGrid(this._outputSlot)
      }


      /**
       * get width()
       * @description gets the width of the crafter
       */
      get width() {
        return this._craftingGrid.width + this._outputSlot.width + Slot.size;
      }

      /**
       * get height()
       * @description gets the height of the crafter
       */
      get height() {
        return this._craftingGrid.height
      }


      /**
       * moveTo()
       * @description move the crafter to a different location
       */
       moveTo(position) {
         this._position = position;
         this._craftingGrid.moveTo({
           x: position.x,
           y: position.y
         })

         this._outputSlot.moveTo({
           x: position.x + this._craftingGrid.width + Slot.size,
           y: position.y + this._craftingGrid.height / 2 - Slot.size / 2
         })
       }

       /**
         initSVG()
         @description initializes the attributes and styles of the crafter's svgs
       */
       initSVG() {
         this._outputSlot.initSVG();
         this._craftingGrid.initSVG();
       }

       /**
         addGraphicsTo()
         @description initializes the attributes and styles of the crafter's svgs
         @param parent the parent svg to attach the crafter to
       */
       addGraphicsTo(parent) {
         this._craftingGrid.addGraphicsTo(parent)
         this._outputSlot.addGraphicsTo(parent)
       }

       /**
         outputUnit()
         @description adds a unit to the output slot
         @param unit the unit to add to the output
       */
       outputUnit(unit) {
         this._outputSlot.addUnit(0, 0, unit)
       }

       /**
        * consumeUnits()
        * @description consume all the units used in the crafting recipe
        */
      consumeUnits() {
        this._craftingGrid.consumeUnits()
      }




    }
  }
)
