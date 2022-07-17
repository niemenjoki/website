import Link from 'next/link';

import classes from '@/styles/Pagination.module.css';

const Pagination = ({ numPages, currentPage }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const previousPage = `/blog/page/${currentPage - 1}`;
  const nextPage = `/blog/page/${currentPage + 1}`;

  if (numPages === 1) {
    return <></>;
  }
  return (
    <div className={classes.Pagination}>
      <ul>
        {!isFirst && (
          <li key={'previous'}>
            <Link href={previousPage}>
              <a className={classes.TextButton}>Previous</a>
            </Link>
          </li>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <li key={i}>
            <Link href={`/blog/page/${i + 1}`}>
              <a className={classes.NumberButton}>{i + 1}</a>
            </Link>
          </li>
        ))}
        {!isLast && (
          <li key={'next'}>
            <Link href={nextPage}>
              <a className={classes.TextButton}>Next</a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
