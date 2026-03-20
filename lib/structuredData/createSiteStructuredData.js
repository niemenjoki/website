import { SITE_URL } from '../../data/site/constants.mjs';
import { defaultMetadata } from '../../data/site/defaultMetadata.js';
import {
  AUTHOR_ID,
  AUTHOR_IMAGE_URL,
  AUTHOR_NAME,
  AUTHOR_PROFILE_URL,
  AUTHOR_SAME_AS,
  PERSON_DESCRIPTION,
  PERSON_JOB_TITLE,
  SCHEMA_LANGUAGE,
  WEBSITE_ID,
  WEBSITE_NAME,
} from '../../data/site/schema.mjs';

export function createAuthorStructuredDataNode() {
  return {
    '@type': 'Person',
    '@id': AUTHOR_ID,
    name: AUTHOR_NAME,
    url: AUTHOR_PROFILE_URL,
    description: PERSON_DESCRIPTION,
    jobTitle: PERSON_JOB_TITLE,
    sameAs: AUTHOR_SAME_AS,
    image: AUTHOR_IMAGE_URL,
  };
}

export function createSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_URL,
        name: WEBSITE_NAME,
        description: defaultMetadata.description,
        publisher: { '@id': AUTHOR_ID },
        inLanguage: SCHEMA_LANGUAGE,
      },
      createAuthorStructuredDataNode(),
    ],
  };
}
