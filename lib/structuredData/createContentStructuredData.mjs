import { SITE_URL } from '../../data/site/constants.mjs';
import {
  AUTHOR_ID,
  AUTHOR_NAME,
  AUTHOR_PROFILE_URL,
  SCHEMA_LANGUAGE,
  SCHEMA_TIME_ZONE,
  WEBSITE_ID,
} from '../../data/site/schema.mjs';

function getHelsinkiOffset(date) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: SCHEMA_TIME_ZONE,
    timeZoneName: 'shortOffset',
  });
  const parts = formatter.formatToParts(new Date(`${date}T00:00:00Z`));
  const offset = parts.find((part) => part.type === 'timeZoneName')?.value ?? 'GMT+0';
  const [, hours = '+0', minutes = '00'] =
    offset.match(/^GMT([+-]\d{1,2})(?::(\d{2}))?$/) ?? [];
  const sign = hours.startsWith('-') ? '-' : '+';
  const absoluteHours = hours.replace(/^[+-]/, '').padStart(2, '0');

  return `${sign}${absoluteHours}:${minutes}`;
}

function toSchemaDateTime(date) {
  return `${date}T00:00:00${getHelsinkiOffset(date)}`;
}

function toAbsoluteImageUrl(image) {
  if (!image) {
    return undefined;
  }

  if (typeof image === 'string') {
    return image.startsWith('http') ? image : `${SITE_URL}${image}`;
  }

  if (typeof image?.url === 'string') {
    return image.url.startsWith('http') ? image.url : `${SITE_URL}${image.url}`;
  }

  return undefined;
}

export function createContentStructuredData({ slug, content }) {
  const pageUrl = `${SITE_URL}${content.canonicalUrl ?? `/blogi/julkaisu/${slug}`}`;
  const publishedAt = content.publishedAt ?? content.date;
  const updatedAt = content.updatedAt ?? content.updated ?? publishedAt;
  const image = toAbsoluteImageUrl(content.image);

  const blogPostingNode = {
    '@type': 'BlogPosting',
    '@id': `${pageUrl}#blogpost`,
    url: pageUrl,
    headline: content.title,
    description: content.description,
    datePublished: toSchemaDateTime(publishedAt),
    dateModified: toSchemaDateTime(updatedAt),
    inLanguage: content.language ?? SCHEMA_LANGUAGE,
    mainEntityOfPage: {
      '@id': `${pageUrl}#webpage`,
    },
    author: {
      '@type': 'Person',
      '@id': AUTHOR_ID,
      name: AUTHOR_NAME,
      url: AUTHOR_PROFILE_URL,
    },
    isPartOf: {
      '@id': WEBSITE_ID,
    },
    ...(content.tags?.[0] ? { articleSection: content.tags[0] } : {}),
    ...(content.keywords?.length ? { keywords: content.keywords } : {}),
    ...(image ? { image } : {}),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      blogPostingNode,
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: content.title,
        description: content.description,
        isPartOf: { '@id': WEBSITE_ID },
        breadcrumb: {
          '@id': `${pageUrl}#breadcrumb`,
        },
        inLanguage: content.language ?? SCHEMA_LANGUAGE,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Etusivu',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blogi',
            item: `${SITE_URL}/blogi`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: content.title,
          },
        ],
      },
    ],
  };
}
