import MarsMap from "../src/MarsMap";
describe("map", () => {
  function createMarsMap() {
    const marsMap = new MarsMap();
    marsMap.init(200, 200);
    return marsMap;
  }
  it("initialize the map , 200 * 200", () => {
    const marsMap = createMarsMap();
    expect(marsMap.getRange()).toEqual({ x: 200, y: 200 });
  });

  describe("obstacle detection", () => {
    it("(100,100) => false ,coordinate: 100,100 isn't obstacle", () => {
      const marsMap = createMarsMap();
      expect(marsMap.isObstacle()).toBe(false);
    });

    it("(100,100) => true , coordinate:  100,100 is obstacle", () => {
      const marsMap = createMarsMap();
      const position = { x: 100, y: 100 };
      marsMap.putObstacle(position);
      expect(marsMap.isObstacle({ x: 100, y: 100 })).toBe(true);
    });
  });
});
