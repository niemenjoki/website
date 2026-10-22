import { useEffect, useSyncExternalStore } from 'react';

import Icon from '../Icon/Icon';
import classes from './ThemeToggler.module.css';

// Theme preference: localStorage 'darkMode', otherwise the system setting. Light on the server and during hydration.
const listeners = new Set();
const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const getSnapshot = () => {
  const modeInStorage = localStorage.getItem('darkMode');
  if (modeInStorage) return JSON.parse(modeInStorage);
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};
const getServerSnapshot = () => false;

const ThemeToggler = (props) => {
  const isDarkMode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleClick = () => {
    localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
    listeners.forEach((listener) => listener());
  };

  return (
    <Icon
      name={isDarkMode ? 'sun' : 'moon'}
      className={classes.ThemeToggler}
      onClick={handleClick}
      {...props}
    />
  );
};

export default ThemeToggler;
