import Link from 'next/link';

import classes from '@/styles/Footer.module.css';
import Socials from './Socials';

const Footer = ({ language }) => {
  return (
    <footer className={classes.Footer}>
      <div className={classes.Left}>
        <ul className={classes.Links}>
          <li>
            <Link href={language === 'en' ? '/blog' : '/blogi'}>
              <a>{language === 'en' ? 'Blog' : 'Blogi'}</a>
            </Link>
          </li>
          <li>
            <Link href={language === 'en' ? '/projects' : '/projektit'}>
              <a>{language === 'en' ? 'Projects' : 'Projektit'}</a>
            </Link>
          </li>
          <li>
            <ul className={classes.ProjectLinks}>
              <li>
                <Link
                  href={
                    language === 'en'
                      ? '/projects/compress-create-react-app'
                      : '"/projektit/compress-create-react-app"'
                  }
                >
                  <a>- compress-create-react-app</a>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href={language === 'en' ? '/about' : '/tietoa'}>
              <a>{language === 'en' ? 'About' : 'Tietoa'}</a>
            </Link>
          </li>
          <li>
            <Link href={language === 'en' ? '/privacy' : '/tietosuoja'}>
              <a>{language === 'en' ? 'Privacy' : 'Tietosuoja'}</a>
            </Link>
          </li>
        </ul>

        <div className={classes.NoMobile}>
          <div>
            &copy; 2020-{new Date().getFullYear()} Joonas Niemenjoki.{' '}
            {language === 'en' ? 'Code and content are' : 'Koodi ja sisältö on'}{' '}
            <a
              href="https://github.com/jnsjknn/website/blob/master/LICENSE.md"
              target="_blank"
              rel="license noopener noreferrer"
            >
              {language === 'en' ? 'licensed' : 'lisensoitu'}
            </a>
            <div style={{ marginTop: '10px' }}>
              <i>
                <small>
                  {language === 'en'
                    ? 'The views and opinions expressed on this website are my own and do not represent the views or opinions of my employer or any other parties.'
                    : 'Sivustolla esitetyt näkemykset ja mielipiteet ovat omiani eivätkä edusta työnantajani tai minkään muun sidosryhmän kantoja tai näkemyksiä.'}
                </small>
              </i>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className={classes.Right}>
        <ul className={classes.Links}>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/jnsjknn/website"
            >
              {language === 'en' ? 'Source code' : 'Lähdekoodi'}
            </a>
          </li>
          <li className={classes.Socials}>
            <Socials language={language} />
          </li>
        </ul>
      </div>
      <div className={classes.Mobile}>
        <div>&copy; 2020-{new Date().getFullYear()} Joonas Niemenjoki</div>
        <div>
          {language === 'en' ? 'Code and content are' : 'Koodi ja sisältö on'}{' '}
          <a
            href="https://github.com/jnsjknn/website/blob/master/LICENSE.md"
            target="_blank"
            rel="license noopener noreferrer"
          >
            {language === 'en' ? 'licensed' : 'lisensoitu'}
          </a>
        </div>
        <div style={{ marginTop: '10px' }}>
          <i>
            <small>
              {language === 'en'
                ? 'The views and opinions expressed on this website are my own and do not represent the views or opinions of my employer or any other parties.'
                : 'Sivustolla esitetyt näkemykset ja mielipiteet ovat omiani eivätkä edusta työnantajani tai minkään muun sidosryhmän kantoja tai näkemyksiä.'}
            </small>
          </i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
