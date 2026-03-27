const BATCH_LIMIT_VALUES = [1, 16, 64];
const BIT_MASK_ORDER = [
  0x0100, 0x0200, 0x0400, 0x0800, 0x1000, 0x2000, 0x4000, 0x8000, 0x0001, 0x0002, 0x0004,
  0x0008, 0x0010, 0x0020, 0x0040, 0x0080,
];

const REGISTER_TYPE_ORDER = ['coil', 'discrete', 'input', 'holding'];
const ACCESS_ORDER = ['read', 'readwrite'];
const CURRENT_TOOL_URL =
  'https://www.niemenjoki.fi/projektit/rau-tyokalut/modbusrajapinta';
const MODBUS_DEVICES_TOOL_URL =
  'https://www.niemenjoki.fi/projektit/rau-tyokalut/modbuslaitteet';

export const BATCH_LIMIT_OPTIONS = Object.freeze([
  {
    value: '1',
    label: '1',
  },
  {
    value: '16',
    label: '16',
  },
  {
    value: '64',
    label: '64',
  },
]);

export const REGISTER_TYPE_OPTIONS = Object.freeze([
  { value: 'coil', label: 'Coil (0x)' },
  { value: 'discrete', label: 'Discrete (1x)' },
  { value: 'input', label: 'Input (3x)' },
  { value: 'holding', label: 'Holding (4x)' },
]);

export const DATA_TYPE_OPTIONS = Object.freeze([
  {
    value: 'INT',
    label: 'INT (16-bit signed)',
  },
  {
    value: 'UINT',
    label: 'UINT (16-bit unsigned)',
  },
  {
    value: 'DINT',
    label: 'DINT (32-bit signed)',
  },
  {
    value: 'UDINT',
    label: 'UDINT (32-bit unsigned)',
  },
  {
    value: 'FLOAT',
    label: 'FLOAT (32-bit)',
  },
]);

export const WORD_ORDER_OPTIONS = Object.freeze([
  {
    value: 'high-low',
    label: '1. rekisteri = high, 2. rekisteri = low',
  },
  {
    value: 'low-high',
    label: '1. rekisteri = low, 2. rekisteri = high',
  },
]);

export const ACCESS_MODE_OPTIONS = Object.freeze([
  { value: 'read', label: 'Vain luku (R)' },
  { value: 'readwrite', label: 'Luku ja kirjoitus (R/W)' },
]);

export const FORCE_OPTIONS = Object.freeze([
  { value: 'false', label: 'FALSE' },
  { value: 'true', label: 'TRUE' },
]);

export const RELEASE_OVERRIDE_OPTIONS = Object.freeze([
  { value: 'true', label: 'TRUE' },
  { value: 'false', label: 'FALSE' },
]);

let nextRegisterId = 1;

export function createEmptyRegister() {
  const registerId = `register-${nextRegisterId}`;

  nextRegisterId += 1;

  return {
    id: registerId,
    registerNumber: '',
    multiplier: '1',
    registerType: 'input',
    description: '',
    dataType: 'INT',
    wordOrder: 'high-low',
    accessMode: 'read',
    force: 'false',
    releaseOverride: 'true',
  };
}

export function normalizeEditableRegister(register) {
  const nextRegister = {
    ...register,
  };

  if (isBooleanRegisterType(nextRegister.registerType)) {
    nextRegister.dataType = 'BOOL';
    nextRegister.wordOrder = 'high-low';
  } else if (!nextRegister.dataType || nextRegister.dataType === 'BOOL') {
    nextRegister.dataType = 'INT';
  }

  if (!allowsWriteToggle(nextRegister.registerType)) {
    nextRegister.accessMode = 'read';
  }

  if (
    nextRegister.registerType === 'holding' &&
    isThirtyTwoBitDataType(nextRegister.dataType)
  ) {
    nextRegister.accessMode = 'read';
  }

  if (nextRegister.accessMode !== 'readwrite') {
    nextRegister.force = 'false';
    nextRegister.releaseOverride = 'true';
  }

  if (!supportsForceOptions(nextRegister.registerType)) {
    nextRegister.force = 'false';
    nextRegister.releaseOverride = 'true';
  }

  return nextRegister;
}

