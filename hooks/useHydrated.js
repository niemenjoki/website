import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

// false on the server and during hydration, true after it. Use for values that exist only in the browser
// (pathname of a static 404 page, sessionStorage) without setting state in an effect.
const useHydrated = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

export default useHydrated;
