"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monkey = void 0;
class Monkey {
    constructor(id, items, operation, divisor, test) {
        this.id = id;
        this.items = items;
        this.inspectionCount = 0;
        this.operation = operation;
        this.divisor = divisor;
        this.test = test;
    }
    inspect() {
        this.inspectionCount++;
    }
    giveItem(item) {
        return this.items.shift();
    }
    receiveItem(item) {
        this.items.push(item);
    }
}
exports.Monkey = Monkey;
//# sourceMappingURL=monkey.js.map