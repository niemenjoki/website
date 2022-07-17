import Layout from '@/components/Layout';
import Post from '@/components/Post';
import Advert from '@/components/Advert';
import projects from '../../data/projects';

const ProjectsPage = () => {
  return (
    <Layout title={'Projects | Joonas Jokinen'}>
      <h1>My Projects</h1>
      {projects.map((project, index) => (
        <Post key={index} post={project} />
      ))}
      <Advert />
    </Layout>
  );
};

export default ProjectsPage;
