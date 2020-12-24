export default class MarsMap {
  constructor() {
    this.x = null;
    this.y = null;
    this.obstacleList = [];
  }
  init(x, y) {
    this.x = x;
    this.y = y;
  }

  putObstacle(position) {
    if (Array.isArray(position)) {
      this.obstacleList.push(...position);
    } else {
      this.obstacleList.push(position);
    }
  }

  isObstacle(position) {
    return this.obstacleList.some(({ x, y }) => {
      return x === position.x && y === position.y;
    });
  }

  getRange() {
    return {
      x: this.x,
      y: this.y,
    };
  }
}

export function createMarsMap() {
  return new MarsMap();
}
