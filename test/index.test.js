import { clear, addCommand, exec, size, __RewireAPI__ as Main } from "../src/index";
import { createInitCommand, createRotationCommand, createMoveCommand, createRangeCommand } from "../src/commands/index";
import { rotationConst } from "../src/const";

function createInitData() {
  return {
    position: {
      x: 0,
      y: 0,
    },
    rotation: rotationConst.North,
  };
}

function addInitCommand(extendData) {
  const newData = Object.assign({}, createInitData(), extendData);
  addCommand(createInitCommand(newData));
}

it("after we initialize our Data，we receive same Data as our initial Data", () => {
  addInitCommand();
  const result = exec();
  expect(result).toEqual(createInitData());
});

describe("Turn", () => {
  function handleDir(dir) {
    return (expectValue, extendData = {}) => {
      addInitCommand(extendData);
      addCommand(createRotationCommand(dir));
      const result = exec();
      expect(result.rotation).toEqual(expectValue);
    };
  }
  describe("Turn Right", () => {
    const expectToRight = handleDir("right");

    it("After we give Turn Right command, from n to e", () => {
      expectToRight(rotationConst.East);
    });

    it("Current Direction is  n,after we give Turn Right command，it turns w to n", () => {
      expectToRight(rotationConst.North, { rotation: rotationConst.West });
    });
  });

  describe("Turn Left", () => {
    const expectToLeft = handleDir("left");
    it("After we give Turn Left command，it turns s to e", () => {
      expectToLeft(rotationConst.East, { rotation: rotationConst.South });
    });

    it("Current direction is n ,after we give Turn Left command, it turns  n to w", () => {
      expectToLeft(rotationConst.West);
    });
  });
});

describe("move", () => {
  const handleMove = (key) => {
    return (rotation, expectPosition, num = 1) => {
      addInitCommand({ rotation });

      for (let index = 0; index < num; index++) {
        addCommand(createMoveCommand(key));
      }
      const result = exec();
      expect(result.position).toEqual(expectPosition);
    };
  };

  const handleForward = handleMove("forward");
  const handleBack = handleMove("back");
  describe("Forward", () => {
    it("the rover is hitting North (n), coordinates: (0,0) -> (0,0) Cannot exceed our map", () => {
      handleForward(rotationConst.North, { x: 0, y: 0 });
    });

    it("the rover is hitting South(s), coordinates: (0,0) -> (0,1) ", () => {
      handleForward(rotationConst.South, { x: 0, y: 1 });
    });

    it("the rover is hitting West(w), coordinates: (0,0) -> (0,0) Cannot exceed our map", () => {
      handleForward(rotationConst.West, { x: 0, y: 0 });
    });

    it("the rover is hiiting East(e), coordinates: (0,0) -> (1,0) ", () => {
      handleForward(rotationConst.East, { x: 1, y: 0 });
    });
  });

  describe("Backward", () => {
    it("the rover is hitting North(n), coordinates: (0,0) -> (0,1) ", () => {
      handleBack(rotationConst.North, { x: 0, y: 1 });
    });

    it("the rover is hitting South(s), coordinates: (0,0) -> (0,0) Cannot exceed our map ", () => {
      handleBack(rotationConst.South, { x: 0, y: 0 });
    });

    it("the rover is hitting West(w), coordinates: (0,0) -> (1,0) ", () => {
      handleBack(rotationConst.West, { x: 1, y: 0 });
    });

    it("the rover is hiiting East(e),  coordinates: (0,0) -> (0,0) Cannot exceed our map", () => {
      handleBack(rotationConst.East, { x: 0, y: 0 });
    });
  });

  describe("Obstacle", () => {
    it("the rover is hitting North(n),coordinates: (0,0), move foward and encounter an obstacle at beginning(0,1), can't move to last coordinate ,stay put(0,0)", () => {
      addCommand(
        createRangeCommand({
          x: 200,
          y: 200,
          obstacleList: [{ x: 0, y: -1 }],
        })
      );
      handleForward(rotationConst.North, { x: 0, y: 0 });
    });

    it("when Mars Rover encountered Obstacles，stay put，abort rest of the commands，and reports to earth, added 5 commands，should only execute 3 times", () => {
      let count = 0;
      const mockHandleExec = () => {
        const fn = Main.__get__("handleExec");
        Main.__Rewire__("handleExec", function (...args) {
          count++;
          return fn(...args);
        });
      };
      mockHandleExec();

      addCommand(
        createRangeCommand({
          width: 200,
          height: 200,
          obstacleList: [{ x: 0, y: 1 }],
        })
      );
      addInitCommand({ rotation: rotationConst.South });
      addCommand(createMoveCommand("forward"));
      addCommand(createMoveCommand("forward"));
      addCommand(createMoveCommand("forward"));
      const result = exec();
      expect(result.position).toEqual({ x: 0, y: 0 });
      expect(count).toBe(3);
    });
  });
});

it("after add command，current size +1", () => {
  addCommand("1");
  expect(size()).toBe(1);
});

it("after clear command，command size equals to 0 ", () => {
  addCommand("1");
  clear();
  expect(size()).toBe(0);
});

afterEach(() => {
  clear();
});
