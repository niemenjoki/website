import Head from 'next/head';
import Link from 'next/link';

import classes from '@/styles/Pagination.module.css';

const Pagination = ({ numPages, currentPage, language }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const languageSpecificBase = `${
    language === 'en' ? '/blog/page/' : '/blogi/sivu/'
  }`;
  const previousPage = `${languageSpecificBase}${currentPage - 1}`;
  const nextPage = `${languageSpecificBase}${currentPage + 1}`;

  if (numPages === 1) {
    return <></>;
  }
  return (
    <>
      <Head>
        {!isFirst && (
          <link rel="prev" href={'https://niemenjoki.fi' + previousPage} />
        )}
        {!isLast && (
          <link rel="next" href={'https://niemenjoki.fi' + nextPage} />
        )}
      </Head>
      <div className={classes.Pagination}>
        <ul>
          {!isFirst && (
            <li key={'previous'}>
              <Link href={previousPage} className={classes.TextButton}>
                {language === 'en' ? 'Previous' : 'Edellinen'}
              </Link>
            </li>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <li key={i}>
              <Link
                href={`${languageSpecificBase}${i + 1}`}
                className={classes.NumberButton}
              >
                {i + 1}
              </Link>
            </li>
          ))}
          {!isLast && (
            <li key={'next'}>
              <Link href={nextPage} className={classes.TextButton}>
                {language === 'en' ? 'Next' : 'Seuraava'}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Pagination;
