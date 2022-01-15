import { getMetaImage } from '../meta-image.helpers';

describe('Generates Meta Image', () => {
  test('Handles undefined param', () => {
    const src = undefined;
    const result = getMetaImage(src);
    expect(result).toStrictEqual({});
  });

  test('Generates correct object', () => {
    const src = '/test.png';
    const expectedOutput = {
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_URL}${src}`,
        },
      ],
    };
    const result = getMetaImage(src);
    expect(result).toStrictEqual(expectedOutput);
  });
});
