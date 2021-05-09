define(
  [
    "units/Unit",
    "game/Slot"
  ],
  function(Unit, Slot) {
    /**
     * MultiUnit - a unit made of multiple units that move as one
     */
    return class MultiUnitItem {
      /**
       * constructor()
       * @description constructs the MultiUnitItem
       */
      constructor(position = {x: 0, y: 0}) {
        this._position = position
        this._units = []; // the units that make up the MultiUnitItem
        this._coordinates = []; // the coordinates of each unit relative to the start unit
      }

      /**
       * addUnit()
       * @description add a unit to this MultiUnitItem
       * @param unit the unit to add
       * @param x the x coordinate to add the unit to
       * @param y the y coordinate to add the unit to
       */
      addUnit(unit, x, y) {
        unit.position = {
          x: this._position.x + Slot.size * x,
          y: this._position.y + Slot.size * y
        }
        unit.multiUnit = this;
        this._units.push(unit)
        this._coordinates.push({x: x, y: y})
      }

      /**
       * initSVG()
       * @description initializes the svgs of this MultiUnitItem
       */
      initSVG() {
        for (let unit of this._units) {
          unit.initSVG()
        }
      }

      /**
       * addGraphicsTo()
       * @description add the graphics of each unit to a group/element specifed
       * @param parent parent to add the graphics to
       */
      addGraphicsTo(parent) {
        for (var unit of this._units) {
          unit.addGraphicsTo(parent);
        }
      }


      /********************************************************
                          Getters & Setters
      *********************************************************/

      /**
       * get position
       * @description get the position
       */
      get position() {
        return this._position;
      }

      /**
       * set position
       * @description sets the position
       * @param value the value to set the position to
       */
      set position(value) {
        this._position = value;

        // set the position of the units
        for (var i = 0; i < this._units.length; i++) {
          this._units[i].position = {
            x: this._position.x + this._coordinates[i].x * Slot.size,
            y: this._position.y + this._coordinates[i].y * Slot.size
          }
        }
      }

      /**
       * get coordinates
       * @description get coordinates
       */
      get coordinates() {
        return this._coordinates;
      }

      /**
       * get units
       * @description get units
       */
      get units() {
        return this._units;
      }
    }
  }
)
