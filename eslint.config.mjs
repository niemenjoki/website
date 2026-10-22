import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const eslintConfig = [
  ...nextCoreWebVitals,
  prettierRecommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'react/no-unescaped-entities': 'off',
      'react/display-name': 'off',
      'import/order': 'off',
      // React Hooks 7 rules added in eslint-config-next 16.
      'react-hooks/set-state-in-effect': 'error',
      'react-hooks/refs': 'error',
      'react-hooks/immutability': 'error',
    },
  },
  {
    // Draft demo: fixed together with the draft post before it is published.
    files: ['components/CompressorRotationDemo/**'],
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
    },
  },
];

export default eslintConfig;
