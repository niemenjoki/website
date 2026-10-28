'use client';

import SafeLink from '@/components/SafeLink/SafeLink';

import NavigationIcon from './NavigationIcon';

export default function PrimaryNavigationLink({
  children,
  isActive = false,
  item,
  className,
  iconClassName,
  labelClassName,
  onClick,
}) {
  return (
    <SafeLink
      href={item.href}
      className={className}
      aria-current={isActive ? 'page' : undefined}
      data-primary-navigation-id={item.id}
      data-navigation-active={isActive ? 'true' : 'false'}
      onClick={onClick}
    >
      {children ?? (
        <>
          <NavigationIcon name={item.icon} className={iconClassName} />
          <span className={labelClassName}>{item.label}</span>
        </>
      )}
    </SafeLink>
  );
}
