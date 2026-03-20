import { POSTS_PER_PAGE } from '@/data/site/constants.mjs';
import { getAllContentSlugs, getBlogPageData } from '@/lib/content/index.mjs';
import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { blogIndexPage } from '@/lib/site/pageRecords.mjs';

export default async function generateMetadata({ params }) {
  const { pageIndex } = await params;
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
