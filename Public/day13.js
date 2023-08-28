"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_manager_1 = require("./Utils/file_manager");
const input_converter_1 = require("./Utils/input_converter");
let input = file_manager_1.file_manager.get_input_from_file(__filename);
let packets = input_converter_1.input_converter.get_distress_signal_packets(input);
function recurse(a, b) {
    let l = Math.max(a.length, b.length);
    for (let j = 0; j < l; j++) {
        if (a[j] === undefined) {
            return true;
        }
        else if (b[j] === undefined) {
            return false;
        }
        else if (Array.isArray(a[j]) && !Array.isArray(b[j])) {
            let b_arr = [b[j]];
            let r = recurse(a[j], b_arr);
            if (r !== undefined)
                return r;
        }
        else if (!Array.isArray(a[j]) && Array.isArray(b[j])) {
            let a_arr = [a[j]];
            let r = recurse(a_arr, b[j]);
            if (r !== undefined)
                return r;
        }
        else if (Array.isArray(a[j]) && Array.isArray(b[j])) {
            let r = recurse(a[j], b[j]);
            if (r !== undefined)
                return r;
        }
        else {
            // They must both be numbers.
            if (+a[j] > +b[j]) {
                return false;
            }
            else if (+a[j] < +b[j]) {
                return true;
            }
            else {
                continue;
            }
        }
    }
}
let index_counter = 0;
for (let i = 0; i < packets.length; i++) {
    let packet_a = packets[i][0][0];
    let packet_b = packets[i][0][1];
    if (recurse(packet_a, packet_b)) {
        index_counter += i + 1;
    }
}
console.log(index_counter); // Task 1.
// Task 2.
// TODO:
// the below hasn't been tested, but it should essentially iterate over pairs of packets, and put the largest one second.
// by the time you've made your first pass of loop i, the largest packet will be at the end of the array (i hope).
// then you continue iterating, but don't bother checking the last packet, since it's already the largest.
// after the 2nd pass, the 2nd largest packet will be at the 2nd last index, and so on.
// TO GET THE ANSWER:
// iterate over the result set, get the index of the 2 so-called "divider packets" (at the start of the input), and multiply them.
let packets_for_ordering = input_converter_1.input_converter.get_distress_signal_packets_for_ordering(input);
for (let i = 0; i < packets_for_ordering.length; i++) {
    for (let j = 0; j < packets_for_ordering.length - i - 1; j++) {
        let packet_a = packets_for_ordering[j];
        let packet_b = packets_for_ordering[j + 1];
        if (!recurse(packet_a, packet_b)) {
            let o = packets_for_ordering.splice(j + 1, 1);
            packets_for_ordering.splice(j, 0, o);
            packets_for_ordering[j] = packets_for_ordering[j][0];
        }
    }
}
let key = 1;
for (let i = 0; i < packets_for_ordering.length; i++) {
    if (recurse(packets_for_ordering[i], [[2]]) === undefined ||
        recurse(packets_for_ordering[i], [[6]]) === undefined) {
        key *= i + 1;
    }
}
console.log(key);
//# sourceMappingURL=day13.js.map