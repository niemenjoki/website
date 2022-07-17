import Link from 'next/link';

import Socials from './Socials';
import classes from '@/styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <div className={classes.Left}>
        <ul className={classes.Links}>
          <li>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/projects">
              <a>Projects</a>
            </Link>
          </li>
          <li>
            <ul className={classes.ProjectLinks}>
              <li>
                <Link href="/projects/compress-create-react-app">
                  <a>- compress-create-react-app</a>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
        </ul>

        <div className={classes.NoMobile}>
          <div>
            &copy; 2020-{new Date().getFullYear()} Joonas Jokinen. Code and
            content are{' '}
            <a
              href="https://github.com/jnsjknn/website/blob/master/LICENSE.md"
              target="_blank"
              rel="license noopener noreferrer"
            >
              licensed
            </a>
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
              Source code
            </a>
          </li>
          <li className={classes.Socials}>
            <Socials />
          </li>
        </ul>
      </div>
      <div className={classes.Mobile}>
        <div>&copy; 2020-{new Date().getFullYear()} Joonas Jokinen</div>
        <div>
          Code and content are{' '}
          <a
            href="https://github.com/jnsjknn/website/blob/master/LICENSE.md"
            target="_blank"
            rel="license noopener noreferrer"
          >
            licensed
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
