export class Partner {
  current_valve: string;
  target_valve: string;
  complete_path: string[];
  path_to_target_valve: string[];
  pursuing_target: boolean = false;
  current_heuristic: number = 0;
  private _step_idx: number = 1;

  waiting_to_open: string;

  constructor() {
    this.complete_path = ["AA"];
  }

  step(): void {
    if (this._step_idx < this.path_to_target_valve.length) {
      this.current_valve = this.path_to_target_valve[this._step_idx];
      this._step_idx++;
      this.complete_path.push(this.current_valve);
    }
  }

  open_valve(): void {
    this._step_idx = 1;
    this.target_valve = null;
    this.pursuing_target = false;
    this.complete_path.push("open");
  }

  set_target(path_to_target: string[], heuristic: number): void {
    this.path_to_target_valve = path_to_target;
    this.target_valve =
      this.path_to_target_valve[this.path_to_target_valve.length - 1];
    this.pursuing_target = false;
    this.current_heuristic = heuristic;
  }

  pursue_target(): void {
    this.pursuing_target = true;
  }
}
