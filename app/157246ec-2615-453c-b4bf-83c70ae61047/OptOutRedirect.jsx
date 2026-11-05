'use client';

import { useEffect } from 'react';

import { ANALYTICS_OPT_OUT_COOKIE } from '@/lib/analytics/optOut';

export default function OptOutRedirect() {
  useEffect(() => {
    // Page views are counted on the server, so the opt-out has to be a cookie that every page request carries.
    const { name, value } = ANALYTICS_OPT_OUT_COOKIE;
    document.cookie = `${name}=${value}; Max-Age=63072000; Path=/; SameSite=Lax; Secure`;
    globalThis.location.replace('/');
  }, []);

  return null;
}