export function buildModbusInterfaceOutputs(registers, options = {}) {
  const normalizedOptions = normalizeOptions(options);
  const buildDate = normalizedOptions.buildDate ?? new Date();
  const versionTag = buildVersionTag(buildDate);
  const versionDateLabel = formatFinnishDate(buildDate);
  const batchLimit = Number.parseInt(normalizedOptions.batchLimit, 10);

  if (!BATCH_LIMIT_VALUES.includes(batchLimit)) {
    throw new Error(
      'Rekistereiden maksimimäärän modbuslaitteessa pitää olla 1, 16 tai 64.'
    );
  }

  const deviceName = normalizedOptions.deviceName.trim() || 'modbuslaite';

  if (!Array.isArray(registers) || registers.length === 0) {
    throw new Error('Lisää vähintään yksi rekisteri ennen generointia.');
  }

  const normalizedRegisters = registers.map((register, index) =>
    normalizeRegisterDefinition(register, index)
  );

  const deviceIdentifier = buildDeviceIdentifier(deviceName);
  const programIdentifier = deviceIdentifier;
  const functionBlockName = `FB_${deviceIdentifier}_${versionTag}`;
  const batches = buildBatches(normalizedRegisters, batchLimit);
  const helperFunctions = collectUsedHelperFunctions(normalizedRegisters);
  const functionBlock = buildFunctionBlockOutput({
    batches,
    functionBlockName,
    normalizedRegisters,
    versionDateLabel,
    versionTag,
  });
  const functionCall = buildFunctionCallOutput({
    functionBlockName,
    normalizedRegisters,
    programIdentifier,
  });

  return {
    sections: [
      {
        key: 'function-block',
        title: 'Funktiolohko',
        value: functionBlock,
      },
      {
        key: 'function-call',
        title: 'Ohjelmakutsu',
        value: functionCall,
      },
      {
        key: 'helper-functions',
        title: 'Käytetyt apufunktiot',
        value: [...helperFunctions.map((name) => `- ${name}`)].join('\n'),
      },
    ],
    summary: `Generoitu rajapinta ${normalizedRegisters.length} rekisterille käyttäen ${batches.length} modbuslaitetta.`,
    warnings: createWarnings(),
  };
}

function normalizeOptions(options) {
  return {
    batchLimit: options.batchLimit ?? '16',
    buildDate: options.buildDate,
    deviceName: typeof options.deviceName === 'string' ? options.deviceName : '',
  };
}

function normalizeRegisterDefinition(register, index) {
  const originalRegister = normalizeEditableRegister(register ?? {});
  const rowLabel = `Rivi ${index + 1}`;
  const registerType = originalRegister.registerType;
  const registerTypeMeta = getRegisterTypeMeta(registerType);
  const registerNumber = parseRegisterNumber(originalRegister.registerNumber, rowLabel);
  const description = normalizeDescription(originalRegister.description, rowLabel);
  const dataType = normalizeDataType(registerType, originalRegister.dataType, rowLabel);
  const size = getRegisterSize(registerType, dataType);
  const multiplier = normalizeMultiplier(
    originalRegister.multiplier,
    rowLabel,
    isBooleanRegisterType(registerType)
  );
  const wordOrder = normalizeWordOrder(dataType, originalRegister.wordOrder, rowLabel);
  const accessMode = normalizeAccessMode(
    registerType,
    dataType,
    originalRegister.accessMode
  );
  const force = supportsForceOptions(registerType)
    ? parseBooleanFlag(originalRegister.force, rowLabel, 'Force')
    : false;
  const releaseOverride = supportsForceOptions(registerType)
    ? parseBooleanFlag(originalRegister.releaseOverride, rowLabel, 'ReleaseOverride')
    : true;
  const pointName = `reg_${registerTypeMeta.pointPrefix}${formatDisplayRegisterNumber(
    registerNumber
  )}`;

  if (registerNumber + size - 1 > 65535) {
    throw new Error(`${rowLabel}: rekisterin koko ylittää Modbus-osoitealueen pään.`);
  }

  return {
    accessMode,
    dataType,
    description,
    displayRegisterNumber: formatDisplayRegisterNumber(registerNumber),
    force,
    index,
    pointName,
    pointPrefix: registerTypeMeta.pointPrefix,
    registerNumber,
    registerType,
    releaseOverride,
    size,
    typeLabel: registerTypeMeta.label,
    wordOrder,
    multiplier,
    rowLabel,
    writable:
      accessMode === 'readwrite' &&
      (registerType === 'coil' || registerType === 'holding'),
  };
}

