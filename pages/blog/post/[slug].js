import fs from 'fs';
import path from 'path';
import extractFrontMatter from '@/utils/extractFrontMatter';
import { marked } from 'marked';
import classes from '@/styles/PostPage.module.css';
import Layout from '@/components/Layout';
import hljs from 'highlight.js';
import Advert from '@/components/Advert';
import SocialShareButtons from '@/components/SocialShareButtons';

const PostPage = ({ data, content }) => {
  const { title, date, tags, excerpt } = data;
  return (
    <Layout
      title={title + ' | Joonas Jokinen'}
      ads={true}
      description={excerpt}
    >
      <article className={classes.PostPage}>
        <h1>{title}</h1>
        <div className={classes.Date}>Published: {date}</div>
        <div
          className={classes.Content}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </article>
      <SocialShareButtons title={title} text={excerpt} tags={tags} />
      <Advert />
    </Layout>
  );
};

export default PostPage;
const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));
  return { paths, fallback: false };
};

const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  );

  const { data, content } = extractFrontMatter(markdownWithMeta);
  marked.setOptions({
    highlight: function (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-',
  });
  const htmlContent = marked(content);
  return {
    props: { data, content: htmlContent },
  };
};

export { getStaticPaths, getStaticProps };
