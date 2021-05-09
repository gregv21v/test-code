define(
  [
    "d3"
  ],
  function(d3) {
    /**
      Unit
      @description the basic unit that makes up every pipe
        The Unit can snap to the world grid.
    */
    return class Unit {
      _position = {x: 0, y: 0}
      _svg = {
        group: d3.create("svg:g")
      }
      static size = 40; // the size of the unit

      /**
        constructor()
        @description constructs the Unit class
      */
      constructor(position = {x: 0, y: 0}, styles = {fill: "blue"}) {
        this._quantity = 1;
        this._position = position; // position of the unit in the world
        this._styles = styles;
        this._multiUnit = null;

        // create the svg elements
        this._svg.background = this._svg.group.append("rect")
        this._svg.graphicGroup = this._svg.group.append("g")
        this._svg.count = this._svg.group.append("text")
        this._createGraphic(this._svg.graphicGroup)
        this._svg.clickArea = this._svg.group.append("rect")
      }

      /**
       * destroy()
       * @description completely destroys the unit
       */
      destroy() {
        this._svg.background.remove()
        this._svg.count.remove()
        this._svg.graphicGroup.remove()
        this._svg.clickArea.remove()
      }


      /********************************************************
                          Graphics Methods
      *********************************************************/
      /**
        createGraphic()
        @description override this function to add the graphics for the
          Unit. Then set the attributes in initSVG.
        @param group the svg group to create the graphics on
      */
      _createGraphic(group) {
        // make your graphics here add add them to the this.svg object
      }

      /**
       * clone()
       * @description clone the unit
       */
      clone() {
        let temp = new Unit()
        temp._quantity = this._quantity;
        temp._position = this._position;
        temp._styles = this._styles;

        return temp;
      }


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
        @description initializes the attributes and styles of the svg of the unit
      */
      initSVG() {
        var self = this;

        this._svg.background
          .attr("x", this._position.x)
          .attr("y", this._position.y)
          .attr("width", Unit.size)
          .attr("height", Unit.size)
          .style("fill", this._styles.fill)
          .style("stroke", "black")

        this._svg.clickArea
          .attr("x", this._position.x)
          .attr("y", this._position.y)
          .attr("width", Unit.size)
          .attr("height", Unit.size)
          .style("fill-opacity", 0)
          .on("click", function() {self.onClick()})
          .on("contextmenu", function() {self.onContextMenu()})
          //.on("mousedown", function() {self.onMouseDown()})
          //.on("mouseover", function() {self.onMouseOver()})
          //.on("mouseout", function() {self.onMouseOut()})

        this._svg.count
          .attr("x", this._position.x + Unit.size - 5)
          .attr("y", this._position.y + 5)
          .attr("text-anchor", "center")
          .attr("dominant-baseline", "central")
          .style("stroke", "black")
          .style("font-size", "10px")
          .text(this._quantity)
      }




      /********************************************************
                          Getters & Setters
      *********************************************************/
      /**
        set position()
        @description sets the position of the unit
        @param position the position to set the unit to
      */
      set position(position) {
        this._position = position;

        this._svg.background
          .attr("x", this._position.x)
          .attr("y", this._position.y)

        this._svg.clickArea
          .attr("x", this._position.x)
          .attr("y", this._position.y)

        this._svg.count
          .attr("x", this._position.x + Unit.size - 5)
          .attr("y", this._position.y + 5)
      }

      /**
        getPosition()
        @description gets the position of the unit
      */
      get position() {
        return this._position
      }

      /**
       * get partOfMultiUnit
       * @description gets isPartOfMultiUnit
       */
      get isPartOfMultiUnit() {
        return this._multiUnit !== null;
      }

      /**
       * set multiUnit
       * @description sets multiUnit
       * @param value the value to set multiUnit to
       */
      set multiUnit(value) {
        this._multiUnit = value
      }

      /**
        set quantity()
        @description sets the quantity of the unit
        @param quantity the quantity to set the unit to
      */
      set quantity(quantity) {
        this._quantity = quantity;

        console.log("Quantity Updated");

        this._svg.count
          .text(this._quantity)
      }

      /**
        get quantity()
        @description gets the quantity of the unit
      */
      get quantity() {
        return this._quantity
      }
    }
  }
)
