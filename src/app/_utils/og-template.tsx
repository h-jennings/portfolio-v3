import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

const fontsDir = join(process.cwd(), 'src/app/_assets/fonts');

const getSansSerifFont = (): ArrayBuffer => {
  const buffer = readFileSync(join(fontsDir, 'basiercircle-regular.otf'));
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  );
};

const getSerifFont = (): ArrayBuffer => {
  const buffer = readFileSync(
    join(fontsDir, 'untitled-serif-regular-italic.otf'),
  );
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  );
};

const DEFAULT_TITLE = 'Hunter Jennings';
const DEFAULT_SUB =
  'Frontend ui engineer interested in design systems, component architectures, and React.';

export const ogTemplate = ({
  title,
  sub,
}: {
  title?: string;
  sub?: string;
} = {}) => {
  return new ImageResponse(
    <div
      tw='flex bg-black h-full justify-center w-full'
      style={{ padding: 60 }}
    >
      <span
        tw='absolute text-white'
        style={{
          fontSize: 30,
          top: 60,
          lineHeight: 1,
          left: 60,
          fontFamily: 'Basier',
        }}
      >
        H—J
      </span>
      <div
        tw='flex h-full w-full flex-col justify-center'
        style={{
          maxWidth: 700,
        }}
      >
        <div tw='flex'>
          <h1
            tw='text-white p-0 m-0'
            style={{
              lineHeight: 1,
              fontFamily: 'Untitled',
              fontSize: 40,
              fontStyle: 'italic',
              marginBottom: 40,
            }}
          >
            {title ?? DEFAULT_TITLE}
          </h1>
        </div>
        <div tw='flex'>
          <p
            tw='text-gray-400 p-0 m-0'
            style={{
              fontFamily: 'Basier',
              lineHeight: 1.33,
              fontSize: 30,
              fontStyle: 'normal',
            }}
          >
            {sub ?? DEFAULT_SUB}
          </p>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Untitled',
          data: getSerifFont(),
          weight: 400,
          style: 'italic',
        },
        {
          name: 'Basier',
          data: getSansSerifFont(),
          weight: 400,
          style: 'normal',
        },
      ],
    },
  );
};