function normalizeDescription(value, rowLabel) {
  if (typeof value !== 'string') {
    return ' ';
  }

  const trimmedDescription = value.trim();

  if (!trimmedDescription) {
    return ' ';
  }

  return trimmedDescription;
}

function parseRegisterNumber(value, rowLabel) {
  const normalizedValue = typeof value === 'string' ? value.trim() : `${value ?? ''}`;

  if (!/^\d+$/.test(normalizedValue)) {
    throw new Error(`${rowLabel}: rekisterinumeron pitää olla kokonaisluku.`);
  }

  const registerNumber = Number.parseInt(normalizedValue, 10);

  if (registerNumber < 0 || registerNumber > 65535) {
    throw new Error(`${rowLabel}: rekisterinumeron pitää olla välillä 0-65535.`);
  }

  return registerNumber;
}

function normalizeMultiplier(value, rowLabel, isBooleanRegister) {
  if (isBooleanRegister) {
    return '1.0';
  }

  const normalizedValue =
    typeof value === 'string' ? value.trim().replace(',', '.') : `${value ?? ''}`;

  if (!/^[+-]?\d+(?:\.\d+)?$/.test(normalizedValue)) {
    throw new Error(`${rowLabel}: kerroin pitää antaa numerona.`);
  }

  const numericValue = Number.parseFloat(normalizedValue);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    throw new Error(`${rowLabel}: kertoimen pitää olla nollaa suurempi.`);
  }

  return formatNumericLiteral(normalizedValue);
}

function normalizeDataType(registerType, value, rowLabel) {
  if (isBooleanRegisterType(registerType)) {
    return 'BOOL';
  }

  const dataType = typeof value === 'string' ? value.trim().toUpperCase() : '';

  if (!DATA_TYPE_OPTIONS.some((option) => option.value === dataType)) {
    throw new Error(`${rowLabel}: valitse tietotyyppi.`);
  }

  return dataType;
}

function normalizeWordOrder(dataType, value, rowLabel) {
  if (!isThirtyTwoBitDataType(dataType)) {
    return 'high-low';
  }

  if (!WORD_ORDER_OPTIONS.some((option) => option.value === value)) {
    throw new Error(`${rowLabel}: valitse 32-bittisen sanajärjestys.`);
  }

  return value;
}

function normalizeAccessMode(registerType, dataType, value) {
  if (!allowsWriteToggle(registerType)) {
    return 'read';
  }

  if (registerType === 'holding' && isThirtyTwoBitDataType(dataType)) {
    return 'read';
  }

  return value === 'readwrite' ? 'readwrite' : 'read';
}

function parseBooleanFlag(value, rowLabel, fieldLabel) {
  if (value === true || value === 'true') {
    return true;
  }

  if (value === false || value === 'false') {
    return false;
  }

  throw new Error(`${rowLabel}: ${fieldLabel}-arvo pitää valita.`);
}

