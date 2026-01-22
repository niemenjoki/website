import SafeLink from '@/components/SafeLink/SafeLink';

import classes from './PostPreview.module.css';

const PostPreview = ({ post, compact = false, overrideHref = false }) => {
  return (
    <div className={classes.PostPreview}>
      <h2 className={classes.Title}>
        <SafeLink
          href={
            overrideHref
              ? overrideHref
              : `/${post.altPath || `blogi/julkaisu`}/${post.slug}`
          }
        >
          {post.title}
        </SafeLink>
      </h2>
      <p className={classes.description}>{post.description}</p>
      <p className={classes.Tags}>
        {post.tags &&
          post.tags.map((tag) => (
            <SafeLink
              href={`/blogi/${tag.toLowerCase().replaceAll(' ', '-')}/sivu/1`}
              key={tag}
              className={classes.Tag}
            >
              {tag}
            </SafeLink>
          ))}
      </p>
      {!compact && (
        <SafeLink
          aria-label={`Avaa julkaisu ${post.title}`}
          href={
            overrideHref
              ? overrideHref
              : `/${post.altPath || `blogi/julkaisu`}/${post.slug}`
          }
        >
          <span>
            Lue lisää{' '}
            <span className={classes.Arrow}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </span>
        </SafeLink>
      )}
    </div>
  );
};

export default PostPreview;
