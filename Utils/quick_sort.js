"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quick_sort = void 0;
var quick_sort;
(function (quick_sort) {
    function sort(list, low, high) {
        if (low < high) {
            let part_idx = partition(list, low, high);
            list = sort(list, low, part_idx - 1);
            list = sort(list, part_idx + 1, high);
        }
        return list;
    }
    quick_sort.sort = sort;
    function partition(list, low, high) {
        let pivot = list[high];
        let i = low - 1;
        for (let j = low; j <= high; ++j) {
            if (list[j] < pivot) {
                ++i;
                list = swap(list, i, j);
            }
        }
        list = swap(list, i + 1, high);
        return i + 1;
    }
    function swap(list, i, j) {
        let temp = list[i];
        list[i] = list[j];
        list[j] = temp;
        return list;
    }
})(quick_sort = exports.quick_sort || (exports.quick_sort = {}));
//# sourceMappingURL=quick_sort.js.map