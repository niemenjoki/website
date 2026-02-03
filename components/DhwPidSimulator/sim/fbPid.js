const DEFAULT_OPTIONS = {
  enabled: true,
  balance: 50.0,
  minOutput: 0.0,
  maxOutput: 100.0,
  idleOutput: 0.0,
  averageSamples: 5,
};

class MovingAverage {
  constructor(size) {
    this.size = size;
    this.samples = [];
    this.sum = 0;
  }

  push(value) {
    this.samples.push(value);
    this.sum += value;
    if (this.samples.length > this.size) {
      this.sum -= this.samples.shift();
    }
  }

  get value() {
    if (this.samples.length === 0) {
      return 0;
    }
    return this.sum / this.samples.length;
  }

  reset() {
    this.samples = [];
    this.sum = 0;
  }
}

export class PidController {
  constructor(options = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.errorAverager = new MovingAverage(this.options.averageSamples);
    this.reset();
  }

  reset() {
    this.isInitialized = false;
    this.integralTerm = 0.0;
    this.proportionalTerm = 0.0;
    this.derivativeTerm = 0.0;
    this.output = 0.0;
    this.previousAverageError = 0.0;
    this.errorAverager.reset();
  }

  step(inputs, deltaSeconds) {
    const {
      enabled = this.options.enabled,
      setpoint,
      processValue,
      proportionalBand = 0.0,
      integrationTime = 0.0,
      derivativeTime = 0.0,
      balance = this.options.balance,
      minOutput = this.options.minOutput,
      maxOutput = this.options.maxOutput,
      idleOutput = this.options.idleOutput,
    } = inputs;

    const error = setpoint - processValue;
    const previousAverageError = this.errorAverager.value;
    this.errorAverager.push(error);
    const averageError = this.errorAverager.value;

    if (!enabled) {
      this.reset();
      this.output = idleOutput;
      return { out: idleOutput, p: 0.0, i: 0.0, d: 0.0 };
    }

    if (!this.isInitialized) {
      this.isInitialized = true;
      deltaSeconds = 0.0;
    }

    if (proportionalBand > 0.0) {
      this.proportionalTerm = (100.0 / proportionalBand) * error;
    } else {
      this.proportionalTerm = 0.0;
    }

    if (proportionalBand > 0.0 && derivativeTime > 0.0 && deltaSeconds > 0.0) {
      this.derivativeTerm =
        ((averageError - previousAverageError) / deltaSeconds) *
        (derivativeTime / proportionalBand) *
        100.0;
    } else {
      this.derivativeTerm = 0.0;
    }

    this.output = balance + this.proportionalTerm + this.integralTerm + this.derivativeTerm;

    if (
      (this.output < 100.0 || error <= 0.0) &&
      (this.output > 0.0 || error >= 0.0) &&
      proportionalBand > 0.0 &&
      integrationTime > 0.0
    ) {
      this.integralTerm += (error / proportionalBand) * (deltaSeconds / integrationTime) * 100.0;
    }

    this.output = balance + this.proportionalTerm + this.integralTerm + this.derivativeTerm;
    if (this.output > 100.0) {
      this.output = 100.0;
    } else if (this.output < 0.0) {
      this.output = 0.0;
    }

    const scaledOutput = minOutput + (this.output / 100.0) * (maxOutput - minOutput);
    this.previousAverageError = averageError;

    return {
      out: scaledOutput,
      p: this.proportionalTerm,
      i: this.integralTerm,
      d: this.derivativeTerm,
    };
  }
}

export function createPid(options) {
  return new PidController(options);
}
