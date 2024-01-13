"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Valve = void 0;
class Valve {
    constructor(name, flow_rate) {
        this.is_open = false;
        this.name = name;
        this.flow_rate = flow_rate;
        this.connected_valves = [];
        this.valve_steps = {};
    }
    connect_to(valve) {
        this.connected_valves.push(valve);
    }
}
exports.Valve = Valve;
//# sourceMappingURL=valve.js.map