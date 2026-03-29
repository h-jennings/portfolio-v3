import Image, { type ImageProps } from 'next/image';

export const ProjectImage = (props: ImageProps) => {
  return <Image {...props} alt={props.alt} />;
};
