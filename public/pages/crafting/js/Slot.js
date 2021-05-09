/**
  Plot - a plot of land that can be farmed on
*/
define(
  ["d3"],
  function(d3) {
    return class Slot {
      _position = {x: 0, y: 0}
      _svg = {
        group: d3.create("svg:g")
      }
      static size = 50
      /**
        constructor()
        @description constructs the slot
        @param grid the grid that this slot will be attached to
        @param position the position that this slot is on the svg canvas
      */
      constructor(gridManager, coordinate, position) {
        this._coordinate = coordinate
        this._unit = null; // the unit attached to this slot
        this._position = position; // the position of this slot on the svg
        this._gridManager = gridManager; // the grid this slot is contained in

        // the graphics of the slot
        this._svg.background = this._svg.group.append("rect")
        this._svg.unitGroup = this._svg.group.append("g")
        this._svg.clickArea = this._svg.group.append("rect")
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
      }

      /**
        initSVG()
        @description initialize the values for the svg
      */
      initSVG() {
        var self = this;

        // intialize the background
        this._svg.background
          .attr("x", this._position.x)
          .attr("y", this._position.y)
          .attr("width", Slot.size)
          .attr("height", Slot.size)
          .style("fill", "grey")
          .style("fill-opacity", 0.5)
          .style("stroke", "black")
          .style("stroke-width", 3)

        // initialize the click
        this._svg.clickArea
          .attr("x", this._position.x)
          .attr("y", this._position.y)
          .attr("width", Slot.size)
          .attr("height", Slot.size)
          .style("fill-opacity", 0)
          .on("click", function() {self.onClick()})
          .on("mouseover", function() {self.onMouseEnter()})
          .on("mouseout", function() {self.onMouseLeave()})
          .on("mouseup", function() {self.onMouseUp()})
          .on("contextmenu", function() {self.onContextMenu(event)})
          //.on("mousedown", function() {self.onMouseDown()})
      }


      /********************************************************
                          Getters & Setters
      *********************************************************/
      /**
        set position()
        @description sets the position of this slot
        @param position the new position of this slot
      */
      set position(position) {
        // update the unit's position
        if(this._unit !== null) {
          this._unit.position = {
            x: position.x + 5,
            y: position.y + 5
          }
        }
        this._position = position

        // update the svg positions
        this._svg.clickArea
          .attr("x", this._position.x)
          .attr("y", this._position.y)

        this._svg.background
          .attr("x", this._position.x)
          .attr("y", this._position.y)
      }

      /**
        get position()
        @description gets the position of the slot
      */
      get position() {
        return this._position
      }

      /**
       * get coordinate
       * @description gets the coordinate of this slot in the inventory grid
       */
      get coordinate() {
        return this._coordinate;
      }


      /**
        addUnit()
        @description adds a unit for this slot
        @param unit unit to put in this slot
        @param layer the graphics layer to add the unit to
      */
      addUnit(unit, layer) {
        if(this._unit === null) {

          // update the unit
          this._unit = unit;
          this._unit.position = {
            x: this._position.x + 5,
            y: this._position.y + 5
          }

          // initialize the unit and add it to the svg layer
          this._unit.initSVG()
          this._unit.addGraphicsTo(layer)

          // setup the drag handler that allows you to drag
          // the unit around
          var self = this
          var dragHandler = d3.drag()
            .on("start", function(event) {
              self.onDrag(event)
            })
            .on("drag", function(event) {
              self.onDrag(event)
            })
            .on("end", function(event) {
              self.onDragEnd(event)
            })

            dragHandler(this._unit._svg.clickArea)
            this._unit._svg.clickArea
              .on("contextmenu", function() {self.onRightClick(event)})

        } else if(this._unit.constructor === unit.constructor) {
            console.log("Items stacked");
            this._unit.quantity += unit.quantity;
            unit.destroy();
        }
      }

      /**
        removeUnit()
        @description removes the item from this slot
      */
      removeUnit() {
        if(this._unit !== null) {
          this._svg.unitGroup.selectAll("*").remove()
          this._unit = null;
        }
      }


      /**
        destroyUnit()
        @description completely destroys
      */
      destroyUnit() {
        if(this._unit !== null) {
          this._unit.destroy()
          this._svg.unitGroup.remove()
          this._unit = null;
        }
      }

      /**
       * get unit
       * @description get the unit
       */
      get unit() {
        return this._unit;
      }

      /**
        distanceTo()
        @description returns the distance between the center of this
          slot and the center of a unit
      */
      distanceTo(unit) {
        return Math.sqrt(
          Math.pow(unit.position.x - this._position.x, 2) +
          Math.pow(unit.position.y - this._position.y, 2)
        )
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
      }

      /**
        onDrag()
        @description the function that is called when you are dragging a
          unit
      */
      onDrag(event) {
        if(this._unit !== null) {

          if(!this._unit.isPartOfMultiUnit) {
            this._unit.position = {
              x: event.x - Slot.size/2,
              y: event.y - Slot.size/2
            }
          } else {
            console.log(this._unit);
            this._unit.multiUnit.position = {
              x: event.x - Slot.size/2,
              y: event.y - Slot.size/2
            }
          }
        }
      }

      /**
        onMouseUp()
        @description the function called when the mouse is released
      */
      onMouseUp() {
        // check which slot the unit is closest to
        // and snap it to that slot upon release of the mouse

      }

      /**
        onClick()
        @description the function called when this block is clicked
      */
      onClick() {
        // do something
      }


      /**
        onMouseDown()
        @description the function called when the mouse is pressed down on the slot
      */
      onMouseDown() {}

      /**
        onMouseEnter()
        @description the function called when the mouse enters the button area
      */
      onMouseEnter() {
        //this._svg.background.style("fill-opacity", 0.5)
      }

      /**
        onMouseLeave()
        @description the function called when the mouse enters the button area
      */
      onMouseLeave() {
        //this._svg.background.style("fill-opacity", 1)
      }

      /**
        onContextMenu()
        @description the function called on right click which is normally the
          creation of a context menu
      */
      onRightClick(event) {
        event.preventDefault();
        if(this._unit !== null) {
          if(this._unit.quantity > 1) {

          } else {

          }
        }
      }


      /********************************************************
                          Other Functions
      *********************************************************/
      /**
        isEmpty()
        @description returns whether this slot is empty or not
      */
      isEmpty() {
        return this.item === null;
      }

      /**
        select()
        @description selects this slot of the inventory
      */
      select() {
        this._svg.background.style("stroke", "green")
      }

      /**
        deselect()
        @description deselects this slot of the inventory
      */
      deselect() {
        this._svg.background.style("stroke", "black")
      }
    }
  })
