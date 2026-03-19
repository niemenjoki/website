import { notFound } from 'next/navigation';

import Advert from '@/components/Advert/Advert';
import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/PostPreview/PostPreview';
import SafeLink from '@/components/SafeLink/SafeLink';
import SearchPosts from '@/components/SearchPosts/SearchPosts';
import { defaultMetadata } from '@/data/defaultMetadata';
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
  const pagePath = pageIndexInt === 1 ? '/blogi' : `/blogi/sivu/${pageIndexInt}`;
  const pageUrl = `${SITE_URL}${pagePath}`;
  const { posts, numPages } = getPaginatedPosts(pageIndexInt, POSTS_PER_PAGE);
  if (posts.length === 0) {
    notFound();
  }
  const allTags = getAllPostTags();

  const breadcrumbItems =
    pageIndexInt === 1
      ? [{ name: 'Etusivu', href: '/' }, { name: 'Blogi' }]
      : [
          { name: 'Etusivu', href: '/' },
          { name: 'Blogi', href: '/blogi' },
          { name: `Sivu ${pageIndexInt}` },
        ];

  const data = JSON.parse(JSON.stringify(structuredData));
  data['@graph'][0]['@id'] = `${pageUrl}#collectionpage`;
  data['@graph'][0].url = pageUrl;
  data['@graph'][0].name = defaultMetadata.title;
  data['@graph'][0].description = defaultMetadata.description;
  data['@graph'][0].mainEntity['@id'] = `${pageUrl}#itemlist`;
  data['@graph'][0].breadcrumb['@id'] = `${pageUrl}#breadcrumb`;
  data['@graph'][1]['@id'] = `${pageUrl}#itemlist`;
  data['@graph'][1].numberOfItems = posts.length;
  data['@graph'][1]['itemListElement'] = posts.map((post, i) => ({
    '@type': 'ListItem',
    position: (pageIndexInt - 1) * POSTS_PER_PAGE + (i + 1),
    name: post.title,
    url: `${SITE_URL}/blogi/julkaisu/${post.slug}`,
  }));
  data['@graph'][2]['@id'] = `${pageUrl}#breadcrumb`;
  data['@graph'][2]['itemListElement'] = breadcrumbItems.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    ...(item.href && index !== breadcrumbItems.length - 1
      ? { item: `${SITE_URL}${item.href}` }
      : {}),
  }));

  const ldJSON = data;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ldJSON).replace(/</g, '\\u003c'),
        }}
      />

      {pageIndexInt > 1 ? <Breadcrumbs items={breadcrumbItems} /> : null}

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
