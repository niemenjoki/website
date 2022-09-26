import Link from 'next/link';

import classes from '@/styles/Post.module.css';

const Post = ({ post, compact = false, language }) => {
  const blogInLanguage = language === 'en' ? 'blog' : 'blogi';
  const postInLanguage = language === 'en' ? 'post' : 'julkaisu';
  const pageInLanguage = language === 'en' ? 'page' : 'sivu';
  if (typeof post.tags === 'string') {
    post.tags = post.tags.split(',').map((tag) => tag.trim());
  }

  return (
    <div className={classes.Post}>
      <h2 className={classes.Title}>
        <Link
          href={`/${post.altPath || `${blogInLanguage}/${postInLanguage}`}/${
            post.slug
          }`}
        >
          <a>{post.title}</a>
        </Link>
      </h2>
      <p className={classes.Excerpt}>{post.excerpt}</p>
      <p className={classes.Tags}>
        {post.tags &&
          post.tags.map((tag) => (
            <Link
              href={`/${blogInLanguage}/${tag.toLowerCase()}/${pageInLanguage}/1`}
              key={tag}
            >
              <a className={classes.Tag}>{tag}</a>
            </Link>
          ))}
      </p>
      {!compact && (
        <Link
          href={`/${post.altPath || `${blogInLanguage}/${postInLanguage}`}/${
            post.slug
          }`}
        >
          <a
            aria-label={`${language === 'en' ? 'Open post' : 'Avaa julkaisu'} ${
              post.title
            }`}
          >
            <h3>
              {language === 'en' ? 'Read more' : 'Lue lisää'}{' '}
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
