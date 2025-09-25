import useToggle from '@/hooks/useToggle';
import classes from '@/styles/Navbar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Socials from './Socials';
import ThemeToggler from './ThemeToggler';
import Toggler from './Toggler';

const Navbar = ({ language, i18n }) => {
  const router = useRouter();
  const navLinks = [
    {
      href: `${language === 'en' ? '/blog' : '/blogi'}`,
      text: `${language === 'en' ? 'Blog' : 'Blogi'}`,
    },
    {
      href: `${language === 'en' ? '/projects' : '/projektit'}`,
      text: `${language === 'en' ? 'Projects' : 'Projektit'}`,
    },
    {
      href: `${language === 'en' ? '/about' : '/tietoa'}`,
      text: `${language === 'en' ? 'About' : 'Tietoa'}`,
    },
  ];

  const [isOpen, toggleIsOpen] = useToggle(false);

  const updateLanguagePreference = (e, language) => {
    e.preventDefault();

    const i18nHomePagePath = language === 'en' ? '/' : '/en';
    const i18nTargetPath = i18n ? new URL(i18n).pathname : i18nHomePagePath;

    if (language === 'en') {
      localStorage.setItem('languagePreference', 'fi');
    } else {
      localStorage.setItem('languagePreference', 'en');
    }
    router.push(i18nTargetPath);
  };

  return (
    <header className={classes.NavbarWrapper}>
      <div className={classes.Navbar}>
        <div className={classes.Brand}>
          <Link href={language === 'en' ? '/en' : '/'}>Joonas Niemenjoki</Link>
        </div>
        <nav className={[classes.Nav, isOpen ? classes.Open : null].join(' ')}>
          <span className={classes.Toggler}>
            <Toggler drawerOpen={isOpen} clicked={toggleIsOpen} />
          </span>
          <ul className={classes.Drawer}>
            <li>
              <a
                href={
                  i18n
                    ? new URL(i18n).pathname
                    : language === 'en'
                    ? '/'
                    : '/en'
                }
                className={classes.LanguageToggler}
                onClick={(e) => updateLanguagePreference(e, language)}
              >
                {language === 'en' ? 'suomeksi' : 'in English'}
              </a>
            </li>
            <li>
              <ThemeToggler style={{ fontSize: '28px' }} />
            </li>
            {navLinks.map((link) => (
              <li key={link.href} onClick={() => toggleIsOpen(false)}>
                <Link href={link.href} className={classes.NavButton}>
                  {link.text}
                </Link>
              </li>
            ))}
            <li className={classes.Socials}>
              <Socials language={language} />
            </li>
          </ul>
        </nav>
      </div>
      <div className={classes.Divider}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </div>
    </header>
  );
};

export default Navbar;
