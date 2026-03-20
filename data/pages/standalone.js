import { SITE_AUTHOR } from '../site/author.js';
import { SITE_DESCRIPTION, SITE_TITLE } from '../site/constants.mjs';

export const standalonePageDefinitions = {
  blogIndex: {
    canonicalUrl: '/blogi',
    pageName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    navigationLabel: 'Blogi',
    shortLabel: 'Blogi',
    search: {
      contexts: ['notFound'],
      keywords: ['blogi', 'julkaisut', 'rakennusautomaatio', 'lämpöpumput'],
      tags: ['blogi'],
    },
  },
  about: {
    canonicalUrl: '/tietoa',
    pageType: 'ProfilePage',
    pageIdSuffix: '#profilepage',
    pageName: 'Tietoa sivustosta ja sen ylläpitäjästä | Joonas Niemenjoki',
    title: 'Tietoa sivustosta ja sen ylläpitäjästä | Joonas Niemenjoki',
    description:
      'Kirjoitan käytännön kokemuksiin perustuvia havaintoja ja vinkkejä rakennusautomaatiosta ja sitä sivuavista aiheista.',
    image: {
      url: SITE_AUTHOR.portraitPath,
      width: 1024,
      height: 1024,
      alt: SITE_AUTHOR.portraitAlt,
    },
    navigationLabel: 'Tietoa sivustosta',
    shortLabel: 'Tietoa sivustosta',
    updatedAt: '2025-09-08',
    search: {
      contexts: ['notFound'],
      keywords: ['tietoa', 'joonas niemenjoki', 'rakennusautomaatio', 'sivusto'],
      tags: ['profiili'],
    },
  },
};
