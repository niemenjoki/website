'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const isDev =
  process.env.NODE_ENV === 'development' ||
  (typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname.startsWith('192.168.') ||
      window.location.hostname === '127.0.0.1'));

export default function AnalyticsWrapper() {
  if (isDev) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
