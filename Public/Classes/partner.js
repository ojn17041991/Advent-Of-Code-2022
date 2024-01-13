"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Partner = void 0;
class Partner {
    constructor() {
        this.pursuing_target = false;
        this.current_heuristic = 0;
        this._step_idx = 1;
        this.complete_path = ["AA"];
    }
    step() {
        if (this._step_idx < this.path_to_target_valve.length) {
            this.current_valve = this.path_to_target_valve[this._step_idx];
            this._step_idx++;
            this.complete_path.push(this.current_valve);
        }
    }
    open_valve() {
        this._step_idx = 1;
        this.target_valve = null;
        this.pursuing_target = false;
        this.complete_path.push("open");
    }
    set_target(path_to_target, heuristic) {
        this.path_to_target_valve = path_to_target;
        this.target_valve =
            this.path_to_target_valve[this.path_to_target_valve.length - 1];
        this.pursuing_target = false;
        this.current_heuristic = heuristic;
    }
    pursue_target() {
        this.pursuing_target = true;
    }
}
exports.Partner = Partner;
//# sourceMappingURL=partner.js.map