'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

const Advert = ({ adClient, adSlot }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'development' ||
      !adClient ||
      !adClient.startsWith('ca-pub-') ||
      !adSlot
    ) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (e) {
      console.warn('AdSense push skipped:', e.message);
    }
  }, [pathname, adClient, adSlot]);

  if (!adClient || !adClient.startsWith('ca-pub-') || !adSlot) return null;

  return (
    <div style={{ background: '#ffffff07', marginTop: '1rem' }} key={pathname}>
      <div>Mainos</div>
      <ins
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
