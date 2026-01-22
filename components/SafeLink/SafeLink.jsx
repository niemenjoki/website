'use client';

import React from 'react';

import Link from 'next/link';

import safeLinks from '@/data/generated/safeRoutes.json';

function isSafeHref(href) {
  return safeLinks.includes(decodeURIComponent(href));
}

export default function SafeLink({ href, children, ...props }) {
  if (typeof href !== 'string') {
    throw new Error(`SafeLink: href must be a string, got ${typeof href}`);
  }

  if (!isSafeHref(href)) {
    console.warn('SafeLink component temporarily disabled! ENABLE BEFORE PUSH');
    //throw new Error(`🚫 Unsafe link blocked: "${decodeURIComponent(href)}"`);
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
