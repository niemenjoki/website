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
import {
  faMagnifyingGlass,
  faMoon,
  faRss,
  faSun,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
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
  close: faXmark,
  search: faMagnifyingGlass,
};

export default function Icon({ name, ...rest }) {
  const icon = icons[name];
  return icon ? <FontAwesomeIcon icon={icon} {...rest} /> : null;
}
