const BIT_MASK_ORDER = [
  0x0100, 0x0200, 0x0400, 0x0800, 0x1000, 0x2000, 0x4000, 0x8000, 0x0001, 0x0002, 0x0004,
  0x0008, 0x0010, 0x0020, 0x0040, 0x0080,
];

const REGISTER_TYPE_ORDER = ['Coil', 'Discrete', 'Input', 'Holding'];

function stripSource(input, { preserveStrings = false } = {}) {
  let result = '';
  let index = 0;
  let blockCommentDepth = 0;
  let braceCommentDepth = 0;
  let inLineComment = false;
  let inSingleQuote = false;
  let inDoubleQuote = false;

  while (index < input.length) {
    const current = input[index];
    const next = input[index + 1] ?? '';

    if (inLineComment) {
      if (current === '\n') {
        inLineComment = false;
        result += '\n';
      } else {
        result += ' ';
      }

      index += 1;
      continue;
    }

    if (blockCommentDepth > 0) {
      if (current === '(' && next === '*') {
        blockCommentDepth += 1;
        result += '  ';
        index += 2;
        continue;
      }

      if (current === '*' && next === ')') {
        blockCommentDepth -= 1;
        result += '  ';
        index += 2;
        continue;
      }

      result += current === '\n' ? '\n' : ' ';
      index += 1;
      continue;
    }

    if (braceCommentDepth > 0) {
      if (current === '{') {
        braceCommentDepth += 1;
        result += ' ';
        index += 1;
        continue;
      }

      if (current === '}') {
        braceCommentDepth -= 1;
        result += ' ';
        index += 1;
        continue;
      }

      result += current === '\n' ? '\n' : ' ';
      index += 1;
      continue;
    }

    if (inSingleQuote) {
      if (current === "'" && next === "'") {
        result += preserveStrings ? "''" : '  ';
        index += 2;
        continue;
      }

      if (current === "'") {
        inSingleQuote = false;
      }

      result += preserveStrings ? current : current === '\n' ? '\n' : ' ';
      index += 1;
      continue;
    }

    if (inDoubleQuote) {
      if (current === '"' && next === '"') {
        result += preserveStrings ? '""' : '  ';
        index += 2;
        continue;
      }

      if (current === '"') {
        inDoubleQuote = false;
      }

      result += preserveStrings ? current : current === '\n' ? '\n' : ' ';
      index += 1;
      continue;
    }

    if (current === '/' && next === '/') {
      inLineComment = true;
      result += '  ';
      index += 2;
      continue;
    }

    if (current === '(' && next === '*') {
      blockCommentDepth = 1;
      result += '  ';
      index += 2;
      continue;
    }

    if (current === '{') {
      braceCommentDepth = 1;
      result += ' ';
      index += 1;
      continue;
    }

    if (current === "'") {
      inSingleQuote = true;
      result += preserveStrings ? current : ' ';
      index += 1;
      continue;
    }

    if (current === '"') {
      inDoubleQuote = true;
      result += preserveStrings ? current : ' ';
      index += 1;
      continue;
    }

    result += current;
    index += 1;
  }

  return result;
}

function parseNumericLiteral(value) {
  const trimmed = value.trim();

  if (/^-?\d+$/.test(trimmed)) {
    return Number(trimmed);
  }

  const hexMatch = /^16#([0-9a-fA-F_]+)$/.exec(trimmed);

  if (hexMatch) {
    return Number.parseInt(hexMatch[1].replaceAll('_', ''), 16);
  }

  return null;
}

function normalizeRegisterType(value) {
  const trimmed = value.trim();
  const numericValue = parseNumericLiteral(trimmed);

  if (numericValue === 1) {
    return 'Coil';
  }

  if (numericValue === 2) {
    return 'Discrete';
  }

  if (numericValue === 3) {
    return 'Holding';
  }

  if (numericValue === 4) {
    return 'Input';
  }

  if (numericValue !== null) {
    return '';
  }

  const upperCaseValue = trimmed.toUpperCase();

  if (upperCaseValue === 'COIL') {
    return 'Coil';
  }

  if (upperCaseValue === 'DISCRETE') {
    return 'Discrete';
  }

  if (upperCaseValue === 'HOLDING') {
    return 'Holding';
  }

  if (upperCaseValue === 'INPUT') {
    return 'Input';
  }

  return '';
}

