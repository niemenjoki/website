const TEXT_SORT_OPTIONS = {
  numeric: true,
  sensitivity: 'base',
};

const GROUPED_LAYOUT = {
  firstGroupTop: 121,
  groupGap: 19,
  rowTopOffset: 35,
  rowHeight: 40,
  lineTopOffset: 29,
  groupLineTopOffset: 24,
  title: {
    left: 1910,
    width: 330,
    fontSize: 16,
  },
  labelsTopOffset: 7,
  row: {
    description: 1934,
    pointId: 2194,
    setpoint: 2305,
    conversion: 2363,
    measurement: 2454,
    controlLimit: 2603,
    controlAlarm: 2664,
    lowLimit: 2755,
    lowAlarm: 2816,
    highLimit: 2904,
    highAlarm: 2965,
  },
  labels: {
    setpoint: 2308,
    measurement: 2457,
    controlLimit: 2607,
    lowLimit: 2758,
    highLimit: 2907,
  },
  groupLine: {
    left: 1902,
    width: 1769,
    height: 3,
  },
  horizontalLine: {
    left: 1912,
    width: 1729,
    height: 1,
  },
  verticalLine: {
    left: 2280,
    width: 2,
    topOffset: 25,
    bottomOffset: 30,
  },
};

const NON_GROUPED_LAYOUT = {
  headerTop: 121,
  rowTop: 156,
  rowHeight: 40,
  lineTopOffset: 29,
  header: {
    left: 1910,
    width: 330,
    fontSize: 16,
  },
  labelsTop: 128,
  row: {
    description: 1934,
    pointId: 2334,
    setpoint: 2445,
    conversion: 2503,
    measurement: 2594,
    controlLimit: 2743,
    controlAlarm: 2804,
    lowLimit: 2895,
    lowAlarm: 2956,
    highLimit: 3044,
    highAlarm: 3105,
  },
  labels: {
    setpoint: 2446,
    measurement: 2595,
    controlLimit: 2745,
    lowLimit: 2896,
    highLimit: 3047,
  },
  headerLine: {
    left: 1902,
    top: 145,
    width: 1769,
    height: 3,
  },
  horizontalLine: {
    left: 1912,
    width: 1729,
    height: 1,
  },
  verticalLine: {
    left: 2420,
    width: 2,
    top: 145,
  },
};

const CODE_FB_TYPE = 'FxFB_Rajahalytykset_V021';
const CODE_MEASUREMENTS_PER_BLOCK = 15;
const GROUP_ID_REGEX = /^[A-Za-z0-9]+$/;

export const LIMIT_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

export const DEFAULT_LIMIT_NUMBERS = {
  high: 1,
  low: 2,
  control: 3,
};

export { GROUP_ID_REGEX };

function normalizeLimitNumber(value, fallback) {
  const numericValue = Number(value);

  return LIMIT_OPTIONS.includes(numericValue) ? numericValue : fallback;
}

function normalizeLimitNumbers(limitNumbers = {}) {
  return {
    high: normalizeLimitNumber(limitNumbers.high, DEFAULT_LIMIT_NUMBERS.high),
    low: normalizeLimitNumber(limitNumbers.low, DEFAULT_LIMIT_NUMBERS.low),
    control: normalizeLimitNumber(limitNumbers.control, DEFAULT_LIMIT_NUMBERS.control),
  };
}

function normalizeSystemPrefix(prefix = '') {
  return String(prefix).trim();
}

function getOutdoorTemperaturePointId(systemPrefix) {
  return systemPrefix ? `${systemPrefix}_100_TE00_M` : '100_TE00_M';
}

