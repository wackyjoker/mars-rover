export default class InitCommand {
  constructor(data) {
    this.data = data;
  }

  exec(rover) {
    rover.init(this.data);
  }
}
