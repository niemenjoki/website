export const projectPageDefinitions = {
  compressCreateReactApp: {
    canonicalUrl: '/projektit/compress-create-react-app',
    pageType: 'ItemPage',
    pageIdSuffix: '#itempage',
    pageName: 'compress-create-react-app työkalu | Joonas Niemenjoki',
    title: 'compress-create-react-app työkalu | Joonas Niemenjoki',
    description:
      'compress-create-react-app on React-kehittäjille tarkoitettu apuohjelma, joka helpottaa verkkosivujen tiedostojen pakkaamista Create React App -ympäristössä.',
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
          'Avoimen lähdekoodin työkalu Create React App -projektien tiedostojen pakkaamiseen.',
        url: 'https://www.npmjs.com/package/compress-create-react-app',
        codeRepository: 'https://github.com/niemenjoki/compress-create-react-app',
      },
    },
  },
  lieromaa: {
    canonicalUrl: '/projektit/lieromaa',
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
  rauTools: {
    canonicalUrl: '/projektit/rau-tyokalut',
    pageType: 'CollectionPage',
    pageIdSuffix: '#collectionpage',
    pageName: 'RAU-työkalut rakennusautomaatioon | Joonas Niemenjoki',
    title: 'RAU-työkalut rakennusautomaatioon | Joonas Niemenjoki',
    description:
      'RAU-työkalujen koontisivu, josta löytyvät rakennusautomaation käytännölliset aputyökalut eri käyttötarkoituksiin ja työvaiheisiin.',
    navigationLabel: 'RAU työkalut',
    shortLabel: 'RAU-työkalut',
    search: {
      contexts: ['notFound'],
      keywords: ['rau-työkalut', 'rakennusautomaatio', 'fidelix', 'automaatiotyökalut'],
      tags: ['projekti', 'rakennusautomaatio'],
    },
    mainEntityName: 'RAU-työkalut',
  },
  rauToolsAlarmPage: {
    canonicalUrl: '/projektit/rau-tyokalut/halytystyokalu',
    pageType: 'ItemPage',
    pageIdSuffix: '#itempage',
    pageName: 'Hälytystyökalu hälytyssivulle | RAU-työkalut | Joonas',
    title: 'Hälytystyökalu hälytyssivulle | RAU-työkalut | Joonas',
    description:
      'Muuntaa FX-Editorista kopioidut pisteet hälytyssivun grafiikkakuvaksi ja generoi IEC koodin samassa muodossa kuin FX-Editorin template manager.',
    image: {
      url: '/images/content/projects/halytystyokalu.avif',
      alt: 'Kuvakaappaus Hälytystyökalusta',
    },
    shortLabel: 'Hälytystyökalu',
    lead: 'Muuntaa FX-Editorista kopioidut pisteet hälytyssivun grafiikkakuvaksi ja generoi IEC koodin samassa muodossa kuin FX-Editorin template manager.',
    cardDescription:
      'Muuntaa FX-Editorista kopioidut pisteet hälytyssivun grafiikkakuvaksi ja generoi IEC koodin samassa muodossa kuin FX-Editorin template manager.',
    parentCanonicalUrl: '/projektit/rau-tyokalut',
    parentPageName: 'RAU-työkalut',
    search: {
      contexts: ['notFound'],
      keywords: ['hälytystyökalu', 'fidelix', 'fx-editor', 'iec'],
      tags: ['rau-työkalut', 'rakennusautomaatio'],
    },
  },
  rauToolsModbusDevices: {
    canonicalUrl: '/projektit/rau-tyokalut/modbuslaitteet',
    pageType: 'ItemPage',
    pageIdSuffix: '#itempage',
    pageName: 'Modbus-laitteet | RAU-työkalut | Joonas Niemenjoki',
    title: 'Modbus-laitteet | RAU-työkalut | Joonas Niemenjoki',
    description:
      'RAU-työkalu, joka muodostaa Modbus-funktiolohkosta kaikki ja tarvittavat Modbus-laitelistat sekä FX-Editor XML:n.',
    image: {
      url: '/images/content/projects/modbuslaitteet.avif',
      alt: 'Kuvakaappaus Modbus-laitteet-työkalusta',
    },
    shortLabel: 'Modbus-laitteet',
    lead: 'Muodostaa Modbus-funktiolohkosta Modbus-laitelistat sekä FX-Editoriin sopivan XML:n. Kutsukoodin avulla saat erikseen sekä tarvittavat että kaikki Modbus-laitteet.',
    cardDescription:
      'Generoi Modbus-funktiolohkosta kaikki ja tarvittavat Modbuslaitteet koodikommenttina sekä FX-Editoriin sopivassa XML-muodossa.',
    parentCanonicalUrl: '/projektit/rau-tyokalut',
    parentPageName: 'RAU-työkalut',
    search: {
      contexts: ['notFound'],
      keywords: ['modbus-laitteet', 'modbus', 'fx-editor', 'xml'],
      tags: ['rau-työkalut', 'rakennusautomaatio'],
    },
  },
  rauToolsModbusInterface: {
    canonicalUrl: '/projektit/rau-tyokalut/modbusrajapinta',
    pageType: 'ItemPage',
    pageIdSuffix: '#itempage',
    isBeta: true,
    pageName: 'Modbus-rajapinta | RAU-työkalut | Joonas Niemenjoki',
    title: 'Modbus-rajapinta | RAU-työkalut | Joonas Niemenjoki',
    description:
      'RAU-työkalu, joka generoi annetuista Modbus-rekistereistä Fidelixiin sopivan funktiolohkon, ohjelmakutsun ja apufunktiolistan.',
    shortLabel: 'Modbus-rajapinta',
    lead: 'Generoi annetuista Modbus-rekistereistä Fidelix-järjestelmään sopivan funktiolohkon, ohjelmakutsun ja käytettyjen apufunktioiden listan.',
    cardDescription:
      'Luo Modbus-rekistereistä Fidelixiin sopivan funktiolohkon, ohjelmakutsun ja apufunktiolistan.',
    parentCanonicalUrl: '/projektit/rau-tyokalut',
    parentPageName: 'RAU-työkalut',
    search: {
      contexts: ['notFound'],
      keywords: ['modbus-rajapinta', 'modbus', 'fidelix', 'iec', 'structured text'],
      tags: ['rau-työkalut', 'rakennusautomaatio'],
    },
  },
  rauToolsStVariables: {
    canonicalUrl: '/projektit/rau-tyokalut/st-muuttujat',
    pageType: 'ItemPage',
    pageIdSuffix: '#itempage',
    pageName: 'ST-muuttujat-työkalu | RAU-työkalut | Joonas Niemenjoki',
    title: 'ST-muuttujat-työkalu | RAU-työkalut | Joonas Niemenjoki',
    description:
      'RAU-työkalu, joka muuntaa koodin kopioitavaksi muuttujalistaksi ja tekee tyyppipäättelyn automaattisesti etuliitteiden perusteella.',
    image: {
      url: '/images/content/projects/stmuuttujat.avif',
      alt: 'Kuvakaappaus ST-muuttujat-työkalusta',
    },
    shortLabel: 'ST-muuttujat',
    lead: 'Tämä työkalu generoi muuttujien esittelylistan koodin perusteella.',
    cardDescription: 'Generoi muuttujien esittelylistan koodin perusteella.',
    parentCanonicalUrl: '/projektit/rau-tyokalut',
    parentPageName: 'RAU-työkalut',
    search: {
      contexts: ['notFound'],
      keywords: ['st-muuttujat', 'structured text', 'iec 61131-3', 'fidelix'],
      tags: ['rau-työkalut', 'rakennusautomaatio'],
    },
  },
};

export const primaryProjectOrder = ['compressCreateReactApp', 'lieromaa', 'rauTools'];

export const rauToolOrder = [
  'rauToolsAlarmPage',
  'rauToolsStVariables',
  'rauToolsModbusDevices',
  'rauToolsModbusInterface',
];
