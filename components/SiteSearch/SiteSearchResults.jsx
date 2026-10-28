import SafeLink from '@/components/SafeLink/SafeLink';

import classes from './SiteSearch.module.css';

const RESULT_GROUPS = Object.freeze([
  Object.freeze({ key: 'posts', label: 'Julkaisut', types: ['post'] }),
  Object.freeze({ key: 'pages', label: 'Muut sivut', types: ['page'] }),
]);

function groupResults(results) {
  const groupsByKey = new Map(
    RESULT_GROUPS.map((group) => [group.key, { ...group, results: [] }])
  );

  results.forEach((result) => {
    const configuredGroup = RESULT_GROUPS.find((group) =>
      group.types.includes(result.type)
    );
    const groupKey = configuredGroup?.key ?? 'pages';
    groupsByKey.get(groupKey).results.push(result);
  });

  return Array.from(groupsByKey.values()).filter((group) => group.results.length > 0);
}

export default function SiteSearchResults({
  emptyMessage = 'Ei tuloksia.',
  headingLevel = 2,
  idPrefix = 'site-search-result-group',
  onNavigate,
  results = [],
}) {
  if (!results.length) {
    return <p className={classes.Empty}>{emptyMessage}</p>;
  }

  const groups = groupResults(results);
  const GroupHeading = headingLevel === 3 ? 'h3' : 'h2';

  return (
    <div className={classes.ResultsGroups}>
      {groups.map((group) => {
        const headingId = `${idPrefix}-${group.key}`;
        const resultCountLabel = `${group.results.length} ${
          group.results.length === 1 ? 'tulos' : 'tulosta'
        }`;

        return (
          <section
            key={group.key}
            className={classes.ResultGroup}
            aria-labelledby={headingId}
          >
            <GroupHeading id={headingId} className={classes.ResultGroupHeading}>
              <span>{group.label}</span>
              <span className={classes.ResultGroupCount} aria-label={resultCountLabel}>
                {String(group.results.length).padStart(2, '0')}
              </span>
            </GroupHeading>
            <ul className={classes.ResultsList}>
              {group.results.map((result) => (
                <li key={result.id} className={classes.ResultItem}>
                  <SafeLink
                    href={result.href}
                    className={classes.ResultLink}
                    onClick={onNavigate}
                  >
                    {result.section ? (
                      <span className={classes.ResultMeta}>{result.section}</span>
                    ) : null}
                    <span className={classes.ResultTitle}>{result.title}</span>
                    {result.description ? (
                      <span className={classes.ResultDescription}>
                        {result.description}
                      </span>
                    ) : null}
                  </SafeLink>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
