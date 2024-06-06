import Post from './Post';
import classes from '@/styles/PostRecommendation.module.css';

const PostRecommendation = ({ language, posts = [] }) => {
  if (!posts || posts.length === 0) return <></>;
  return (
    <div className={classes.PostRecommendation}>
      <h2>{language === 'fi' ? 'Muita julkaisuja' : 'Explore Other Posts'}</h2>
      {posts.map((post) => (
        <Post key={post.slug} post={post} compact={false} language={language} />
      ))}
    </div>
  );
};

export default PostRecommendation;
