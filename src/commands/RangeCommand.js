export default class RangeCommand {
  constructor(data) {
    this.data = data;
  }

  exec(rover, map) {
    const { x, y, obstacleList } = this.data;
    map.init(x, y);
    map.putObstacle(obstacleList);
  }
}
