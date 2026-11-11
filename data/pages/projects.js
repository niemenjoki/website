// Shields badges update themselves. ProjectPage shows them as they are, without the image optimizer.
function createBadge(href, path, alt) {
  return { href, src: `https://img.shields.io/${path}.svg`, alt };
}

export const projectsIndexDefinition = {
  canonicalUrl: '/projektit',
  pageType: 'CollectionPage',
  pageIdSuffix: '#collectionpage',
  pageName: 'Projektit: avoin lähdekoodi ja Lieromaa | Joonas Niemenjoki',
  title: 'Projektit: avoin lähdekoodi ja Lieromaa | Joonas Niemenjoki',
  description:
    'Projektini: kävijätilastot omalle palvelimelle, Home Assistant -integraatiot, ohjelmointikirjastot verkkokaupoille ja matokompostoinnin sivuprojekti Lieromaa.',
  updatedAt: '2026-11-12',
  navigationLabel: 'Kaikki projektit',
  shortLabel: 'Projektit',
  search: {
    contexts: ['notFound'],
    keywords: ['projektit', 'avoin lähdekoodi', 'home assistant', 'looku', 'lieromaa'],
    tags: ['projekti'],
  },
};

export const projectGroups = [
  { id: 'openSource', heading: 'Avoin lähdekoodi' },
  { id: 'sideProjects', heading: 'Sivuprojektit' },
  { id: 'archived', heading: 'Ei enää ylläpidetä' },
];

