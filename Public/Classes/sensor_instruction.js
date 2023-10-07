"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleSensorInstruction = exports.SensorInstruction = void 0;
class SensorInstruction {
    constructor(sensor, beacon) {
        this.sensor = sensor;
        this.beacon = beacon;
        this.d = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
    }
}
exports.SensorInstruction = SensorInstruction;
class SimpleSensorInstruction {
    constructor(sx, sy, d) {
        this.sx = sx;
        this.sy = sy;
        this.d = d;
    }
}
exports.SimpleSensorInstruction = SimpleSensorInstruction;
//# sourceMappingURL=sensor_instruction.js.map