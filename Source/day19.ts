import { file_manager } from "./Utils/file_manager";

let input: string = file_manager.get_input_from_file(__filename);

type Blueprint = {
  oreRobot: number;
  clayRobot: number;
  obsRobot: { ore: number; clay: number };
  geoRobot: { ore: number; obs: number };
};

type State = {
  t: number;
  ore: number;
  clay: number;
  obs: number;
  geo: number;
  orer: number;
  clayr: number;
  obsr: number;
  geor: number;
};

// ---------- PARSE ----------
function parse(input: string): Blueprint[] {
  return input
    .trim()
    .split(/\n\s*\n/) // IMPORTANT: blueprint blocks
    .map((block) => {
      const nums = block.match(/\d+/g);

      if (!nums || nums.length < 7) {
        throw new Error("Bad blueprint:\n" + block);
      }

      const n = nums.map(Number);

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
function maxPossibleGeodes(s: State): number {
  let geo = s.geo;
  let geor = s.geor;
  let t = s.t;

  while (t > 0) {
    geo += geor;
    geor++;
    t--;
  }

  return geo;
}

// ---------- SOLVER ----------
function solveBlueprint(bp: Blueprint): number {
  let best = 0;

  const stack: State[] = [
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
    const s = stack.pop() as State;

    if (s.geo > best) best = s.geo;
    if (s.t === 0) continue;
    if (maxPossibleGeodes(s) <= best) continue;

    // next resource totals after collecting
    const ore = s.ore + s.orer;
    const clay = s.clay + s.clayr;
    const obs = s.obs + s.obsr;
    const geo = s.geo + s.geor;

    const t = s.t - 1;

    // ---------- OPTION 1: wait ----------
    stack.push({
      t,
      ore,
      clay,
      obs,
      geo,
      orer: s.orer,
      clayr: s.clayr,
      obsr: s.obsr,
      geor: s.geor,
    });

    // ---------- OPTION 2: ore robot ----------
    if (s.ore >= bp.oreRobot) {
      stack.push({
        t,
        ore: ore - bp.oreRobot,
        clay,
        obs,
        geo,
        orer: s.orer + 1,
        clayr: s.clayr,
        obsr: s.obsr,
        geor: s.geor,
      });
    }

    // ---------- OPTION 3: clay robot ----------
    if (s.ore >= bp.clayRobot) {
      stack.push({
        t,
        ore: ore - bp.clayRobot,
        clay,
        obs,
        geo,
        orer: s.orer,
        clayr: s.clayr + 1,
        obsr: s.obsr,
        geor: s.geor,
      });
    }

    // ---------- OPTION 4: obsidian robot ----------
    if (s.ore >= bp.obsRobot.ore && s.clay >= bp.obsRobot.clay) {
      stack.push({
        t,
        ore: ore - bp.obsRobot.ore,
        clay: clay - bp.obsRobot.clay,
        obs,
        geo,
        orer: s.orer,
        clayr: s.clayr,
        obsr: s.obsr + 1,
        geor: s.geor,
      });
    }

    // ---------- OPTION 5: geode robot ----------
    if (s.ore >= bp.geoRobot.ore && s.obs >= bp.geoRobot.obs) {
      stack.push({
        t,
        ore: ore - bp.geoRobot.ore,
        clay,
        obs: obs - bp.geoRobot.obs,
        geo,
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
function solve(input: string): number {
  const blueprints = parse(input);

  let sum = 0;

  for (let i = 0; i < blueprints.length; i++) {
    const geodes = solveBlueprint(blueprints[i]);
    sum += (i + 1) * geodes;
  }

  return sum;
}

// usage:
console.log(solve(input));
