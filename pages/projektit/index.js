import Advert from '@/components/Advert';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import projects from '../../data/projects';

const ProjectsPage = () => {
  return (
    <Layout
      title={'Projektit | Joonas Niemenjoki'}
      language="fi"
      i18n={`https://niemenjoki.fi/projects`}
    >
      <h1>Projektit</h1>
      {projects.fi.map((project, index) => (
        <Post key={index} post={project} language="fi" />
      ))}
      <Advert language="fi" />
    </Layout>
  );
};

export default ProjectsPage;