function buildBatches(registers, batchLimit) {
  validateRegisterOverlaps(registers);

  const sortedRegisters = [...registers].sort(compareRegisters);
  const batches = [];

  for (const register of sortedRegisters) {
    const previousBatch = batches[batches.length - 1];

    if (!previousBatch || !canAppendToBatch(previousBatch, register, batchLimit)) {
      batches.push(createBatch(register));
      continue;
    }

    previousBatch.rows.push(register);
    previousBatch.lastRegisterNumber = register.registerNumber;
    previousBatch.end = Math.max(
      previousBatch.end,
      register.registerNumber + register.size - 1
    );
    previousBatch.count = previousBatch.end - previousBatch.start + 1;
  }

  return batches.map((batch) => ({
    ...batch,
    instanceName: `Modbus_${batch.rows[0].pointPrefix}${formatDisplayRegisterNumber(
      batch.start
    )}`,
  }));
}

function validateRegisterOverlaps(registers) {
  const occupancy = new Map();

  for (const register of registers) {
    const spanLength = isBooleanRegisterType(register.registerType) ? 1 : register.size;

    for (let offset = 0; offset < spanLength; offset += 1) {
      const address = register.registerNumber + offset;
      const mapKey = `${register.registerType}:${address}`;

      if (occupancy.has(mapKey)) {
        const previousRegister = occupancy.get(mapKey);

        throw new Error(
          `${register.rowLabel}: rekisteri menee päällekkäin kohdan ${previousRegister.rowLabel} kanssa (${register.typeLabel.toLowerCase()} ${address}).`
        );
      }

      occupancy.set(mapKey, register);
    }
  }
}

function createBatch(register) {
  return {
    accessMode: register.accessMode,
    count: register.size,
    end: register.registerNumber + register.size - 1,
    lastRegisterNumber: register.registerNumber,
    registerType: register.registerType,
    rows: [register],
    start: register.registerNumber,
    writable: register.writable,
  };
}

function canAppendToBatch(batch, register, batchLimit) {
  if (batch.registerType !== register.registerType) {
    return false;
  }

  if (batch.accessMode !== register.accessMode) {
    return false;
  }

  if (register.registerNumber - batch.lastRegisterNumber > 5) {
    return false;
  }

  const projectedEnd = Math.max(batch.end, register.registerNumber + register.size - 1);
  const projectedCount = projectedEnd - batch.start + 1;

  return projectedCount <= batchLimit;
}

function compareRegisters(left, right) {
  const typeDifference =
    REGISTER_TYPE_ORDER.indexOf(left.registerType) -
    REGISTER_TYPE_ORDER.indexOf(right.registerType);

  if (typeDifference !== 0) {
    return typeDifference;
  }

  const accessDifference =
    ACCESS_ORDER.indexOf(left.accessMode) - ACCESS_ORDER.indexOf(right.accessMode);

  if (accessDifference !== 0) {
    return accessDifference;
  }

  return left.registerNumber - right.registerNumber;
}

