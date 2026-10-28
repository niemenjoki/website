import { MDXRemote } from 'next-mdx-remote/rsc';

import ArticleContents from '@/components/ArticleContents/ArticleContents';
import SocialShareButtons from '@/components/SocialShareButtons/SocialShareButtons';
import { extractArticleHeadings } from '@/lib/content/articleHeadings.mjs';

import AuthorCard from '../AuthorCard/AuthorCard';
import classes from './MdxArticlePage.module.css';

const MINIMUM_CONTENTS_HEADINGS = 3;

export default function MdxArticlePage({
  structuredData,
  title,
  dateContent,
  source,
  components = {},
  mdxOptions = {},
  preTitle = null,
  share = null,
}) {
  const headings = extractArticleHeadings(source);
  const hasContents = headings.length >= MINIMUM_CONTENTS_HEADINGS;

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
        <header className={classes.Header}>
          {preTitle}
          <h1>{title}</h1>
          <div className={classes.Date}>{dateContent}</div>
        </header>

        <div
          className={`${classes.ArticleGrid} ${!hasContents ? classes.ArticleGridWithoutContents : ''}`}
        >
          {hasContents ? <ArticleContents headings={headings} /> : null}
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
        </div>

        <footer className={classes.ArticleFooter}>
          {share ? (
            <SocialShareButtons title={share.title} tags={share.tags ?? []} />
          ) : null}
          <AuthorCard />
        </footer>
      </article>
    </>
  );
}
