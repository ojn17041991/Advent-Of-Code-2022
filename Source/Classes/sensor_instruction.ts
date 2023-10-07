import { Vector } from "./vector";

export class SensorInstruction {
  sensor: Vector;
  beacon: Vector;
  d: number;

  constructor(sensor: Vector, beacon: Vector) {
    this.sensor = sensor;
    this.beacon = beacon;
    this.d = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
  }
}

export class SimpleSensorInstruction {
  sx: number;
  sy: number;
  d: number;

  constructor(sx: number, sy: number, d: number) {
    this.sx = sx;
    this.sy = sy;
    this.d = d;
  }
}
