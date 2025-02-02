'use client';

import Image, { ImageLoaderProps, ImageProps } from 'next/image';

export const loader = ({ src, width }: ImageLoaderProps) => {
  const CDN_URL = `https://us-east-1.graphassets.com/${process.env.NEXT_CMS_ASSET_ENV_ID}/`;
  const srcInfo = src.split(CDN_URL)[1];
  const transform = `resize=width:${width}/output=format:webp/`;
  return `${CDN_URL}${transform}${srcInfo}`;
};

export const HygraphImageWithLoader = (props: ImageProps) => {
  return <Image {...props} loader={loader} alt={props.alt} />;
};
