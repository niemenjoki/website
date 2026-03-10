const TEXT_LEFT = 45;
const POINT_ID_LEFT = 395;
const MEASUREMENT_LEFT = 475;
const LOW_LIMIT_LEFT = 554;
const LOW_ALARM_LEFT = 618;
const HIGH_LIMIT_LEFT = 651;
const HIGH_ALARM_LEFT = 715;
const CONTROL_SETPOINT_LEFT = 741;
const CONTROL_LIMIT_LEFT = 833;
const CONTROL_ERROR_ALARM_LEFT = 897;
const BASE_TOP = 291;
const ROW_HEIGHT = 30;

export const LIMIT_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

export const DEFAULT_LIMIT_NUMBERS = {
  low: 1,
  high: 2,
  control: 3,
};

function normalizeLimitNumber(value, fallback) {
  const numericValue = Number(value);

  return LIMIT_OPTIONS.includes(numericValue) ? numericValue : fallback;
}

function normalizeLimitNumbers(limitNumbers = {}) {
  return {
    low: normalizeLimitNumber(limitNumbers.low, DEFAULT_LIMIT_NUMBERS.low),
    high: normalizeLimitNumber(limitNumbers.high, DEFAULT_LIMIT_NUMBERS.high),
    control: normalizeLimitNumber(limitNumbers.control, DEFAULT_LIMIT_NUMBERS.control),
  };
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

function getPointStem(pointId) {
  return pointId.replace(/_(?:FM|M)$/, '');
}

function getShortPointId(pointId) {
  const parts = pointId.split('_');

  if (parts.length <= 2) {
    return parts.join('-');
  }

  return parts.slice(1, -1).join('-');
}

function createIdGenerator() {
  const usedIds = new Set();

  return function getNextId() {
    let nextId = '';

    do {
      nextId = `ID${Math.floor(10000 + Math.random() * 90000)}`;
    } while (usedIds.has(nextId));

    usedIds.add(nextId);
    return nextId;
  };
}

function createTextBlock({ id, left, top, text }) {
  const escapedText = escapeHtml(text);

  return `<div id="${id}" style="position: absolute; left: ${left}px; top: ${top}px; font-size: 12px; font-weight: normal; color: rgb(0, 0, 0); text-align: center; padding: 0px 3px;" fdxuserlevel="0" fdxeditgroup="0" fdxgroupcode="" fdxpntid="Unknown" fdxmanualenabled="1" fdxshowinfo="1" align="center" fdxtype="FdxText" fdxhideobject="0" fdxhidevalue="1" fdxbgcolor="" fdxhref="" fdxshowsetvalue="0" fdxtextalign="2" valign="middle" fdxtextborder="0" fdxtextshowvalue="0" fdxbold="0" fdxtextsize="12" fdxfrontcolor="#000000" fdxbordercolor="#000000" fxdbold="0" class=""><div style="white-space: nowrap;color: #000000" textvalue="?" textcolor="#000000" texttext="${escapedText}">${escapedText}</div></div>`;
}

function createMeasurementInput({ id, left, top, pointId }) {
  return `<input id="${id}" class="Measurement" style="position: absolute; left: ${left}px; top: ${top}px; width: 60px; height: 20px; color: rgb(0, 0, 0); background-color: rgb(160, 255, 160);" fdxuserlevel="0" fdxeditgroup="0" fdxgroupcode="" fdxpntid="${pointId}" fdxmanualenabled="1" fdxshowinfo="1" fdxtype="FdxAnalogPoint" fdxhideobject="0" fdxhidevalue="1" fdxfrontcolor="#000000" fdxbgcolor="#A0FFA0" fdxshowsetvalue="0" autocomplete="off" fdxtextshowvalue="0" fdxhref="">`;
}

function createSetPointInput({ id, left, top, pointId }) {
  return `<input id="${id}" class="SetPoint" style="position: absolute; left: ${left}px; top: ${top}px; width: 60px; height: 20px; color: rgb(0, 0, 0); background-color: rgb(255, 255, 160);" fdxuserlevel="0" fdxeditgroup="0" fdxgroupcode="" fdxpntid="${pointId}" fdxmanualenabled="1" fdxshowinfo="1" fdxtype="FdxAnalogPoint" fdxhideobject="0" fdxhidevalue="1" fdxfrontcolor="#000000" fdxbgcolor="#FFFFA0" fdxshowsetvalue="1" autocomplete="off" fdxtextshowvalue="0" fdxhref="">`;
}

function createAlarmButton({ id, left, top, pointId }) {
  return `<input id="${id}" style="position: absolute; left: ${left}px; top: ${top}px; width: 20px; height: 20px; background-color: rgb(240, 240, 240);" fdxuserlevel="0" fdxeditgroup="0" fdxgroupcode="" fdxpntid="${pointId}" fdxmanualenabled="1" fdxshowinfo="1" type="button" value="H" fdxtype="FdxBinaryPoint" fdxhideobject="0" fdxhidevalue="0" fdxfrontcolor="#FF0000" fdxbgcolor="#F0F0F0" fdxfixedvalue="" fdxtextshowvalue="0" class="AlarmBox" fdxhref="">`;
}

export function parsePointDatabase(input, limitNumbers = DEFAULT_LIMIT_NUMBERS) {
  if (!input.trim()) {
    throw new Error('Liitä ensin pistekannan XML-sisältö.');
  }

  const normalizedLimitNumbers = normalizeLimitNumbers(limitNumbers);

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
    .map((node) => {
      const baseNode = getDirectChild(node, 'NBase');

      if (!baseNode) {
        return null;
      }

      const pointId = getDirectChildText(baseNode, 'SId');

      if (!pointId) {
        return null;
      }

      return {
        nodeName: node.tagName,
        pointId,
        text: decodePointText(getDirectChildText(baseNode, 'STxt')),
      };
    })
    .filter(Boolean);

  const alarmIds = new Set(
    records
      .filter((record) => record.nodeName === 'NAlarm')
      .map((record) => record.pointId)
  );
  const controlIds = new Set(
    records
      .filter((record) => record.nodeName === 'NControl')
      .map((record) => record.pointId)
  );
  const measurementPoints = records.filter(
    (record) => record.nodeName === 'NAI' && /_(?:FM|M)$/.test(record.pointId)
  );

  const rows = measurementPoints
    .map((record) => {
      const stem = getPointStem(record.pointId);
      const lowAlarmId = `${stem}_ARH`;
      const highAlarmId = `${stem}_YRH`;
      const controlErrorAlarmId = `${stem}_SVH`;
      const controlPointId = `${stem}_C`;
      const hasLowLimit = alarmIds.has(lowAlarmId);
      const hasHighLimit = alarmIds.has(highAlarmId);
      const hasControlSetpoint = controlIds.has(controlPointId);
      const hasControlError = alarmIds.has(controlErrorAlarmId);

      return {
        description: record.text,
        pointId: record.pointId,
        shortPointId: getShortPointId(record.pointId),
        lowLimitPointId: `${record.pointId}:${normalizedLimitNumbers.low}`,
        lowAlarmId,
        hasLowLimit,
        highLimitPointId: `${record.pointId}:${normalizedLimitNumbers.high}`,
        highAlarmId,
        hasHighLimit,
        controlSetpointPointId: `${controlPointId}`,
        controlLimitPointId: `${record.pointId}:${normalizedLimitNumbers.control}`,
        hasControlSetpoint,
        controlErrorAlarmId,
        hasControlError,
      };
    })
    .filter((row) => row.hasLowLimit || row.hasHighLimit || row.hasControlError)
    .sort((left, right) =>
      left.pointId.localeCompare(right.pointId, undefined, {
        numeric: true,
      })
    );

  return {
    rows,
    measurementCount: measurementPoints.length,
    limitNumbers: normalizedLimitNumbers,
  };
}

export function buildOutputHtml(rows) {
  const getNextId = createIdGenerator();

  return rows
    .flatMap((row, index) => {
      const top = BASE_TOP + index * ROW_HEIGHT;
      const snippets = [
        createTextBlock({
          id: getNextId(),
          left: TEXT_LEFT,
          top,
          text: row.description,
        }),
        createTextBlock({
          id: getNextId(),
          left: POINT_ID_LEFT,
          top,
          text: row.shortPointId,
        }),
        createMeasurementInput({
          id: getNextId(),
          left: MEASUREMENT_LEFT,
          top,
          pointId: row.pointId,
        }),
      ];

      if (row.hasLowLimit) {
        snippets.push(
          createSetPointInput({
            id: getNextId(),
            left: LOW_LIMIT_LEFT,
            top,
            pointId: row.lowLimitPointId,
          })
        );
        snippets.push(
          createAlarmButton({
            id: getNextId(),
            left: LOW_ALARM_LEFT,
            top,
            pointId: row.lowAlarmId,
          })
        );
      }

      if (row.hasHighLimit) {
        snippets.push(
          createSetPointInput({
            id: getNextId(),
            left: HIGH_LIMIT_LEFT,
            top,
            pointId: row.highLimitPointId,
          })
        );
        snippets.push(
          createAlarmButton({
            id: getNextId(),
            left: HIGH_ALARM_LEFT,
            top,
            pointId: row.highAlarmId,
          })
        );
      }

      if (row.hasControlSetpoint) {
        snippets.push(
          createSetPointInput({
            id: getNextId(),
            left: CONTROL_SETPOINT_LEFT,
            top,
            pointId: row.controlSetpointPointId,
          })
        );
        snippets.push(
          createSetPointInput({
            id: getNextId(),
            left: CONTROL_LIMIT_LEFT,
            top,
            pointId: row.controlLimitPointId,
          })
        );
        snippets.push(
          createAlarmButton({
            id: getNextId(),
            left: CONTROL_ERROR_ALARM_LEFT,
            top,
            pointId: row.controlErrorAlarmId,
          })
        );
      }

      return snippets;
    })
    .join('\n');
}
