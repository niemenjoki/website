import Link from 'next/link';

import Advert from '@/components/Advert/Advert';
import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import {
  getProjectsIndexBreadcrumbItems,
  projectListingGroups,
  projectsIndexPage,
} from '@/lib/site/pageRecords.mjs';
import { createProjectsIndexStructuredData } from '@/lib/structuredData/createProjectsIndexStructuredData';

import classes from './Projects.module.css';

export function generateMetadata() {
  return createPageMetadata(projectsIndexPage.metadata);
}

export default function ProjectsPage() {
  const breadcrumbItems = getProjectsIndexBreadcrumbItems();
  const structuredData = createProjectsIndexStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <div className={classes.ProjectsPage}>
        <Breadcrumbs items={breadcrumbItems} />
        <h1>{projectsIndexPage.shortLabel}</h1>
        <p>
          Tälle sivulle on koottu projektini. Suurin osa on ilmaisia avoimen lähdekoodin
          ohjelmia, jotka liittyvät kotiautomaatioon, verkkosivustoihin ja verkkokauppaan.
          Lieromaa on matokompostoinnin sivuprojektini, ja sen sivustolla on käytössä
          useampi näistä ohjelmista.
        </p>

        {projectListingGroups.map((group) => (
          <section key={group.id} className={classes.Group}>
            <h2>{group.heading}</h2>
            {group.pages.map((page) => (
              <Link
                key={page.canonicalUrl}
                href={page.canonicalUrl}
                className={classes.Card}
              >
                <span className={classes.CardHeader}>
                  <span className={classes.CardTitle}>{page.shortLabel}</span>
                  <span className={classes.TypeLabel}>{page.listing.typeLabel}</span>
                </span>
                <span className={classes.Summary}>{page.listing.summary}</span>
              </Link>
            ))}
          </section>
        ))}
      </div>

      <Advert />
    </>
  );
}