function parseNamedArguments(argumentSource) {
  const namedArguments = {};
  const argumentPattern =
    /\b([A-Za-z_][A-Za-z0-9_]*)\s*:=\s*([^,]+?)(?=(?:,\s*[A-Za-z_][A-Za-z0-9_]*\s*:=)|$)/gs;

  for (const match of argumentSource.matchAll(argumentPattern)) {
    namedArguments[match[1]] = match[2].trim();
  }

  return namedArguments;
}

function getNamedArgumentValue(namedArguments, argumentName) {
  const normalizedArgumentName = argumentName.toLowerCase();

  for (const [key, value] of Object.entries(namedArguments)) {
    if (key.toLowerCase() === normalizedArgumentName) {
      return value;
    }
  }

  return null;
}

function splitStatements(source) {
  return source
    .split(';')
    .map((statement) => statement.trim())
    .filter(Boolean);
}

function splitStatementsWithPositions(source) {
  const statements = [];
  let statementStart = 0;

  for (let index = 0; index < source.length; index += 1) {
    if (source[index] !== ';') {
      continue;
    }

    const rawStatement = source.slice(statementStart, index);
    const leadingWhitespaceLength = rawStatement.match(/^\s*/)?.[0].length ?? 0;
    const trimmedStatement = rawStatement.trim();

    if (trimmedStatement) {
      statements.push({
        text: trimmedStatement,
        start: statementStart + leadingWhitespaceLength,
        end: index,
      });
    }

    statementStart = index + 1;
  }

  return statements;
}

function extractCallExpressions(source) {
  const callExpressions = [];
  const callPattern = /\b([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*?)\)/g;

  for (const statement of splitStatementsWithPositions(source)) {
    for (const match of statement.text.matchAll(callPattern)) {
      callExpressions.push({
        name: match[1],
        argumentsSource: match[2],
        start: statement.start + (match.index ?? 0),
        end: statement.start + (match.index ?? 0) + match[0].length,
      });
    }
  }

  return callExpressions;
}

function getFieldNameFromStatement(statement) {
  return /\bid_[Ss]tring\s*:=\s*([A-Za-z_][A-Za-z0-9_]*)/i.exec(statement)?.[1] ?? '';
}

function extractModbusCalls(source) {
  const calls = [];

  for (const callExpression of extractCallExpressions(source)) {
    const instanceName = callExpression.name;
    const namedArguments = parseNamedArguments(callExpression.argumentsSource);
    const startRegisterRaw = getNamedArgumentValue(namedArguments, 'StartRegister');
    const registerTypeRaw = getNamedArgumentValue(namedArguments, 'RegisterType');

    if (startRegisterRaw === null || registerTypeRaw === null) {
      continue;
    }

    calls.push({
      instanceName,
      startRegisterRaw,
      registerTypeRaw,
      callStart: callExpression.start,
      callEnd: callExpression.end,
    });
  }

  return calls;
}

function annotateCallScopes(calls, sourceLength) {
  return calls.map((call, index) => {
    const nextCallForInstance = calls
      .slice(index + 1)
      .find((candidateCall) => candidateCall.instanceName === call.instanceName);

    return {
      ...call,
      scopeStart: call.callEnd,
      scopeEnd: nextCallForInstance ? nextCallForInstance.callStart : sourceLength,
    };
  });
}

function getRegisterIndicesForInstance(source, instanceName) {
  const escapedInstanceName = instanceName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regPattern = new RegExp(`\\b${escapedInstanceName}\\s*\\.\\s*Reg(\\d+)\\b`, 'gi');
  const registerIndices = [];

  for (const match of source.matchAll(regPattern)) {
    registerIndices.push(Number(match[1]));
  }

  return registerIndices;
}

function getStatementsForInstance(source, instanceName) {
  const escapedInstanceName = instanceName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const statementPattern = new RegExp(
    `\\b${escapedInstanceName}\\s*\\.\\s*Reg\\d+\\b`,
    'i'
  );

  return splitStatements(source).filter((statement) => statementPattern.test(statement));
}

function getRegisterIndicesFromStatement(statement, instanceName) {
  const escapedInstanceName = instanceName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regPattern = new RegExp(`\\b${escapedInstanceName}\\s*\\.\\s*Reg(\\d+)\\b`, 'gi');

  return [...statement.matchAll(regPattern)].map((match) => Number(match[1]));
}

