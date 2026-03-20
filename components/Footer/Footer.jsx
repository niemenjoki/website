'use client';

import SafeLink from '@/components/SafeLink/SafeLink';
import Socials from '@/components/Socials/Socials';
import {
  LICENSE_URL,
  REPO_URL,
  SITE_COPYRIGHT_START_YEAR,
} from '@/data/site/constants.mjs';

import classes from './Footer.module.css';

export default function Footer({ navigation }) {
  const startYear = SITE_COPYRIGHT_START_YEAR;
  const currentYear = new Date().getFullYear();
  const yearRange =
    currentYear === startYear ? `${startYear}` : `${startYear}–${currentYear}`;

  return (
    <footer className={classes.Footer}>
      <div className={classes.Inner}>
        <div className={classes.Columns}>
          {navigation.footerColumns.map((column) => (
            <div key={column.heading}>
              <h3>{column.heading}</h3>
              <ul>
                {column.items.map((link) => (
                  <li key={link.href}>
                    <SafeLink href={link.href}>{link.label}</SafeLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={classes.Socials}>
            <h3>Seuraa</h3>
            <Socials />
          </div>
        </div>

        <div className={classes.Bottom}>
          <p>&copy; {yearRange} Joonas Niemenjoki</p>
          <p className={classes.SafeLinks}>
            <a href={LICENSE_URL} target="_blank" rel="noopener noreferrer">
              Lisenssi
            </a>
            {' | '}
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
              Lähdekoodi
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
