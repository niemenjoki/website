import { useRouter } from 'next/router';

import classes from '@/styles/SocialShareButtons.module.css';
import Icon from './Icon';

export const sharelinks = [
  {
    iconName: 'facebook',
    href: 'https://www.facebook.com/sharer/sharer.php?u=__URL__',
    ariaLabel: 'Share on Facebook',
  },
  {
    iconName: 'twitter',
    href: 'http://twitter.com/intent/tweet?url=__URL__&hashtags=__TAGS__',
    ariaLabel: 'Share on Twitter',
  },
  {
    iconName: 'whatsapp',
    href: 'https://wa.me/?text=__URL__',
    ariaLabel: 'Share on Whatsapp',
  },
  {
    iconName: 'linkedin',
    href: 'https://www.linkedin.com/shareArticle?mini=true&url=__URL__&text=__TITLE__',
    ariaLabel: 'Share on LinkedIn',
  },
];

const SocialShareButtons = ({ title = '', text = '', tags = '' }) => {
  const router = useRouter();
  const currentPath = router.pathname.replace('[slug]', router.query.slug);
  return (
    <div className={classes.SocialShareButtons}>
      <div>Share on social media:</div>
      <div>
        {sharelinks.map((sharelink) => {
          const href = sharelink.href
            .replace('__URL__', 'https://joonasjokinen.fi' + currentPath)
            .replace('__TITLE__', title)
            .replace('__TAGS__', tags);
          return (
            <a
              key={sharelink.iconName}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={sharelink.iconName}
              aria-label={sharelinks.ariaLabel}
            >
              <Icon name={sharelink.iconName} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialShareButtons;
