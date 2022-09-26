import { SOCIALS } from '../data/socials';
import Icon from './Icon';

const Socials = ({ language }) => {
  return (
    <span>
      {SOCIALS.filter((social) => {
        if (social.onlyForLanguage && social.onlyForLanguage !== language)
          return false;
        return true;
      }).map((social) => (
        <a
          className={social.icon + '-icon'}
          key={social.icon}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={social.ariaLabel}
        >
          <Icon name={social.icon} />
        </a>
      ))}
    </span>
  );
};

export default Socials;
