const ST_KEYWORDS = new Set([
  'ACTION',
  'AND',
  'ARRAY',
  'AT',
  'BOOL',
  'BY',
  'CASE',
  'CONSTANT',
  'CONTINUE',
  'DO',
  'DINT',
  'DWORD',
  'ELSE',
  'ELSIF',
  'END_ACTION',
  'END_CASE',
  'END_FOR',
  'END_FUNCTION',
  'END_FUNCTION_BLOCK',
  'END_IF',
  'END_METHOD',
  'END_PROGRAM',
  'END_REPEAT',
  'END_STRUCT',
  'END_TYPE',
  'END_VAR',
  'END_WHILE',
  'EXIT',
  'FALSE',
  'FOR',
  'FUNCTION',
  'FUNCTION_BLOCK',
  'IF',
  'INT',
  'LINT',
  'LREAL',
  'METHOD',
  'MOD',
  'NOT',
  'OF',
  'OR',
  'PROGRAM',
  'REAL',
  'REPEAT',
  'RETURN',
  'SINT',
  'STRING',
  'STRUCT',
  'THEN',
  'TIME',
  'TO',
  'TRUE',
  'TYPE',
  'UDINT',
  'UINT',
  'ULINT',
  'UNTIL',
  'VAR',
  'VAR_CONSTANT',
  'VAR_GLOBAL',
  'VAR_INPUT',
  'VAR_IN_OUT',
  'VAR_OUTPUT',
  'VAR_TEMP',
  'WHILE',
  'WORD',
  'XOR',
]);

const BLOCK_LABELS = {
  input: 'VAR_INPUT',
  output: 'VAR_OUTPUT',
  variable: 'VAR',
  constant: 'VAR CONSTANT',
};

const UNKNOWN_TYPE = 'TYPE_HERE';

export const DEFAULT_IO_PREFIXES = {
  input: 'in_',
  output: 'out_',
};

export const DEFAULT_PREFIX_RULES = [
  { id: 'b', prefix: 'b', type: 'BOOL', kind: 'value' },
  { id: 'i', prefix: 'i', type: 'INT', kind: 'value' },
  { id: 'si', prefix: 'si', type: 'SINT', kind: 'value' },
  { id: 'w', prefix: 'w', type: 'WORD', kind: 'value' },
  { id: 'ui', prefix: 'ui', type: 'UINT', kind: 'value' },
  { id: 'dw', prefix: 'dw', type: 'DWORD', kind: 'value' },
  { id: 'di', prefix: 'di', type: 'DINT', kind: 'value' },
  { id: 'udi', prefix: 'udi', type: 'UDINT', kind: 'value' },
  { id: 'li', prefix: 'li', type: 'LINT', kind: 'value' },
  { id: 'uli', prefix: 'uli', type: 'ULINT', kind: 'value' },
  { id: 'r', prefix: 'r', type: 'REAL', kind: 'value' },
  { id: 's', prefix: 's', type: 'STRING(30)', kind: 'value' },
  { id: 'lr', prefix: 'lr', type: 'LREAL', kind: 'value' },
  { id: 't', prefix: 't', type: 'TIME', kind: 'value' },
  { id: 'fb', prefix: 'fb', type: 'FB_', kind: 'functionBlock' },
  { id: 'ton', prefix: 'ton', type: 'TON', kind: 'functionBlock' },
  { id: 'tof', prefix: 'tof', type: 'TOF', kind: 'functionBlock' },
  {
    id: 'SystemTime',
    prefix: 'SystemTime',
    type: 'SystemTimeFB',
    kind: 'functionBlock',
  },
];

function normalizeIoPrefixes(ioPrefixes = {}) {
  return {
    input:
      typeof ioPrefixes.input === 'string' ? ioPrefixes.input : DEFAULT_IO_PREFIXES.input,
    output:
      typeof ioPrefixes.output === 'string'
        ? ioPrefixes.output
        : DEFAULT_IO_PREFIXES.output,
  };
}

function normalizePrefixRules(prefixRules = DEFAULT_PREFIX_RULES) {
  return prefixRules.map((rule, index) => ({
    id: typeof rule.id === 'string' ? rule.id : `rule-${index + 1}`,
    prefix: typeof rule.prefix === 'string' ? rule.prefix.trim() : '',
    type: typeof rule.type === 'string' ? rule.type.trim().replace(/;+\s*$/, '') : '',
    kind: rule.kind === 'functionBlock' ? 'functionBlock' : 'value',
    order: index,
  }));
}

function sortRulesForMatching(prefixRules) {
  return [...prefixRules]
    .filter((rule) => rule.prefix && rule.type)
    .sort((left, right) => {
      if (right.prefix.length !== left.prefix.length) {
        return right.prefix.length - left.prefix.length;
      }

      return left.order - right.order;
    });
}

function isConstantName(name) {
  return /^[A-Z][A-Z0-9_]*$/.test(name);
}

