import {
  ANALYTICS_OPT_OUT_COOKIE,
  ANALYTICS_OPT_OUT_PATH,
} from '@/lib/analytics/optOut.js';

// Looku settings shared by the proxy (page views) and the not-found page (missing pages). The receiver address and keys
// come from the environment variables LOOKU_ENDPOINT, LOOKU_SITE_ID and LOOKU_SIGNING_KEY. Only production sends data.
// The owner's browser is left out with the opt-out cookie.
export const LOOKU_OPTIONS = {
  excludePaths: ['/k3v9q7t2', ANALYTICS_OPT_OUT_PATH],
  optOutCookie: ANALYTICS_OPT_OUT_COOKIE,
};
