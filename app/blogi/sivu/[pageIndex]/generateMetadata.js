import { POSTS_PER_PAGE } from '@/data/vars.mjs';
import { getAllContentSlugs } from '@/lib/content/index.mjs';
import { withDefaultMetadata } from '@/lib/metadata/withDefaultMetadata';

export default async function generateMetadata({ params }) {
  const { pageIndex } = await params;
  const currentPage = pageIndex || 1;
  const pageIndexInt = parseInt(currentPage, 10);

  let canonical, ogUrl;

  if (pageIndexInt === 1) {
    canonical = '/blogi';
    ogUrl = '/blogi';
  } else {
    canonical = `/blogi/sivu/${pageIndexInt}`;
    ogUrl = canonical;
  }

  const numPages = Math.ceil(getAllContentSlugs().length / POSTS_PER_PAGE);
  const isFirst = pageIndexInt === 1;
  const isLast = pageIndexInt === numPages;

  const customMetadata = {
    alternates: {
      canonical,
    },
    openGraph: {
      url: ogUrl,
    },
    pagination: {
      ...(isFirst ? {} : { previous: `/blogi/sivu/${pageIndexInt - 1}` }),
      ...(isLast ? {} : { next: `/blogi/sivu/${pageIndexInt + 1}` }),
    },
  };

  return withDefaultMetadata(customMetadata);
}
