import { POSTS_PER_PAGE } from '@/data/site/constants.mjs';
import { getBlogTagPageData, getPostsByTag } from '@/lib/content/index.mjs';
import { createPageMetadata } from '@/lib/metadata/createPageMetadata';

export default async function generateMetadata({ params }) {
  const { tag, pageIndex } = await params;
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
