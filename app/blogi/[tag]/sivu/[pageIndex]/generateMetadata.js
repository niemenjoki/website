import { POSTS_PER_PAGE } from '@/data/vars.mjs';
import { getPostsByTag } from '@/lib/content/index.mjs';
import { withDefaultMetadata } from '@/lib/metadata/withDefaultMetadata';

export default async function generateMetadata({ params }) {
  const { tag, pageIndex } = await params;
  const tagName = tag.replaceAll('-', ' ');
  const decodedTag = decodeURIComponent(tagName);

  const title = `Avainsana ${decodedTag} | Niemenjoki`;
  const description = `Julkaisut avainsanalla ${decodedTag}: Blogi käsittelee pääasiassa rakennusautomaatiota, lämpöpumppuja ja tekniikkaa.`;
  const pageURL = `/blogi/${tag}/sivu/${pageIndex}`;

  const pageIndexInt = parseInt(pageIndex, 10);

  const { numPages } = getPostsByTag(decodeURIComponent(tag), pageIndex, POSTS_PER_PAGE);

  const isFirst = pageIndexInt === 1;
  const isLast = pageIndexInt === numPages;

  const customMetadata = {
    title,
    description,
    alternates: {
      canonical: pageURL,
    },
    openGraph: {
      title,
      description,
      url: pageURL,
    },
    pagination: {
      ...(isFirst ? {} : { previous: `/blogi/${tag}/sivu/${pageIndexInt - 1}` }),
      ...(isLast ? {} : { next: `/blogi/${tag}/sivu/${pageIndexInt + 1}` }),
    },
  };

  return withDefaultMetadata(customMetadata);
}
