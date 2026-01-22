'use client';

import React from 'react';

import Link from 'next/link';

export default function Breadcrumbs({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.25rem',
    fontSize: '0.95rem',
    marginBottom: '1rem',
    color: 'var(--highlight)',
  };

  const linkStyle = {
    textDecoration: 'underline',
  };

  const separatorStyle = { margin: '0 0.3rem', opacity: 0.6 };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <nav style={containerStyle} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {item.href && !isLast ? (
              <Link href={item.href} style={linkStyle}>
                {capitalize(item.name)}
              </Link>
            ) : (
              <span style={{ fontWeight: isLast ? 600 : 400 }}>
                {capitalize(item.name)}
              </span>
            )}
            {!isLast && <span style={separatorStyle}>›</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
