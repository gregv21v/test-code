// the main entry point of the game
define(
  [
    "d3",
    "multiunits/MultiUnitItem",
    "units/Unit",
    "units/GreenUnit",
    "units/OrangeUnit",
    "units/YellowUnit",
    "units/EmptyUnit",
    "units/UnitRegistry",
    "game/Slot",
    "game/Grid",
    "game/GridManager",
    "crafting/CraftingRegistry",
    "crafting/CraftingRecipe",
    "crafting/CraftingInput",
    "crafting/Crafter"
  ],
  function(
    d3,
    MultiUnitItem,
    Unit,
    GreenUnit, OrangeUnit, YellowUnit, EmptyUnit, UnitRegistry,
    Slot, Grid, GridManager, CraftingRegistry,
    CraftingRecipe, CraftingInput, Crafter
  ) {
    var main = d3.select("body").select("svg")
    main
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight)

    var center = {x: window.innerWidth/2, y: window.innerHeight/2} // center of screen

    // register units
    UnitRegistry.register(new GreenUnit(center))
    UnitRegistry.register(new OrangeUnit(center))
    UnitRegistry.register(new YellowUnit(center))
    UnitRegistry.register(new EmptyUnit(center))

    // example units
    var greenUnit = new GreenUnit(center)
    var orangeUnit = new OrangeUnit(center)
    var orangeUnit2 = new OrangeUnit(center)
    var yellowUnit = new YellowUnit(center)

    let multiUnitItem = new MultiUnitItem(center);

    multiUnitItem.addUnit(new GreenUnit(), 0, 0)
    multiUnitItem.addUnit(new OrangeUnit(), 0, 1)
    multiUnitItem.addUnit(new GreenUnit(), 0, 2)

    // setup crafting
    CraftingRegistry.register(new CraftingRecipe(
      new CraftingInput(
        [
          [new EmptyUnit(), new EmptyUnit(), new EmptyUnit()],
          [new OrangeUnit(), new OrangeUnit(), new EmptyUnit()],
          [new EmptyUnit(), new EmptyUnit(), new EmptyUnit()]
        ]
      ),
      new GreenUnit()
    ))
    CraftingRegistry.register(new CraftingRecipe(
      new CraftingInput(
        [
          [new EmptyUnit(), new EmptyUnit(), new EmptyUnit()],
          [new GreenUnit(), new GreenUnit(), new EmptyUnit()],
          [new EmptyUnit(), new EmptyUnit(), new EmptyUnit()]
        ]
      ),
      new YellowUnit()
    ))

    var gridManager = new GridManager();
    var crafter = new Crafter(gridManager, {x: 0, y: 0});
    var inventoryGrid = gridManager.createGrid(5, 6);

    //inventoryGrid.addUnit(0, 0, greenUnit);
    //inventoryGrid.addUnit(1, 0, orangeUnit);
    //inventoryGrid.addUnit(2, 0, orangeUnit2)
    //inventoryGrid.addUnit(3, 0, yellowUnit)
    inventoryGrid.addUnit(0, 0, multiUnitItem)

    inventoryGrid.moveTo({
      x: center.x - (inventoryGrid.width)/2,
      y: window.innerHeight/2 - crafter.height/2
    })

    crafter.moveTo({
      x: center.x - crafter.width / 2,
      y: center.y - crafter.height / 2 - crafter.height - Slot.size
    })

    crafter.addGraphicsTo(main)
    crafter.initSVG()
    inventoryGrid.addGraphicsTo(main)
    inventoryGrid.initSVG()

})