function removeSystemPrefix(pointId, systemPrefix) {
  if (!systemPrefix) {
    return pointId;
  }

  const prefixWithUnderscore = `${systemPrefix}_`;

  if (!pointId.startsWith(prefixWithUnderscore)) {
    return pointId;
  }

  return pointId.slice(prefixWithUnderscore.length);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getElementChildren(node) {
  return Array.from(node.childNodes).filter((child) => child.nodeType === 1);
}

function getDirectChild(node, tagName) {
  return getElementChildren(node).find((child) => child.tagName === tagName) ?? null;
}

function getDirectChildText(node, tagName) {
  return getDirectChild(node, tagName)?.textContent?.trim() ?? '';
}

function safeDecodeURIComponent(value) {
  const normalized = value.replaceAll('+', '%20').replace(/%(?![0-9a-fA-F]{2})/g, '%25');

  try {
    return decodeURIComponent(normalized);
  } catch {
    return value;
  }
}

function decodePointText(value) {
  return safeDecodeURIComponent(value.trim());
}

function getMeasurementStem(pointId) {
  return pointId.replace(/_(?:FM|M)$/, '');
}

function getShortPointId(pointId) {
  return getMeasurementStem(pointId).replaceAll('_', '-');
}

function getGroupId(pointId) {
  return pointId.split('_')[0] ?? '';
}

function getGroupName(description) {
  return description.split(',')[0]?.trim() ?? '';
}

function capitalizeFirstCharacter(value) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toLocaleUpperCase('fi-FI') + value.slice(1);
}

function getGroupedDescription(description) {
  const parts = description
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length <= 1) {
    return description;
  }

  return capitalizeFirstCharacter(parts.slice(1).join(', '));
}

function sortText(left, right) {
  return left.localeCompare(right, undefined, TEXT_SORT_OPTIONS);
}

function createIdGenerator() {
  let index = 10000;

  return function getNextId() {
    index += 1;
    return `ID${index}`;
  };
}

function createTextBlock({
  id,
  left,
  top,
  text,
  className = '',
  width,
  fontSize = 12,
  bold = true,
  align = 'center',
  textShowValue = false,
}) {
  const escapedText = escapeHtml(text);
  const alignmentValue = align === 'left' ? 0 : 2;
  const widthStyle = width ? ` width: ${width}px;` : '';
  const classAttribute = className ? ` class="${className}"` : '';

  return `<div id="${id}"${classAttribute} style="position: absolute; left: ${left}px; top: ${top}px;${widthStyle} border: 0px; font-size: ${fontSize}px; font-weight: ${
    bold ? 'bold' : 'normal'
  }; color: rgb(0, 0, 0); text-align: ${align}; padding: 0px 3px;" fdxuserlevel="0" fdxeditgroup="0" fdxgroupcode="" fdxpntid="Unknown" fdxmanualenabled="1" fdxshowinfo="1" align="center" fdxtype="FdxText" fdxhideobject="0" fdxhidevalue="1" fdxbgcolor="" fdxhref="" fdxshowsetvalue="0" fdxtextalign="${alignmentValue}" valign="middle" fdxtextborder="0" fdxtextshowvalue="${
    textShowValue ? 1 : 0
  }" fdxbold="${bold ? 1 : 0}" fdxtextsize="${fontSize}" fdxfrontcolor="#000000" fdxbordercolor="#000000" fxdbold="${
    bold ? 1 : 0
  }"><div style="white-space: nowrap;color: #000000" textvalue="?" textcolor="#000000" texttext="${escapedText}">${escapedText}</div></div>`;
}

function createSymbol({ id, left, top, width, height, pointId, src, fdxSrc }) {
  return `<img id="${id}" style="position: absolute; left: ${left}px; top: ${top}px; width: ${width}px; height: ${height}px;" src="${src}" fdxuserlevel="0" fdxeditgroup="0" fdxgroupcode="" fdxpntid="${pointId}" fdxmanualenabled="1" fdxshowinfo="1" fdxsrc="${fdxSrc}" fdxhref="" fdxbgcolor="" fdxfrontcolor="" fdxhidevalue="1" fdxhideobject="0" fdxtype="FdxSymbol" fdxfixedvalue="">`;
}

