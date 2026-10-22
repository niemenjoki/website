'use client';

import { useState, useSyncExternalStore } from 'react';

import classes from './PasswordGate.module.css';

// Ei tietoturvaa: estää vain vahingossa eksymisen luonnossivulle.
const STORAGE_KEY = 'passwordGateUnlocked';

const subscribe = () => () => {};

const readStorage = (password) => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === password ? 'unlocked' : 'locked';
  } catch {
    return 'locked';
  }
};

export default function PasswordGate({ password, children }) {
  // 'unknown' on the server and during hydration, then the sessionStorage state.
  const stored = useSyncExternalStore(
    subscribe,
    () => readStorage(password),
    () => 'unknown'
  );
  const [unlockedNow, setUnlockedNow] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value === password) {
      try {
        sessionStorage.setItem(STORAGE_KEY, password);
      } catch {}
      setUnlockedNow(true);
    } else {
      setError(true);
    }
  };

  if (unlockedNow || stored === 'unlocked') {
    return children;
  }

  if (stored === 'unknown') {
    return null;
  }

  return (
    <form className={classes.PasswordGate} onSubmit={handleSubmit}>
      <label htmlFor="password-gate-input">Salasana</label>
      <div className={classes.Row}>
        <input
          id="password-gate-input"
          type="password"
          inputMode="numeric"
          autoFocus
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError(false);
          }}
        />
        <button type="submit">Avaa</button>
      </div>
      {error ? <p className={classes.Error}>Väärä salasana.</p> : null}
    </form>
  );
}
