import { SITE_DESCRIPTION, SITE_TITLE } from '../site/constants.mjs';
import { defaultShareImage } from '../site/defaultMetadata.js';

export const homePageDefinition = {
  canonicalUrl: '/',
  pageName: SITE_TITLE,
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  image: defaultShareImage,
  shortLabel: 'Etusivu',
};
