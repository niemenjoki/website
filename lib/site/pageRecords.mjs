import { homePageDefinition } from '../../data/pages/home.js';
import { legalPageDefinitions } from '../../data/pages/legal.js';
import {
  primaryProjectOrder,
  projectPageDefinitions,
  rauToolOrder,
} from '../../data/pages/projects.js';
import { standalonePageDefinitions } from '../../data/pages/standalone.js';
import { SITE_URL } from '../../data/site/constants.mjs';

function createSearchRecord(search, description, pageName, shortLabel) {
  if (!search) {
    return null;
  }

  return {
    contexts: search.contexts ?? [],
    description: search.description ?? description,
    keywords: search.keywords ?? [],
    tags: search.tags ?? [],
    title: search.title ?? shortLabel ?? pageName,
  };
}

function createPageRecord({
  canonicalUrl,
  description,
  image,
  navigationLabel,
  pageDescription,
  pageIdSuffix = '#webpage',
  pageName,
  pageType = 'WebPage',
  search = null,
  shortLabel,
  title,
  ...rest
}) {
  const pageUrl = new URL(canonicalUrl, SITE_URL).toString();
  const imageUrl =
    image?.url != null ? new URL(image.url, SITE_URL).toString() : undefined;

  return {
    ...rest,
    canonicalUrl,
    description,
    image,
    imageUrl,
    metadata: {
      title,
      description,
      canonicalUrl,
      ...(image ? { image } : {}),
    },
    navigationLabel: navigationLabel ?? shortLabel ?? pageName,
    pageDescription: pageDescription ?? description,
    pageId: `${pageUrl}${pageIdSuffix}`,
    pageIdSuffix,
    pageName,
    pageType,
    pageUrl,
    search: createSearchRecord(search, description, pageName, shortLabel),
    shortLabel: shortLabel ?? pageName,
    title,
  };
}

export const homePage = createPageRecord(homePageDefinition);
export const blogIndexPage = createPageRecord(standalonePageDefinitions.blogIndex);
export const aboutPage = createPageRecord(standalonePageDefinitions.about);
export const privacyPolicyPage = createPageRecord(legalPageDefinitions.privacyPolicy);

export const compressCreateReactAppPage = createPageRecord(
  projectPageDefinitions.compressCreateReactApp
);
export const lieromaaProjectPage = createPageRecord(projectPageDefinitions.lieromaa);
export const rauToolsPage = createPageRecord(projectPageDefinitions.rauTools);
export const rauToolsAlarmPage = createPageRecord(
  projectPageDefinitions.rauToolsAlarmPage
);
export const rauToolsModbusDevicesPage = createPageRecord(
  projectPageDefinitions.rauToolsModbusDevices
);
export const rauToolsModbusInterfacePage = createPageRecord(
  projectPageDefinitions.rauToolsModbusInterface
);
export const rauToolsStVariablesPage = createPageRecord(
  projectPageDefinitions.rauToolsStVariables
);

export const standaloneSitePages = Object.freeze({
  about: aboutPage,
  blogIndex: blogIndexPage,
});

export const legalSitePages = Object.freeze({
  privacyPolicy: privacyPolicyPage,
});

export const projectSitePages = Object.freeze({
  compressCreateReactApp: compressCreateReactAppPage,
  lieromaa: lieromaaProjectPage,
  rauTools: rauToolsPage,
});

export const rauToolSitePages = Object.freeze({
  alarmPageTool: rauToolsAlarmPage,
  modbusDevices: rauToolsModbusDevicesPage,
  modbusInterface: rauToolsModbusInterfacePage,
  stVariables: rauToolsStVariablesPage,
});

export const primaryProjectPages = Object.freeze(
  primaryProjectOrder.map((key) => projectSitePages[key])
);

export const rauToolPages = Object.freeze(
  rauToolOrder.map((key) => {
    const pageByKey = {
      rauToolsAlarmPage: rauToolsAlarmPage,
      rauToolsModbusDevices: rauToolsModbusDevicesPage,
      rauToolsModbusInterface: rauToolsModbusInterfacePage,
      rauToolsStVariables: rauToolsStVariablesPage,
    };

    return pageByKey[key];
  })
);

export const staticSitePages = Object.freeze([
  homePage,
  blogIndexPage,
  aboutPage,
  privacyPolicyPage,
  ...primaryProjectPages,
  ...rauToolPages,
]);

export function getPageLastModified({
  updatedAt,
  effectiveFrom,
  publishedAt,
  date,
  updated,
}) {
  return updatedAt ?? updated ?? effectiveFrom ?? publishedAt ?? date ?? null;
}
