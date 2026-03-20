import { notFound } from 'next/navigation';

import rehypePrettyCode from 'rehype-pretty-code';

import Advert from '@/components/Advert/Advert';
import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import DhwPidSimulator from '@/components/DhwPidSimulator/DhwPidSimulator';
import InfoBox from '@/components/InfoBox/InfoBox';
import MdxArticlePage from '@/components/MdxArticlePage/MdxArticlePage';
import PostRecommendation from '@/components/PostRecommendation/PostRecommendation';
import SafeImage from '@/components/SafeImage/SafeImage';
import SafeLink from '@/components/SafeLink/SafeLink';
import SocialShareButtons from '@/components/SocialShareButtons/SocialShareButtons';
import {
  getAllContentSlugs,
  getContentMdxSource,
  getContentMetadata,
  getPostRecommendations,
} from '@/lib/content/index.mjs';
import rehypeHeadingIds from '@/lib/mdx/rehypeHeadingIds.mjs';

const prettyCodeOptions = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  keepBackground: false,
};

export const mdxComponents = {
  SafeLink,
  SafeImage,
  InfoBox,
  Advert,
  DhwPidSimulator,
};

export async function generateStaticParams() {
  const slugs = getAllContentSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export { default as generateMetadata } from './generateMetadata';

export default async function PostPage({ params }) {
  const { slug } = await params;
  let data;
  try {
    data = getContentMetadata({ slug });
  } catch {
    notFound();
  }
  const mdxContent = getContentMdxSource(slug);

  const recommendedPosts = await getPostRecommendations({
    self: slug,
    keywords: [...data.tags, ...data.keywords],
  });

  const { structuredData } = data;
  const breadcrumbItems = [
    { name: 'Etusivu', href: '/' },
    { name: 'Blogi', href: '/blogi' },
    { name: data.title },
  ];

  return (
    <>
      <MdxArticlePage
        structuredData={structuredData}
        title={data.title}
        dateContent={
          <>
            Julkaistu: {new Date(data.date).toLocaleDateString('fi-FI')}
            {data.updated
              ? ` (Päivitetty: ${new Date(data.updated).toLocaleDateString('fi-FI')})`
              : undefined}
          </>
        }
        source={mdxContent}
        components={mdxComponents}
        mdxOptions={{
          mdxOptions: {
            rehypePlugins: [rehypeHeadingIds, [rehypePrettyCode, prettyCodeOptions]],
          },
        }}
        preTitle={<Breadcrumbs items={breadcrumbItems} />}
      />

      <SocialShareButtons title={data.title} tags={data.tags} />
      <Advert />
      <PostRecommendation posts={recommendedPosts} />
    </>
  );
}
