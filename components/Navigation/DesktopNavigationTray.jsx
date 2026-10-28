'use client';

import ThemeToggler from '@/components/ThemeToggler/ThemeToggler';
import { ADSENSE_ENABLED } from '@/data/site/adsense';

import classes from './DesktopNavigation.module.css';
import NavigationAuxiliaryLink from './NavigationAuxiliaryLink';
import NavigationConsentButton from './NavigationConsentButton';
import { THEME_COPY } from './navigationCopy';

export default function DesktopNavigationTray({
  id,
  labelledBy,
  labels,
  onNavigate,
  secondarySections = [],
}) {
  return (
    <section
      id={id}
      className={`${classes.Tray} ${classes.SecondaryTray}`}
      aria-labelledby={labelledBy}
      data-navigation-tray="secondary"
    >
      <div className={classes.SecondaryGrid}>
        {secondarySections.map((section, index) => (
          <section key={section.heading ?? `secondary-${index}`}>
            {section.heading ? <h2>{section.heading}</h2> : null}
            <ul>
              {section.items.map((item) => (
                <li key={item.href}>
                  <NavigationAuxiliaryLink item={item} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className={classes.DesktopSettings}>
          <h2>{labels.settings}</h2>
          <ul>
            <li className={classes.DesktopSettingRow}>
              <span>{labels.appearance}</span>
              <ThemeToggler copy={THEME_COPY} />
            </li>
            {ADSENSE_ENABLED ? (
              <li>
                <NavigationConsentButton
                  className={classes.DesktopSettingButton}
                  failureMessage={labels.consentFailure}
                  label={labels.cookieSettings}
                  messageClassName={classes.DesktopSettingMessage}
                  onOpened={onNavigate}
                />
              </li>
            ) : null}
          </ul>
        </section>
      </div>
    </section>
  );
}
