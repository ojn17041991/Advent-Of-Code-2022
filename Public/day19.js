"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_manager_1 = require("./Utils/file_manager");
var input = file_manager_1.file_manager.get_input_from_file(__filename);
// ---------- PARSE ----------
function parse(input) {
    return input
        .trim()
        .split(/\n\s*\n/) // IMPORTANT: blueprint blocks
        .map(function (block) {
        var nums = block.match(/\d+/g);
        if (!nums || nums.length < 7) {
            throw new Error("Bad blueprint:\n" + block);
        }
        var n = nums.map(Number);
        return {
            oreRobot: n[1],
            clayRobot: n[2],
            obsRobot: {
                ore: n[3],
                clay: n[4],
            },
            geoRobot: {
                ore: n[5],
                obs: n[6],
            },
        };
    });
}
// ---------- HEURISTIC PRUNE ----------
function maxPossibleGeodes(s) {
    var geo = s.geo;
    var geor = s.geor;
    var t = s.t;
    while (t > 0) {
        geo += geor;
        geor++;
        t--;
    }
    return geo;
}
// ---------- SOLVER ----------
function solveBlueprint(bp) {
    var best = 0;
    var stack = [
        {
            t: 24,
            ore: 0,
            clay: 0,
            obs: 0,
            geo: 0,
            orer: 1,
            clayr: 0,
            obsr: 0,
            geor: 0,
        },
    ];
    while (stack.length > 0) {
        var s = stack.pop();
        if (s.geo > best)
            best = s.geo;
        if (s.t === 0)
            continue;
        if (maxPossibleGeodes(s) <= best)
            continue;
        // next resource totals after collecting
        var ore = s.ore + s.orer;
        var clay = s.clay + s.clayr;
        var obs = s.obs + s.obsr;
        var geo = s.geo + s.geor;
        var t = s.t - 1;
        // ---------- OPTION 1: wait ----------
        stack.push({
            t: t,
            ore: ore,
            clay: clay,
            obs: obs,
            geo: geo,
            orer: s.orer,
            clayr: s.clayr,
            obsr: s.obsr,
            geor: s.geor,
        });
        // ---------- OPTION 2: ore robot ----------
        if (s.ore >= bp.oreRobot) {
            stack.push({
                t: t,
                ore: ore - bp.oreRobot,
                clay: clay,
                obs: obs,
                geo: geo,
                orer: s.orer + 1,
                clayr: s.clayr,
                obsr: s.obsr,
                geor: s.geor,
            });
        }
        // ---------- OPTION 3: clay robot ----------
        if (s.ore >= bp.clayRobot) {
            stack.push({
                t: t,
                ore: ore - bp.clayRobot,
                clay: clay,
                obs: obs,
                geo: geo,
                orer: s.orer,
                clayr: s.clayr + 1,
                obsr: s.obsr,
                geor: s.geor,
            });
        }
        // ---------- OPTION 4: obsidian robot ----------
        if (s.ore >= bp.obsRobot.ore && s.clay >= bp.obsRobot.clay) {
            stack.push({
                t: t,
                ore: ore - bp.obsRobot.ore,
                clay: clay - bp.obsRobot.clay,
                obs: obs,
                geo: geo,
                orer: s.orer,
                clayr: s.clayr,
                obsr: s.obsr + 1,
                geor: s.geor,
            });
        }
        // ---------- OPTION 5: geode robot ----------
        if (s.ore >= bp.geoRobot.ore && s.obs >= bp.geoRobot.obs) {
            stack.push({
                t: t,
                ore: ore - bp.geoRobot.ore,
                clay: clay,
                obs: obs - bp.geoRobot.obs,
                geo: geo,
                orer: s.orer,
                clayr: s.clayr,
                obsr: s.obsr,
                geor: s.geor + 1,
            });
        }
    }
    return best;
}
// ---------- MAIN ----------
function solve(input) {
    var blueprints = parse(input);
    var sum = 0;
    for (var i = 0; i < blueprints.length; i++) {
        var geodes = solveBlueprint(blueprints[i]);
        sum += (i + 1) * geodes;
    }
    return sum;
}
// usage:
console.log(solve(input));
//# sourceMappingURL=day19.js.map