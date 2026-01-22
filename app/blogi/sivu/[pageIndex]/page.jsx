import { notFound } from 'next/navigation';

import Advert from '@/components/Advert/Advert';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/PostPreview/PostPreview';
import SafeLink from '@/components/SafeLink/SafeLink';
import SearchPosts from '@/components/SearchPosts/SearchPosts';
import { POSTS_PER_PAGE, SITE_URL } from '@/data/vars.mjs';
import {
  getAllContentSlugs,
  getAllPostTags,
  getPaginatedPosts,
} from '@/lib/content/index.mjs';

import classes from './PostPage.module.css';
import structuredData from './structuredData.json';

export { default as generateMetadata } from './generateMetadata';

export async function generateStaticParams() {
  const slugs = getAllContentSlugs();

  const numPages = Math.ceil(slugs.length / POSTS_PER_PAGE);
  return Array.from({ length: numPages }, (_, i) => ({
    pageIndex: (i + 1).toString(),
  }));
}

export default async function BlogPage({ params }) {
  const { pageIndex } = await params;

  const pageIndexInt = parseInt(pageIndex) || 1;
  const { posts, numPages } = getPaginatedPosts(pageIndexInt, POSTS_PER_PAGE);
  if (posts.length === 0) {
    notFound();
  }
  const allTags = getAllPostTags();

  const data = JSON.parse(JSON.stringify(structuredData));
  data['@graph'][1]['itemListElement'] = [];
  posts.forEach((post, i) => {
    data['@graph'][1]['itemListElement'].push({
      '@type': 'ListItem',
      position: (pageIndexInt - 1) * POSTS_PER_PAGE + (i + 1),
      url: `${SITE_URL}/blogi/${post.slug}`,
    });
  });

  const ldJSON = JSON.parse(JSON.stringify(data).replaceAll('[pageIndex]', pageIndex));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ldJSON).replace(/</g, '\\u003c'),
        }}
      />

      <h1>Joonas Niemenjoen blogi</h1>

      <SearchPosts
        list={posts}
        keys={['title', 'description', 'keywords', 'tags']}
        placeholder="Etsi julkaisun nimellä tai avainsanalla.."
      />

      <div className={classes.Taglist}>
        <SafeLink href="/blogi" className={`${classes.Tag} ${classes.ActiveTag}`}>
          Kaikki
        </SafeLink>
        {allTags.map((tag) => (
          <SafeLink
            href={`/blogi/${tag.toLowerCase().replaceAll(' ', '-')}/sivu/1`}
            key={tag}
            className={classes.Tag}
          >
            {tag}
          </SafeLink>
        ))}
      </div>
      <h2 style={{ color: 'var(--highlight-alt)', marginTop: '1rem' }}>
        Viimeisimmät julkaisut
      </h2>
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}

      <Pagination numPages={numPages} currentPage={pageIndexInt} basePath="/blogi" />
      <Advert adClient="ca-pub-5560402633923389" adSlot="1051764153" />
    </>
  );
}
