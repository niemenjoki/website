import Link from 'next/link';

import classes from '@/styles/Post.module.css';

const Post = ({ post, compact = false }) => {
  if (typeof post.tags === 'string') {
    post.tags = post.tags.split(',').map((tag) => tag.trim());
  }

  return (
    <div className={classes.Post}>
      <h2 className={classes.Title}>
        <Link href={`/${post.altPath || 'blog/post'}/${post.slug}`}>
          <a>{post.title}</a>
        </Link>
      </h2>
      <p className={classes.Excerpt}>{post.excerpt}</p>
      <p className={classes.Tags}>
        {post.tags &&
          post.tags.map((tag) => (
            <Link href={`/blog/${tag.toLowerCase()}/page/1`} key={tag}>
              <a className={classes.Tag}>{tag}</a>
            </Link>
          ))}
      </p>
      {!compact && (
        <Link href={`/${post.altPath || 'blog/post'}/${post.slug}`}>
          <a aria-label={`Open post ${post.title}`}>
            <h3>
              Read more{' '}
              <span className={classes.Arrow}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </h3>
          </a>
        </Link>
      )}
    </div>
  );
};

export default Post;
