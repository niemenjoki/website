import { defaultMetadata } from '@/data/defaultMetadata';

export function withDefaultMetadata(customMetadata = {}) {
  function deepMerge(base, override) {
    if (
      typeof base !== 'object' ||
      base === null ||
      base instanceof URL ||
      Array.isArray(base)
    ) {
      return override;
    }

    const result = { ...base };

    for (const key in override) {
      const baseValue = base[key];
      const overrideValue = override[key];

      if (
        typeof overrideValue === 'object' &&
        overrideValue !== null &&
        !(overrideValue instanceof URL) &&
        !Array.isArray(overrideValue)
      ) {
        result[key] = deepMerge(baseValue || {}, overrideValue);
      } else {
        result[key] = overrideValue;
      }
    }

    return result;
  }

  return deepMerge(defaultMetadata, customMetadata);
}