function stripSource(input, { removeStrings } = { removeStrings: true }) {
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
        result += removeStrings ? '  ' : "''";
        index += 2;
        continue;
      }

      if (current === "'") {
        inSingleQuote = false;
      }

      result += removeStrings ? (current === '\n' ? '\n' : ' ') : current;
      index += 1;
      continue;
    }

    if (inDoubleQuote) {
      if (current === '"' && next === '"') {
        result += removeStrings ? '  ' : '""';
        index += 2;
        continue;
      }

      if (current === '"') {
        inDoubleQuote = false;
      }

      result += removeStrings ? (current === '\n' ? '\n' : ' ') : current;
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
      result += removeStrings ? ' ' : current;
      index += 1;
      continue;
    }

    if (current === '"') {
      inDoubleQuote = true;
      result += removeStrings ? ' ' : current;
      index += 1;
      continue;
    }

    result += current;
    index += 1;
  }

  return result;
}

function findPreviousSignificantCharacter(source, startIndex) {
  for (let index = startIndex; index >= 0; index -= 1) {
    const current = source[index];

    if (!/\s/.test(current)) {
      return current;
    }
  }

  return '';
}

function findNextSignificantIndex(source, startIndex) {
  for (let index = startIndex; index < source.length; index += 1) {
    if (!/\s/.test(source[index])) {
      return index;
    }
  }

  return -1;
}

function getVariableBlock(name, ioPrefixes) {
  if (isConstantName(name)) {
    return 'constant';
  }

  if (ioPrefixes.input && name.startsWith(ioPrefixes.input)) {
    return 'input';
  }

  if (ioPrefixes.output && name.startsWith(ioPrefixes.output)) {
    return 'output';
  }

  return 'variable';
}

function stripIoPrefix(name, block, ioPrefixes) {
  if (block === 'input' && ioPrefixes.input) {
    return name.slice(ioPrefixes.input.length);
  }

  if (block === 'output' && ioPrefixes.output) {
    return name.slice(ioPrefixes.output.length);
  }

  return name;
}

function resolveDeclarationType(name, sortedRules) {
  if (!name) {
    return null;
  }

  if (name.startsWith('a')) {
    const arrayBase = name.slice(1);
    const matchedArrayRule = sortedRules.find(
      (rule) => rule.kind === 'value' && arrayBase.startsWith(rule.prefix)
    );

    if (matchedArrayRule) {
      return {
        type: `ARRAY[] OF ${matchedArrayRule.type}`,
        kind: matchedArrayRule.kind,
        matchedRule: matchedArrayRule,
        isArray: true,
      };
    }
  }

  const matchedRule = sortedRules.find((rule) => name.startsWith(rule.prefix));

  if (!matchedRule) {
    return null;
  }

  return {
    type: matchedRule.type,
    kind: matchedRule.kind,
    matchedRule,
    isArray: false,
  };
}

function extractIdentifiers(source, sortedRules) {
  const cleanedSource = stripSource(source, { removeStrings: true });
  const identifierPattern = /\b[A-Za-z_][A-Za-z0-9_]*\b/g;
  const seenNames = new Set();
  const identifiers = [];

  for (const match of cleanedSource.matchAll(identifierPattern)) {
    const name = match[0];
    const startIndex = match.index ?? 0;
    const endIndex = startIndex + name.length;
    const previousCharacter = findPreviousSignificantCharacter(
      cleanedSource,
      startIndex - 1
    );
    const nextSignificantIndex = findNextSignificantIndex(cleanedSource, endIndex);
    const nextCharacter =
      nextSignificantIndex >= 0 ? cleanedSource[nextSignificantIndex] : '';
    const nextPair =
      nextSignificantIndex >= 0
        ? cleanedSource.slice(nextSignificantIndex, nextSignificantIndex + 2)
        : '';

    if (ST_KEYWORDS.has(name.toUpperCase())) {
      continue;
    }

    if (previousCharacter === '.' || previousCharacter === '#') {
      continue;
    }

    if (nextCharacter === '#') {
      continue;
    }

    if ((previousCharacter === '(' || previousCharacter === ',') && nextPair === ':=') {
      continue;
    }

    if (nextCharacter === '(') {
      const resolvedType = resolveDeclarationType(name, sortedRules);

      if (!resolvedType || resolvedType.kind !== 'functionBlock') {
        continue;
      }
    }

    if (seenNames.has(name)) {
      continue;
    }

    seenNames.add(name);
    identifiers.push(name);
  }

  return identifiers;
}

function getArrayElementType(type) {
  const match = /^ARRAY\[\]\s+OF\s+(.+)$/.exec(type);

  return match ? match[1] : type;
}

function resolveAssignmentTargetType(targetExpression, ioPrefixes, sortedRules) {
  const normalizedTarget = targetExpression.replace(/\[[^\]]*\]/g, ' ');
  const identifierMatches = normalizedTarget.match(/[A-Za-z_][A-Za-z0-9_]*\b/g);
  const lastIdentifier =
    identifierMatches && identifierMatches.length > 0
      ? identifierMatches[identifierMatches.length - 1]
      : '';

  if (!lastIdentifier) {
    return '';
  }

  const block = getVariableBlock(lastIdentifier, ioPrefixes);
  const coreName = stripIoPrefix(lastIdentifier, block, ioPrefixes);
  const resolvedType = resolveDeclarationType(coreName, sortedRules);

  if (!resolvedType) {
    return '';
  }

  return resolvedType.isArray
    ? getArrayElementType(resolvedType.type)
    : resolvedType.type;
}

