"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_manager_1 = require("../Utils/file_manager");
const input_converter_1 = require("../Utils/input_converter");
let input = file_manager_1.file_manager.get_input_from_file(__dirname + "\\input.txt");
let monkeys = input_converter_1.input_converter.get_monkeys(input);
const isTask1 = false;
let modulus = 1;
// for each monkey
for (let monkey of monkeys) {
    modulus *= monkey.divisor;
}
const numRounds = isTask1 ? 20 : 10000;
// for each round
for (let i = 0; i < numRounds; i++) {
    // for each monkey
    for (let monkey of monkeys) {
        // for each item currently held
        for (let j = 0; j < monkey.items.length;) {
            // get item
            let item = monkey.items[j];
            // increase monkey inspection counter
            monkey.inspect();
            // perform operation
            item = monkey.operation(item);
            // divide worry level by 3
            if (isTask1) {
                item = Math.floor(item / 3);
            }
            else {
                item %= modulus;
            }
            // update the item in the list
            monkey.items[j] = item;
            // perform test
            let recipient = monkey.test(item);
            let givenItem = monkey.giveItem(item); // the item is always popped here so we don't need to increase j
            monkeys[recipient].receiveItem(givenItem);
        }
    }
}
let highestInspectionCounts = [0, 0];
for (let monkey of monkeys) {
    if (monkey.inspectionCount > highestInspectionCounts[0]) {
        highestInspectionCounts[1] = highestInspectionCounts[0];
        highestInspectionCounts[0] = monkey.inspectionCount;
    }
    else if (monkey.inspectionCount > highestInspectionCounts[1]) {
        highestInspectionCounts[1] = monkey.inspectionCount;
    }
}
let monkeyBusiness = highestInspectionCounts[0] * highestInspectionCounts[1];
console.log(`Monkey business: ${monkeyBusiness}`);
//# sourceMappingURL=main.js.map