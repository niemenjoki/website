'use client';

import { usePathname } from 'next/navigation';

import { findActiveNavigationItem } from '@/lib/navigation/activeRoute.mjs';

import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import classes from './NavigationShell.module.css';
import { NAVIGATION_LABELS } from './navigationCopy';

// Rakenne ja toiminta Lieromaan navigaation mukaan, ilman matoefektejä ja kauppaa.
function selectNavigationItems(primaryItems, ids) {
  if (!Array.isArray(ids) || ids.length === 0) {
    return primaryItems;
  }

  const itemsById = new Map(primaryItems.map((item) => [item.id, item]));
  return ids.map((id) => itemsById.get(id)).filter(Boolean);
}

export default function NavigationShell({ navigation = {}, searchItems = [] }) {
  const pathname = usePathname();
  const primaryItems = navigation.primaryItems ?? [];
  const activeId = findActiveNavigationItem(primaryItems, pathname)?.id ?? null;
  const secondarySections = navigation.secondarySections ?? [];

  return (
    <div
      className={classes.Shell}
      data-navigation-shell="true"
      data-navigation-active-id={activeId ?? ''}
    >
      <DesktopNavigation
        activeId={activeId}
        labels={NAVIGATION_LABELS}
        primaryItems={primaryItems}
        desktopPrimaryItems={selectNavigationItems(
          primaryItems,
          navigation.desktopPrimaryIds
        )}
        searchItems={searchItems}
        secondarySections={secondarySections}
      />
      <MobileNavigation
        activeId={activeId}
        labels={NAVIGATION_LABELS}
        primaryItems={primaryItems}
        mobilePrimaryItems={selectNavigationItems(primaryItems, navigation.mobileDockIds)}
        searchItems={searchItems}
        secondarySections={secondarySections}
      />
    </div>
  );
}
