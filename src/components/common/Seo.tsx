import { getMetaImage } from '@utils/common/helpers/meta-image.helpers';
import { NextSeo, NextSeoProps } from 'next-seo';

interface SeoProps extends NextSeoProps {
  title?: string;
  url?: string;
  description?: string;
  image?: string;
}

export const Seo = ({ title, url, description, image, ...rest }: SeoProps) => {
  return (
    <NextSeo
      {...rest}
      title={title}
      canonical={url}
      description={description}
      openGraph={{
        title,
        url,
        description,
        ...getMetaImage(image),
      }}
    />
  );
};
