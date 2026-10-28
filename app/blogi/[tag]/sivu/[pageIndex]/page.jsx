import { notFound } from 'next/navigation';

import Advert from '@/components/Advert/Advert';
import BlogTagNavigation from '@/components/BlogTagNavigation/BlogTagNavigation';
import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/PostPreview/PostPreview';
import SiteSearch from '@/components/SiteSearch/SiteSearch';
import {
  BLOG_SEARCH_PLACEHOLDER,
  POSTS_PER_PAGE,
  SITE_URL,
} from '@/data/site/constants.mjs';
import {
  getAllContent,
  getAllPostTags,
  getBlogTagPageData,
  getPostsByTag,
  slugifyTag,
} from '@/lib/content/index.mjs';
import { getSiteSearchIndex } from '@/lib/search/siteSearchIndex.mjs';
import { createCollectionStructuredData } from '@/lib/structuredData/createCollectionStructuredData.mjs';

export { default as generateMetadata } from './generateMetadata';

export async function generateStaticParams() {
  const allPosts = getAllContent();
  const groupedPosts = {};

  allPosts.forEach((post) => {
    const tags = post.tags.map((tag) => slugifyTag(tag));
    tags.forEach((tag) => {
      if (!groupedPosts[tag]) groupedPosts[tag] = [];
      groupedPosts[tag].push(post.slug);
    });
  });

  const params = [];
  for (const tag of Object.keys(groupedPosts)) {
    const numPages = Math.ceil(groupedPosts[tag].length / POSTS_PER_PAGE);
    for (let i = 1; i <= numPages; i++) {
      params.push({ tag, pageIndex: i.toString() });
    }
  }

  return params;
}

export default async function BlogTagPage({ params }) {
  const { pageIndex, tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const { pageIndexInt, pageUrl, pageName, description, breadcrumbItems, tagName } =
    getBlogTagPageData({
      tag,
      pageIndex,
    });
  const { posts, numPages } = getPostsByTag(decodedTag, pageIndexInt, POSTS_PER_PAGE);
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
      <Breadcrumbs items={breadcrumbItems} />

      <h1>Julkaisut avainsanalla "{tagName}"</h1>

      <SiteSearch
        searchItems={getSiteSearchIndex()}
        variant="blog"
        label="Hae sivustolta"
        placeholder={BLOG_SEARCH_PLACEHOLDER}
        resultLimit={5}
      />

      <BlogTagNavigation activeTagSlug={decodedTag} tags={allTags} />

      {posts.map((post) => (
        <Post key={post.slug} post={post} />
      ))}

      <Pagination
        numPages={numPages}
        currentPage={pageIndexInt}
        basePath={`/blogi/${tag}`}
      />
      <Advert />
    </>
  );
}
