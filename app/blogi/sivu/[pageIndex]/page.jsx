import { notFound } from 'next/navigation';

import Advert from '@/components/Advert/Advert';
import BlogTagNavigation from '@/components/BlogTagNavigation/BlogTagNavigation';
import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/PostPreview/PostPreview';
import SiteSearch from '@/components/SiteSearch/SiteSearch';
import {
  BLOG_HEADING,
  BLOG_SEARCH_PLACEHOLDER,
  POSTS_PER_PAGE,
  SITE_URL,
} from '@/data/site/constants.mjs';
import {
  getAllContentSlugs,
  getAllPostTags,
  getBlogPageData,
  getPaginatedPosts,
} from '@/lib/content/index.mjs';
import { getSiteSearchIndex } from '@/lib/search/siteSearchIndex.mjs';
import { createCollectionStructuredData } from '@/lib/structuredData/createCollectionStructuredData.mjs';

export { default as generateMetadata } from './generateMetadata';

export async function generateStaticParams() {
  const slugs = getAllContentSlugs();

  const numPages = Math.ceil(slugs.length / POSTS_PER_PAGE);
  return Array.from({ length: numPages }, (_, i) => ({
    pageIndex: (i + 1).toString(),
  }));
}

export async function renderBlogCollectionPage({
  pageIndex = '1',
  baseCanonicalUrl = '/blogi',
} = {}) {
  const { pageIndexInt, pageUrl, pageName, description, breadcrumbItems } =
    getBlogPageData(pageIndex, { baseCanonicalUrl });
  const { posts, numPages } = getPaginatedPosts(pageIndexInt, POSTS_PER_PAGE);

  if (posts.length === 0) {
    notFound();
  }

  const allTags = getAllPostTags();
  const structuredData = createCollectionStructuredData({
    pageUrl,
    pageName,
    description,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: (pageIndexInt - 1) * POSTS_PER_PAGE + (index + 1),
      name: post.title,
      url: `${SITE_URL}/blogi/julkaisu/${post.slug}`,
    })),
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    breadcrumbItems,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      {pageIndexInt > 1 ? <Breadcrumbs items={breadcrumbItems} /> : null}

      <h1>{BLOG_HEADING}</h1>

      <SiteSearch
        searchItems={getSiteSearchIndex()}
        variant="blog"
        label="Hae sivustolta"
        placeholder={BLOG_SEARCH_PLACEHOLDER}
        resultLimit={5}
      />

      <BlogTagNavigation tags={allTags} />
      <h2 style={{ color: 'var(--highlight-alt)', marginTop: '1rem' }}>
        Viimeisimmät julkaisut
      </h2>
      {posts.map((post) => (
        <Post key={post.slug} post={post} />
      ))}

      <Pagination numPages={numPages} currentPage={pageIndexInt} basePath="/blogi" />
      <Advert />
    </>
  );
}

export default async function BlogPage({ params }) {
  const { pageIndex } = await params;

  return renderBlogCollectionPage({ pageIndex });
}