function getScopedSource(source, call) {
  return source.slice(call.scopeStart, call.scopeEnd);
}

function getBitPosition(bitMask) {
  const bitIndex = BIT_MASK_ORDER.indexOf(bitMask);

  return bitIndex >= 0 ? bitIndex + 1 : 0;
}

function inferCountForBitType(source, instanceName) {
  const escapedInstanceName = instanceName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pairPatterns = [
    new RegExp(
      `\\b${escapedInstanceName}\\s*\\.\\s*Reg(\\d+)\\b[^;]*?\\bBitMask\\s*:=\\s*(16#[0-9a-fA-F_]+|\\d+)`,
      'gi'
    ),
    new RegExp(
      `\\b${escapedInstanceName}\\s*\\.\\s*Reg(\\d+)\\b\\s*(?:AND|OR|XOR)\\s*(16#[0-9a-fA-F_]+|\\d+)`,
      'gi'
    ),
  ];
  const statements = getStatementsForInstance(source, instanceName);
  const pairedRegisters = new Set();
  let highestPosition = 0;
  const warnings = [];

  for (const pairPattern of pairPatterns) {
    for (const match of source.matchAll(pairPattern)) {
      const registerIndex = Number(match[1]);
      const bitMaskValue = match[2];
      const bitMask = parseNumericLiteral(bitMaskValue);

      pairedRegisters.add(registerIndex);

      if (bitMask === null) {
        warnings.push(
          `${instanceName}: BitMask-arvoa "${bitMaskValue}" ei voitu tulkita.`
        );
        highestPosition = Math.max(highestPosition, (registerIndex + 1) * 16);
        continue;
      }

      const bitPosition = getBitPosition(bitMask);

      if (bitPosition === 0) {
        warnings.push(
          `${instanceName}: BitMask-arvo ${bitMaskValue} ei kuulu tuettuun bittijärjestykseen.`
        );
        highestPosition = Math.max(highestPosition, (registerIndex + 1) * 16);
        continue;
      }

      highestPosition = Math.max(highestPosition, registerIndex * 16 + bitPosition);
    }
  }

  for (const statement of statements) {
    const regMatches = [...statement.matchAll(/\.Reg(\d+)\b/gi)];

    for (const regMatch of regMatches) {
      const registerIndex = Number(regMatch[1]);

      if (pairedRegisters.has(registerIndex)) {
        continue;
      }

      highestPosition = Math.max(highestPosition, (registerIndex + 1) * 16);
    }
  }

  return {
    count: highestPosition,
    warnings,
  };
}

function dedupeBindings(bindings) {
  const dedupedBindings = new Map();

  for (const binding of bindings) {
    const existingBinding = dedupedBindings.get(binding.fieldName);

    if (!existingBinding || binding.position > existingBinding.position) {
      dedupedBindings.set(binding.fieldName, binding);
    }
  }

  return [...dedupedBindings.values()];
}