function createMeasurementInput({ id, left, top, pointId }) {
  return `<input id="${id}" class="Measurement" style="position: absolute; left: ${left}px; top: ${top}px; width: 60px; height: 20px; color: rgb(0, 0, 0); background-color: rgb(144, 238, 144);" fdxuserlevel="0" fdxeditgroup="0" fdxgroupcode="" fdxpntid="${pointId}" fdxmanualenabled="1" fdxshowinfo="1" fdxtype="FdxAnalogPoint" fdxhideobject="0" fdxhidevalue="1" fdxfrontcolor="#000000" fdxbgcolor="#90EE90" fdxshowsetvalue="0" autocomplete="off">`;
}

function createSetpointInput({ id, left, top, pointId }) {
  return `<input id="${id}" class="ControlPoint" style="position: absolute; left: ${left}px; top: ${top}px; width: 60px; height: 20px; color: rgb(0, 0, 0); background-color: rgb(255, 255, 0);" fdxuserlevel="0" fdxeditgroup="0" fdxgroupcode="" fdxpntid="${pointId}" fdxmanualenabled="1" fdxshowinfo="1" fdxtype="FdxAnalogPoint" fdxhideobject="0" fdxhidevalue="1" fdxfrontcolor="#000000" fdxbgcolor="#FFFF00" fdxshowsetvalue="1" autocomplete="off">`;
}

function createLimitInput({ id, left, top, pointId }) {
  return `<input id="${id}" class="AlarmLimit" style="position: absolute; left: ${left}px; top: ${top}px; width: 60px; height: 20px; color: rgb(0, 0, 0); background-color: rgb(175, 238, 238);" fdxuserlevel="0" fdxeditgroup="0" fdxgroupcode="" fdxpntid="${pointId}" fdxmanualenabled="1" fdxshowinfo="1" fdxtype="FdxAnalogPoint" fdxhideobject="0" fdxhidevalue="1" fdxfrontcolor="#000000" fdxbgcolor="#AFEEEE" fdxshowsetvalue="0" autocomplete="off">`;
}

function createAlarmButton({ id, left, top, pointId }) {
  return `<input id="${id}" class="AlarmBox" style="position: absolute; left: ${left}px; top: ${top}px; width: 20px; height: 20px; background-color: rgb(240, 240, 240);" fdxuserlevel="0" fdxeditgroup="0" fdxgroupcode="" fdxpntid="${pointId}" fdxmanualenabled="1" fdxshowinfo="1" type="button" value="H" fdxtype="FdxBinaryPoint" fdxhideobject="0" fdxhidevalue="0" fdxfrontcolor="#FF0000" fdxbgcolor="#F0F0F0" fdxfixedvalue="">`;
}

function createConversionSymbol({ id, left, top, pointId }) {
  return createSymbol({
    id,
    left,
    top: top - 4,
    width: 40,
    height: 30,
    pointId,
    src: './symbols/Muunnos-0-1024.gif',
    fdxSrc: 'Muunnos.gif',
  });
}

function createHorizontalLine({ id, left, top, width, height }) {
  return createSymbol({
    id,
    left,
    top,
    width,
    height,
    pointId: 'Unknown',
    src: './symbols/Laatikko-Musta-0-1024.gif',
    fdxSrc: 'Laatikko-Musta.gif',
  });
}

function createVerticalLine({ id, left, top, height, width }) {
  return createHorizontalLine({
    id,
    left,
    top,
    width,
    height,
  });
}

function getMeasurementLimits(record) {
  const analogNode = getDirectChild(record.node, 'NAnalog');
  const limitsNode = analogNode ? getDirectChild(analogNode, 'NLimits') : null;
  const limits = {};

  if (!limitsNode) {
    return limits;
  }

  getElementChildren(limitsNode).forEach((limitNode) => {
    const limitIndexMatch = limitNode.tagName.match(/^NL_(\d)$/);

    if (!limitIndexMatch) {
      return;
    }

    limits[Number(limitIndexMatch[1])] = {
      name: decodePointText(getDirectChildText(limitNode, 'SName')),
      value: getDirectChildText(limitNode, 'RVal'),
      mode: getDirectChildText(limitNode, 'IMode'),
    };
  });

  return limits;
}

