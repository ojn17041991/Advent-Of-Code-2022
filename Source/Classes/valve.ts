export class Valve {
  name: string;
  flow_rate: number;
  connected_valves: Valve[];
  valve_steps: { [id: string]: number };
  is_open: boolean = false;

  constructor(name: string, flow_rate: number) {
    this.name = name;
    this.flow_rate = flow_rate;
    this.connected_valves = [];
    this.valve_steps = {};
  }

  connect_to(valve: Valve) {
    this.connected_valves.push(valve);
  }
}
