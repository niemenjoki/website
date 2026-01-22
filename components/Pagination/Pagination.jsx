import SafeLink from '@/components/SafeLink/SafeLink';

import classes from './Pagination.module.css';

const Pagination = ({ numPages, currentPage, basePath }) => {
  const total = Number(numPages) || 1;
  const page = Number(currentPage) || 1;

  if (total === 1) return null;

  const isFirst = page === 1;
  const isLast = page === total;

  const pagePath = (pageNumber) =>
    pageNumber === 1 ? `${basePath}/sivu/1` : `${basePath}/sivu/${pageNumber}`;

  const previousPage = pagePath(page - 1);
  const nextPage = pagePath(page + 1);

  return (
    <>
      <div className={classes.Pagination} aria-label="pagination">
        <ul>
          {!isFirst && (
            <li key="previous">
              <SafeLink href={previousPage} className={classes.TextButton}>
                Edellinen
              </SafeLink>
            </li>
          )}

          {Array.from({ length: total }, (_, i) => {
            const pageNumber = i + 1;
            const isActive = pageNumber === page;

            return (
              <li key={pageNumber}>
                <SafeLink
                  href={pagePath(pageNumber)}
                  className={`${classes.NumberButton} ${
                    isActive ? classes.ActiveButton : ''
                  }`}
                >
                  {pageNumber}
                </SafeLink>
              </li>
            );
          })}

          {!isLast && (
            <li key="next">
              <SafeLink href={nextPage} className={classes.TextButton}>
                Seuraava
              </SafeLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Pagination;
