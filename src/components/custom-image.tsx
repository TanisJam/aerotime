'use client';
import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

const FALLBACK_IMAGE = '/igdb.png';

type ImageSize =
  | 'cover_small'
  | 'screenshot_med'
  | 'cover_big'
  | 'logo_med'
  | 'screenshot_big'
  | 'screenshot_huge'
  | 'thumb'
  | 'micro'
  | '720p'
  | '1080p';

const SIZE_CONFIG = {
  cover_small: { width: 90, height: 128 },
  screenshot_med: { width: 569, height: 320 },
  cover_big: { width: 264, height: 374 },
  logo_med: { width: 284, height: 160 },
  screenshot_big: { width: 889, height: 500 },
  screenshot_huge: { width: 1280, height: 720 },
  thumb: { width: 90, height: 90 },
  micro: { width: 35, height: 35 },
  '720p': { width: 1280, height: 720 },
  '1080p': { width: 1920, height: 1080 },
} as const;

type CustomImageProps = Omit<ImageProps, 'src' | 'width' | 'height'> & {
  size: ImageSize;
  src?: string;
};

export default function CustomImage({ src, size, ...props }: CustomImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const formatUrl = (url: string) => {
    if (!url) return FALLBACK_IMAGE;

    const hash = url.split('/').pop()?.split('.')[0];
    return `https://images.igdb.com/igdb/image/upload/t_${size}/${hash}.jpg`;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const finalSrc =
    typeof imgSrc === 'string'
      ? isValidUrl(formatUrl(imgSrc))
        ? formatUrl(imgSrc)
        : FALLBACK_IMAGE
      : FALLBACK_IMAGE;

  return (
    <Image
      {...props}
      width={SIZE_CONFIG[size].width}
      height={SIZE_CONFIG[size].height}
      alt={props.alt ?? ''}
      src={finalSrc}
      onError={() => setImgSrc(FALLBACK_IMAGE)}
    />
  );
}
