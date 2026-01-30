'use client';

import { useState } from 'react';

import ThemeToggler from '@/components/ThemeToggler/ThemeToggler';

import Toggler from '../NavToggler/NavToggler.jsx';
import SafeLink from '../SafeLink/SafeLink';
import Socials from '../Socials/Socials.jsx';
import classes from './Navbar.module.css';

export default function Navbar() {
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
            <li>
              <SafeLink href="/blogi">Blogi</SafeLink>
            </li>

            <li className={classes.Dropdown}>
              <span>Projektit</span>
              <ul className={classes.DropdownMenu}>
                <li>
                  <SafeLink href="/projektit/compress-create-react-app">
                    compress-create-react-app
                  </SafeLink>
                </li>
                <li>
                  <SafeLink href="/projektit/lieromaa">Lieromaa</SafeLink>
                </li>
              </ul>
            </li>

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

          <div className={classes.MobileSection}>
            <h3>Blogi</h3>
            <ul>
              <li>
                <SafeLink href="/blogi" onClick={toggleIsOpen}>
                  Viimeisimmät julkaisut
                </SafeLink>
              </li>
            </ul>
          </div>

          <div className={classes.MobileSection}>
            <h3>Projektit</h3>
            <ul>
              <li>
                <SafeLink
                  href="/projektit/compress-create-react-app"
                  onClick={toggleIsOpen}
                >
                  compress-create-react-app
                </SafeLink>
              </li>
              <li>
                <SafeLink href="/projektit/lieromaa" onClick={toggleIsOpen}>
                  Lieromaa
                </SafeLink>
              </li>
            </ul>
          </div>
          <div className={classes.MobileSection}>
            <h3>Muut sivut</h3>
            <ul>
              <li>
                <SafeLink href="/tietoa" onClick={toggleIsOpen}>
                  Tietoa sivustosta
                </SafeLink>
              </li>
              <li>
                <SafeLink href="/tietosuoja" onClick={toggleIsOpen}>
                  Tietosuoja
                </SafeLink>
              </li>{' '}
            </ul>
          </div>

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
