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

function isSafeSrc(src) {
  if (src.startsWith('/_next/static/media/')) {
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