function createRecord(node, systemPrefix) {
  const baseNode = getDirectChild(node, 'NBase');

  if (!baseNode) {
    return null;
  }

  const originalPointId = getDirectChildText(baseNode, 'SId');

  if (!originalPointId) {
    return null;
  }

  const pointId = originalPointId;
  const groupingPointId = removeSystemPrefix(originalPointId, systemPrefix);

  if (!pointId) {
    return null;
  }

  return {
    node,
    nodeName: node.tagName,
    originalPointId,
    pointId,
    groupingPointId,
    text: decodePointText(getDirectChildText(baseNode, 'STxt')),
    convTab: decodePointText(getDirectChildText(node, 'SConvTab')),
    limits: node.tagName === 'NAI' ? getMeasurementLimits({ node }) : {},
  };
}

function buildGroupsFromRows(rows) {
  const groupsById = new Map();

  rows.forEach((row) => {
    if (groupsById.has(row.groupId)) {
      return;
    }

    groupsById.set(row.groupId, {
      sourceId: row.groupId,
      id: row.groupId,
      name: row.groupName,
    });
  });

  return Array.from(groupsById.values()).sort((left, right) =>
    sortText(left.id, right.id)
  );
}

function validateGroupEdits(groupEdits) {
  const editMap = new Map();

  groupEdits.forEach((groupEdit) => {
    const nextId = String(groupEdit.id ?? '').trim();
    const nextName = String(groupEdit.name ?? '').trim();

    if (!nextId) {
      throw new Error('Jokaisella ryhmällä pitää olla tunnus.');
    }

    if (!GROUP_ID_REGEX.test(nextId)) {
      throw new Error('Ryhmätunnuksessa sallitaan vain kirjaimet A-Z ja numerot 0-9.');
    }

    editMap.set(groupEdit.sourceId, {
      id: nextId,
      name: nextName,
    });
  });

  return editMap;
}

function resolveFinalGroups(rows, autoGroups, groupEdits = autoGroups) {
  const editMap = validateGroupEdits(groupEdits);
  const groupsById = new Map();

  autoGroups.forEach((autoGroup) => {
    const appliedGroup = editMap.get(autoGroup.sourceId) ?? {
      id: autoGroup.id,
      name: autoGroup.name,
    };
    const existingGroup = groupsById.get(appliedGroup.id);

    if (!existingGroup) {
      groupsById.set(appliedGroup.id, {
        id: appliedGroup.id,
        name: appliedGroup.name,
        rows: [],
      });
      return;
    }

    if (!existingGroup.name && appliedGroup.name) {
      existingGroup.name = appliedGroup.name;
    }
  });

  rows.forEach((row) => {
    const appliedGroup = editMap.get(row.groupId) ?? {
      id: row.groupId,
      name: row.groupName,
    };
    const finalGroup = groupsById.get(appliedGroup.id);

    if (!finalGroup) {
      return;
    }

    finalGroup.rows.push(row);
  });

  return Array.from(groupsById.values())
    .map((group) => ({
      ...group,
      rows: [...group.rows].sort((left, right) => sortText(left.pointId, right.pointId)),
    }))
    .sort((left, right) => sortText(left.id, right.id));
}

function getGroupHeading(group) {
  const name = group.name?.trim() ?? '';

  if (!name) {
    return `${group.id}:`;
  }

  return `${name} ${group.id}:`;
}

