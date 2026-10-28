export const projectPageDefinitions = {
  compressCreateReactApp: {
    canonicalUrl: '/projektit/compress-create-react-app',
    pageType: 'ItemPage',
    pageIdSuffix: '#itempage',
    pageName: 'compress-create-react-app työkalu | Joonas Niemenjoki',
    title: 'compress-create-react-app työkalu | Joonas Niemenjoki',
    description:
      'compress-create-react-app pakkaa Create React App -sivustojen tiedostot valmiiksi palvelinta varten. Projekti on vanhentunut, eikä sitä enää ylläpidetä.',
    updatedAt: '2026-10-21',
    navigationLabel: 'compress-create-react-app',
    shortLabel: 'compress-create-react-app',
    search: {
      contexts: ['notFound'],
      keywords: ['compress-create-react-app', 'create react app', 'pakkaus', 'react'],
      tags: ['projekti', 'react'],
    },
    mainEntity: {
      idSuffix: '#sourcecode',
      node: {
        '@type': 'SoftwareSourceCode',
        name: 'compress-create-react-app',
        description:
          'Avoimen lähdekoodin työkalu Create React App -projektien tiedostojen pakkaamiseen. Ei enää ylläpidetä.',
        url: 'https://www.npmjs.com/package/compress-create-react-app',
        license: 'https://opensource.org/licenses/MIT',
        creativeWorkStatus: 'Deprecated',
        codeRepository: 'https://github.com/niemenjoki/compress-create-react-app',
      },
    },
  },
  lieromaa: {
    canonicalUrl: '/projektit/lieromaa',
    updatedAt: '2026-03-20',
    pageType: 'ItemPage',
    pageIdSuffix: '#itempage',
    pageName: 'Lieromaa-sivuprojekti | Joonas Niemenjoki projekti',
    title: 'Lieromaa-sivuprojekti | Joonas Niemenjoki projekti',
    description:
      'Lieromaa on sivuprojektini, joka keskittyy matokompostointiin, kompostimatoihin ja käytännönläheiseen kestävään arkeen.',
    image: {
      url: '/images/kompostimadot_kammenella.avif',
      alt: 'Valokuva kompostimadoista kädellä',
    },
    navigationLabel: 'Lieromaa',
    shortLabel: 'Lieromaa',
    search: {
      contexts: ['notFound'],
      keywords: ['lieromaa', 'matokompostointi', 'kompostimadot', 'projekti'],
      tags: ['projekti', 'lieromaa'],
    },
    mainEntity: {
      idSuffix: '#project',
      node: {
        '@type': 'Project',
        name: 'Lieromaa',
        description:
          'Lieromaa on sivuprojekti, jossa julkaisen sisältöä matokompostoinnista, autan alkuun ja myyn kompostimatoja.',
        url: 'https://www.lieromaa.fi/',
        image: '/images/kompostimadot_kammenella.avif',
      },
    },
  },
  rauToolsNotice: {
    canonicalUrl: '/projektit/rau-tyokalut',
    pageName: 'RAU-työkalut poistettu julkiselta sivustolta | Joonas',
    title: 'RAU-työkalut poistettu julkiselta sivustolta | Joonas',
    description:
      'RAU-työkalut on poistettu julkiselta sivustolta. Tällä sivulla kerrotaan poistosta, ja vanhat työkalulinkit ohjataan pysyvästi tänne.',
    navigationLabel: 'RAU-työkalut',
    shortLabel: 'RAU-työkalut',
  },
};

export const primaryProjectOrder = ['compressCreateReactApp', 'lieromaa'];