function buildFunctionBlockOutput({
  batches,
  functionBlockName,
  normalizedRegisters,
  versionDateLabel,
  versionTag,
}) {
  const usesUdiTemp = normalizedRegisters.some((register) =>
    ['DINT', 'UDINT'].includes(register.dataType)
  );
  const usesRealTemp = normalizedRegisters.some(
    (register) => register.dataType === 'FLOAT'
  );
  const varInputLines = buildFunctionBlockInputs(normalizedRegisters);
  const batchVarLines = batches.map(
    (batch) => `\t${batch.instanceName} : GenericModbus642FB;`
  );
  const batchBlocks = batches.flatMap((batch) => buildBatchCode(batch));
  const versionHistoryComment = [
    '(*',
    `${functionBlockName}`,
    '',
    'Versiohistoria:',
    '',
    `${versionTag} (${versionDateLabel})`,
    `- Modbusrajapinta-työkalulla (${CURRENT_TOOL_URL}) generoitu modbus-rajapinta.`,
    '- Testaamatta kentällä.',
    '*)',
  ];
  const lines = [
    `FUNCTION_BLOCK ${functionBlockName}`,
    'VAR_EXTERNAL',
    '',
    'END_VAR',
    '',
    'VAR_INPUT',
    '\tiPort : INT;',
    '\tiModule : INT;',
    '\tComm_Alarm : STRING(30);',
    ...varInputLines,
    'END_VAR',
    '',
    'VAR_OUTPUT',
    '',
    'END_VAR',
    '',
    'VAR',
    '\tiTemp : INT;',
    ...(usesUdiTemp ? ['\tudiTemp : UDINT;'] : []),
    ...(usesRealTemp ? ['\trTemp : REAL;'] : []),
    ...batchVarLines,
    'END_VAR',
    '',
    'VAR CONSTANT',
    '\tCOIL : INT := 1;',
    '\tDISCRETE : INT := 2;',
    '\tHOLDING : INT := 3;',
    '\tINPUT : INT := 4;',
    'END_VAR',
    '',
    ...versionHistoryComment,
    '',
    '(* Väylävika *)',
    'iTemp := SetDigitalPointF(Value:=BOOL_TO_INT(GetSystemStatusF(Mode:=1, iParameter:=iModule, rParameter:=INT_TO_REAL(iPort)) > 30.0), LockState:=1, Name:=Comm_Alarm);',
    '',
    ...batchBlocks,
    'END_FUNCTION_BLOCK',
  ];

  return lines.join('\n');
}

function buildFunctionBlockInputs(registers) {
  const sortedRegisters = [...registers].sort(compareRegisters);

  return sortedRegisters.map((register) => `\t${register.pointName} : STRING(30);`);
}

function buildBatchCode(batch) {
  const registerTypeMeta = getRegisterTypeMeta(batch.registerType);
  const lines = [
    `(* ${registerTypeMeta.label}, Start ${batch.start}, Count ${batch.count} *)`,
    `${batch.instanceName}(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=${formatStartRegister(batch.start)}, RegisterType:=${registerTypeMeta.constantName});`,
    `IF ${batch.instanceName}.Datavalid = 1 THEN`,
  ];

  for (const register of batch.rows) {
    lines.push(`\t${buildRegisterLine(register, batch)}`);
  }

  if (batch.writable) {
    lines.push(`\t${batch.instanceName}(Send:=2);`);
  }

  lines.push('END_IF;');
  lines.push('');

  return lines;
}