function createRowSnippets(
  row,
  top,
  layout,
  getNextId,
  descriptionText = row.description
) {
  const snippets = [
    createTextBlock({
      id: getNextId(),
      left: layout.description,
      top: top + 5,
      text: descriptionText,
      textShowValue: true,
    }),
    createTextBlock({
      id: getNextId(),
      left: layout.pointId,
      top: top + 5,
      text: row.shortPointId,
      textShowValue: true,
    }),
    createMeasurementInput({
      id: getNextId(),
      left: layout.measurement,
      top,
      pointId: row.pointId,
    }),
  ];

  if (row.setpointPointId) {
    snippets.push(
      createSetpointInput({
        id: getNextId(),
        left: layout.setpoint,
        top,
        pointId: row.setpointPointId,
      })
    );
  }

  if (row.conversionPointId) {
    snippets.push(
      createConversionSymbol({
        id: getNextId(),
        left: layout.conversion,
        top,
        pointId: row.conversionPointId,
      })
    );
  }

  if (row.controlAlarmPointId) {
    snippets.push(
      createLimitInput({
        id: getNextId(),
        left: layout.controlLimit,
        top,
        pointId: row.controlLimitPointId,
      })
    );
    snippets.push(
      createAlarmButton({
        id: getNextId(),
        left: layout.controlAlarm,
        top: top - 1,
        pointId: row.controlAlarmPointId,
      })
    );
  }

  if (row.lowAlarmPointId) {
    snippets.push(
      createLimitInput({
        id: getNextId(),
        left: layout.lowLimit,
        top,
        pointId: row.lowLimitPointId,
      })
    );
    snippets.push(
      createAlarmButton({
        id: getNextId(),
        left: layout.lowAlarm,
        top: top - 1,
        pointId: row.lowAlarmPointId,
      })
    );
  }

  if (row.highAlarmPointId) {
    snippets.push(
      createLimitInput({
        id: getNextId(),
        left: layout.highLimit,
        top,
        pointId: row.highLimitPointId,
      })
    );
    snippets.push(
      createAlarmButton({
        id: getNextId(),
        left: layout.highAlarm,
        top: top - 1,
        pointId: row.highAlarmPointId,
      })
    );
  }

  return snippets;
}

function createGroupedHtml(finalGroups) {
  const getNextId = createIdGenerator();
  const snippets = [];
  let groupTop = GROUPED_LAYOUT.firstGroupTop;

  finalGroups.forEach((group) => {
    const titleTop = groupTop;
    const labelsTop = titleTop + GROUPED_LAYOUT.labelsTopOffset;
    const firstRowTop = titleTop + GROUPED_LAYOUT.rowTopOffset;
    const lastRowTop = firstRowTop + (group.rows.length - 1) * GROUPED_LAYOUT.rowHeight;
    const lastLineTop = lastRowTop + GROUPED_LAYOUT.lineTopOffset;

    snippets.push(
      createTextBlock({
        id: getNextId(),
        className: 'SettingsTitle',
        left: GROUPED_LAYOUT.title.left,
        top: titleTop,
        width: GROUPED_LAYOUT.title.width,
        fontSize: GROUPED_LAYOUT.title.fontSize,
        bold: true,
        align: 'left',
        text: getGroupHeading(group),
      })
    );

    snippets.push(
      createTextBlock({
        id: getNextId(),
        left: GROUPED_LAYOUT.labels.setpoint,
        top: labelsTop,
        text: 'Asetus:',
        align: 'left',
      })
    );
    snippets.push(
      createTextBlock({
        id: getNextId(),
        left: GROUPED_LAYOUT.labels.measurement,
        top: labelsTop,
        text: 'Mittaus:',
        align: 'left',
      })
    );
    snippets.push(
      createTextBlock({
        id: getNextId(),
        left: GROUPED_LAYOUT.labels.controlLimit,
        top: labelsTop,
        text: 'Liukuma:',
        align: 'left',
        textShowValue: true,
      })
    );
    snippets.push(
      createTextBlock({
        id: getNextId(),
        left: GROUPED_LAYOUT.labels.lowLimit,
        top: labelsTop,
        text: 'Alaraja:',
        align: 'left',
      })
    );
    snippets.push(
      createTextBlock({
        id: getNextId(),
        left: GROUPED_LAYOUT.labels.highLimit,
        top: labelsTop,
        text: 'Yläraja:',
        align: 'left',
      })
    );

    snippets.push(
      createHorizontalLine({
        id: getNextId(),
        left: GROUPED_LAYOUT.groupLine.left,
        top: titleTop + GROUPED_LAYOUT.groupLineTopOffset,
        width: GROUPED_LAYOUT.groupLine.width,
        height: GROUPED_LAYOUT.groupLine.height,
      })
    );

    snippets.push(
      createVerticalLine({
        id: getNextId(),
        left: GROUPED_LAYOUT.verticalLine.left,
        top: titleTop + GROUPED_LAYOUT.verticalLine.topOffset,
        width: GROUPED_LAYOUT.verticalLine.width,
        height: lastLineTop - titleTop - GROUPED_LAYOUT.verticalLine.bottomOffset,
      })
    );

    group.rows.forEach((row, index) => {
      const rowTop = firstRowTop + index * GROUPED_LAYOUT.rowHeight;

      snippets.push(
        ...createRowSnippets(
          row,
          rowTop,
          GROUPED_LAYOUT.row,
          getNextId,
          row.groupedDescription
        )
      );
      snippets.push(
        createHorizontalLine({
          id: getNextId(),
          left: GROUPED_LAYOUT.horizontalLine.left,
          top: rowTop + GROUPED_LAYOUT.lineTopOffset,
          width: GROUPED_LAYOUT.horizontalLine.width,
          height: GROUPED_LAYOUT.horizontalLine.height,
        })
      );
    });

    groupTop = lastLineTop + GROUPED_LAYOUT.groupGap;
  });

  return snippets.join('\n');
}

