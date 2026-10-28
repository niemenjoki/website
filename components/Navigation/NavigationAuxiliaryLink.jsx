'use client';

import SafeLink from '@/components/SafeLink/SafeLink';

export default function NavigationAuxiliaryLink({
  item,
  badgeClassName,
  children,
  className,
  isCurrent = false,
  onNavigate,
}) {
  const content = children ?? (
    <>
      {item.label}
      {item.badge ? <span className={badgeClassName}>{item.badge}</span> : null}
    </>
  );

  const handleClick = (event) => {
    onNavigate?.(event);
  };

  if (item.external || /^(?:mailto:|https?:)/.test(item.href)) {
    return (
      <a className={className} href={item.href} onClick={onNavigate}>
        {content}
      </a>
    );
  }

  return (
    <SafeLink
      href={item.href}
      lang={item.lang}
      className={className}
      aria-current={isCurrent ? 'page' : undefined}
      onClick={handleClick}
    >
      {content}
    </SafeLink>
  );
}
