import { notFound } from 'next/navigation';

import Advert from '@/components/Advert/Advert';
import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/PostPreview/PostPreview';
import SafeLink from '@/components/SafeLink/SafeLink';
import SearchPosts from '@/components/SearchPosts/SearchPosts';
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
import { createCollectionStructuredData } from '@/lib/structuredData/createCollectionStructuredData.mjs';

import classes from './TagPage.module.css';

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
  const { pageIndexInt, pageUrl, pageName, description, breadcrumbItems, tagName } =
    getBlogTagPageData({
      tag,
      pageIndex,
    });
  const { posts, numPages } = getPostsByTag(tag, pageIndexInt, POSTS_PER_PAGE);
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

      <SearchPosts
        list={posts}
        keys={['title', 'description', 'keywords', 'tags']}
        placeholder={BLOG_SEARCH_PLACEHOLDER}
      />

      <div className={classes.Taglist}>
        <SafeLink href="/blogi" className={classes.Tag}>
          Kaikki
        </SafeLink>
        {allTags.map((t) => {
          const isActive = slugifyTag(t) === slugifyTag(tag);
          return (
            <SafeLink
              key={t}
              href={`/blogi/${slugifyTag(t)}/sivu/1`}
              className={`${classes.Tag} ${isActive ? classes.ActiveTag : ''}`}
            >
              {t}
            </SafeLink>
          );
        })}
      </div>

      {posts.map((post, i) => (
        <Post key={i} post={post} />
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
