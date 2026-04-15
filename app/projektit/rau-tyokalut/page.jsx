import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import SafeLink from '@/components/SafeLink/SafeLink';

import classes from './RauToolsPage.module.css';

export const metadata = {
  title: 'RAU-tyokalut on poistettu | Joonas Niemenjoki',
  description:
    'RAU-tyokalut on poistettu pysyvästi julkiselta sivustolta, ja vanhat työkalulinkit ohjataan tälle sivulle.',
};

export default function RauToolsRemovedPage() {
  const breadcrumbItems = [{ name: 'Etusivu', href: '/' }, { name: 'RAU-tyokalut' }];

  return (
    <div className={classes.Page}>
      <Breadcrumbs items={breadcrumbItems} />
      <h1>RAU-tyokalut on poistettu</h1>
      <div className={classes.RemovedBox}>
        <p className={classes.Lead}>
          RAU-työkalut on poistettu tältä sivustolta työnantajan pyynnöstä.
        </p>
      </div>
    </div>
  );
}
