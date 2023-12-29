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

const BlogTagPage = ({ posts, numPages, currentPage, tag, tags }) => {
  return (
    <Layout title={'Blogi | Joonas Niemenjoki'} language="fi">
      <h1>Julkaisut avainsanalla &quot;{tag}&quot;</h1>
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
            <Link href={`/blog/${tag.toLowerCase()}/page/1`} key={tag}>
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
export default BlogTagPage;

const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts', 'fi'));
  const groupedPosts = {};
  files
    .filter((filename) => filename.substring(0, 5) !== 'draft')
    .forEach((filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join('posts', 'fi', filename),
        'utf-8'
      );

      const { data } = extractFrontMatter(markdownWithMeta);
      const tags = data.tags.split(',').map((tag) => tag.trim().toLowerCase());
      tags.forEach((tag) => {
        if (!groupedPosts[tag]) groupedPosts[tag] = [];
        groupedPosts[tag].push(filename);
      });
    });

  const paths = [];

  Object.keys(groupedPosts).forEach((tag) => {
    const numPages = Math.ceil(groupedPosts[tag].length / POSTS_PER_PAGE);
    for (let i = 1; i <= numPages; i++) {
      paths.push({ params: { pageIndex: i.toString(), tag } });
    }
  });

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

  const postsForTag = posts.filter((post) => {
    const tags = post.tags.split(',').map((tag) => tag.trim().toLowerCase());
    return tags.includes(params.tag);
  });
  const numPages = Math.ceil(postsForTag.length / POSTS_PER_PAGE);
  const pageIndex = currentPage - 1;
  const pagePosts = postsForTag.slice(
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
      tag: params.tag,
      tags: uniqueTags,
    },
  };
};

export { getStaticPaths, getStaticProps };