function buildRegisterLine(register, batch) {
  const commentSuffix = ` ${buildInlineComment(register.description)}`;

  if (register.registerType === 'coil' || register.registerType === 'discrete') {
    const offset = register.registerNumber - batch.start;
    const registerIndex = Math.floor(offset / 16);
    const bitMask = formatBitMask(BIT_MASK_ORDER[offset % 16]);
    const regRef = `${batch.instanceName}.Reg${registerIndex}`;

    if (register.registerType === 'coil') {
      return `${regRef} := CoilF_3(id_String:=${register.pointName}, RegValue:=${regRef}, BitMask:=${bitMask}, Force:=${formatBoolean(register.force)}, ReleaseOverride:=${formatBoolean(register.releaseOverride)});${commentSuffix}`;
    }

    return `iTemp := DiscreteInputF(id_String:=${register.pointName}, RegValue:=${regRef}, BitMask:=${bitMask});${commentSuffix}`;
  }

  const offset = register.registerNumber - batch.start;
  const currentRegRef = `${batch.instanceName}.Reg${offset}`;
  const { highRegRef, lowRegRef } = resolveHighAndLowRegisterRefs(
    register,
    batch,
    offset
  );
  const multiplier = register.multiplier;

  if (register.registerType === 'input') {
    if (register.dataType === 'INT') {
      return `iTemp := InputRegF(id_String:=${register.pointName}, RegValue:=${currentRegRef}, rMultiplier:=${multiplier});${commentSuffix}`;
    }

    if (register.dataType === 'UINT') {
      return `iTemp := InputRegF_UINT(id_String:=${register.pointName}, RegValue:=${currentRegRef}, rMultiplier:=${multiplier});${commentSuffix}`;
    }

    if (register.dataType === 'DINT') {
      return `udiTemp := DoubleInputRegF_DINT(id_String:=${register.pointName}, HighRegValue:=${highRegRef}, LowRegValue:=${lowRegRef}, rMultiplier:=${multiplier});${commentSuffix}`;
    }

    if (register.dataType === 'UDINT') {
      return `udiTemp := DoubleInputRegF_UDINT(id_String:=${register.pointName}, HighRegValue:=${highRegRef}, LowRegValue:=${lowRegRef}, rMultiplier:=${multiplier});${commentSuffix}`;
    }

    return buildFloatReadLine(register, highRegRef, lowRegRef, commentSuffix);
  }

  if (register.dataType === 'INT') {
    return `${currentRegRef} := HoldingRegF_3(id_String:=${register.pointName}, RegValue:=${currentRegRef}, rMultiplier:=${multiplier}, Force:=${formatBoolean(register.force)}, ReleaseOverride:=${formatBoolean(register.releaseOverride)});${commentSuffix}`;
  }

  if (register.dataType === 'UINT') {
    return `${currentRegRef} := HoldingRegF_3UINT(id_String:=${register.pointName}, RegValue:=${currentRegRef}, rMultiplier:=${multiplier}, Force:=${formatBoolean(register.force)}, ReleaseOverride:=${formatBoolean(register.releaseOverride)});${commentSuffix}`;
  }

  if (register.dataType === 'DINT') {
    return `udiTemp := DoubleHoldingRegF_3DINT(id_String:=${register.pointName}, HighRegValue:=${highRegRef}, LowRegValue:=${lowRegRef}, rMultiplier:=${multiplier}, Force:=${formatBoolean(register.force)}, ReleaseOverride:=${formatBoolean(register.releaseOverride)});${commentSuffix}`;
  }

  if (register.dataType === 'UDINT') {
    return `udiTemp := DoubleHoldingRegF_3UDINT(id_String:=${register.pointName}, HighRegValue:=${highRegRef}, LowRegValue:=${lowRegRef}, rMultiplier:=${multiplier}, Force:=${formatBoolean(register.force)}, ReleaseOverride:=${formatBoolean(register.releaseOverride)});${commentSuffix}`;
  }

  return buildFloatReadLine(register, highRegRef, lowRegRef, commentSuffix);
}

function buildFloatReadLine(register, highRegRef, lowRegRef, commentSuffix) {
  if (register.multiplier === '1.0') {
    return `rTemp := DoubleInputReg_Float(id_String:=${register.pointName}, HighRegValue:=${highRegRef}, LowRegValue:=${lowRegRef});${commentSuffix}`;
  }

  return `rTemp := DoubleInputReg_Float_jakaja(id_String:=${register.pointName}, HighRegValue:=${highRegRef}, LowRegValue:=${lowRegRef}, jakaja:=${register.multiplier});${commentSuffix}`;
}

function resolveHighAndLowRegisterRefs(register, batch, offset) {
  const firstRegRef = `${batch.instanceName}.Reg${offset}`;
  const secondRegRef = `${batch.instanceName}.Reg${offset + 1}`;

  if (register.wordOrder === 'high-low') {
    return {
      highRegRef: firstRegRef,
      lowRegRef: secondRegRef,
    };
  }

  return {
    highRegRef: secondRegRef,
    lowRegRef: firstRegRef,
  };
}

