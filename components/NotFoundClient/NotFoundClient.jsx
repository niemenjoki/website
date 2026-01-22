'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import Fuse from 'fuse.js';

import Post from '@/components/PostPreview/PostPreview';
import SafeLink from '@/components/SafeLink/SafeLink';

import classes from './NotFoundClient.module.css';

export default function ClientNotFoundPage({ content }) {
  const pathname = usePathname();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!pathname || !content?.length) return;

    const fuse = new Fuse(content, {
      includeScore: true,
      minMatchCharLength: 3,
      findAllMatches: true,
      ignoreLocation: true,
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'description', weight: 0.2 },
        { name: 'keywords', weight: 0.1 },
        { name: 'tags', weight: 0.1 },
        { name: 'slug', weight: 0.9 },
      ],
    });

    const query = pathname.replace(/^\//, '');
    const matches = fuse
      .search(query)
      .filter((r) => r.score < 0.6)
      .slice(0, 3)
      .map((r) => r.item);

    setResults(matches);
  }, [pathname, content]);

  return (
    <>
      <div className={classes.Oops}>Hups!</div>
      <h1 className={classes.NotFoundPage}>
        Näyttää siltä, että etsimääsi sivua ei ole olemassa
      </h1>

      {results.length > 0 && (
        <>
          <div className={classes.Suggestion}>Ehkä tarkoitit yhtä näistä:</div>
          <div className={classes.Results}>
            {results.map((post, i) => (
              <Post key={i} post={post} compact overrideHref={post.overrideHref} />
            ))}
          </div>
        </>
      )}

      <div className={classes.LinkWrapper}>
        <SafeLink href="/blogi">Viimeisimmät blogijulkaisut</SafeLink>
      </div>
    </>
  );
}
