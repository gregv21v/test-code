define(
  [
    "multiunits/MultiUnitItem", "game/Slot", "d3"
  ],
  function(MultiUnitItem, Slot, d3) {
    /**
      Grid -- the snapping grid to snap Units to.
    */
    return class Grid {
      /**
        constructor()
        @description constructs the snapping grid
        @param gridManager the grid manager that manages all the grids
        @param rows the number of rows in the grid
        @param columns the number of columns in the grid
      */
      constructor(gridManager, rows, columns) {
        this._columns = columns; // the number of columns in the grid
        this._rows = rows; // the number of rows in th grid

        // the svg graphics that represent the grid
        this._svg = {
          group: d3.create("svg:g"),
          layers: {}
        }
        // the svg layers that represent the grid
        this._svg.layers = {
          slots: this._svg.group.append("g"),
          units: this._svg.group.append("g")
        }

        this._slots = []
        // create the slots
        for (var x = 0; x < this._columns; x++) {
          var row = []
          for (var y = 0; y < this._rows; y++) {
            var slot = new Slot(gridManager, {x: x, y: y}, {x: Slot.size * x, y: Slot.size * y})
            row.push(slot)
          }
          this._slots.push(row)
        }
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
        for (var x = 0; x < this._columns; x++) {
          for (var y = 0; y < this._rows; y++) {
            this._slots[x][y].addGraphicsTo(this._svg.layers.slots);
          }
        }
      }

      /**
        initSVG()
        @description initializes the attributes and styles of the grid's svgs
      */
      initSVG() {
        for (var x = 0; x < this._columns; x++) {
          for (var y = 0; y < this._rows; y++) {
            this._slots[x][y].initSVG()
          }
        }
      }

      /**
       * withinBounds()
       * @description checks if the given slot coordinate is within the bounds
       *  of this inventory
       * @param coordinate the coordinate of the slot
       */
      withinBounds(coordinate) {
        return (
          (coordinate.x <= this._columns && coordinate.x >= 0) &&
          (coordinate.y <= this._columns && coordinate.y >= 0)
        )
      }

      /********************************************************
                          Getters and Setters
      *********************************************************/

      /**
        get width()
        @description gets the width of the grid
      */
      get width() {
        return Slot.size * this._columns
      }

      /**
        get height()
        @description gets the height of the grid
      */
      get height() {
        return Slot.size * this._rows
      }

      /**
        addUnit()
        @description adds a unit to a specified x, and y coordinate
          in the grid
        @param x the x coordinate to add the unit to
        @param y the y coordinate to add the unit to
        @param unit the unit to add
      */
      addUnit(x, y, unit) {
        if(unit instanceof MultiUnitItem) {
          for (var i = 0; i < unit.coordinates.length; i++) {
            // check if all the units in the MultiUnitItem are within the bounds
            // of the inventory
            if(!this.withinBounds(unit.coordinates[i])) {
              console.warn("MultiUnitItem out of bounds");
              return;
            }

          }

          for (var i = 0; i < unit.units.length; i++) {
            this.addUnit(x + unit.coordinates[i].x, y + unit.coordinates[i].y, unit.units[i])
          }
        } else { // is a single unit
          this._slots[x][y].addUnit(unit, this._svg.layers.units);
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
      }





      /**
        getClosestSlot()
        @description get the closest slot to the given unit
        @param unit the unit to find the closest slot to
      */
      getClosestSlot(unit) {
        var distance = this._slots[0][0].distanceTo(unit);
        var closestSlot = this._slots[0][0];
        for (var x = 0; x < this._columns; x++) {
          for (var y = 0; y < this._rows; y++) {
            var tempDistance = this._slots[x][y].distanceTo(unit)
            if(tempDistance <= distance) {
              distance = tempDistance;
              closestSlot = this._slots[x][y];
            }
          }
        }
        return closestSlot;
      }

      /**
        snapToClosestSlot()
        @description snap a given unit to the closest slot
        @param unit the unit to snap to the closest slot
      */
      snapToClosestSlot(unit) {
        var closestSlot = this.getClosestSlot(unit)
        this.addUnitToSlot(closestSlot, unit)
      }

      /**
        moveTo()
        @description moves the grid to a new position
        @param position position to move to
      */
      moveTo(position) {
        for (var x = 0; x < this._columns; x++) {
          for (var y = 0; y < this._rows; y++) {
            this._slots[x][y].position = {
              x: position.x + Slot.size * x,
              y: position.y + Slot.size * y
            }
          }
        }
      }


      /********************************************************
                          Mouse Interactions
      *********************************************************/


    }
  }
)
