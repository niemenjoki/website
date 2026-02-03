const HAND_WASH_MIN_SECONDS = 10;
const HAND_WASH_MAX_SECONDS = 30;
const SHOWER_DURATION_SECONDS = 4 * 60;
const CONTAINER_DURATION_SECONDS = 30;

const HAND_WASH_FLOW_LITERS_PER_SECOND = 0.12;
const SHOWER_FLOW_LITERS_PER_SECOND = 0.12;
const CONTAINER_FLOW_LITERS_PER_SECOND = 0.3;
const FLOW_VARIATION_RATIO = 0.12;
const FLOW_STEP_RATIO = 0.03;

const HAND_WASH_MEAN_INTERVAL_SECONDS = 80;
const SHOWER_MEAN_INTERVAL_SECONDS = 5 * 60;
const CONTAINER_MEAN_INTERVAL_SECONDS = 3 * 60;

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function nextFlowRate(baseFlow, currentFlow, deltaSeconds) {
  const maxDeviation = baseFlow * FLOW_VARIATION_RATIO;
  const stepSize = baseFlow * FLOW_STEP_RATIO * Math.sqrt(Math.max(deltaSeconds, 0));
  const next = currentFlow + randomRange(-stepSize, stepSize);
  return clamp(next, baseFlow - maxDeviation, baseFlow + maxDeviation);
}

function shouldStartEvent(meanIntervalSeconds, deltaSeconds) {
  if (meanIntervalSeconds <= 0 || deltaSeconds <= 0) return false;
  const probability = 1 - Math.exp(-deltaSeconds / meanIntervalSeconds);
  return Math.random() < probability;
}

class DomesticHotWaterEvents {
  constructor() {
    this.activeEvents = [];
    this.activeEvents.push({
      type: 'handWash',
      remainingSeconds: randomRange(HAND_WASH_MIN_SECONDS, HAND_WASH_MAX_SECONDS),
      baseFlowLitersPerSecond: HAND_WASH_FLOW_LITERS_PER_SECOND,
      flowLitersPerSecond: HAND_WASH_FLOW_LITERS_PER_SECOND,
    });
  }

  advance(deltaSeconds) {
    if (!Number.isFinite(deltaSeconds) || deltaSeconds <= 0) {
      return this.currentFlowLitersPerSecond();
    }

    this.activeEvents = this.activeEvents
      .map((event) => ({
        ...event,
        remainingSeconds: event.remainingSeconds - deltaSeconds,
        flowLitersPerSecond: nextFlowRate(
          event.baseFlowLitersPerSecond,
          event.flowLitersPerSecond,
          deltaSeconds
        ),
      }))
      .filter((event) => event.remainingSeconds > 0);

    if (shouldStartEvent(HAND_WASH_MEAN_INTERVAL_SECONDS, deltaSeconds)) {
      this.activeEvents.push({
        type: 'handWash',
        remainingSeconds: randomRange(HAND_WASH_MIN_SECONDS, HAND_WASH_MAX_SECONDS),
        baseFlowLitersPerSecond: HAND_WASH_FLOW_LITERS_PER_SECOND,
        flowLitersPerSecond: HAND_WASH_FLOW_LITERS_PER_SECOND,
      });
    }

    if (shouldStartEvent(SHOWER_MEAN_INTERVAL_SECONDS, deltaSeconds)) {
      this.activeEvents.push({
        type: 'shower',
        remainingSeconds: SHOWER_DURATION_SECONDS,
        baseFlowLitersPerSecond: SHOWER_FLOW_LITERS_PER_SECOND,
        flowLitersPerSecond: SHOWER_FLOW_LITERS_PER_SECOND,
      });
    }

    if (shouldStartEvent(CONTAINER_MEAN_INTERVAL_SECONDS, deltaSeconds)) {
      this.activeEvents.push({
        type: 'container',
        remainingSeconds: CONTAINER_DURATION_SECONDS,
        baseFlowLitersPerSecond: CONTAINER_FLOW_LITERS_PER_SECOND,
        flowLitersPerSecond: CONTAINER_FLOW_LITERS_PER_SECOND,
      });
    }

    return this.currentFlowLitersPerSecond();
  }

  currentFlowLitersPerSecond() {
    return this.activeEvents.reduce((sum, event) => sum + event.flowLitersPerSecond, 0);
  }
}

const domesticHotWaterEvents = new DomesticHotWaterEvents();

export default domesticHotWaterEvents;
