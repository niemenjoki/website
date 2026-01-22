import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faQuora,
  faTiktok,
  faWhatsapp,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faMoon, faRss, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const icons = {
  rss: faRss,
  github: faGithub,
  instagram: faInstagram,
  quora: faQuora,
  youtube: faYoutube,
  twitter: faXTwitter,
  linkedin: faLinkedin,
  facebook: faFacebook,
  whatsapp: faWhatsapp,
  sun: faSun,
  moon: faMoon,
  tiktok: faTiktok,
};

export default function Icon({ name, ...rest }) {
  const icon = icons[name];
  return icon ? <FontAwesomeIcon icon={icon} {...rest} /> : null;
}
