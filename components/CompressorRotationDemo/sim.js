/* =========================
   Kompressorien vuorottelun havainnollistus: simulaatiomalli
   Yksi askel = yksi simuloitu minuutti.
   ========================= */

export const COMPRESSOR_COUNT = 4;
export const COMPRESSOR_NAMES = ['K1', 'K2', 'K3', 'K4'];

export const MIN_RUN_MINUTES = 15;
export const MIN_REST_MINUTES = 10;

export const RUNNING_DISTORTION_H = -500;
export const MIN_RUN_DISTORTION_H = -10000;
export const MIN_REST_DISTORTION_H = 10000;

export const ROTATION_INTERVAL_MINUTES = 7 * 24 * 60;
export const HISTORY_MINUTES = 12 * 60;
export const STATS_WINDOW_MINUTES = 24 * 60;
export const SHORT_CYCLE_MINUTES = 60;

const INITIAL_RUNTIMES_H = [8412.3, 8409.8, 8415.1, 8410.6];
const REQUEST_CENTER = 2.5;
const REQUEST_MIN_INTERVAL = 30;
const REQUEST_MAX_INTERVAL = 120;
const DEFAULT_SEED = 20261013;

/* =========================
   Satunnaisluvut (toistettava sarja)
   ========================= */

function createRandom(seed) {
  let state = seed >>> 0;
  return function random() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* =========================
   Kompressori
   ========================= */

function createCompressor(runtimeHours) {
  return {
    runtimeHours,
    command: false,
    running: false,
    starts: 0,
    minutesInState: Number.POSITIVE_INFINITY,
  };
}

export function isMinRunActive(compressor) {
  return compressor.running && compressor.minutesInState < MIN_RUN_MINUTES;
}

export function isMinRestActive(compressor) {
  return !compressor.running && compressor.minutesInState < MIN_REST_MINUTES;
}

/* Lämpöpumpun oma suojaus: minimikäynti- ja lepoaika pidetään aina.
   Palauttaa päättyneen käyntijakson pituuden minuutteina, jos kompressori pysähtyi. */
function stepCompressor(compressor) {
  let finishedCycleMinutes = null;

  if (compressor.command && !compressor.running && !isMinRestActive(compressor)) {
    compressor.running = true;
    compressor.starts += 1;
    compressor.minutesInState = 0;
  } else if (!compressor.command && compressor.running && !isMinRunActive(compressor)) {
    finishedCycleMinutes = compressor.minutesInState;
    compressor.running = false;
    compressor.minutesInState = 0;
  }

  if (compressor.running) {
    compressor.runtimeHours += 1 / 60;
  }
  compressor.minutesInState += 1;

  return finishedCycleMinutes;
}

/* =========================
   Vääristetty käyntiaika: järjestys lasketaan, kun pyyntö muuttuu
   ========================= */

export function getDistortedRuntime(compressor) {
  let value = compressor.runtimeHours;
  if (compressor.running) value += RUNNING_DISTORTION_H;
  if (isMinRunActive(compressor)) value += MIN_RUN_DISTORTION_H;
  if (isMinRestActive(compressor)) value += MIN_REST_DISTORTION_H;
  return value;
}

const INITIAL_ORDER = COMPRESSOR_NAMES.map((_, index) => index);

function createDynamicController() {
  return { order: [...INITIAL_ORDER], previousRequest: null };
}

function stepDynamicController(controller, request, compressors) {
  if (request !== controller.previousRequest) {
    const values = compressors.map(getDistortedRuntime);
    controller.order = [...INITIAL_ORDER].sort((a, b) => values[a] - values[b] || a - b);
  }

  controller.order.forEach((compressorIndex, position) => {
    compressors[compressorIndex].command = position < request;
  });

  controller.previousRequest = request;
}

/* =========================
   Kiinteä järjestys, johtava kompressori vaihtuu ajastetusti.
   Vaihto ei pysäytä käyviä: pyynnön noustessa käynnistetään järjestyksessä
   ensimmäinen pysäytetty, pyynnön laskiessa pysäytetään järjestyksessä viimeinen käyvä.
   ========================= */

function createFixedController() {
  return { order: [...INITIAL_ORDER] };
}

function stepFixedController(controller, request, compressors, minute) {
  const lead = Math.floor(minute / ROTATION_INTERVAL_MINUTES) % COMPRESSOR_COUNT;
  controller.order = INITIAL_ORDER.map((offset) => (lead + offset) % COMPRESSOR_COUNT);

  let commanded = compressors.filter((compressor) => compressor.command).length;

  for (const index of controller.order) {
    if (commanded >= request) break;
    if (!compressors[index].command) {
      compressors[index].command = true;
      commanded += 1;
    }
  }

  for (const index of [...controller.order].reverse()) {
    if (commanded <= request) break;
    if (compressors[index].command) {
      compressors[index].command = false;
      commanded -= 1;
    }
  }
}

/* =========================
   Pyyntö: muuttuu satunnaisin välein ±1 porras
   ========================= */

function stepRequest(world) {
  if (world.minute < world.nextRequestChange) return;

  let up;
  if (world.request <= 0) up = true;
  else if (world.request >= COMPRESSOR_COUNT) up = false;
  else {
    const upProbability = Math.min(
      0.95,
      Math.max(0.05, 0.5 + 0.35 * (REQUEST_CENTER - world.request))
    );
    up = world.random() < upProbability;
  }

  world.request += up ? 1 : -1;
  world.nextRequestChange =
    world.minute +
    REQUEST_MIN_INTERVAL +
    Math.floor(world.random() * (REQUEST_MAX_INTERVAL - REQUEST_MIN_INTERVAL + 1));
}

/* =========================
   Maailma: sama pyyntö molemmille ohjaustavoille
   ========================= */

function createSystem(createController) {
  return {
    compressors: INITIAL_RUNTIMES_H.map(createCompressor),
    controller: createController(),
    history: COMPRESSOR_NAMES.map(() => []),
    /* Päättyneet käyntijaksot viimeisen 24 h ajalta: { end, minutes } */
    recentCycles: COMPRESSOR_NAMES.map(() => []),
    /* Kaikki päättyneet käyntijaksot (pitkien ajojen tilastoihin) */
    allCycles: [],
  };
}

export function createWorld(seed = DEFAULT_SEED) {
  return {
    minute: 0,
    random: createRandom(seed),
    request: 2,
    nextRequestChange: 40,
    requestHistory: [],
    dynamic: createSystem(createDynamicController),
    fixed: createSystem(createFixedController),
  };
}

function stepSystem(system, minute) {
  system.compressors.forEach((compressor, index) => {
    const finishedCycleMinutes = stepCompressor(compressor);
    const cycles = system.recentCycles[index];

    if (finishedCycleMinutes !== null) {
      cycles.push({ end: minute, minutes: finishedCycleMinutes });
      system.allCycles.push(finishedCycleMinutes);
    }
    while (cycles.length > 0 && cycles[0].end <= minute - STATS_WINDOW_MINUTES) {
      cycles.shift();
    }

    const history = system.history[index];
    history.push(compressor.running ? 1 : 0);
    if (history.length > HISTORY_MINUTES) history.shift();
  });
}

export function stepWorld(world) {
  stepRequest(world);

  stepDynamicController(
    world.dynamic.controller,
    world.request,
    world.dynamic.compressors
  );
  stepFixedController(
    world.fixed.controller,
    world.request,
    world.fixed.compressors,
    world.minute
  );

  stepSystem(world.dynamic, world.minute);
  stepSystem(world.fixed, world.minute);

  world.requestHistory.push(world.request);
  if (world.requestHistory.length > HISTORY_MINUTES) world.requestHistory.shift();

  world.minute += 1;
}

/* =========================
   Tilastot: viimeisen 24 h aikana päättyneet käyntijaksot
   ========================= */

export function getCompressorStats(system) {
  return system.recentCycles.map((cycles) => {
    const total = cycles.reduce((sum, cycle) => sum + cycle.minutes, 0);
    return {
      cycles: cycles.length,
      shortCycles: cycles.filter((cycle) => cycle.minutes < SHORT_CYCLE_MINUTES).length,
      averageMinutes: cycles.length > 0 ? total / cycles.length : null,
    };
  });
}

export function getSystemStats(system) {
  const perCompressor = getCompressorStats(system);
  const cycleCounts = perCompressor.map((stat) => stat.cycles);
  const averages = perCompressor
    .map((stat) => stat.averageMinutes)
    .filter((value) => value !== null);
  return {
    busiestCycles: Math.max(...cycleCounts),
    quietestCycles: Math.min(...cycleCounts),
    shortestAverageMinutes: averages.length > 0 ? Math.min(...averages) : null,
  };
}
