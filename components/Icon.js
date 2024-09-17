import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faQuora,
  faInstagram,
  faFacebook,
  faWhatsapp,
  faXTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faRss, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Icon = ({ name, ...rest }) => {
  switch (name) {
    case 'rss':
      return <FontAwesomeIcon icon={faRss} {...rest} />;
    case 'github':
      return <FontAwesomeIcon icon={faGithub} {...rest} />;
    case 'instagram':
      return <FontAwesomeIcon icon={faInstagram} {...rest} />;
    case 'quora':
      return <FontAwesomeIcon icon={faQuora} {...rest} />;
    case 'twitter':
      return <FontAwesomeIcon icon={faXTwitter} {...rest} />;
    case 'linkedin':
      return <FontAwesomeIcon icon={faLinkedin} {...rest} />;
    case 'facebook':
      return <FontAwesomeIcon icon={faFacebook} {...rest} />;
    case 'whatsapp':
      return <FontAwesomeIcon icon={faWhatsapp} {...rest} />;
    case 'sun':
      return <FontAwesomeIcon icon={faSun} {...rest} />;
    case 'moon':
      return <FontAwesomeIcon icon={faMoon} {...rest} />;
    default:
      return null;
  }
};

export default Icon;
