import domesticHotWaterEvents from './dhwEvents';
import { createPid } from './fbPid';

const pidController = createPid();

const WATER_SPECIFIC_HEAT_KJ_PER_KG_C = 4.186; // kJ/kg*C
const HEAT_PUMP_POWER_KW = 100.0; // kJ/s
const TANK_VOLUME_LITERS = 1000.0;
const LOOP_DIAMETER_METERS = 0.042;
const LOOP_LENGTH_METERS = 50.0;
const RETURN_SEGMENT_LENGTH_METERS = 10.0;
const LOOP_TRANSPORT_DELAY_SECONDS = 60.0;
const LOOP_SEGMENT_COUNT = Math.max(1, Math.round(LOOP_TRANSPORT_DELAY_SECONDS));
const LOOP_VOLUME_LITERS =
  Math.PI *
  (LOOP_DIAMETER_METERS / 2) *
  (LOOP_DIAMETER_METERS / 2) *
  LOOP_LENGTH_METERS *
  1000.0;
const RETURN_SEGMENT_VOLUME_LITERS =
  Math.PI *
  (LOOP_DIAMETER_METERS / 2) *
  (LOOP_DIAMETER_METERS / 2) *
  RETURN_SEGMENT_LENGTH_METERS *
  1000.0;
const LOOP_MAIN_VOLUME_LITERS = LOOP_VOLUME_LITERS - RETURN_SEGMENT_VOLUME_LITERS;
const LOOP_SEGMENT_VOLUME_LITERS = LOOP_MAIN_VOLUME_LITERS / LOOP_SEGMENT_COUNT;
const LOOP_FLOW_LITERS_PER_SECOND = 0.5;
const LOOP_HEAT_LOSS_KW_PER_CELSIUS = 0.2957;
const AMBIENT_TEMPERATURE_C = 20.0;
const COLD_WATER_TEMPERATURE_C = 7.0;
const VALVE_RATE_LIMIT_PERCENT_PER_SECOND = 7.0;
const INLET_DELAY_SECONDS = 3;

