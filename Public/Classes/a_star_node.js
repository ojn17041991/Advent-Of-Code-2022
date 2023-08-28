"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AStarNode = void 0;
class AStarNode {
    constructor(char, x, y) {
        this.h = 1;
        this.f = Number.MAX_SAFE_INTEGER;
        this.closed = false;
        this.open = false;
        this.steps_taken = 0;
        this.char = char;
        this.x = x;
        this.y = y;
    }
}
exports.AStarNode = AStarNode;
//# sourceMappingURL=a_star_node.js.map