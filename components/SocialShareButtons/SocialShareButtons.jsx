'use client';

import { usePathname } from 'next/navigation';

import { SITE_URL } from '@/data/vars.mjs';

import Icon from '../Icon/Icon';
import classes from './SocialShareButtons.module.css';

export const sharelinks = [
  {
    iconName: 'facebook',
    href: 'https://www.facebook.com/sharer/sharer.php?u=__URL__',
    ariaLabel: 'Jaa Facebookissa',
  },
  {
    iconName: 'twitter',
    href: 'https://x.com/intent/tweet?url=__URL__&hashtags=__TAGS__',
    ariaLabel: 'Jaa X:ssä',
  },
  {
    iconName: 'whatsapp',
    href: 'https://api.whatsapp.com/send?text=__URL__',
    ariaLabel: 'Jaa WhatsAppissa',
  },
  {
    iconName: 'linkedin',
    href: 'https://www.linkedin.com/shareArticle?mini=true&url=__URL__&text=__TITLE__',
    ariaLabel: 'Jaa LinkedInissä',
  },
];

export default function SocialShareButtons({ title = '', tags = [] }) {
  const pathname = usePathname();
  const currentUrl = SITE_URL + pathname;

  const tagString = tags.map((tag) => tag.replaceAll(' ', '-')).join(',');

  return (
    <div className={classes.SocialShareButtons}>
      <div>Jaa tämä somessa:</div>
      <div>
        {sharelinks.map((sharelink) => {
          const href = sharelink.href
            .replace('__URL__', encodeURIComponent(currentUrl))
            .replace('__TITLE__', encodeURIComponent(title))
            .replace('__TAGS__', encodeURIComponent(tagString));

          return (
            <a
              key={sharelink.iconName}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={sharelink.ariaLabel}
              data-testid={sharelink.iconName}
            >
              <Icon name={sharelink.iconName} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
