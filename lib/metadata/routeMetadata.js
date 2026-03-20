import { POSTS_PER_PAGE } from '../../data/site/constants.mjs';
import {
  getAllContentSlugs,
  getBlogPageData,
  getBlogTagPageData,
  getContentMetadata,
  getPostsByTag,
} from '../content/index.mjs';
import { blogIndexPage } from '../site/pageRecords.mjs';
import { createPageMetadata } from './createPageMetadata.js';

export function createBlogPageMetadata(pageIndex) {
  const { pageIndexInt, pagePath } = getBlogPageData(pageIndex);
  const numPages = Math.ceil(getAllContentSlugs().length / POSTS_PER_PAGE);
  const isFirst = pageIndexInt === 1;
  const isLast = pageIndexInt === numPages;

  const metadata = createPageMetadata({
    ...blogIndexPage.metadata,
    canonicalUrl: pagePath,
    openGraph: {
      url: pagePath,
    },
  });

  metadata.pagination = {
    ...(isFirst ? {} : { previous: `/blogi/sivu/${pageIndexInt - 1}` }),
    ...(isLast ? {} : { next: `/blogi/sivu/${pageIndexInt + 1}` }),
  };

  return metadata;
}

export function createBlogTagPageMetadata({ tag, pageIndex }) {
  const { pageIndexInt, pagePath, title, description } = getBlogTagPageData({
    tag,
    pageIndex,
  });

  const { numPages } = getPostsByTag(decodeURIComponent(tag), pageIndex, POSTS_PER_PAGE);
  const isFirst = pageIndexInt === 1;
  const isLast = pageIndexInt === numPages;

  const metadata = createPageMetadata({
    title,
    description,
    canonicalUrl: pagePath,
    openGraph: {
      title,
      description,
      url: pagePath,
    },
  });

  metadata.pagination = {
    ...(isFirst ? {} : { previous: `/blogi/${tag}/sivu/${pageIndexInt - 1}` }),
    ...(isLast ? {} : { next: `/blogi/${tag}/sivu/${pageIndexInt + 1}` }),
  };

  return metadata;
}

export function createContentPageMetadata(slug) {
  const data = getContentMetadata({ slug });

  return createPageMetadata({
    title: data.title,
    description: data.description,
    canonicalUrl: data.canonicalUrl,
    image: data.metadataImage,
    openGraph: {
      type: 'article',
      url: data.canonicalUrl,
    },
    twitter: {
      images: [data.metadataImage.url],
    },
  });
}

export const notFoundPageMetadata = {
  title: 'Hakemaasi sivua ei löytynyt | Joonas Niemenjoki blogi',
  description:
    'Hakemaasi sivua ei löytynyt tältä sivustolta. Palaa etusivulle tai selaa blogin julkaisuja ja projektisivuja löytääksesi etsimäsi sisällön.',
  robots: { index: false, follow: false },
};
