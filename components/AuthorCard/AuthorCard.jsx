import { SITE_AUTHOR } from '@/data/site/author';
import { aboutPage, blogIndexPage } from '@/lib/site/pageRecords.mjs';
import portrait from '@/public/images/portrait2024.avif';

import SafeImage from '../SafeImage/SafeImage';
import SafeLink from '../SafeLink/SafeLink';
import classes from './AuthorCard.module.css';

export default function AuthorCard({ includeBlogLink = true }) {
  return (
    <div className={classes.AuthorBox}>
      <SafeImage
        src={portrait}
        alt={SITE_AUTHOR.portraitAlt}
        width={90}
        height={90}
        placeholder="blur"
      />
      <div className={classes.AuthorInfo}>
        <p className={classes.AuthorHeading}>
          <strong>Kirjoittaja:</strong> {SITE_AUTHOR.name}
        </p>
        {SITE_AUTHOR.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>
          <a href={SITE_AUTHOR.linkedInUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>{' '}
          • <SafeLink href={aboutPage.canonicalUrl}>Lisätietoa</SafeLink>
          {includeBlogLink ? (
            <>
              {' '}
              • <SafeLink href={blogIndexPage.canonicalUrl}>Kaikki julkaisut</SafeLink>
            </>
          ) : null}
        </p>
      </div>
    </div>
  );
}
