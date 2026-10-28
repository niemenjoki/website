import { useEffect, useState } from 'react';

import Icon from '../Icon/Icon';
import classes from './ThemeToggler.module.css';

const THEME_CHANGE_EVENT = 'niemenjoki:theme-change';

function readStoredThemePreference() {
  let modeInStorage = null;

  try {
    modeInStorage = localStorage.getItem('darkMode');
  } catch {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  if (modeInStorage === 'true') {
    return true;
  }

  if (modeInStorage === 'false') {
    return false;
  }

  if (modeInStorage !== null) {
    try {
      localStorage.removeItem('darkMode');
    } catch {}
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function hasStoredThemePreference() {
  try {
    return localStorage.getItem('darkMode') !== null;
  } catch {
    return false;
  }
}

function applyTheme(isDarkMode) {
  document.documentElement.classList.toggle('dark', isDarkMode);
  document.body.classList.toggle('dark', isDarkMode);
}

const ThemeToggler = (props) => {
  const { copy, style, ...buttonProps } = props;
  const [isDarkMode, setIsDarkMode] = useState(null);

  useEffect(() => {
    const syncTheme = (event) => {
      const nextMode =
        typeof event?.detail?.isDarkMode === 'boolean'
          ? event.detail.isDarkMode
          : readStoredThemePreference();

      applyTheme(nextMode);
      setIsDarkMode(nextMode);
    };

    syncTheme();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const syncSystemTheme = (event) => {
      if (!hasStoredThemePreference()) {
        applyTheme(event.matches);
        setIsDarkMode(event.matches);
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, syncTheme);
    window.addEventListener('storage', syncTheme);
    mediaQuery.addEventListener?.('change', syncSystemTheme);

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, syncTheme);
      window.removeEventListener('storage', syncTheme);
      mediaQuery.removeEventListener?.('change', syncSystemTheme);
    };
  }, []);

  const handleClick = () => {
    const nextMode = !document.documentElement.classList.contains('dark');
    try {
      localStorage.setItem('darkMode', JSON.stringify(nextMode));
    } catch {}
    applyTheme(nextMode);
    setIsDarkMode(nextMode);
    window.dispatchEvent(
      new CustomEvent(THEME_CHANGE_EVENT, { detail: { isDarkMode: nextMode } })
    );
  };

  return (
    <button
      type="button"
      className={classes.ThemeToggler}
      onClick={handleClick}
      aria-label={
        isDarkMode == null ? copy.toggle : isDarkMode ? copy.useLight : copy.useDark
      }
      aria-pressed={isDarkMode ?? undefined}
      style={style}
      {...buttonProps}
    >
      <span className={classes.UseLightIcon} aria-hidden="true">
        <Icon name="sun" />
      </span>
      <span className={classes.UseDarkIcon} aria-hidden="true">
        <Icon name="moon" />
      </span>
    </button>
  );
};

export default ThemeToggler;
