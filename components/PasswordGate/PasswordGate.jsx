'use client';

import { useEffect, useState } from 'react';

import classes from './PasswordGate.module.css';

// Ei tietoturvaa: estää vain vahingossa eksymisen luonnossivulle.
const STORAGE_KEY = 'passwordGateUnlocked';

export default function PasswordGate({ password, children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      setUnlocked(sessionStorage.getItem(STORAGE_KEY) === password);
    } catch {}
    setChecked(true);
  }, [password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value === password) {
      try {
        sessionStorage.setItem(STORAGE_KEY, password);
      } catch {}
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  if (unlocked) {
    return children;
  }

  if (!checked) {
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
