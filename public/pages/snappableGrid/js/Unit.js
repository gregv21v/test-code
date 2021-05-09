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
      constructor(position, styles = {fill: "blue"}) {
        this._position = position; // position of the unit in the world
        this._styles = styles;

        // create the svg elements
        this._svg.background = this._svg.group.append("rect")
        this._svg.graphicGroup = this._svg.group.append("g")
        this._createGraphic(this._svg.graphicGroup)
        this._svg.clickArea = this._svg.group.append("rect")
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
          //.on("mousedown", function() {self.onMouseDown()})
          //.on("mouseover", function() {self.onMouseOver()})
          //.on("mouseout", function() {self.onMouseOut()})
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
      }

      /**
        getPosition()
        @description gets the position of the unit
      */
      get position() {
        return this._position
      }
    }
  }
)
