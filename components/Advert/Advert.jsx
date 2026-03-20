'use client';

import { useEffect, useRef, useState } from 'react';

import { usePathname } from 'next/navigation';

import {
  ADSENSE_CLIENT,
  ADSENSE_DEFAULT_SLOT,
  ADSENSE_ENABLED,
} from '@/data/site/adsense';

import classes from './Advert.module.css';

const Advert = ({ adClient, adSlot }) => {
  const pathname = usePathname();
  const adRef = useRef(null);
  const [adStatus, setAdStatus] = useState('unknown');
  const resolvedAdClient = adClient ?? ADSENSE_CLIENT;
  const resolvedAdSlot = adSlot ?? ADSENSE_DEFAULT_SLOT;
  const isEnabled =
    ADSENSE_ENABLED &&
    process.env.NODE_ENV !== 'development' &&
    resolvedAdClient?.startsWith('ca-pub-') &&
    Boolean(resolvedAdSlot);

  useEffect(() => {
    if (!isEnabled) return;

    setAdStatus('unknown');
    let attempts = 0;
    let cancelled = false;
    let adRequested = false;

    const checkStatus = () => {
      if (cancelled) return;

      const el = adRef.current;
      const status = el?.getAttribute('data-ad-status');

      if (status === 'filled') {
        setAdStatus('filled');
        return;
      }

      if (status === 'unfilled') {
        setAdStatus('unfilled');
        return;
      }

      if (attempts < 6) {
        attempts++;
        setTimeout(checkStatus, 350);
      }
    };

    const requestAd = () => {
      if (
        adRequested ||
        window.__websiteAdSenseStatus !== 'ready' ||
        !window.__websiteAdsConsentGranted
      ) {
        return;
      }

      adRequested = true;

      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        setTimeout(checkStatus, 350);
      } catch (e) {
        console.warn('AdSense push skipped:', e.message);
      }
    };

    requestAd();
    window.addEventListener('website:adsense-ready', requestAd);
    window.addEventListener('website:ads-consent-granted', requestAd);

    return () => {
      cancelled = true;
      window.removeEventListener('website:adsense-ready', requestAd);
      window.removeEventListener('website:ads-consent-granted', requestAd);
    };
  }, [pathname, resolvedAdClient, resolvedAdSlot, isEnabled]);

  if (!isEnabled || adStatus === 'unfilled') return null;

  return (
    <div className={classes.AdBox} key={pathname}>
      {adStatus === 'filled' && <div className={classes.AdLabel}>Mainos</div>}

      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={resolvedAdClient}
        data-ad-slot={resolvedAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default Advert;