function extractBitBindings(source, instanceName) {
  const statements = getStatementsForInstance(source, instanceName);
  const bindings = [];
  const warnings = [];

  for (const statement of statements) {
    const fieldName = getFieldNameFromStatement(statement);

    if (!fieldName) {
      continue;
    }

    const registerIndices = getRegisterIndicesFromStatement(statement, instanceName);
    const bitMaskValue =
      /\bBitMask\s*:=\s*(16#[0-9a-fA-F_]+|\d+)/i.exec(statement)?.[1] ?? '';

    if (registerIndices.length === 0 || !bitMaskValue) {
      warnings.push(
        `${instanceName}: kentän ${fieldName} bittisijaintia ei voitu päätellä.`
      );
      continue;
    }

    const bitMask = parseNumericLiteral(bitMaskValue);

    if (bitMask === null) {
      warnings.push(
        `${instanceName}: BitMask-arvoa "${bitMaskValue}" ei voitu tulkita kentälle ${fieldName}.`
      );
      continue;
    }

    const bitPosition = getBitPosition(bitMask);

    if (bitPosition === 0) {
      warnings.push(
        `${instanceName}: BitMask-arvo ${bitMaskValue} ei kuulu tuettuun bittijärjestykseen kentälle ${fieldName}.`
      );
      continue;
    }

    bindings.push({
      fieldName,
      position: Math.max(...registerIndices) * 16 + bitPosition,
    });
  }

  return {
    bindings: dedupeBindings(bindings),
    warnings,
  };
}

function extractRegisterBindings(source, instanceName) {
  const statements = getStatementsForInstance(source, instanceName);
  const bindings = [];
  const warnings = [];

  for (const statement of statements) {
    const fieldName = getFieldNameFromStatement(statement);

    if (!fieldName) {
      continue;
    }

    const registerIndices = getRegisterIndicesFromStatement(statement, instanceName);

    if (registerIndices.length === 0) {
      warnings.push(
        `${instanceName}: kentän ${fieldName} RegX-sijaintia ei voitu päätellä.`
      );
      continue;
    }

    bindings.push({
      fieldName,
      position: Math.max(...registerIndices) + 1,
    });
  }

  return {
    bindings: dedupeBindings(bindings),
    warnings,
  };
}

function inferCountForRegisterType(source, instanceName) {
  const registerIndices = getRegisterIndicesForInstance(source, instanceName);

  if (registerIndices.length === 0) {
    return 0;
  }

  return Math.max(...registerIndices) + 1;
}

function createDevice(call, source) {
  const startRegister = parseNumericLiteral(call.startRegisterRaw);
  const scopedSource = getScopedSource(source, call);
  const registerType = normalizeRegisterType(call.registerTypeRaw);

  if (startRegister === null) {
    return {
      warning: `${call.instanceName}: StartRegister-arvoa "${call.startRegisterRaw}" ei voitu tulkita numeroksi.`,
    };
  }

  if (!registerType) {
    return {
      warning: `${call.instanceName}: RegisterType-arvoa "${call.registerTypeRaw}" ei tunnistettu. Sallitut arvot ovat numerot 1-4 tai tekstit Coil, Discrete, Holding ja Input.`,
    };
  }

  const bitType = registerType === 'Coil' || registerType === 'Discrete';
  const countResult = bitType
    ? inferCountForBitType(scopedSource, call.instanceName)
    : {
        count: inferCountForRegisterType(scopedSource, call.instanceName),
        warnings: [],
      };
  const bindingResult = bitType
    ? extractBitBindings(scopedSource, call.instanceName)
    : extractRegisterBindings(scopedSource, call.instanceName);

  if (countResult.count <= 0) {
    return {
      warning: `${call.instanceName}: käytettyjä RegX-viittauksia ei löytynyt, joten count-arvo jäi ratkaisematta.`,
    };
  }

  return {
    device: {
      instanceName: call.instanceName,
      registerType,
      startRegister,
      count: countResult.count,
      bindings: bindingResult.bindings,
    },
    warnings: [...countResult.warnings, ...bindingResult.warnings],
  };
}

function isEmptyStringLiteral(expression) {
  const trimmedExpression = expression.trim();

  return (
    trimmedExpression === "''" ||
    trimmedExpression === '""' ||
    /^''\s*$/.test(trimmedExpression) ||
    /^""\s*$/.test(trimmedExpression)
  );
}

function parseFieldUsage(filterSource, knownFieldNames) {
  const fieldUsage = new Map();
  const cleanedFilterSource = stripSource(filterSource, { preserveStrings: true });
  const statements = splitStatements(cleanedFilterSource);
  const relevantCallUsages = [];

  for (const statement of statements) {
    const assignmentMatch =
      /\b[A-Za-z_][A-Za-z0-9_]*\s*\.\s*([A-Za-z_][A-Za-z0-9_]*)\s*:=\s*([\s\S]+)$/.exec(
        statement
      );

    if (!assignmentMatch) {
      continue;
    }

    const fieldName = assignmentMatch[1];
    const expression = assignmentMatch[2].trim();
    fieldUsage.set(fieldName, !isEmptyStringLiteral(expression));
  }

  for (const callExpression of extractCallExpressions(cleanedFilterSource)) {
    const namedArguments = parseNamedArguments(callExpression.argumentsSource);
    const relevantArguments = Object.keys(namedArguments).filter((name) =>
      knownFieldNames.has(name)
    );

    if (relevantArguments.length === 0) {
      continue;
    }

    const callUsage = new Map(
      [...knownFieldNames].map((fieldName) => [fieldName, false])
    );

    for (const fieldName of relevantArguments) {
      callUsage.set(fieldName, !isEmptyStringLiteral(namedArguments[fieldName]));
    }

    relevantCallUsages.push(callUsage);
  }

  if (relevantCallUsages.length > 0) {
    for (const fieldName of knownFieldNames) {
      const currentValue = fieldUsage.get(fieldName) ?? false;
      const usedInAnyRelevantCall = relevantCallUsages.some(
        (callUsage) => callUsage.get(fieldName) === true
      );

      fieldUsage.set(fieldName, currentValue || usedInAnyRelevantCall);
    }
  }

  return fieldUsage;
}

function applyFieldUsageFilter(devices, fieldUsage) {
  return devices
    .map((device) => {
      if (!device.bindings || device.bindings.length === 0) {
        return device;
      }

      const knownBindings = device.bindings.filter((binding) =>
        fieldUsage.has(binding.fieldName)
      );

      if (knownBindings.length === 0) {
        return device;
      }

      const usedBindings = knownBindings.filter((binding) =>
        fieldUsage.get(binding.fieldName)
      );

      if (usedBindings.length === 0) {
        return null;
      }

      return device;
    })
    .filter(Boolean);
}

function dedupeDevices(devices) {
  const dedupedDevices = new Map();

  for (const device of devices) {
    const key = `${device.registerType}:${device.startRegister}`;
    const existingDevice = dedupedDevices.get(key);

    if (!existingDevice || device.count > existingDevice.count) {
      dedupedDevices.set(key, device);
    }
  }

  return [...dedupedDevices.values()];
}

function sortDevices(devices) {
  return [...devices].sort((left, right) => {
    const leftTypeIndex = REGISTER_TYPE_ORDER.indexOf(left.registerType);
    const rightTypeIndex = REGISTER_TYPE_ORDER.indexOf(right.registerType);

    if (leftTypeIndex !== rightTypeIndex) {
      return leftTypeIndex - rightTypeIndex;
    }

    if (left.startRegister !== right.startRegister) {
      return left.startRegister - right.startRegister;
    }

    return left.count - right.count;
  });
}

function formatDeviceComment(title, devices) {
  return [
    '(*',
    `${title}:`,
    ...devices.map(
      (device) =>
        `${device.registerType}: Start ${device.startRegister}, Count ${device.count}`
    ),
    '*)',
  ].join('\n');
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function getFxEditorRegisterType(registerType) {
  if (registerType === 'Coil') {
    return 'REGISTER_COILS';
  }

  if (registerType === 'Discrete') {
    return 'REGISTER_DISCRETEINPUTS';
  }

  if (registerType === 'Input') {
    return 'REGISTER_INPUTS';
  }

  if (registerType === 'Holding') {
    return 'REGISTER_HOLDINGS';
  }

  return '';
}

function buildFxEditorXml(devices, { port, address, ipAddress, ipPort }) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<NDeviceDataBase>',
    '<NDevices>',
  ];

  for (const device of devices) {
    lines.push('<NDevice>');
    lines.push(`<IPort>${port}</IPort>`);
    lines.push(`<IAddress>${address}</IAddress>`);
    lines.push('<ITimeout>500</ITimeout>');
    lines.push(`<SIPaddr>${escapeXml(ipAddress)}</SIPaddr>`);
    lines.push(`<IIPPort>${ipPort}</IIPPort>`);
    lines.push(`<SRegType>${getFxEditorRegisterType(device.registerType)}</SRegType>`);
    lines.push(`<IRegStart>${device.startRegister}</IRegStart>`);
    lines.push(`<IRegCount>${device.count}</IRegCount>`);

    if (device.registerType === 'Holding') {
      lines.push('<ISendOnly>0</ISendOnly>');
    }

    lines.push('<IGroupIndex>0</IGroupIndex>');
    lines.push('<SAlarmPointId></SAlarmPointId>');
    lines.push('</NDevice>');
  }

  lines.push('</NDevices>');
  lines.push('</NDeviceDataBase>');

  return lines.join('\n');
}

