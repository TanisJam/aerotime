import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

const FALLBACK_IMAGE = '/igdb.png';

type CustomImageProps = Omit<ImageProps, 'src'> & {
  src?: string;
};

export default function CustomImage({ src, ...props }: CustomImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const formatUrl = (url: string) => {
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    return url;
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
      alt={props.alt ?? ''}
      src={finalSrc}
      onError={() => setImgSrc(FALLBACK_IMAGE)}
    />
  );
}
