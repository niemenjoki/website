import { useState, useEffect } from 'react';

import Icon from './Icon';
import classes from '@/styles/ThemeToggler.module.css';

const ThemeToggler = ({ style, props }) => {
  const [isDarkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const modeInStorage = localStorage.getItem('darkMode');
    if (modeInStorage) {
      setDarkMode(JSON.parse(modeInStorage));
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleClick = () => {
    localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
    setDarkMode(!isDarkMode);
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
