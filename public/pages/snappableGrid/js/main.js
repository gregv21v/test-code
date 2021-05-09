// the main entry point of the game
define(
  [
    "d3",
    "game/Unit",
    "game/Slot",
    "game/Grid",
    "game/GridManager"
  ],
  function(d3, Unit, Slot, Grid, GridManager) {
    var main = d3.select("body").select("svg")
    main
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight)

    var center = {x: window.innerWidth/2, y: window.innerHeight/2}
    var testUnit = new Unit(center)
    var testUnit2 = new Unit(center, {fill: "orange"})

    var gridManager = new GridManager();
    var grid = new Grid(gridManager, 5, 5);
    gridManager.addGrid(grid);
    var grid2 = gridManager.createGrid(1, 9)
    grid.moveTo({
      x: center.x - grid.width/2,
      y: 0
    })
    grid2.moveTo({
      x: center.x - grid2.width/2,
      y: grid.height + Slot.size
    })
    grid.addUnit(4, 4, testUnit);
    grid.addUnit(4, 3, testUnit2);

    grid2.addGraphicsTo(main)
    grid2.initSVG()
    grid.addGraphicsTo(main);
    grid.initSVG();

})
