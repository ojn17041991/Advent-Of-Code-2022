"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rock = void 0;
class Rock {
    constructor(type) {
        this.type = type;
        this.build(type);
    }
    build(type) {
        switch (type) {
            case 0:
                this.map = [["#", "#", "#", "#"]];
                break;
            case 1:
                this.map = [
                    [".", "#", "."],
                    ["#", "#", "#"],
                    [".", "#", "."],
                ];
                break;
            case 2:
                this.map = [
                    ["#", "#", "#"],
                    [".", ".", "#"],
                    [".", ".", "#"],
                ];
                break;
            case 3:
                this.map = [["#"], ["#"], ["#"], ["#"]];
                break;
            case 4:
                this.map = [
                    ["#", "#"],
                    ["#", "#"],
                ];
                break;
        }
    }
}
exports.Rock = Rock;
//# sourceMappingURL=rock.js.map