function parseIntegerSetting(
  value,
  label,
  { min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY } = {}
) {
  const parsedValue =
    typeof value === 'number' && Number.isInteger(value)
      ? value
      : Number.parseInt(String(value).trim(), 10);

  if (!Number.isInteger(parsedValue) || parsedValue < min || parsedValue > max) {
    throw new Error(`${label} pitää olla kokonaisluku väliltä ${min}-${max}.`);
  }

  return parsedValue;
}

function normalizeXmlSettings({
  port = 6,
  address = 1,
  ipAddress = '0.0.0.0',
  ipPort = 0,
} = {}) {
  const normalizedPort = parseIntegerSetting(port, 'Portin', { min: 3, max: 10 });
  const normalizedAddress = parseIntegerSetting(address, 'Osoitteen', {
    min: 1,
    max: 247,
  });

  if (normalizedPort >= 6) {
    const normalizedIpAddress = String(ipAddress).trim();

    if (!normalizedIpAddress) {
      throw new Error('IP-osoite pitää antaa, kun portti on 6-10.');
    }

    return {
      port: normalizedPort,
      address: normalizedAddress,
      ipAddress: normalizedIpAddress,
      ipPort: parseIntegerSetting(ipPort, 'IP-portin', { min: 0, max: 65535 }),
    };
  }

  return {
    port: normalizedPort,
    address: normalizedAddress,
    ipAddress: '0.0.0.0',
    ipPort: 0,
  };
}

