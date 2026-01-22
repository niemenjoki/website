'use client';

import SafeLink from '@/components/SafeLink/SafeLink';
import Socials from '@/components/Socials/Socials';
import { LICENSE_URL, REPO_URL } from '@/data/vars.mjs';

import classes from './Footer.module.css';

export default function Footer() {
  const startYear = 2025;
  const currentYear = new Date().getFullYear();
  const yearRange =
    currentYear === startYear ? `${startYear}` : `${startYear}–${currentYear}`;

  return (
    <footer className={classes.Footer}>
      <div className={classes.Inner}>
        <div className={classes.Columns}>
          <div>
            <h3>Blogi</h3>
            <ul>
              <li>
                <SafeLink href="/blogi">Viimeisimmät julkaisut</SafeLink>
              </li>
            </ul>
          </div>

          <div>
            <h3>Projektit</h3>
            <ul>
              <li>
                <SafeLink href="/projektit/compress-create-react-app">
                  compress-create-react-app
                </SafeLink>
              </li>
              <li>
                <SafeLink href="/projektit/lieromaa">Lieromaa</SafeLink>
              </li>
            </ul>
          </div>

          <div>
            <h3>Muut sivut</h3>
            <ul>
              <li>
                <SafeLink href="/tietoa">Tietoa sivustosta</SafeLink>
              </li>
              <li>
                <SafeLink href="/tietosuoja">Tietosuoja</SafeLink>
              </li>
            </ul>
          </div>

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
