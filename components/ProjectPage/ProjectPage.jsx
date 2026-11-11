import Image from 'next/image';

import Advert from '@/components/Advert/Advert';
import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import { getProjectBreadcrumbItems } from '@/lib/site/pageRecords.mjs';
import { createProjectStructuredData } from '@/lib/structuredData/createProjectStructuredData';

import classes from './ProjectPage.module.css';

// Shared frame of a project page: structured data, breadcrumbs, heading, badges and links come from
// data/pages/projects.js, and the page itself gives only the text.
export default function ProjectPage({ page, children }) {
  const breadcrumbItems = getProjectBreadcrumbItems(page);
  const structuredData = createProjectStructuredData({ page, breadcrumbItems });
  const badges = page.badges ?? [];
  const links = page.links ?? [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <div className={classes.ProjectPage}>
        <Breadcrumbs items={breadcrumbItems} />
        <h1>{page.shortLabel}</h1>

        {badges.length > 0 && (
          <div className={classes.Badges}>
            {badges.map((badge) => (
              <a
                key={badge.src}
                href={badge.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  unoptimized
                  src={badge.src}
                  alt={badge.alt}
                  loading="lazy"
                  width={120}
                  height={20}
                  style={{ width: 'auto', height: '20px' }}
                />
              </a>
            ))}
          </div>
        )}

        {children}

        {links.length > 0 && (
          <>
            <h2>Linkit</h2>
            <ul className={classes.Links}>
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    className="extlink"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <Advert />
    </>
  );
}
