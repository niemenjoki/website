'use client';

import { useState } from 'react';

import ThemeToggler from '@/components/ThemeToggler/ThemeToggler';

import Toggler from '../NavToggler/NavToggler.jsx';
import SafeLink from '../SafeLink/SafeLink';
import Socials from '../Socials/Socials.jsx';
import classes from './Navbar.module.css';

function renderDesktopItem(item) {
  if (item.kind === 'menu') {
    return (
      <li key={item.label} className={classes.Dropdown}>
        <span>{item.label}</span>
        <ul className={classes.DropdownMenu}>
          {item.items.map((link) => (
            <li key={link.href}>
              <SafeLink href={link.href}>{link.label}</SafeLink>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li key={item.href}>
      <SafeLink href={item.href}>{item.label}</SafeLink>
    </li>
  );
}

export default function Navbar({ navigation }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (typeof document !== 'undefined') {
        document.body.classList.toggle('nav-open', newState);
      }
      return newState;
    });
  };

  return (
    <nav className={classes.Navbar}>
      <div className={classes.Inner}>
        {/* LEFT */}
        <div className={classes.Left}>
          <SafeLink href="/" className={classes.LogoLink}>
            <span className={classes.Brand}>Joonas Niemenjoki</span>
          </SafeLink>
        </div>

        {/* RIGHT */}
        <div className={classes.Right}>
          <ul className={classes.Links}>
            {navigation.desktopItems.map((item) => renderDesktopItem(item))}
            <li>
              <ThemeToggler style={{ fontSize: '24px' }} />
            </li>
          </ul>

          {/* Mobile toggler */}
          <span className={classes.Toggler}>
            <Toggler drawerOpen={isOpen} clicked={toggleIsOpen} />
          </span>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <div className={`${classes.MobileMenu} ${isOpen ? classes.MobileOpen : ''}`}>
        <div className={classes.MobileContent}>
          <div className={classes.MobileSection}>
            <ThemeToggler style={{ fontSize: '26px' }} />
          </div>

          {navigation.mobileSections.map((section, sectionIndex) => (
            <div
              key={section.heading ?? `mobile-section-${sectionIndex}`}
              className={classes.MobileSection}
            >
              {section.heading ? <h3>{section.heading}</h3> : null}
              <ul>
                {section.items.map((link) => (
                  <li key={link.href}>
                    <SafeLink href={link.href} onClick={toggleIsOpen}>
                      {link.label}
                    </SafeLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={classes.MobileSection}>
            <h3>Seuraa</h3>
            <ul>
              <li className={classes.Socials}>
                <Socials />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
