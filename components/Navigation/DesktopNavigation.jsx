'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { usePathname } from 'next/navigation';

import SiteSearch from '@/components/SiteSearch/SiteSearch';
import ThemeToggler from '@/components/ThemeToggler/ThemeToggler';

import classes from './DesktopNavigation.module.css';
import DesktopNavigationTray from './DesktopNavigationTray';
import PrimaryNavigationLink from './PrimaryNavigationLink';
import { THEME_COPY } from './navigationCopy';

export default function DesktopNavigation({
  activeId,
  desktopPrimaryItems = [],
  labels,
  primaryItems = [],
  searchItems,
  secondarySections = [],
}) {
  const pathname = usePathname();
  const secondaryTriggerRef = useRef(null);
  const [openTray, setOpenTray] = useState(null);
  const idPrefix = useId().replaceAll(':', '');
  const secondaryTrayId = `${idPrefix}-secondary-tray`;
  const homeItem =
    primaryItems.find((item) => item.id === 'home') ?? primaryItems[0] ?? null;

  const closeTray = useCallback((restoreFocus = false) => {
    setOpenTray(null);

    if (restoreFocus) {
      globalThis.requestAnimationFrame?.(() => secondaryTriggerRef.current?.focus());
    }
  }, []);

  // Navigating to another page closes the open tray.
  const [trayPathname, setTrayPathname] = useState(pathname);
  if (trayPathname !== pathname) {
    setTrayPathname(pathname);
    setOpenTray(null);
  }

  useEffect(() => {
    if (!openTray) {
      return undefined;
    }

    const isInsideTray = (target) =>
      document.getElementById(secondaryTrayId)?.contains(target) ||
      secondaryTriggerRef.current?.contains(target);
    const handlePointerDown = (event) => {
      if (!isInsideTray(event.target)) {
        closeTray(false);
      }
    };
    const handleFocusIn = (event) => {
      if (!isInsideTray(event.target)) {
        closeTray(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeTray(true);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeTray, openTray, secondaryTrayId]);

  useEffect(() => {
    if (openTray !== 'secondary') {
      return undefined;
    }

    const frameId = globalThis.requestAnimationFrame?.(() => {
      document
        .getElementById(secondaryTrayId)
        ?.querySelector('a, input, button')
        ?.focus();
    });

    return () => globalThis.cancelAnimationFrame?.(frameId);
  }, [openTray, secondaryTrayId]);

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia?.('(max-width: 960px)');
    const closeAtMobileWidth = () => {
      if (mediaQuery?.matches) {
        setOpenTray(null);
      }
    };

    mediaQuery?.addEventListener?.('change', closeAtMobileWidth);
    return () => mediaQuery?.removeEventListener?.('change', closeAtMobileWidth);
  }, []);

  return (
    <header
      className={classes.DesktopRoot}
      data-navigation-surface="desktop"
      data-open-navigation-tray={openTray ?? 'none'}
    >
      <div className={classes.CommandBand}>
        <div className={classes.CommandBar}>
          {homeItem ? (
            <PrimaryNavigationLink
              item={homeItem}
              isActive={activeId === homeItem.id}
              className={classes.BrandLink}
            >
              <span className={classes.BrandText}>Joonas Niemenjoki</span>
            </PrimaryNavigationLink>
          ) : null}

          <nav
            className={classes.PrimaryNavigation}
            aria-label={labels.primaryNavigation}
          >
            <ul>
              {desktopPrimaryItems.map((item) => (
                <li key={item.id} className={classes.PrimaryItem}>
                  <PrimaryNavigationLink
                    item={item}
                    isActive={activeId === item.id}
                    className={classes.PrimaryLink}
                    iconClassName={classes.PrimaryIcon}
                    labelClassName={classes.PrimaryLabel}
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div className={classes.Utilities}>
            {searchItems?.length ? (
              <SiteSearch
                searchItems={searchItems}
                variant="navbar"
                label={labels.searchLabel}
                clearLabel={labels.clearSearch}
                resultLimit={5}
              />
            ) : null}
            <ThemeToggler copy={THEME_COPY} />
            <button
              ref={secondaryTriggerRef}
              id={`${idPrefix}-secondary-trigger`}
              type="button"
              className={classes.SecondaryToggle}
              aria-expanded={openTray === 'secondary'}
              aria-controls={secondaryTrayId}
              onClick={() =>
                setOpenTray((current) => (current === 'secondary' ? null : 'secondary'))
              }
            >
              {labels.more}
            </button>
          </div>
        </div>
      </div>

      {openTray === 'secondary' ? (
        <DesktopNavigationTray
          id={secondaryTrayId}
          labelledBy={`${idPrefix}-secondary-trigger`}
          secondarySections={secondarySections}
          labels={labels}
          onNavigate={() => closeTray(false)}
        />
      ) : null}
    </header>
  );
}
