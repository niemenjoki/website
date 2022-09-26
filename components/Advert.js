import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Advert = ({ language }) => {
  const router = useRouter();
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [router.asPath]);

  return (
    <div
      style={{ background: '#ffffff07', marginTop: '1rem' }}
      key={router.asPath}
    >
      <div>{language === 'en' ? 'Advertisement' : 'Mainos'}</div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8064636821608705"
        data-ad-slot="8885189702"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default Advert;
