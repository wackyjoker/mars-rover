export default class MoveCommand {
  constructor(dir) {
    this.dir = dir;
    this.rover = null;
    this.map = null;
  }

  exec(rover, map) {
    this.rover = rover;
    this.map = map;

    const newPosition = this.getNewPosition();

    if (map.isObstacle(this.getCheckPosition(newPosition))) {
      return true;
    }

    this.updateRoverPosition(newPosition);
  }

  getCheckPosition(newPosition) {
    const position = this.rover.getPosition();
    const operation = this.getOperation();
    const { prop } = operation;
    return Object.assign({}, position, { [prop]: newPosition });
  }

  updateRoverPosition(position) {
    const { fn } = this.getOperation();
    fn.call(this.rover, position);
  }

  getNewPosition() {
    const position = this.rover.getPosition();
    const operation = this.getOperation();
    const { prop } = operation;
    const dir = operation[this.dir].val;
    const newValue = position[prop] + dir;
    return Math.max(newValue, 0);
  }

  getOperation() {
    const rotation = this.rover.getRotation();
    const map = this.createOperationInfo();
    return map[rotation];
  }

  createOperationInfo() {
    return {
      n: this.createMoveInfo(this.rover.setY, "y", -1, 1),
      s: this.createMoveInfo(this.rover.setY, "y", 1, -1),
      w: this.createMoveInfo(this.rover.setX, "x", -1, 1),
      e: this.createMoveInfo(this.rover.setX, "x", 1, -1),
    };
  }

  createMoveInfo(fn, prop, forwardVal, backVal) {
    return {
      fn,
      prop,
      forward: {
        val: forwardVal,
      },
      back: {
        val: backVal,
      },
    };
  }
}
