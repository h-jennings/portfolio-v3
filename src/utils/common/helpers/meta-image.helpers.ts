import { PATHS } from '../constants/paths.constants';

export const getMetaImage = (imageSrc: string | undefined) => {
  if (!imageSrc)
    return {
      images: [
        {
          url: `${PATHS.base}/images/social-banner.jpg`,
        },
      ],
    };

  return {
    images: [
      {
        url: imageSrc,
      },
    ],
  };
};
