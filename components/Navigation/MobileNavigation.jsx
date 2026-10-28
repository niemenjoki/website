'use client';

import { useEffect, useId, useRef, useState } from 'react';

import { usePathname } from 'next/navigation';

import SiteSearch from '@/components/SiteSearch/SiteSearch';
import ThemeToggler from '@/components/ThemeToggler/ThemeToggler';
import { ADSENSE_ENABLED } from '@/data/site/adsense';

import MobileDialog from './MobileDialog';
import classes from './MobileNavigation.module.css';
import NavigationAuxiliaryLink from './NavigationAuxiliaryLink';
import NavigationConsentButton from './NavigationConsentButton';
import NavigationIcon from './NavigationIcon';
import PrimaryNavigationLink from './PrimaryNavigationLink';
import { THEME_COPY } from './navigationCopy';

export default function MobileNavigation({
  activeId,
  labels,
  mobilePrimaryItems = [],
  primaryItems = [],
  searchItems = [],
  secondarySections = [],
}) {
  const pathname = usePathname();
  const searchTriggerRef = useRef(null);
  const moreTriggerRef = useRef(null);
  const [openDialog, setOpenDialog] = useState(null);
  const idPrefix = useId().replaceAll(':', '');
  const searchTitleId = `${idPrefix}-mobile-search-title`;
  const moreTitleId = `${idPrefix}-mobile-more-title`;
  const searchDialogId = `${idPrefix}-mobile-search-dialog`;
  const moreDialogId = `${idPrefix}-mobile-more-dialog`;
  const homeItem =
    primaryItems.find((item) => item.id === 'home') ?? primaryItems[0] ?? null;

  // Navigating to another page closes the open dialog.
  const [dialogPathname, setDialogPathname] = useState(pathname);
  if (dialogPathname !== pathname) {
    setDialogPathname(pathname);
    setOpenDialog(null);
  }

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia?.('(min-width: 961px)');
    const closeAtDesktopWidth = () => {
      if (mediaQuery?.matches) {
        setOpenDialog(null);
      }
    };

    mediaQuery?.addEventListener?.('change', closeAtDesktopWidth);
    return () => mediaQuery?.removeEventListener?.('change', closeAtDesktopWidth);
  }, []);

  const closeDialog = () => setOpenDialog(null);

  return (
    <div
      className={classes.MobileRoot}
      data-navigation-surface="mobile"
      data-open-navigation-dialog={openDialog ?? 'none'}
    >
      <header className={classes.TopRegion}>
        <div className={classes.TopBar}>
          {homeItem ? (
            <NavigationAuxiliaryLink item={homeItem} className={classes.BrandLink}>
              <span>Joonas Niemenjoki</span>
            </NavigationAuxiliaryLink>
          ) : null}

          <div className={classes.TopActions}>
            {searchItems.length ? (
              <button
                ref={searchTriggerRef}
                type="button"
                className={classes.ActionButton}
                aria-label={labels.openSearch}
                aria-expanded={openDialog === 'search'}
                aria-haspopup="dialog"
                aria-controls={searchDialogId}
                onClick={() => setOpenDialog('search')}
              >
                <NavigationIcon name="search" className={classes.ActionIcon} />
              </button>
            ) : null}
          </div>
        </div>
      </header>

      <nav className={classes.Dock} aria-label={labels.primaryNavigation}>
        <ul style={{ '--mobile-navigation-count': mobilePrimaryItems.length + 1 }}>
          {mobilePrimaryItems.map((item) => (
            <li key={item.id}>
              <PrimaryNavigationLink
                item={item}
                isActive={activeId === item.id}
                className={classes.DockLink}
                iconClassName={classes.DockIcon}
                labelClassName={classes.DockLabel}
              />
            </li>
          ))}
          <li>
            <button
              ref={moreTriggerRef}
              type="button"
              className={`${classes.DockLink} ${classes.DockButton}`}
              aria-label={labels.openMore}
              aria-expanded={openDialog === 'more'}
              aria-haspopup="dialog"
              aria-controls={moreDialogId}
              data-navigation-more-trigger="true"
              onClick={() => setOpenDialog('more')}
            >
              <NavigationIcon name="more" className={classes.DockIcon} />
              <span className={classes.DockLabel}>{labels.more}</span>
            </button>
          </li>
        </ul>
      </nav>

      {searchItems.length ? (
        <MobileDialog
          className={classes.Dialog}
          panelClassName={`${classes.DialogPanel} ${classes.SearchPanel}`}
          dataName="search"
          id={searchDialogId}
          isOpen={openDialog === 'search'}
          labelledBy={searchTitleId}
          onRequestClose={closeDialog}
          returnFocusRef={searchTriggerRef}
        >
          <div className={classes.DialogHeader}>
            <h2 id={searchTitleId}>{labels.searchTitle}</h2>
            <button type="button" className={classes.CloseButton} onClick={closeDialog}>
              <NavigationIcon name="close" className={classes.CloseIcon} />
              <span>{labels.close}</span>
            </button>
          </div>
          <div data-dialog-initial-focus>
            <SiteSearch
              searchItems={searchItems}
              variant="mobile"
              label={labels.searchLabel}
              clearLabel={labels.clearSearch}
              placeholder={labels.searchPlaceholder}
              resultLimit={8}
              autoFocus
              onNavigate={closeDialog}
            />
          </div>
        </MobileDialog>
      ) : null}

      <MobileDialog
        className={classes.Dialog}
        panelClassName={`${classes.DialogPanel} ${classes.MorePanel}`}
        dataName="more"
        id={moreDialogId}
        isOpen={openDialog === 'more'}
        labelledBy={moreTitleId}
        onRequestClose={closeDialog}
        returnFocusRef={moreTriggerRef}
      >
        <div className={classes.DialogHeader}>
          <div>
            <h2 id={moreTitleId}>{labels.more}</h2>
            <p className={classes.MoreDescription}>{labels.moreDescription}</p>
          </div>
          <button
            type="button"
            className={classes.CloseButton}
            data-dialog-initial-focus
            onClick={closeDialog}
          >
            <NavigationIcon name="close" className={classes.CloseIcon} />
            <span>{labels.close}</span>
          </button>
        </div>

        <div className={classes.SecondarySections}>
          {secondarySections.map((section, index) => (
            <section key={section.heading ?? `mobile-secondary-${index}`}>
              {section.heading ? <h3>{section.heading}</h3> : null}
              <ul>
                {section.items.map((item) => (
                  <li key={item.href}>
                    <NavigationAuxiliaryLink item={item} onNavigate={closeDialog} />
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className={classes.SettingsSection}>
            <h3>{labels.settings}</h3>
            <ul>
              <li>
                <div className={classes.SettingRow}>
                  <span>{labels.appearance}</span>
                  <ThemeToggler copy={THEME_COPY} />
                </div>
              </li>
              {ADSENSE_ENABLED ? (
                <li>
                  <NavigationConsentButton
                    className={classes.SettingButton}
                    failureMessage={labels.consentFailure}
                    label={labels.cookieSettings}
                    messageClassName={classes.SettingMessage}
                    onOpened={closeDialog}
                  />
                </li>
              ) : null}
            </ul>
          </section>
        </div>
      </MobileDialog>
    </div>
  );
}
