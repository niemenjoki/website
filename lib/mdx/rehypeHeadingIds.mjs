import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';

function slugifyHeading(text) {
  const slug = text
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return slug || 'section';
}

export default function rehypeHeadingIds(options = {}) {
  const levels = Array.isArray(options.levels) ? options.levels : [2, 3, 4, 5, 6];
  const prefix = typeof options.prefix === 'string' ? options.prefix : '';
  const allowedTags = new Set(
    levels.map((level) => `h${Number.isFinite(level) ? level : Number(level)}`)
  );

  return (tree) => {
    const seen = new Map();

    visit(tree, 'element', (node) => {
      if (!node?.tagName || !allowedTags.has(node.tagName)) return;

      node.properties ||= {};

      if (node.properties.id) return;

      const headingText = toString(node).trim();
      if (!headingText) return;

      const baseId = `${prefix}${slugifyHeading(headingText)}`;
      const count = seen.get(baseId) ?? 0;
      seen.set(baseId, count + 1);

      node.properties.id = count === 0 ? baseId : `${baseId}-${count + 1}`;
    });
  };
}