function buildFunctionCallOutput({
  functionBlockName,
  normalizedRegisters,
  programIdentifier,
}) {
  const sortedRegisters = [...normalizedRegisters].sort(compareRegisters);
  const callItems = [
    {
      type: 'argument',
      value: '\tiPort := 0',
      comment: '(* Portti *)',
    },
    {
      type: 'argument',
      value: '\tiModule := 0',
      comment: '(* Osoite *)',
    },
    {
      type: 'argument',
      value: "\tComm_Alarm := ''",
      comment: '(* Väylävikahälytys *)',
    },
  ];

  for (const registerType of REGISTER_TYPE_ORDER) {
    const typeRegisters = sortedRegisters.filter(
      (register) => register.registerType === registerType
    );

    if (typeRegisters.length === 0) {
      continue;
    }

    callItems.push({
      type: 'comment',
      value: `\t(* ${getRegisterTypeMeta(registerType).pluralLabel} *)`,
    });

    for (const register of typeRegisters) {
      callItems.push({
        type: 'argument',
        value: `\t${register.pointName} := ''`,
        comment: buildCallComment(register),
      });
    }
  }

  const lastArgumentIndex = findLastArgumentIndex(callItems);
  const renderedCallLines = callItems.map((item, index) => {
    if (item.type === 'comment') {
      return item.value;
    }

    const suffix = index === lastArgumentIndex ? '' : ',';

    return `${item.value}${suffix} ${item.comment}`;
  });

  const lines = [
    `PROGRAM ${programIdentifier}`,
    'VAR',
    `\tfbModbus : ${functionBlockName};`,
    'END_VAR',
    '',
    'fbModbus(',
    ...renderedCallLines,
    ');',
    '',
    'END_PROGRAM',
  ];

  return lines.join('\n');
}

function buildCallComment(register) {
  const description = sanitizeStCommentText(register.description);
  const hasVisibleDescription = description.trim() !== '';

  if (register.registerType === 'coil' || register.registerType === 'holding') {
    if (!hasVisibleDescription) {
      return `(* ${register.writable ? 'R/W' : 'R'} *)`;
    }

    return `(* ${description}, ${register.writable ? 'R/W' : 'R'} *)`;
  }

  return `(* ${description} *)`;
}

function findLastArgumentIndex(callItems) {
  for (let index = callItems.length - 1; index >= 0; index -= 1) {
    if (callItems[index].type === 'argument') {
      return index;
    }
  }

  return -1;
}

function createWarnings() {
  return [];
}

function collectUsedHelperFunctions(registers) {
  const helperFunctions = [];
  const seenHelperFunctions = new Set();

  for (const register of [...registers].sort(compareRegisters)) {
    const helperFunction = getHelperFunctionName(register);

    if (!helperFunction || seenHelperFunctions.has(helperFunction)) {
      continue;
    }

    seenHelperFunctions.add(helperFunction);
    helperFunctions.push(helperFunction);
  }

  return helperFunctions;
}

function getHelperFunctionName(register) {
  if (register.registerType === 'coil') {
    return 'CoilF_3';
  }

  if (register.registerType === 'discrete') {
    return 'DiscreteInputF';
  }

  if (register.registerType === 'input') {
    if (register.dataType === 'INT') {
      return 'InputRegF';
    }

    if (register.dataType === 'UINT') {
      return 'InputRegF_UINT';
    }

    if (register.dataType === 'DINT') {
      return 'DoubleInputRegF_DINT';
    }

    if (register.dataType === 'UDINT') {
      return 'DoubleInputRegF_UDINT';
    }

    return register.multiplier === '1.0'
      ? 'DoubleInputReg_Float'
      : 'DoubleInputReg_Float_jakaja';
  }

  if (register.dataType === 'INT') {
    return 'HoldingRegF_3';
  }

  if (register.dataType === 'UINT') {
    return 'HoldingRegF_3UINT';
  }

  if (register.dataType === 'DINT') {
    return 'DoubleHoldingRegF_3DINT';
  }

  if (register.dataType === 'UDINT') {
    return 'DoubleHoldingRegF_3UDINT';
  }

  return register.multiplier === '1.0'
    ? 'DoubleInputReg_Float'
    : 'DoubleInputReg_Float_jakaja';
}

