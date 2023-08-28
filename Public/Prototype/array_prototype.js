Array.prototype.popMulti = function (amount) {
    let popped = [];
    for (let i = 0; i < amount; ++i) {
        popped[amount - i - 1] = this.pop();
    }
    return popped;
};
Array.prototype.pushMulti = function (items) {
    for (let i = 0; i < items.length; ++i) {
        this.push(items[i]);
    }
};
//# sourceMappingURL=array_prototype.js.map