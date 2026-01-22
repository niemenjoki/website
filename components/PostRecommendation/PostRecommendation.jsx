import Post from '../PostPreview/PostPreview';
import classes from './PostRecommendation.module.css';

const PostRecommendation = ({ posts = [], customTitle }) => {
  if (!posts || posts.length === 0) return <></>;
  return (
    <div className={classes.PostRecommendation}>
      <h2>{customTitle ? customTitle : 'Muita julkaisuja'}</h2>
      {posts.map((post) => (
        <Post key={post.slug} post={post} compact={false} />
      ))}
    </div>
  );
};

export default PostRecommendation;
