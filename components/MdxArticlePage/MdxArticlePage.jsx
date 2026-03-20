import { MDXRemote } from 'next-mdx-remote/rsc';

import AuthorCard from '../AuthorCard/AuthorCard';
import classes from './MdxArticlePage.module.css';

export default function MdxArticlePage({
  structuredData,
  title,
  dateContent,
  source,
  components = {},
  mdxOptions = {},
  preTitle = null,
}) {
  return (
    <>
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
      ) : null}

      <article className={classes.Article}>
        {preTitle}
        <h1>{title}</h1>
        <div className={classes.Date}>{dateContent}</div>

        <div className={`${classes.Content} md`}>
          <MDXRemote
            source={source}
            components={components}
            options={{
              blockJS: false,
              ...mdxOptions,
            }}
          />
        </div>

        <AuthorCard />
      </article>
    </>
  );
}