function inferTypesFromAssignments(source, ioPrefixes, sortedRules) {
  const inferredTypes = new Map();
  const cleanedSource = stripSource(source, { removeStrings: true });

  for (const statement of cleanedSource.split(';')) {
    const assignmentIndex = statement.indexOf(':=');

    if (assignmentIndex < 0) {
      continue;
    }

    const leftSide = statement.slice(0, assignmentIndex).trim();
    const rightSide = statement.slice(assignmentIndex + 2).trim();
    const rightMatch = /^\(*\s*([A-Za-z_][A-Za-z0-9_]*)\s*\)*$/.exec(rightSide);

    if (!rightMatch) {
      continue;
    }

    const targetType = resolveAssignmentTargetType(leftSide, ioPrefixes, sortedRules);

    if (!targetType) {
      continue;
    }

    inferredTypes.set(rightMatch[1], targetType);
  }

  return inferredTypes;
}

function createDeclaration(name, ioPrefixes, sortedRules, inferredTypes) {
  const block = getVariableBlock(name, ioPrefixes);
  const coreName = stripIoPrefix(name, block, ioPrefixes);
  const resolvedType =
    resolveDeclarationType(coreName, sortedRules) ??
    (inferredTypes.has(name)
      ? {
          type: inferredTypes.get(name),
          kind: 'inferred',
          isArray: false,
        }
      : null);

  return {
    block,
    name,
    type: resolvedType?.type ?? UNKNOWN_TYPE,
    kind: resolvedType?.kind ?? 'unknown',
    isArray: resolvedType?.isArray ?? false,
    needsManualType: !resolvedType,
    needsManualFunctionBlockName:
      resolvedType?.kind === 'functionBlock' && resolvedType.type.endsWith('_'),
  };
}

function formatBlock(blockName, declarations) {
  const longestName = Math.max(
    ...declarations.map((declaration) => declaration.name.length),
    0
  );
  const lines = declarations.map(
    (declaration) =>
      `  ${declaration.name.padEnd(longestName + 2, ' ')}: ${declaration.type};`
  );

  return [BLOCK_LABELS[blockName], ...lines, 'END_VAR'].join('\n');
}

function formatCount(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function createSummary(blocks) {
  const counts = [
    blocks.input.length
      ? formatCount(blocks.input.length, 'input-muuttuja', 'input-muuttujaa')
      : '',
    blocks.output.length
      ? formatCount(blocks.output.length, 'output-muuttuja', 'output-muuttujaa')
      : '',
    blocks.variable.length
      ? formatCount(
          blocks.variable.length,
          'paikallinen muuttuja',
          'paikallista muuttujaa'
        )
      : '',
    blocks.constant.length ? formatCount(blocks.constant.length, 'vakio', 'vakiota') : '',
  ].filter(Boolean);

  if (counts.length === 0) {
    return 'Koodista ei löytynyt tunnistettavia muuttujia.';
  }

  return `Löytyi ${counts.join(', ')}.`;
}

export function buildVariableDeclarations(
  source,
  { ioPrefixes = DEFAULT_IO_PREFIXES, prefixRules = DEFAULT_PREFIX_RULES } = {}
) {
  if (!source.trim()) {
    throw new Error('Liitä ensin koodi.');
  }

  const normalizedIoPrefixes = normalizeIoPrefixes(ioPrefixes);
  const normalizedPrefixRules = normalizePrefixRules(prefixRules);
  const sortedRules = sortRulesForMatching(normalizedPrefixRules);
  const identifiers = extractIdentifiers(source, sortedRules);
  const inferredTypes = inferTypesFromAssignments(
    source,
    normalizedIoPrefixes,
    sortedRules
  );

  const declarations = identifiers.map((identifier) =>
    createDeclaration(identifier, normalizedIoPrefixes, sortedRules, inferredTypes)
  );
  const blocks = {
    input: declarations.filter((declaration) => declaration.block === 'input'),
    output: declarations.filter((declaration) => declaration.block === 'output'),
    variable: declarations.filter((declaration) => declaration.block === 'variable'),
    constant: declarations.filter((declaration) => declaration.block === 'constant'),
  };
  const output = Object.entries(blocks)
    .filter(([, blockDeclarations]) => blockDeclarations.length > 0)
    .map(([blockName, blockDeclarations]) => formatBlock(blockName, blockDeclarations))
    .join('\n\n');

  return {
    declarations,
    output,
    summary: createSummary(blocks),
    unknownVariables: declarations
      .filter((declaration) => declaration.needsManualType)
      .map((declaration) => declaration.name),
    placeholderFunctionBlocks: declarations
      .filter((declaration) => declaration.needsManualFunctionBlockName)
      .map((declaration) => declaration.name),
    hasArrays: declarations.some((declaration) => declaration.isArray),
    counts: {
      input: blocks.input.length,
      output: blocks.output.length,
      variable: blocks.variable.length,
      constant: blocks.constant.length,
    },
  };
}
