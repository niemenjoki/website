import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';

import classes from './RauToolsPage.module.css';

export const metadata = {
  title: 'RAU-työkalut on poistettu | Joonas Niemenjoki',
  description:
    'RAU-työkalut on poistettu pysyvästi julkiselta sivustolta, ja vanhat työkalulinkit ohjataan tälle sivulle.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RauToolsRemovedPage() {
  const breadcrumbItems = [{ name: 'Etusivu', href: '/' }, { name: 'RAU-työkalut' }];

  return (
    <div className={classes.Page}>
      <Breadcrumbs items={breadcrumbItems} />
      <h1>RAU-työkalut on poistettu</h1>
      <div className={classes.RemovedBox}>
        <p className={classes.Lead}>
          RAU-työkalut on poistettu tältä sivustolta työnantajan pyynnöstä.
        </p>
      </div>
    </div>
  );
}