function createNonGroupedHtml(rows) {
  const getNextId = createIdGenerator();
  const snippets = [
    createTextBlock({
      id: getNextId(),
      className: 'SettingsTitle',
      left: NON_GROUPED_LAYOUT.header.left,
      top: NON_GROUPED_LAYOUT.headerTop,
      width: NON_GROUPED_LAYOUT.header.width,
      fontSize: NON_GROUPED_LAYOUT.header.fontSize,
      bold: true,
      align: 'left',
      text: 'HÄLYTYKSET:',
    }),
    createHorizontalLine({
      id: getNextId(),
      left: NON_GROUPED_LAYOUT.headerLine.left,
      top: NON_GROUPED_LAYOUT.headerLine.top,
      width: NON_GROUPED_LAYOUT.headerLine.width,
      height: NON_GROUPED_LAYOUT.headerLine.height,
    }),
    createVerticalLine({
      id: getNextId(),
      left: NON_GROUPED_LAYOUT.verticalLine.left,
      top: NON_GROUPED_LAYOUT.verticalLine.top,
      width: NON_GROUPED_LAYOUT.verticalLine.width,
      height:
        rows.length * NON_GROUPED_LAYOUT.rowHeight + NON_GROUPED_LAYOUT.lineTopOffset + 2,
    }),
    createTextBlock({
      id: getNextId(),
      left: NON_GROUPED_LAYOUT.labels.setpoint,
      top: NON_GROUPED_LAYOUT.labelsTop,
      text: 'Asetus:',
      align: 'left',
    }),
    createTextBlock({
      id: getNextId(),
      left: NON_GROUPED_LAYOUT.labels.measurement,
      top: NON_GROUPED_LAYOUT.labelsTop,
      text: 'Mittaus:',
      align: 'left',
    }),
    createTextBlock({
      id: getNextId(),
      left: NON_GROUPED_LAYOUT.labels.controlLimit,
      top: NON_GROUPED_LAYOUT.labelsTop,
      text: 'Liukuma:',
      align: 'left',
      textShowValue: true,
    }),
    createTextBlock({
      id: getNextId(),
      left: NON_GROUPED_LAYOUT.labels.lowLimit,
      top: NON_GROUPED_LAYOUT.labelsTop,
      text: 'Alaraja:',
      align: 'left',
    }),
    createTextBlock({
      id: getNextId(),
      left: NON_GROUPED_LAYOUT.labels.highLimit,
      top: NON_GROUPED_LAYOUT.labelsTop,
      text: 'Yläraja:',
      align: 'left',
    }),
  ];

  rows.forEach((row, index) => {
    const rowTop = NON_GROUPED_LAYOUT.rowTop + index * NON_GROUPED_LAYOUT.rowHeight;

    snippets.push(...createRowSnippets(row, rowTop, NON_GROUPED_LAYOUT.row, getNextId));
    snippets.push(
      createHorizontalLine({
        id: getNextId(),
        left: NON_GROUPED_LAYOUT.horizontalLine.left,
        top: rowTop + NON_GROUPED_LAYOUT.lineTopOffset,
        width: NON_GROUPED_LAYOUT.horizontalLine.width,
        height: NON_GROUPED_LAYOUT.horizontalLine.height,
      })
    );
  });

  return snippets.join('\n');
}

