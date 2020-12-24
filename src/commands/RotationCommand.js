export default class RotationCommand {
  constructor(dir) {
    this.dir = dir;
  }

  exec(rover) {
    if (this.dir === "right") {
      rover.toRight();
    } else {
      rover.toLeft();
    }
  }
}