function toNumberOrFallback(value, fallback) {
  if (Number.isFinite(value)) return value;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeSegmentArray(value, length, fillValue) {
  if (!Array.isArray(value) || value.length !== length) {
    return Array.from({ length }, () => fillValue);
  }
  return value.map((entry) => toNumberOrFallback(entry, fillValue));
}

function normalizeDelayQueue(value, length, fillValue) {
  if (!Array.isArray(value) || value.length !== length) {
    return Array.from({ length }, () => fillValue);
  }
  return value.map((entry) => toNumberOrFallback(entry, fillValue));
}

function applySegmentHeatLoss(temperature, lossKwPerC, deltaSeconds, massKg) {
  if (massKg <= 0 || deltaSeconds <= 0) return temperature;
  const lossFactor = Math.min(
    (lossKwPerC * deltaSeconds) / (massKg * WATER_SPECIFIC_HEAT_KJ_PER_KG_C),
    1.0
  );
  return temperature - (temperature - AMBIENT_TEMPERATURE_C) * lossFactor;
}

function applyRateLimit(targetValue, currentValue, ratePerSecond, deltaSeconds) {
  if (
    !Number.isFinite(targetValue) ||
    !Number.isFinite(currentValue) ||
    deltaSeconds <= 0
  ) {
    return targetValue;
  }
  const maxDelta = Math.abs(ratePerSecond) * deltaSeconds;
  const delta = targetValue - currentValue;
  if (Math.abs(delta) <= maxDelta) return targetValue;
  return currentValue + Math.sign(delta) * maxDelta;
}

function buildSteadyStateLoopTemperatures(inletTemperature, segmentCount) {
  const lossKwPerC = LOOP_HEAT_LOSS_KW_PER_CELSIUS / segmentCount;
  const segments = new Array(segmentCount);
  let previousTemperature = inletTemperature;
  for (let index = 0; index < segmentCount; index += 1) {
    const nextTemperature = applySegmentHeatLoss(
      previousTemperature,
      lossKwPerC,
      1.0,
      LOOP_SEGMENT_VOLUME_LITERS
    );
    segments[index] = nextTemperature;
    previousTemperature = nextTemperature;
  }
  return segments;
}

export default function simulationStep(simulationState, deltaSeconds, pidSettings = {}) {
  const stepSeconds = Number.isFinite(deltaSeconds) ? deltaSeconds : 0.0;

  const tankMassKg = TANK_VOLUME_LITERS;
  const returnSegmentMassKg = RETURN_SEGMENT_VOLUME_LITERS;

  const inletTemperatureFallback = toNumberOrFallback(
    simulationState.inletTemperature,
    55.0
  );
  const loopSegmentTemperatures = Array.isArray(simulationState.loopSegmentTemperatures)
    ? normalizeSegmentArray(
        simulationState.loopSegmentTemperatures,
        LOOP_SEGMENT_COUNT,
        inletTemperatureFallback
      )
    : buildSteadyStateLoopTemperatures(inletTemperatureFallback, LOOP_SEGMENT_COUNT);
  const outletTemperatureFallback = toNumberOrFallback(
    simulationState.outletTemperature,
    inletTemperatureFallback
  );
  const outletTemperatureCurrent =
    loopSegmentTemperatures[loopSegmentTemperatures.length - 1] ??
    outletTemperatureFallback;

  const tankTemperatureCurrent = toNumberOrFallback(
    simulationState.tankTemperature,
    60.0
  );
  const inletTemperatureCurrent = toNumberOrFallback(
    simulationState.inletTemperature,
    55.0
  );

  const tankEnergyKilojoulesCurrent = Number.isFinite(
    simulationState.tankEnergyKilojoules
  )
    ? simulationState.tankEnergyKilojoules
    : tankTemperatureCurrent * tankMassKg * WATER_SPECIFIC_HEAT_KJ_PER_KG_C;
  const returnSegmentEnergyKilojoulesCurrent = Number.isFinite(
    simulationState.returnSegmentEnergyKilojoules
  )
    ? simulationState.returnSegmentEnergyKilojoules
    : outletTemperatureCurrent * returnSegmentMassKg * WATER_SPECIFIC_HEAT_KJ_PER_KG_C;

  const tankTemperatureFromEnergy =
    tankEnergyKilojoulesCurrent / (tankMassKg * WATER_SPECIFIC_HEAT_KJ_PER_KG_C);

  let compressorState = toNumberOrFallback(simulationState.compressorState, 0);
  if (compressorState === 0 && tankTemperatureFromEnergy <= 59.0) {
    compressorState = 1;
  } else if (compressorState === 1 && tankTemperatureFromEnergy >= 63.0) {
    compressorState = 0;
  }

  let tankEnergyKilojoulesNext = tankEnergyKilojoulesCurrent;
  if (compressorState === 1) {
    tankEnergyKilojoulesNext += HEAT_PUMP_POWER_KW * stepSeconds;
  }

  const tankTemperatureAfterHeatPump =
    tankEnergyKilojoulesNext / (tankMassKg * WATER_SPECIFIC_HEAT_KJ_PER_KG_C);

  const setpointTemperature = toNumberOrFallback(
    simulationState.setpointTemperature,
    tankTemperatureAfterHeatPump
  );
  const proportionalBand = toNumberOrFallback(pidSettings.proportionalBand, 0.0);
  const integrationTime = toNumberOrFallback(pidSettings.integrationTime, 0.0);

  const pidOutput = pidController.step(
    {
      setpoint: setpointTemperature,
      processValue: inletTemperatureCurrent,
      proportionalBand,
      integrationTime,
    },
    stepSeconds
  );

  const valveCommand = Number.isFinite(pidOutput.out) ? pidOutput.out : 0.0;
  const effectiveValveCommandCurrent = toNumberOrFallback(
    simulationState.effectiveValveCommand,
    valveCommand
  );
  const effectiveValveCommand = applyRateLimit(
    valveCommand,
    effectiveValveCommandCurrent,
    VALVE_RATE_LIMIT_PERCENT_PER_SECOND,
    stepSeconds
  );
  const hotWaterFraction = Math.min(Math.max(effectiveValveCommand / 100.0, 0.0), 1.0);

  const hotWaterDemandFlow = domesticHotWaterEvents.advance(stepSeconds);

  const recirculationFlowLitersPerSecond = LOOP_FLOW_LITERS_PER_SECOND;
  const totalReturnFlowLitersPerSecond =
    recirculationFlowLitersPerSecond + hotWaterDemandFlow;
  const tankFlowLitersPerSecond = hotWaterFraction * totalReturnFlowLitersPerSecond;
  const returnFlowToValveLitersPerSecond =
    (1.0 - hotWaterFraction) * totalReturnFlowLitersPerSecond;
  const returnSegmentTemperature =
    returnSegmentEnergyKilojoulesCurrent /
    (returnSegmentMassKg * WATER_SPECIFIC_HEAT_KJ_PER_KG_C);
  const returnSegmentInletTemperature =
    totalReturnFlowLitersPerSecond > 0.0
      ? (recirculationFlowLitersPerSecond * outletTemperatureCurrent +
          hotWaterDemandFlow * COLD_WATER_TEMPERATURE_C) /
        totalReturnFlowLitersPerSecond
      : outletTemperatureCurrent;

  if (stepSeconds > 0.0 && tankFlowLitersPerSecond > 0.0) {
    tankEnergyKilojoulesNext +=
      tankFlowLitersPerSecond *
      stepSeconds *
      WATER_SPECIFIC_HEAT_KJ_PER_KG_C *
      (returnSegmentInletTemperature - tankTemperatureAfterHeatPump);
  }

  const tankTemperatureNext =
    tankEnergyKilojoulesNext / (tankMassKg * WATER_SPECIFIC_HEAT_KJ_PER_KG_C);
  const preValveTemperatureNext = tankTemperatureNext + 0.5;

  let returnSegmentEnergyKilojoulesNext = returnSegmentEnergyKilojoulesCurrent;
  if (stepSeconds > 0.0 && returnFlowToValveLitersPerSecond > 0.0) {
    const returnFlowMass = returnFlowToValveLitersPerSecond * stepSeconds;
    returnSegmentEnergyKilojoulesNext +=
      returnFlowMass *
      WATER_SPECIFIC_HEAT_KJ_PER_KG_C *
      (returnSegmentInletTemperature - returnSegmentTemperature);
  }

  const returnSegmentTemperatureNext =
    returnSegmentEnergyKilojoulesNext /
    (returnSegmentMassKg * WATER_SPECIFIC_HEAT_KJ_PER_KG_C);
  const mixedSupplyTemperature =
    hotWaterFraction * preValveTemperatureNext +
    (1.0 - hotWaterFraction) * returnSegmentTemperatureNext;

  const delayStepCount = Math.max(1, Math.round(INLET_DELAY_SECONDS));
  let inletDelayBuffer = normalizeDelayQueue(
    simulationState.inletDelayBuffer,
    delayStepCount,
    inletTemperatureCurrent
  );
  let inletTemperatureNext = inletTemperatureCurrent;
  if (stepSeconds > 0.0) {
    const delayUpdates = Math.max(1, Math.round(stepSeconds));
    for (let step = 0; step < delayUpdates; step += 1) {
      inletDelayBuffer.push(mixedSupplyTemperature);
      inletTemperatureNext = inletDelayBuffer.shift();
    }
  }

  const loopHeatLossPerSegmentKwPerC = LOOP_HEAT_LOSS_KW_PER_CELSIUS / LOOP_SEGMENT_COUNT;
  const loopUpdateSteps = stepSeconds > 0 ? Math.max(1, Math.round(stepSeconds)) : 0;
  const loopStepSeconds = loopUpdateSteps > 0 ? stepSeconds / loopUpdateSteps : 0.0;

  let nextLoopSegmentTemperatures = loopSegmentTemperatures;
  for (let step = 0; step < loopUpdateSteps; step += 1) {
    const updatedSegments = new Array(LOOP_SEGMENT_COUNT);
    for (let index = 0; index < LOOP_SEGMENT_COUNT; index += 1) {
      const previousTemperature =
        index === 0 ? inletTemperatureNext : nextLoopSegmentTemperatures[index - 1];
      updatedSegments[index] = applySegmentHeatLoss(
        previousTemperature,
        loopHeatLossPerSegmentKwPerC,
        loopStepSeconds,
        LOOP_SEGMENT_VOLUME_LITERS
      );
    }
    nextLoopSegmentTemperatures = updatedSegments;
  }

  const outletTemperatureNext =
    nextLoopSegmentTemperatures[nextLoopSegmentTemperatures.length - 1] ??
    applySegmentHeatLoss(
      inletTemperatureNext,
      loopHeatLossPerSegmentKwPerC,
      stepSeconds,
      LOOP_SEGMENT_VOLUME_LITERS
    );

  return {
    tankTemperature: tankTemperatureNext,
    preValveTemperature: preValveTemperatureNext,
    setpointTemperature,
    inletTemperature: inletTemperatureNext,
    outletTemperature: outletTemperatureNext,
    valveCommand,
    effectiveValveCommand,
    compressorState,
    tankEnergyKilojoules: tankEnergyKilojoulesNext,
    returnSegmentEnergyKilojoules: returnSegmentEnergyKilojoulesNext,
    loopSegmentTemperatures: nextLoopSegmentTemperatures,
    inletDelayBuffer,
    hotWaterDemandFlow,
  };
}
