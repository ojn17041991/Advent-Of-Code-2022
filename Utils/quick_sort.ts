export module quick_sort {
    export function sort(list: number[], low: number, high: number): number[] {
        if (low < high) {
            let part_idx: number = partition(list, low, high);
            list = sort(list, low, part_idx - 1);
            list = sort(list, part_idx + 1, high);
        }

        return list;
    }

    function partition(list: number[], low: number, high: number): number {
        let pivot: number = list[high];
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

    function swap(list: number[], i: number, j: number): number[] {
        let temp: number = list[i];
        list[i] = list[j];
        list[j] = temp;
        return list;
    }
}