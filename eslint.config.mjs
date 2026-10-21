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
      // React Hooks 7 rules added in eslint-config-next 16. Existing code is reported as warnings until fixed.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/immutability': 'warn',
    },
  },
];

export default eslintConfig;
