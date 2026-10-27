import { ImageResponse } from 'next/og';

import { SITE_AUTHOR } from '@/data/site/author';
import { getContentMetadata } from '@/lib/content/index.mjs';

export const POST_IMAGE_SIZE = { width: 1200, height: 630 };

const COLORS = {
  background: '#0e111b',
  backgroundEnd: '#1c2236',
  text: '#ffffff',
  muted: '#aab3cf',
  blue: '#4568c6',
  orange: '#ffa057',
};

// Satori does not read woff2, so the TTF is fetched from Google Fonts at build time like next/font does.
async function loadRubik(weight) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Rubik:wght@${weight}`
  ).then((res) => res.text());
  const fontUrl = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];

  if (!fontUrl) {
    throw new Error(`Rubik ${weight} font URL not found`);
  }

  return fetch(fontUrl).then((res) => res.arrayBuffer());
}

const TITLE_MAX_WIDTH = 1040;

// The longest word must fit on one line. Rubik bold averages about 0.6 em per character.
function titleFontSize(title) {
  const byLength = title.length > 70 ? 58 : title.length > 45 ? 66 : 76;
  const longestWord = Math.max(...title.split(/\s+/).map((word) => word.length));
  return Math.min(byLength, Math.floor(TITLE_MAX_WIDTH / (longestWord * 0.6)));
}

export async function renderPostImage(slug) {
  const { title, tags = [] } = getContentMetadata({ slug });
  const [regular, bold] = await Promise.all([loadRubik(400), loadRubik(700)]);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: `linear-gradient(135deg, ${COLORS.background} 0%, ${COLORS.backgroundEnd} 100%)`,
        color: COLORS.text,
        fontFamily: 'Rubik',
        position: 'relative',
      }}
    >
      {/* Step response of a control loop: setpoint (orange) and measurement (blue) */}
      <svg
        width="1200"
        height="630"
        viewBox="0 0 1200 630"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <path
          d="M 0 470 L 520 470 L 520 250 L 1200 250"
          fill="none"
          stroke={COLORS.orange}
          strokeWidth="4"
          strokeDasharray="14 12"
          opacity="0.3"
        />
        <path
          d="M 0 470 L 520 470 C 600 470 620 170 700 190 C 780 210 790 290 860 270 C 930 250 950 235 1010 248 C 1070 258 1120 252 1200 250"
          fill="none"
          stroke={COLORS.blue}
          strokeWidth="6"
          opacity="0.35"
        />
      </svg>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            display: 'flex',
            padding: '8px 22px',
            borderRadius: 999,
            background: COLORS.blue,
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          Blogi
        </div>
        {tags[0] ? (
          <div style={{ display: 'flex', fontSize: 28, color: COLORS.muted }}>
            {tags[0]}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: 'flex',
          maxWidth: TITLE_MAX_WIDTH,
          fontSize: titleFontSize(title),
          fontWeight: 700,
          lineHeight: 1.12,
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          fontSize: 30,
        }}
      >
        <div style={{ display: 'flex', fontWeight: 700 }}>{SITE_AUTHOR.name}</div>
        <div style={{ display: 'flex', color: COLORS.orange }}>niemenjoki.fi</div>
      </div>
    </div>,
    {
      ...POST_IMAGE_SIZE,
      fonts: [
        { name: 'Rubik', data: regular, weight: 400, style: 'normal' },
        { name: 'Rubik', data: bold, weight: 700, style: 'normal' },
      ],
    }
  );
}
