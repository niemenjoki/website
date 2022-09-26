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
    <div className={classes.Pagination}>
      <ul>
        {!isFirst && (
          <li key={'previous'}>
            <Link href={previousPage}>
              <a className={classes.TextButton}>
                {language === 'en' ? 'Previous' : 'Edellinen'}
              </a>
            </Link>
          </li>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <li key={i}>
            <Link href={`${languageSpecificBase}${i + 1}`}>
              <a className={classes.NumberButton}>{i + 1}</a>
            </Link>
          </li>
        ))}
        {!isLast && (
          <li key={'next'}>
            <Link href={nextPage}>
              <a className={classes.TextButton}>
                {language === 'en' ? 'Next' : 'Seuraava'}
              </a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
