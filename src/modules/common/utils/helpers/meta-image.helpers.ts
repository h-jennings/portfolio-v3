import { PATHS } from '../constants/paths.constants';

export const getMetaImage = (imageSrc: string | undefined) => {
  const imagePath = `${PATHS.base}${imageSrc}`;
  return imageSrc != null
    ? {
        images: [
          {
            url: imagePath,
          },
        ],
      }
    : {};
};
