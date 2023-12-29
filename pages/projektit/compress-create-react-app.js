import Layout from '@/components/Layout';
import { COMPRESS_CRA_README } from '@/data/vars';
import hljs from 'highlight.js';
import { marked } from 'marked';

const CompressCreateReactAppPage = ({ content }) => {
  return (
    <Layout
      title={'compress-create-react-app | Joonas Niemenjoki'}
      language="fi"
      i18n={`https://niemenjoki.fi/projects/compress-create-react-app`}
    >
      <div className="md" dangerouslySetInnerHTML={{ __html: content }}></div>
    </Layout>
  );
};

export default CompressCreateReactAppPage;

const getStaticProps = async () => {
  const response = await fetch(COMPRESS_CRA_README);
  const content = await response.text();
  marked.setOptions({
    highlight: function (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-',
  });
  const htmlContent = marked(content);
  return {
    props: { content: htmlContent },
  };
};

export { getStaticProps };
