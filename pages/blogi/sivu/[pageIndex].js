import Advert from '@/components/Advert';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import Post from '@/components/Post.js';
import SearchPosts from '@/components/SearchPosts';
import { POSTS_PER_PAGE } from '@/data/vars.js';
import classes from '@/styles/PostPage.module.css';
import extractFrontMatter from '@/utils/extractFrontMatter';
import { sortByDate } from '@/utils/index.js';
import fs from 'fs';
import Link from 'next/link';
import path from 'path';

const BlogPage = ({ posts, numPages, currentPage, tags }) => {
  return (
    <Layout
      title={'Blogi | Joonas Jokinen'}
      canonical={
        currentPage === 1 && [
          `https://joonasjokinen.fi/blogi`,
          `https://joonasjokinen.fi/`,
          `https://joonasjokinen.fi/blogi/sivu/${currentPage}`,
        ]
      }
      i18n="https://joonasjokinen.fi/en"
      language="fi"
    >
      <h1>Viimeisimmät julkaisut</h1>
      <SearchPosts
        list={posts}
        keys={['title', 'excerpt', 'keywords', 'tags']}
        placeholder="Etsi julkaisun nimellä tai avainsanalla.."
        language="fi"
      />
      <div className={classes.Taglist}>
        {tags
          .sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1))
          .map((tag) => (
            <Link href={`/blogi/${tag.toLowerCase()}/sivu/1`} key={tag}>
              <a className={classes.Tag}>{tag}</a>
            </Link>
          ))}
      </div>
      {posts
        .filter((post) => post.onPage === true)
        .map((post, index) => (
          <Post key={index} post={post} />
        ))}
      <Pagination numPages={numPages} currentPage={currentPage} />
      <Advert language="fi" />
    </Layout>
  );
};

export default BlogPage;

const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts', 'fi'));
  const filesWithoutDrafts = files.filter(
    (filename) => filename.substring(0, 5) !== 'draft'
  );
  const numPages = Math.ceil(filesWithoutDrafts.length / POSTS_PER_PAGE);

  const paths = [];
  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { pageIndex: i.toString() },
    });
  }

  return { paths, fallback: false };
};

const getStaticProps = async ({ params }) => {
  const currentPage = parseInt((params && params.pageIndex) || 1);
  const files = fs.readdirSync(path.join('posts', 'fi'));
  const posts = files
    .map((filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join('posts', 'fi', filename),
        'utf-8'
      );
      const { data, content } = extractFrontMatter(markdownWithMeta);
      const slug = filename.replace('.md', '');

      return {
        slug,
        ...data,
        content,
      };
    })
    .sort(sortByDate)
    .map((post) => {
      delete post.date;
      delete post.content;
      return post;
    });

  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pageIndex = currentPage - 1;
  const pagePosts = posts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );

  posts.forEach((post) => {
    const postOnPageIndex = pagePosts.findIndex((pagePost) => {
      return post.slug === pagePost.slug;
    });

    if (postOnPageIndex !== -1) {
      pagePosts[postOnPageIndex].onPage = true;
    } else {
      const postForSearch = { ...post };
      postForSearch.onPage = false;
      pagePosts.push(postForSearch);
    }
  });

  const uniqueTags = [
    ...new Set(
      posts
        .map((post) => post.tags)
        .join(',')
        .split(',')
    ),
  ];

  return {
    props: {
      posts: pagePosts,
      numPages,
      currentPage,
      tags: uniqueTags,
    },
  };
};

export { getStaticPaths, getStaticProps };
