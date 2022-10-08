import Advert from '@/components/Advert';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import projects from '../../data/projects';

const ProjectsPage = () => {
  return (
    <Layout title={'Projects | Joonas Jokinen'} language="en" i18n={`https://joonasjokinen.fi/projektit`}>
      <h1>My Projects</h1>
      {projects.en.map((project, index) => (
        <Post key={index} post={project} language="en" />
      ))}
      <Advert language="en" />
    </Layout>
  );
};

export default ProjectsPage;
