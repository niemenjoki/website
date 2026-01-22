'use client';

import React from 'react';

import Image from 'next/image';

import safePaths from '@/data/generated/safeImagePaths.json';

function isSafeSrc(src) {
  let srcToCheck = src;
  if (src.startsWith('/_next/static/media/')) {
    const fileName = src.split('/').pop(); // "e.g. portrait2024.13bbda2f.avif"
    const [name, , ext] = fileName.split('.');
    srcToCheck = `/images/${name}.${ext}`;
  }
  return safePaths.includes(srcToCheck);
}

export default function SafeImage({ src, alt, ...props }) {
  let actualSrc;

  if (typeof src === 'string') {
    actualSrc = src;
  } else if (src && typeof src === 'object' && 'src' in src) {
    actualSrc = src.src;
  } else {
    throw new Error(`SafeImage: invalid src type: ${typeof src}`);
  }

  if (!isSafeSrc(actualSrc)) {
    throw new Error(`Unsafe image path blocked: "${actualSrc}"`);
  }

  return <Image src={src} alt={alt} {...props} />;
}
