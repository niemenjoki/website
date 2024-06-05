import Advert from '@/components/Advert';
import Layout from '@/components/Layout';
import PostRecommendation from '@/components/PostRecommendation';
import SocialShareButtons from '@/components/SocialShareButtons';
import classes from '@/styles/PostPage.module.css';
import extractFrontMatter from '@/utils/extractFrontMatter';
import fs from 'fs';
import hljs from 'highlight.js';
import { marked } from 'marked';
import path from 'path';
import getPostRecommendations from '@/utils/getPostRecommendations';

const PostPage = ({ data, content, recommendedPosts }) => {
  const { title, date, tags, excerpt, i18n } = data;
  return (
    <Layout
      title={title + ' | Joonas Niemenjoki'}
      ads={true}
      description={excerpt}
      language="en"
      i18n={i18n}
    >
      <article className={classes.PostPage}>
        <h1>{title}</h1>
        <div className={classes.Date}>Published: {date}</div>
        <div
          className={classes.Content}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </article>
      <SocialShareButtons
        title={title}
        text={excerpt}
        tags={tags}
        language="en"
      />
      <Advert language="en" />
      <PostRecommendation language="en" posts={recommendedPosts} />
    </Layout>
  );
};

export default PostPage;
const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts', 'en'));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));
  return { paths, fallback: false };
};

const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', 'en', slug + '.md'),
    'utf-8'
  );

  const { data, content } = extractFrontMatter(markdownWithMeta);

  const recommendedPosts = await getPostRecommendations({
    self: slug,
    keywords: data.keywords + ',' + data.tags,
    lang: 'en',
  });

  marked.setOptions({
    highlight: function (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-',
  });
  const htmlContent = marked(content);
  return {
    props: { data, content: htmlContent, recommendedPosts },
  };
};

export { getStaticPaths, getStaticProps };
