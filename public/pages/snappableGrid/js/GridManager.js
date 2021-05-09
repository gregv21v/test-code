define(
  [
    "game/Grid"
  ],
  function(Grid) {
    /**
      MultipleGrids - combination of all the currently active grids
    */
    return class GridManager {
      /**
        constructor()
        @description constructs the MultipleGrids object
      */
      constructor() {
        this._grids = []
      }

      /**
        addGrid()
        @description adds a new grid to the grid manager
        @param grid the grid to add
      */
      addGrid(grid) {
        this._grids.push(grid);
        return grid;
      }

      /**
        addGrid()
        @description adds a new grid to the grid manager
        @param rows the number of rows in the grid
        @param columns the number of columns in the grid
      */
      createGrid(rows, columns) {
        var grid = new Grid(this, rows, columns)
        this._grids.push(grid);
        return grid;
      }


      /**
        getClosestSlot()
        @description get the closest slot to the given unit
        @param unit the unit to find the closest slot to
      */
      getClosestSlot(unit) {
        console.log(this._grids);
        var distance = this._grids[0].getClosestSlot(unit).distanceTo(unit)
        var closest = {
          slot: this._grids[0].getClosestSlot(unit),
          grid: 0
        }
        if(this._grids.length > 1) {
          for (var x = 1; x < this._grids.length; x++) {
            var tempSlot = this._grids[x].getClosestSlot(unit)
            var tempDistance = tempSlot.distanceTo(unit);
            if(tempDistance <= distance) {
              distance = tempDistance;
              closest.slot = tempSlot;
              closest.grid = x;
            }
          }
        }
        return closest;
      }

      /**
        snapToClosestSlot()
        @description snap a given unit to the closest slot
        @param unit the unit to snap to the closest slot
      */
      snapToClosestSlot(unit) {
        var closest = this.getClosestSlot(unit)
        this._grids[closest.grid].addUnitToSlot(closest.slot, unit);
      }
    }
  }
)
