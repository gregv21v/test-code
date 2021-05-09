/**
  Plot - a plot of land that can be farmed on
*/
define(
  ["game/Slot", "d3"],
  function(Slot, d3) {
    return class CraftingOutputSlot extends Slot {
      /**
        constructor()
        @description constructs the slot
        @param grid the grid that this slot will be attached to
        @param position the position that this slot is on the svg canvas
      */
      constructor(crafter, gridManager, position) {
        super(gridManager, position)

        this._crafter = crafter;
        this._itemsConsumed = false;
      }


      /********************************************************
                        Mouse Interactions
      *********************************************************/

      /**
        onDragEnd()
        @description the function that is called when you end dragging a
          unit
      */
      onDragEnd(event) {
        var tempUnit = this._unit;
        this.removeUnit()
        this._gridManager.snapToClosestSlot(tempUnit)
        this._itemsConsumed = false;
      }

      /**
        onDrag()
        @description the function that is called when you are dragging a
          unit
      */
      onDrag(event) {
        if(this._unit !== null) {
          this._unit.position = {
            x: event.x - Slot.size/2,
            y: event.y - Slot.size/2
          }

          if(!this._itemsConsumed) {
            this._crafter.consumeUnits()
            this._itemsConsumed = true;
          }
        }
      }

    }
  })
