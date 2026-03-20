import { SITE_AUTHOR } from '../site/author.js';
import { SITE_DESCRIPTION, SITE_TITLE } from '../site/constants.mjs';

export const homePageDefinition = {
  canonicalUrl: '/',
  pageName: SITE_TITLE,
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  image: {
    url: SITE_AUTHOR.portraitPath,
    width: 1024,
    height: 1024,
    alt: SITE_AUTHOR.portraitAlt,
  },
  shortLabel: 'Etusivu',
};