function getRegisterTypeMeta(registerType) {
  if (registerType === 'coil') {
    return {
      constantName: 'COIL',
      label: 'Coil',
      pluralLabel: 'Coil rekisterit',
      pointPrefix: '0x',
    };
  }

  if (registerType === 'discrete') {
    return {
      constantName: 'DISCRETE',
      label: 'Discrete',
      pluralLabel: 'Discrete rekisterit',
      pointPrefix: '1x',
    };
  }

  if (registerType === 'input') {
    return {
      constantName: 'INPUT',
      label: 'Input',
      pluralLabel: 'Input rekisterit',
      pointPrefix: '3x',
    };
  }

  if (registerType === 'holding') {
    return {
      constantName: 'HOLDING',
      label: 'Holding',
      pluralLabel: 'Holding rekisterit',
      pointPrefix: '4x',
    };
  }

  throw new Error(`Tuntematon rekisterityyppi: ${registerType}`);
}

function getRegisterSize(registerType, dataType) {
  if (isBooleanRegisterType(registerType)) {
    return 1;
  }

  return isThirtyTwoBitDataType(dataType) ? 2 : 1;
}

function isBooleanRegisterType(registerType) {
  return registerType === 'coil' || registerType === 'discrete';
}

function isThirtyTwoBitDataType(dataType) {
  return dataType === 'DINT' || dataType === 'UDINT' || dataType === 'FLOAT';
}

function allowsWriteToggle(registerType) {
  return registerType === 'coil' || registerType === 'holding';
}

function supportsForceOptions(registerType) {
  return registerType === 'coil' || registerType === 'holding';
}

function formatDisplayRegisterNumber(registerNumber) {
  return `${registerNumber + 1}`.padStart(4, '0');
}

function formatStartRegister(registerNumber) {
  if (registerNumber > 32767) {
    return `16#${registerNumber.toString(16).toUpperCase().padStart(4, '0')}`;
  }

  return `${registerNumber}`;
}

function formatBitMask(value) {
  return `16#${value.toString(16).toUpperCase().padStart(4, '0')}`;
}

function formatBoolean(value) {
  return value ? 'TRUE' : 'FALSE';
}

function formatNumericLiteral(value) {
  const [integerPart, decimalPart = ''] = value.split('.');
  const normalizedIntegerPart = integerPart.replace(/^(-?)0+(?=\d)/, '$1');

  if (!decimalPart) {
    return `${normalizedIntegerPart}.0`;
  }

  const normalizedDecimalPart = decimalPart.replace(/0+$/, '');

  if (!normalizedDecimalPart) {
    return `${normalizedIntegerPart}.0`;
  }

  return `${normalizedIntegerPart}.${normalizedDecimalPart}`;
}

function buildDeviceIdentifier(deviceName) {
  const asciiName = deviceName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9]+/g, ' ')
    .trim();
  const tokens = asciiName
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean)
    .map(capitalizeToken);

  if (tokens.length === 0) {
    return 'ModbusLaite';
  }

  const candidate = tokens.join('_');

  if (/^[0-9]/.test(candidate)) {
    return `Laite_${candidate}`;
  }

  return candidate;
}

function capitalizeToken(token) {
  if (!token) {
    return token;
  }

  return `${token.charAt(0).toUpperCase()}${token.slice(1)}`;
}

function buildVersionTag(date) {
  const shortYear = `${date.getFullYear()}`.slice(-2);

  return `V${shortYear}a0`;
}

function formatFinnishDate(date) {
  return new Intl.DateTimeFormat('fi-FI').format(date);
}

function buildInlineComment(text) {
  return `(* ${sanitizeStCommentText(text)} *)`;
}

function sanitizeStCommentText(text) {
  const normalizedText = `${text}`
    .replaceAll('(*', '( *')
    .replaceAll('*)', '* )')
    .replace(/\s+/g, ' ');

  if (normalizedText.trim() === '') {
    return ' ';
  }

  return normalizedText.trim();
}

export const modbusInterfaceToolMeta = Object.freeze({
  currentToolUrl: CURRENT_TOOL_URL,
  modbusDevicesToolUrl: MODBUS_DEVICES_TOOL_URL,
});
