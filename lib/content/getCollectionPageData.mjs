import { SITE_URL } from '../../data/site/constants.mjs';
import { blogIndexPage } from '../site/pageRecords.mjs';

function parsePageIndex(pageIndex) {
  const parsedPageIndex = Number.parseInt(pageIndex, 10);

  if (Number.isNaN(parsedPageIndex) || parsedPageIndex < 1) {
    return 1;
  }

  return parsedPageIndex;
}

export function slugifyTag(tagName) {
  return tagName.trim().toLowerCase().replaceAll(' ', '-');
}

export function deslugifyTag(tagSlug) {
  return decodeURIComponent(tagSlug).replaceAll('-', ' ');
}

export function getBlogPageData(pageIndex, { baseCanonicalUrl = '/blogi' } = {}) {
  const pageIndexInt = parsePageIndex(pageIndex);
  const pagePath = pageIndexInt === 1 ? baseCanonicalUrl : `/blogi/sivu/${pageIndexInt}`;

  return {
    pageIndexInt,
    pagePath,
    pageUrl: `${SITE_URL}${pagePath}`,
    title: blogIndexPage.title,
    pageName:
      pageIndexInt === 1
        ? blogIndexPage.title
        : `${blogIndexPage.shortLabel} (sivu ${pageIndexInt})`,
    description: blogIndexPage.description,
    breadcrumbItems:
      pageIndexInt === 1
        ? [{ name: 'Etusivu', href: '/' }, { name: 'Blogi' }]
        : [
            { name: 'Etusivu', href: '/' },
            { name: 'Blogi', href: '/blogi' },
            { name: `Sivu ${pageIndexInt}` },
          ],
  };
}

export function getBlogTagPageData({ tag, pageIndex }) {
  const pageIndexInt = parsePageIndex(pageIndex);
  const tagSlug = decodeURIComponent(tag);
  const tagName = deslugifyTag(tagSlug);
  const pagePath = `/blogi/${tag}/sivu/${pageIndexInt}`;

  return {
    pageIndexInt,
    tagSlug,
    tagName,
    pagePath,
    pageUrl: `${SITE_URL}${pagePath}`,
    title: `Julkaisut avainsanalla ${tagName} | Niemenjoki blogi`,
    pageName:
      pageIndexInt === 1
        ? `Julkaisut avainsanalla ${tagName}`
        : `Julkaisut avainsanalla ${tagName} (sivu ${pageIndexInt})`,
    description: `Julkaisut avainsanalla ${tagName}: Blogi käsittelee pääasiassa rakennusautomaatiota, lämpöpumppuja ja tekniikkaa.`,
    breadcrumbItems:
      pageIndexInt === 1
        ? [
            { name: 'Etusivu', href: '/' },
            { name: 'Blogi', href: '/blogi' },
            { name: tagName },
          ]
        : [
            { name: 'Etusivu', href: '/' },
            { name: 'Blogi', href: '/blogi' },
            { name: tagName, href: `/blogi/${tag}/sivu/1` },
            { name: `Sivu ${pageIndexInt}` },
          ],
  };
}
