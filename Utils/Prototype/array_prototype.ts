interface Array<T> {
    popMulti(amount: number): Array<T>;
    pushMulti(items: Array<T>): void;
}

Array.prototype.popMulti = function<T> (amount) {
    let popped: Array<T> = [];
    for (let i = 0; i < amount; ++i) {
        popped[amount - i - 1] = this.pop()
    }
    return popped;
};

Array.prototype.pushMulti = function<T> (items) {
    for (let i = 0; i < items.length; ++i) {
        this.push(items[i]);
    }
};