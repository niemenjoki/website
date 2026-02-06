const DEFAULT_OPTIONS = {
  enabled: true,
  balance: 50.0,
  minOutput: 0.0,
  maxOutput: 100.0,
  idleOutput: 0.0,
};

export class PidController {
  constructor(options = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.reset();
  }

  reset() {
    this.isInitialized = false;
    this.integralTerm = 0.0;
    this.proportionalTerm = 0.0;
    this.output = 0.0;
  }

  step(inputs, deltaSeconds) {
    const {
      enabled = this.options.enabled,
      setpoint,
      processValue,
      proportionalBand = 0.0,
      integrationTime = 0.0,
      balance = this.options.balance,
      minOutput = this.options.minOutput,
      maxOutput = this.options.maxOutput,
      idleOutput = this.options.idleOutput,
    } = inputs;

    const error = setpoint - processValue;

    if (!enabled) {
      this.reset();
      this.output = idleOutput;
      return { out: idleOutput, p: 0.0, i: 0.0 };
    }

    if (!this.isInitialized) {
      this.isInitialized = true;
      deltaSeconds = 0.0;
    }

    if (integrationTime === 0) this.integralTerm = 0;

    if (proportionalBand > 0.0) {
      this.proportionalTerm = (100.0 / proportionalBand) * error;
    } else {
      this.proportionalTerm = 0.0;
    }

    const preOutput = this.proportionalTerm + this.integralTerm;

    if (
      ((preOutput < 100.0 && preOutput > 0.0) ||
        (preOutput >= 100.0 && error < 0.0) ||
        (preOutput <= 0.0 && error > 0.0)) &&
      proportionalBand > 0.0 &&
      integrationTime > 0.0
    ) {
      this.integralTerm +=
        (error / proportionalBand) * (deltaSeconds / integrationTime) * 100.0;
    }

    this.output = balance + this.proportionalTerm + this.integralTerm;
    if (this.output > 100.0) {
      this.output = 100.0;
    } else if (this.output < 0.0) {
      this.output = 0.0;
    }

    const scaledOutput = minOutput + (this.output / 100.0) * (maxOutput - minOutput);

    return {
      out: scaledOutput,
      p: this.proportionalTerm,
      i: this.integralTerm,
    };
  }
}

export function createPid(options) {
  return new PidController(options);
}
