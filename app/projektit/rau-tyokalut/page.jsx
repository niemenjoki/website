import Advert from '@/components/Advert/Advert';
import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import SafeLink from '@/components/SafeLink/SafeLink';
import { rauToolPages, rauToolsPage } from '@/lib/site/pageRecords.mjs';
import { createCollectionStructuredData } from '@/lib/structuredData/createCollectionStructuredData.mjs';

import classes from './RauToolsPage.module.css';

export { default as generateMetadata } from './generateMetadata';

export default function RauToolsPage() {
  const breadcrumbItems = [
    { name: 'Etusivu', href: '/' },
    { name: rauToolsPage.shortLabel },
  ];
  const structuredData = createCollectionStructuredData({
    pageUrl: rauToolsPage.pageUrl,
    pageName: rauToolsPage.title,
    description: rauToolsPage.description,
    itemListName: rauToolsPage.mainEntityName,
    itemListElement: rauToolPages.map((page, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: page.shortLabel,
      url: page.pageUrl,
    })),
    breadcrumbItems,
    includeAuthor: true,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <div className={classes.Page}>
        <Breadcrumbs items={breadcrumbItems} />
        <h1>{rauToolsPage.shortLabel}</h1>
        <p className={classes.Lead}>
          Tähän osioon kokoan rakennusautomaation sekalaisia aputyökaluja. Työkalut on
          tarkoitettu lähtökohtaisesti Fidelix-järjestelmien käyttäjille.
        </p>
        <div className={classes.ToolCatalog}>
          {rauToolPages.map((page) => (
            <SafeLink
              className={classes.ToolCard}
              href={page.canonicalUrl}
              key={page.pageId}
            >
              <div className={classes.CardHeading}>
                <h2 className={classes.CardTitle}>{page.shortLabel}</h2>
                {page.isBeta ? <span className={classes.BetaBadge}>beta</span> : null}
              </div>
              <p className={classes.CardDescription}>
                {page.cardDescription ?? page.description}
              </p>
              <p className={classes.CardMeta}>
                Avaa työkalu{' '}
                <span className={classes.Arrow}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </p>
            </SafeLink>
          ))}
        </div>
      </div>

      <Advert />
    </>
  );
}