function getGroupedCodeVariableName(groupId, blockIndex) {
  const suffix = blockIndex === 0 ? '' : String(blockIndex + 1);

  return `Verkosto_${groupId}_halytykset${suffix}`;
}

function getUngroupedCodeVariableName(blockIndex) {
  const suffix = blockIndex === 0 ? '' : String(blockIndex + 1);

  return `Rajahalytykset${suffix}`;
}

function getCodeGroupLabel(group, groupedCode) {
  if (!groupedCode) {
    return 'Hälytykset';
  }

  const name = group.name?.trim() ?? '';

  if (!name) {
    return group.id;
  }

  return `${name} ${group.id}`;
}

function buildCodeOutput(finalGroups, groupedCode, systemPrefix = '') {
  const declarations = [];
  const blocks = [];
  const outdoorTemperaturePointId = getOutdoorTemperaturePointId(systemPrefix);

  finalGroups.forEach((group) => {
    const groupBlocks = [];

    for (
      let startIndex = 0;
      startIndex < group.rows.length;
      startIndex += CODE_MEASUREMENTS_PER_BLOCK
    ) {
      groupBlocks.push(
        group.rows.slice(startIndex, startIndex + CODE_MEASUREMENTS_PER_BLOCK)
      );
    }

    groupBlocks.forEach((groupBlock, blockIndex) => {
      const variableName = groupedCode
        ? getGroupedCodeVariableName(group.id, blockIndex)
        : getUngroupedCodeVariableName(blockIndex);

      declarations.push(`    ${variableName} : ${CODE_FB_TYPE};`);

      const lines = [
        `(* ${getCodeGroupLabel(group, groupedCode)} *)`,
        `${variableName}.in_iIndikointipiste := GetDigitalPointF('');`,
        `${variableName}.in_bSallitaanko_SVH_esto := true;`,
        `${variableName}.in_iSaatavanAnturinIndexi := 1;`,
        `${variableName}.in_rUlkolampotila := GetAnalogPointF('${outdoorTemperaturePointId}');`,
        `${variableName}.in_rSVH_rajan_nosto := 5.0;`,
        `${variableName}.in_iEstopiste1 := GetDigitalPointF('');`,
      ];

      groupBlock.forEach((row, measurementIndex) => {
        lines.push(
          `${variableName}.in_sMittaus[${measurementIndex + 1}] := '${row.pointId}';`
        );
      });

      lines.push(`${variableName}();`);
      blocks.push(lines.join('\n'));
    });
  });

  const declarationBlock = ['VAR', ...declarations, 'END_VAR'].join('\n');

  if (blocks.length === 0) {
    return declarationBlock;
  }

  return `${declarationBlock}\n\n${blocks.join('\n\n')}`;
}

