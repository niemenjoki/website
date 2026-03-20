import { SITE_AUTHOR } from './author.js';
import { SITE_LANGUAGE, SITE_NAME, SITE_URL } from './constants.mjs';

export const SCHEMA_LANGUAGE = SITE_LANGUAGE;
export const SCHEMA_TIME_ZONE = 'Europe/Helsinki';

export const WEBSITE_ID = `${SITE_URL}/#website`;
export const AUTHOR_ID = `${SITE_URL}/#joonas`;
export const AUTHOR_NAME = SITE_AUTHOR.name;
export const AUTHOR_PROFILE_URL = `${SITE_URL}${SITE_AUTHOR.profilePath}`;
export const AUTHOR_IMAGE_PATH = SITE_AUTHOR.portraitPath;
export const AUTHOR_IMAGE_URL = `${SITE_URL}${AUTHOR_IMAGE_PATH}`;
export const AUTHOR_LINKEDIN_URL = SITE_AUTHOR.linkedInUrl;
export const AUTHOR_SAME_AS = SITE_AUTHOR.sameAs;
export const PERSON_DESCRIPTION = SITE_AUTHOR.description;
export const PERSON_JOB_TITLE = SITE_AUTHOR.jobTitle;
export const WEBSITE_NAME = SITE_NAME;
