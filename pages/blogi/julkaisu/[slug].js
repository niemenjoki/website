import Advert from '@/components/Advert';
import Layout from '@/components/Layout';
import SocialShareButtons from '@/components/SocialShareButtons';
import classes from '@/styles/PostPage.module.css';
import extractFrontMatter from '@/utils/extractFrontMatter';
import fs from 'fs';
import hljs from 'highlight.js';
import { marked } from 'marked';
import path from 'path';

const PostPage = ({ data, content }) => {
  const { title, date, tags, excerpt, i18n } = data;
  return (
    <Layout
      title={title + ' | Joonas Niemenjoki'}
      ads={true}
      description={excerpt}
      language="fi"
      i18n={i18n}
    >
      <article className={classes.PostPage}>
        <h1>{title}</h1>
        <div className={classes.Date}>
          Julkaistu: {new Date(date).toLocaleDateString()}
        </div>
        <div
          className={classes.Content}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </article>
      <SocialShareButtons
        title={title}
        text={excerpt}
        tags={tags}
        language="fi"
      />
      <Advert language="fi" />
    </Layout>
  );
};

export default PostPage;
const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts', 'fi'));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));
  return { paths, fallback: false };
};

const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', 'fi', slug + '.md'),
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