export const projectPageDefinitions = {
  looku: {
    canonicalUrl: '/projektit/looku',
    pageType: 'ItemPage',
    pageIdSuffix: '#itempage',
    pageName: 'Looku, palvelinpuolen verkkoanalytiikka | Joonas Niemenjoki',
    title: 'Looku, palvelinpuolen verkkoanalytiikka | Joonas Niemenjoki',
    description:
      'Looku kertoo, mitkä sivut kiinnostavat ja mistä lukijat tulevat. Tiedot pysyvät omalla palvelimella, eikä kävijän laitteelle tallenneta mitään.',
    updatedAt: '2026-11-12',
    navigationLabel: 'Looku',
    shortLabel: 'Looku',
    listing: {
      group: 'openSource',
      typeLabel: 'Verkkoanalytiikka',
      summary:
        'Kävijätilastot omalle palvelimelle. Kävijän laitteelle ei tallenneta mitään, eikä tietoja lähetetä ulkopuoliseen palveluun.',
    },
    badges: [
      createBadge(
        'https://github.com/niemenjoki/looku/releases',
        'github/v/release/niemenjoki/looku',
        'Uusin versio'
      ),
      createBadge(
        'https://github.com/niemenjoki/looku/blob/main/LICENSE',
        'github/license/niemenjoki/looku',
        'Lisenssi'
      ),
    ],
    links: [
      { href: 'https://niemenjoki.github.io/looku/fi/', label: 'Ohjeet suomeksi' },
      {
        href: 'https://niemenjoki.github.io/looku/demo/',
        label: 'Demo keksityllä datalla',
      },
      { href: 'https://github.com/niemenjoki/looku', label: 'Lähdekoodi GitHubissa' },
    ],
    search: {
      contexts: ['notFound'],
      keywords: [
        'looku',
        'verkkoanalytiikka',
        'kävijätilastot',
        'analytiikka',
        'tietosuoja',
      ],
      tags: ['projekti', 'analytiikka'],
    },
    mainEntity: {
      idSuffix: '#sourcecode',
      node: {
        '@type': 'SoftwareSourceCode',
        name: 'Looku',
        description:
          'Avoimen lähdekoodin palvelinpuolen verkkoanalytiikka, joka tallentaa tiedot yhteen SQLite-tiedostoon omalla palvelimella.',
        url: 'https://niemenjoki.github.io/looku/',
        license: 'https://www.gnu.org/licenses/agpl-3.0.html',
        codeRepository: 'https://github.com/niemenjoki/looku',
        programmingLanguage: 'JavaScript',
      },
    },
  },
  haLooku: {
    canonicalUrl: '/projektit/ha-looku',
    pageType: 'ItemPage',
    pageIdSuffix: '#itempage',
    pageName: 'ha-looku, Lookun luvut Home Assistantiin | Joonas Niemenjoki',
    title: 'ha-looku, Lookun luvut Home Assistantiin | Joonas Niemenjoki',
    description:
      'ha-looku tuo Lookun kävijätilastot ja verkkokaupan tilaukset Home Assistantiin, jossa niitä voi seurata kodin muiden tietojen kanssa ja käyttää automaatioissa.',
    updatedAt: '2026-11-12',
    navigationLabel: 'ha-looku',
    shortLabel: 'ha-looku',
    listing: {
      group: 'openSource',
      typeLabel: 'Home Assistant -integraatio',
      summary: 'Lookun kävijätilastot ja verkkokaupan tilaukset Home Assistantiin.',
    },
    badges: [
      createBadge(
        'https://github.com/niemenjoki/ha-looku/releases',
        'github/v/release/niemenjoki/ha-looku',
        'Uusin versio'
      ),
      createBadge(
        'https://github.com/niemenjoki/ha-looku',
        'badge/HACS-Custom-41BDF5',
        'HACS: oma tietovarasto'
      ),
      createBadge(
        'https://github.com/niemenjoki/ha-looku/blob/main/LICENSE',
        'github/license/niemenjoki/ha-looku',
        'Lisenssi'
      ),
    ],
    links: [
      {
        href: 'https://niemenjoki.github.io/looku/fi/guides/home-assistant/',
        label: 'Asennusohje suomeksi',
      },
      { href: 'https://github.com/niemenjoki/ha-looku', label: 'Lähdekoodi GitHubissa' },
    ],
    search: {
      contexts: ['notFound'],
      keywords: ['ha-looku', 'looku', 'home assistant', 'hacs', 'kävijätilastot'],
      tags: ['projekti', 'home assistant'],
    },
    mainEntity: {
      idSuffix: '#sourcecode',
      node: {
        '@type': 'SoftwareSourceCode',
        name: 'ha-looku',
        description:
          'Avoimen lähdekoodin Home Assistant -integraatio, joka tuo Lookun verkkoanalytiikan luvut antureiksi.',
        url: 'https://github.com/niemenjoki/ha-looku',
        license: 'https://opensource.org/licenses/MIT',
        codeRepository: 'https://github.com/niemenjoki/ha-looku',
        programmingLanguage: 'Python',
        runtimePlatform: 'Home Assistant',
      },
    },
  },
  haKryptex: {
    canonicalUrl: '/projektit/ha-kryptex',
    pageType: 'ItemPage',
    pageIdSuffix: '#itempage',
    pageName: 'ha-kryptex, louhinta Home Assistantiin | Joonas Niemenjoki',
    title: 'ha-kryptex, louhinta Home Assistantiin | Joonas Niemenjoki',
    description:
      'ha-kryptex tuo Kryptex-louhinnan Home Assistantiin. Tuottoa ja laitteita voi seurata, ja louhinnan voi keskeyttää automaattisesti, kun sähkö on kallista.',
    updatedAt: '2026-11-12',
    navigationLabel: 'ha-kryptex',
    shortLabel: 'ha-kryptex',
    listing: {
      group: 'openSource',
      typeLabel: 'Home Assistant -integraatio',
      summary:
        'Kryptex-louhinta Home Assistantiin: tuotto, laitteet ja louhinnan ohjaus sähkön hinnan mukaan.',
    },
    badges: [
      createBadge(
        'https://github.com/niemenjoki/ha-kryptex/releases',
        'github/v/release/niemenjoki/ha-kryptex',
        'Uusin versio'
      ),
      createBadge(
        'https://github.com/niemenjoki/ha-kryptex',
        'badge/HACS-Default-41BDF5',
        'HACS: oletuslista'
      ),
      createBadge(
        'https://github.com/niemenjoki/ha-kryptex/blob/main/LICENSE',
        'github/license/niemenjoki/ha-kryptex',
        'Lisenssi'
      ),
    ],
    links: [
      {
        href: 'https://github.com/niemenjoki/ha-kryptex',
        label: 'Asennusohje ja lähdekoodi GitHubissa',
      },
    ],
    search: {
      contexts: ['notFound'],
      keywords: ['ha-kryptex', 'kryptex', 'louhinta', 'home assistant', 'pörssisähkö'],
      tags: ['projekti', 'home assistant'],
    },
    mainEntity: {
      idSuffix: '#sourcecode',
      node: {
        '@type': 'SoftwareSourceCode',
        name: 'ha-kryptex',
        description:
          'Avoimen lähdekoodin Home Assistant -integraatio Kryptex-louhinnan seurantaan ja ohjaukseen.',
        url: 'https://github.com/niemenjoki/ha-kryptex',
        license: 'https://opensource.org/licenses/MIT',
        codeRepository: 'https://github.com/niemenjoki/ha-kryptex',
        programmingLanguage: 'Python',
        runtimePlatform: 'Home Assistant',
      },
    },
  },
  fiInvoicePaymentSlip: {
    canonicalUrl: '/projektit/fi-invoice-payment-slip',
    pageType: 'ItemPage',
    pageIdSuffix: '#itempage',
    pageName: 'fi-invoice-payment-slip, laskun maksuosa | Joonas Niemenjoki',
    title: 'fi-invoice-payment-slip, laskun maksuosa | Joonas Niemenjoki',
    description:
      'fi-invoice-payment-slip lisää laskuun suomalaisen tilisiirtolomakkeen viitenumeroineen ja pankkiviivakoodeineen. Ilmainen ohjelmointikirjasto.',
    updatedAt: '2026-11-12',
    navigationLabel: 'fi-invoice-payment-slip',
    shortLabel: 'fi-invoice-payment-slip',
    listing: {
      group: 'openSource',
      typeLabel: 'Ohjelmointikirjasto',
      summary:
        'Suomalainen tilisiirtolomake viitenumeroineen ja pankkiviivakoodeineen ohjelmallisesti tehtyyn laskuun.',
    },
    badges: [
      createBadge(
        'https://www.npmjs.com/package/@niemenjoki/fi-invoice-payment-slip',
        'npm/v/@niemenjoki/fi-invoice-payment-slip',
        'npm-versio'
      ),
      createBadge(
        'https://www.npmjs.com/package/@niemenjoki/fi-invoice-payment-slip',
        'npm/dm/@niemenjoki/fi-invoice-payment-slip',
        'Lataukset kuukaudessa'
      ),
      createBadge(
        'https://github.com/niemenjoki/fi-invoice-payment-slip/blob/main/LICENSE',
        'npm/l/@niemenjoki/fi-invoice-payment-slip',
        'Lisenssi'
      ),
    ],
    links: [
      {
        href: 'https://github.com/niemenjoki/fi-invoice-payment-slip/blob/main/README.fi.md',
        label: 'Ohje suomeksi GitHubissa',
      },
      {
        href: 'https://www.npmjs.com/package/@niemenjoki/fi-invoice-payment-slip',
        label: 'Kirjasto npm:ssä',
      },
    ],
    search: {
      contexts: ['notFound'],
      keywords: [
        'fi-invoice-payment-slip',
        'tilisiirtolomake',
        'viitenumero',
        'pankkiviivakoodi',
        'lasku',
      ],
      tags: ['projekti', 'npm'],
    },
    mainEntity: {
      idSuffix: '#sourcecode',
      node: {
        '@type': 'SoftwareSourceCode',
        name: 'fi-invoice-payment-slip',
        description:
          'Avoimen lähdekoodin npm-paketti, joka piirtää suomalaisen tilisiirtolomakkeen PDFKitillä tehtyyn laskuun.',
        url: 'https://www.npmjs.com/package/@niemenjoki/fi-invoice-payment-slip',
        license: 'https://opensource.org/licenses/MIT',
        codeRepository: 'https://github.com/niemenjoki/fi-invoice-payment-slip',
        programmingLanguage: 'JavaScript',
        runtimePlatform: 'Node.js',
      },
    },
  },
  postiPickupPoints: {
    canonicalUrl: '/projektit/posti-pickup-points',
    pageType: 'ItemPage',
    pageIdSuffix: '#itempage',
    pageName: 'posti-pickup-points, Postin noutopisteet | Joonas Niemenjoki',
    title: 'posti-pickup-points, Postin noutopisteet | Joonas Niemenjoki',
    description:
      'posti-pickup-points hakee Postin noutopisteet ja pakettiautomaatit postinumeron perusteella verkkokaupan kassalle. Ilmainen ohjelmointikirjasto.',
    updatedAt: '2026-11-12',
    navigationLabel: 'posti-pickup-points',
    shortLabel: 'posti-pickup-points',
    listing: {
      group: 'openSource',
      typeLabel: 'Ohjelmointikirjasto',
      summary:
        'Postin noutopisteet ja pakettiautomaatit verkkokaupan kassalle postinumeron perusteella.',
    },
    badges: [
      createBadge(
        'https://www.npmjs.com/package/@niemenjoki/posti-pickup-points',
        'npm/v/@niemenjoki/posti-pickup-points',
        'npm-versio'
      ),
      createBadge(
        'https://www.npmjs.com/package/@niemenjoki/posti-pickup-points',
        'npm/dm/@niemenjoki/posti-pickup-points',
        'Lataukset kuukaudessa'
      ),
      createBadge(
        'https://github.com/niemenjoki/posti-pickup-points/blob/main/LICENSE',
        'npm/l/@niemenjoki/posti-pickup-points',
        'Lisenssi'
      ),
    ],
    links: [
      {
        href: 'https://github.com/niemenjoki/posti-pickup-points/blob/main/README.fi.md',
        label: 'Ohje suomeksi GitHubissa',
      },
      {
        href: 'https://www.npmjs.com/package/@niemenjoki/posti-pickup-points',
        label: 'Kirjasto npm:ssä',
      },
    ],
    search: {
      contexts: ['notFound'],
      keywords: [
        'posti-pickup-points',
        'posti',
        'noutopiste',
        'pakettiautomaatti',
        'verkkokauppa',
      ],
      tags: ['projekti', 'npm'],
    },
    mainEntity: {
      idSuffix: '#sourcecode',
      node: {
        '@type': 'SoftwareSourceCode',
        name: 'posti-pickup-points',
        description:
          'Avoimen lähdekoodin npm-paketti Postin noutopisteiden ja pakettiautomaattien hakuun postinumeron perusteella.',
        url: 'https://www.npmjs.com/package/@niemenjoki/posti-pickup-points',
        license: 'https://opensource.org/licenses/MIT',
        codeRepository: 'https://github.com/niemenjoki/posti-pickup-points',
        programmingLanguage: 'JavaScript',
        runtimePlatform: 'Node.js',
      },
    },
  },
  compressCreateReactApp: {
    canonicalUrl: '/projektit/compress-create-react-app',
    pageType: 'ItemPage',
    pageIdSuffix: '#itempage',
    pageName: 'compress-create-react-app työkalu | Joonas Niemenjoki',
    title: 'compress-create-react-app työkalu | Joonas Niemenjoki',
    description:
      'compress-create-react-app pakkaa Create React App -sivustojen tiedostot valmiiksi palvelinta varten. Projekti on vanhentunut, eikä sitä enää ylläpidetä.',
    updatedAt: '2026-11-12',
    navigationLabel: 'compress-create-react-app',
    shortLabel: 'compress-create-react-app',
    listing: {
      group: 'archived',
      typeLabel: 'Ohjelmointityökalu',
      summary:
        'Vanha työkalu verkkosivujen tiedostojen pakkaamiseen. Projektia ei enää ylläpidetä.',
    },
    badges: [
      createBadge(
        'https://www.npmjs.com/package/compress-create-react-app',
        'npm/v/compress-create-react-app',
        'npm-versio'
      ),
      createBadge(
        'https://www.npmjs.com/package/compress-create-react-app',
        'npm/dm/compress-create-react-app',
        'Lataukset kuukaudessa'
      ),
    ],
    links: [
      {
        href: 'https://www.npmjs.com/package/compress-create-react-app',
        label: 'Työkalu npm:ssä',
      },
      {
        href: 'https://github.com/niemenjoki/compress-create-react-app',
        label: 'Lähdekoodi GitHubissa',
      },
    ],
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
    updatedAt: '2026-11-12',
    pageType: 'ItemPage',
    pageIdSuffix: '#itempage',
    pageName: 'Lieromaa, matokompostoinnin sivuprojekti | Joonas Niemenjoki',
    title: 'Lieromaa, matokompostoinnin sivuprojekti | Joonas Niemenjoki',
    description:
      'Lieromaa on sivuprojektini, joka keskittyy matokompostointiin, kompostimatoihin ja käytännönläheiseen kestävään arkeen.',
    image: {
      url: '/images/kompostimadot_kammenella.avif',
      alt: 'Valokuva kompostimadoista kädellä',
    },
    navigationLabel: 'Lieromaa',
    shortLabel: 'Lieromaa',
    listing: {
      group: 'sideProjects',
      typeLabel: 'Sivusto ja verkkokauppa',
      summary:
        'Matokompostoinnin sivuprojektini: ohjeita aloittamiseen ja kompostimatoja.',
    },
    links: [{ href: 'https://www.lieromaa.fi/', label: 'lieromaa.fi' }],
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

// The order of the projects list, the menu and the footer. The projects page groups them by listing.group.
export const primaryProjectOrder = [
  'looku',
  'haLooku',
  'haKryptex',
  'fiInvoicePaymentSlip',
  'postiPickupPoints',
  'lieromaa',
  'compressCreateReactApp',
];