export function parsePointDatabase(input, options = {}) {
  if (!input.trim()) {
    throw new Error('Liitä ensin pistekannan XML-sisältö.');
  }

  const normalizedLimitNumbers = normalizeLimitNumbers(options.limitNumbers);
  const systemPrefix = normalizeSystemPrefix(options.systemPrefix);
  const parser = new DOMParser();
  const xmlDocument = parser.parseFromString(input, 'application/xml');
  const parseError = xmlDocument.querySelector('parsererror');

  if (parseError) {
    throw new Error('XML:n jäsentäminen epäonnistui. Tarkista että sisältö on ehjä.');
  }

  const root = xmlDocument.documentElement;

  if (!root || root.tagName !== 'NPointDataBase') {
    throw new Error('XML:n juurielementin pitää olla NPointDataBase.');
  }

  const records = getElementChildren(root)
    .map((node) => createRecord(node, systemPrefix))
    .filter(Boolean);

  const recordsById = new Map();

  records.forEach((record) => {
    if (!recordsById.has(record.pointId)) {
      recordsById.set(record.pointId, record);
    }
  });

  const measurementPointsByStem = new Map();

  records
    .filter((record) => record.nodeName === 'NAI' && /_(?:FM|M)$/.test(record.pointId))
    .forEach((record) => {
      const stem = getMeasurementStem(record.pointId);
      const currentMeasurement = measurementPointsByStem.get(stem);
      const prefersCurrentMeasurement = currentMeasurement?.pointId.endsWith('_M');
      const isManualMeasurement = record.pointId.endsWith('_M');

      if (!currentMeasurement || (!prefersCurrentMeasurement && isManualMeasurement)) {
        measurementPointsByStem.set(stem, record);
      }
    });

  const rows = Array.from(measurementPointsByStem.values())
    .map((measurementRecord) => {
      const stem = getMeasurementStem(measurementRecord.pointId);
      const controlAlarmPointId = `${stem}_SVH`;
      const lowAlarmPointId = `${stem}_ARH`;
      const highAlarmPointId = `${stem}_YRH`;
      const setpointPointId = `${stem}_C`;
      const conversionPointId = `${stem}_L`;
      const hasControlAlarm = recordsById.has(controlAlarmPointId);
      const hasLowAlarm = recordsById.has(lowAlarmPointId);
      const hasHighAlarm = recordsById.has(highAlarmPointId);

      return {
        description: measurementRecord.text,
        groupedDescription: getGroupedDescription(measurementRecord.text),
        pointId: measurementRecord.pointId,
        shortPointId: getShortPointId(
          measurementRecord.groupingPointId || measurementRecord.pointId
        ),
        groupId: getGroupId(
          measurementRecord.groupingPointId || measurementRecord.pointId
        ),
        groupName: getGroupName(measurementRecord.text),
        setpointPointId: recordsById.has(setpointPointId) ? setpointPointId : '',
        conversionPointId: recordsById.has(conversionPointId) ? conversionPointId : '',
        controlAlarmPointId: hasControlAlarm ? controlAlarmPointId : '',
        controlLimitPointId: hasControlAlarm
          ? `${measurementRecord.pointId}:${normalizedLimitNumbers.control}`
          : '',
        lowAlarmPointId: hasLowAlarm ? lowAlarmPointId : '',
        lowLimitPointId: hasLowAlarm
          ? `${measurementRecord.pointId}:${normalizedLimitNumbers.low}`
          : '',
        highAlarmPointId: hasHighAlarm ? highAlarmPointId : '',
        highLimitPointId: hasHighAlarm
          ? `${measurementRecord.pointId}:${normalizedLimitNumbers.high}`
          : '',
      };
    })
    .filter(
      (row) => row.controlAlarmPointId || row.lowAlarmPointId || row.highAlarmPointId
    )
    .sort((left, right) => sortText(left.pointId, right.pointId));

  return {
    rows,
    groups: buildGroupsFromRows(rows),
    measurementCount: measurementPointsByStem.size,
    systemPrefix,
    limitNumbers: normalizedLimitNumbers,
  };
}

export function buildOutputs(parsedData, options = {}) {
  const finalGroups = options.groupHtml
    ? resolveFinalGroups(
        parsedData.rows,
        parsedData.groups,
        options.groupEdits ?? parsedData.groups
      )
    : [
        {
          id: 'Rajahalytykset',
          name: '',
          rows: [...parsedData.rows].sort((left, right) =>
            sortText(left.pointId, right.pointId)
          ),
        },
      ];

  return {
    html: options.groupHtml
      ? createGroupedHtml(finalGroups)
      : createNonGroupedHtml(parsedData.rows),
    code: buildCodeOutput(finalGroups, options.groupHtml, parsedData.systemPrefix),
    finalGroups,
  };
}
