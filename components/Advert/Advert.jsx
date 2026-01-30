'use client';

import { useEffect, useRef, useState } from 'react';

import { usePathname } from 'next/navigation';

import classes from './Advert.module.css';

const Advert = ({ adClient, adSlot }) => {
  const pathname = usePathname();
  const adRef = useRef(null);
  const [hasAd, setHasAd] = useState(false);

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'development' ||
      !adClient?.startsWith('ca-pub-') ||
      !adSlot
    ) {
      return;
    }

    setHasAd(false);

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (e) {
      console.warn('AdSense push skipped:', e.message);
    }

    let attempts = 0;
    let cancelled = false;

    const checkStatus = () => {
      if (cancelled) return;

      const el = adRef.current;
      const status = el?.getAttribute('data-ad-status');

      if (status === 'filled') {
        setHasAd(true);
        return;
      }

      if (status === 'unfilled') {
        setHasAd(false);
        return;
      }

      if (attempts < 6) {
        attempts++;
        setTimeout(checkStatus, 350);
      }
    };

    setTimeout(checkStatus, 350);

    return () => {
      cancelled = true;
    };
  }, [pathname, adClient, adSlot]);

  if (!hasAd) return null;

  return (
    <div className={classes.AdBox} key={pathname}>
      <div className={classes.AdLabel}>Mainos</div>

      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default Advert;
