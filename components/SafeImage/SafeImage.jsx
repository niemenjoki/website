'use client';

import React from 'react';

import Image from 'next/image';

import safePaths from '@/generated/site/safeImagePaths.json';

function resolveImportedStaticPath(src) {
  const fileName = src.split('/').pop();

  if (!fileName) {
    return null;
  }

  const extensionSeparator = fileName.lastIndexOf('.');
  if (extensionSeparator === -1) {
    return null;
  }

  const ext = fileName.slice(extensionSeparator + 1);
  const nameAndHash = fileName.slice(0, extensionSeparator);
  const hashSeparator = nameAndHash.lastIndexOf('.');

  if (hashSeparator === -1) {
    return null;
  }

  const baseName = nameAndHash.slice(0, hashSeparator);
  const matchingPaths = safePaths.filter((path) => path.endsWith(`/${baseName}.${ext}`));

  if (matchingPaths.length !== 1) {
    return null;
  }

  return matchingPaths[0];
}

// Vercel serves statically imported images from /_next/static/immutable/media/ when the site is built with Turbopack.
const STATIC_MEDIA_PREFIXES = ['/_next/static/media/', '/_next/static/immutable/media/'];

function isSafeSrc(src) {
  if (STATIC_MEDIA_PREFIXES.some((prefix) => src.startsWith(prefix))) {
    const resolvedPath = resolveImportedStaticPath(src);

    if (!resolvedPath) {
      return false;
    }

    return safePaths.includes(resolvedPath);
  }

  return safePaths.includes(src);
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
