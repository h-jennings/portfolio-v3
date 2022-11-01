import Image, { ImageLoaderProps, ImageProps } from 'next/image';

export const loader = ({ src, width }: ImageLoaderProps) => {
  const CDN_URL = 'https://media.graphassets.com/';
  const srcInfo = src.split(CDN_URL)[1];
  const transform = `resize=width:${width}/output=format:webp/quality=value:90/`;
  return `${CDN_URL}${transform}${srcInfo}`;
};

export const HygraphImageWithLoader = (props: ImageProps) => {
  return <Image {...props} loader={loader} alt={props.alt} />;
};
