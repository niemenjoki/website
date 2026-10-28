'use client';

import { useState } from 'react';

import { NAVIGATION_LABELS, THEME_COPY } from '@/components/Navigation/navigationCopy';
import SafeLink from '@/components/SafeLink/SafeLink';
import Socials from '@/components/Socials/Socials';
import ThemeToggler from '@/components/ThemeToggler/ThemeToggler';
import { ADSENSE_ENABLED } from '@/data/site/adsense';
import {
  LICENSE_URL,
  REPO_URL,
  SITE_COPYRIGHT_START_YEAR,
} from '@/data/site/constants.mjs';
import { openConsentPreferences } from '@/lib/site/consentPreferences';

import classes from './Footer.module.css';

// Rakenne Lieromaan alatunnisteen mukaan, ilman yritystietoja, kielivalintaa ja matoaiheita.
const OTHER_SITE = { label: 'Lieromaa.fi', href: 'https://www.lieromaa.fi' };

function FooterLinkList({ items }) {
  return (
    <ul>
      {items.map((link) => (
        <li key={`${link.href}-${link.label}`}>
          {link.external ? (
            <a href={link.href}>{link.label}</a>
          ) : (
            <SafeLink href={link.href}>{link.label}</SafeLink>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Footer({ navigation }) {
  const startYear = SITE_COPYRIGHT_START_YEAR;
  const currentYear = new Date().getFullYear();
  const yearRange =
    currentYear === startYear ? `${startYear}` : `${startYear}-${currentYear}`;
  const [consentMessage, setConsentMessage] = useState('');

  const handleConsentSettingsClick = () => {
    setConsentMessage(openConsentPreferences() ? '' : NAVIGATION_LABELS.consentFailure);
  };

  return (
    <footer className={classes.Footer}>
      <div className={classes.Inner}>
        <section className={classes.RootHeader} aria-labelledby="footer-site-title">
          <div className={classes.BrandBlock}>
            <p className={classes.Eyebrow}>Rakennusautomaatio / energia</p>
            <h2 id="footer-site-title">Joonas Niemenjoki</h2>
            <p className={classes.Description}>
              Kokemuksia ja käytännön ohjeita rakennusautomaatiosta, lämpöpumpuista ja
              energiasta.
            </p>
          </div>

          <div className={classes.RootActions}>
            <div className={classes.Socials}>
              <span className={classes.SocialLabel}>Seuraa</span>
              <Socials />
            </div>
          </div>
        </section>

        <nav className={classes.DesktopIndex} aria-label="Sivukartta">
          {navigation.footerColumns.map((column, index) => (
            <section key={column.heading} className={classes.IndexColumn}>
              <h3>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                {column.heading}
              </h3>
              <FooterLinkList items={column.items} />
            </section>
          ))}
        </nav>

        <nav className={classes.MobileIndex} aria-label="Sivukartta">
          {navigation.footerColumns.map((column, index) => (
            <section key={column.heading} className={classes.MobileDirectGroup}>
              <div className={classes.MobileDirectHeading}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{column.heading}</h3>
                <span className={classes.GroupCount} aria-hidden="true">
                  {column.items.length}
                </span>
              </div>
              <FooterLinkList items={column.items} />
            </section>
          ))}
        </nav>

        <p className={classes.OtherSite}>
          Toinen sivustoni: <a href={OTHER_SITE.href}>{OTHER_SITE.label}</a>
        </p>

        <div className={classes.Bottom}>
          <p>&copy; {yearRange} Joonas Niemenjoki</p>
          <div className={classes.SafeLinks}>
            {ADSENSE_ENABLED ? (
              <>
                <button
                  type="button"
                  className={classes.LinkButton}
                  onClick={handleConsentSettingsClick}
                >
                  Muuta evästeasetuksia
                </button>
                <span aria-hidden="true"> / </span>
              </>
            ) : null}
            <span className={classes.AppearanceUtility}>
              <span>{NAVIGATION_LABELS.appearance}</span>
              <ThemeToggler copy={THEME_COPY} />
            </span>
            <span aria-hidden="true"> / </span>
            <a href={LICENSE_URL} target="_blank" rel="noopener noreferrer">
              Lisenssi
            </a>
            <span aria-hidden="true"> / </span>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
              Lähdekoodi
            </a>
          </div>
          {consentMessage ? (
            <p className={classes.ConsentMessage} role="status" aria-live="polite">
              {consentMessage}
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
