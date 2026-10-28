import { slugifyHeading } from '../mdx/rehypeHeadingIds.mjs';

// Sisällysluettelon otsikot MDX-lähteestä. Tunnisteet lasketaan samalla tavalla kuin
// rehypeHeadingIds ne sivulle antaa, jotta vanhat ankkurilinkit pysyvät ennallaan.
const ATX_HEADING_PATTERN = /^(#{2,6})[\t ]+(.+?)[\t ]*$/u;
const FENCE_PATTERN = /^[\t ]{0,3}(`{3,}|~{3,})/u;
const CONTENTS_LEVELS = new Set([2, 3]);
// Julkaisun oma käsin tehty sisällysluettelo-osio ei kuulu automaattiseen luetteloon.
const MANUAL_CONTENTS_HEADING = 'sisällysluettelo';

const NAMED_ENTITIES = Object.freeze({
  amp: '&',
  apos: "'",
  gt: '>',
  lt: '<',
  quot: '"',
});

function decodeEntity(match, entity) {
  const normalizedEntity = entity.toLowerCase();

  if (normalizedEntity in NAMED_ENTITIES) {
    return NAMED_ENTITIES[normalizedEntity];
  }

  const isHex = normalizedEntity.startsWith('#x');
  const codePoint = Number.parseInt(
    normalizedEntity.slice(isHex ? 2 : 1),
    isHex ? 16 : 10
  );
  if (!Number.isInteger(codePoint) || codePoint < 0 || codePoint > 0x10ffff) {
    return match;
  }

  return String.fromCodePoint(codePoint);
}

function headingMarkdownToText(value) {
  return String(value ?? '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/gu, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, '$1')
    .replace(/<[^>]+>/gu, '')
    .replace(/`+([^`]+?)`+/gu, '$1')
    .replace(/[*_~]/gu, '')
    .replace(/\\([\\`*_[\]{}()#+\-.!>])/gu, '$1')
    .replace(/&(#x[\da-f]+|#\d+|amp|apos|gt|lt|quot);/giu, decodeEntity)
    .replace(/\s+/gu, ' ')
    .trim();
}

export function extractArticleHeadings(source) {
  const headings = [];
  const seen = new Map();
  let activeFence = null;

  for (const line of String(source ?? '').split(/\r?\n/u)) {
    const fenceMatch = line.match(FENCE_PATTERN);

    if (activeFence) {
      if (
        fenceMatch &&
        fenceMatch[1][0] === activeFence.marker &&
        fenceMatch[1].length >= activeFence.length &&
        line.slice(fenceMatch[0].length).trim() === ''
      ) {
        activeFence = null;
      }
      continue;
    }

    if (fenceMatch) {
      activeFence = { marker: fenceMatch[1][0], length: fenceMatch[1].length };
      continue;
    }

    const headingMatch = line.match(ATX_HEADING_PATTERN);
    if (!headingMatch) continue;

    const level = headingMatch[1].length;
    const text = headingMarkdownToText(headingMatch[2].replace(/[\t ]+#+[\t ]*$/u, ''));
    if (!text) continue;

    const baseId = slugifyHeading(text);
    const count = seen.get(baseId) ?? 0;
    seen.set(baseId, count + 1);

    if (!CONTENTS_LEVELS.has(level)) continue;
    if (text.toLocaleLowerCase('fi-FI') === MANUAL_CONTENTS_HEADING) continue;

    headings.push({
      id: count === 0 ? baseId : `${baseId}-${count + 1}`,
      level,
      text,
    });
  }

  return headings;
}
