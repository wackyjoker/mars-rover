import { createRover } from "./Rover";
import { createMarsMap } from "./MarsMap";

export function exec() {
  let rover = createRover();
  let map = createMarsMap();
  execCommand(rover, map);
  return rover.getData();
}

function execCommand(rover, map) {
  for (let index = 0; index < commandList.length; index++) {
    const command = commandList[index];
    const result = handleExec(rover, map, command);
    if (result) return;
  }
}

function handleExec(rover, map, command) {
  return command.exec(rover, map);
}

let commandList = [];
export function addCommand(command) {
  commandList.push(command);
}

export function size() {
  return commandList.length;
}

export function clear() {
  commandList = [];
}
