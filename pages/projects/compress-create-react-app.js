import Layout from '@/components/Layout';
import { marked } from 'marked';
import hljs from 'highlight.js';
import URLS from '../../data/urls';

const CompressCreateReactAppPage = ({ contentMarkdown }) => {
  marked.setOptions({
    highlight: function (code, lang) {
      return hljs.highlight(code, { language: 'javascript' }).value;
    },
  });
  return (
    <Layout>
      <div
        className="md"
        dangerouslySetInnerHTML={{ __html: marked(contentMarkdown) }}
      ></div>
    </Layout>
  );
};

export default CompressCreateReactAppPage;

const getStaticProps = async () => {
  const response = await fetch(URLS.COMPRESS_CRA_README);
  const contentMarkdown = await response.text();
  return {
    props: { contentMarkdown },
  };
};

export { getStaticProps };