export function buildModbusDeviceComment(
  source,
  { filterSource = '', port = 6, address = 1, ipAddress = '0.0.0.0', ipPort = 0 } = {}
) {
  if (!source.trim()) {
    throw new Error('Liitä ensin koodi.');
  }

  const cleanedSource = stripSource(source);
  const calls = annotateCallScopes(
    extractModbusCalls(cleanedSource),
    cleanedSource.length
  );

  if (calls.length === 0) {
    throw new Error(
      'Koodista ei löytynyt Modbus-kutsuja, joissa olisi StartRegister ja RegisterType.'
    );
  }

  const warnings = [];
  const devices = [];

  for (const call of calls) {
    const result = createDevice(call, cleanedSource);

    if (result.warning) {
      warnings.push(result.warning);
      continue;
    }

    devices.push(result.device);

    if (result.warnings?.length) {
      warnings.push(...result.warnings);
    }
  }

  const dedupedDevices = sortDevices(dedupeDevices(devices));

  if (dedupedDevices.length === 0) {
    throw new Error(
      warnings[0] ?? 'Modbus-laitelistaa ei voitu muodostaa löydetyistä kutsuista.'
    );
  }

  const hasFilterSource = filterSource.trim().length > 0;
  const knownFieldNames = new Set(
    devices.flatMap((device) => device.bindings.map((binding) => binding.fieldName))
  );
  const filteredDevices = hasFilterSource
    ? sortDevices(
        dedupeDevices(
          applyFieldUsageFilter(devices, parseFieldUsage(filterSource, knownFieldNames))
        )
      )
    : [];
  const xmlSettings = normalizeXmlSettings({ port, address, ipAddress, ipPort });
  const sections = [];

  if (hasFilterSource) {
    sections.push({
      key: 'needed-comment',
      title: 'Tarvittavat modbuslaitteet koodikommenttina',
      value: formatDeviceComment('Tarvittavat modbuslaitteet', filteredDevices),
      kind: 'comment',
    });
  }

  sections.push({
    key: 'all-comment',
    title: 'Kaikki modbuslaitteet koodikommenttina',
    value: formatDeviceComment('Kaikki modbuslaitteet', dedupedDevices),
    kind: 'comment',
  });

  if (hasFilterSource) {
    sections.push({
      key: 'needed-xml',
      title: 'Tarvittavat modbuslaitteet XML muodossa',
      value: buildFxEditorXml(filteredDevices, xmlSettings),
      kind: 'xml',
    });
  }

  sections.push({
    key: 'all-xml',
    title: 'Kaikki modbuslaitteet XML muodossa',
    value: buildFxEditorXml(dedupedDevices, xmlSettings),
    kind: 'xml',
  });

  return {
    devices: dedupedDevices,
    filteredDevices,
    sections,
    output: sections.map((section) => section.value).join('\n\n'),
    warnings,
    summary: hasFilterSource
      ? `Rajapinnasta löytyi ${dedupedDevices.length} modbuslaitetta, joista ${filteredDevices.length} oli käytössä kutsukoodissa.`
      : `Rajapinnasta löytyi ${dedupedDevices.length} modbuslaitetta.`,
  };
}
