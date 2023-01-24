/* eslint-disable no-console */
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const serifFont = fetch(
  new URL(
    '../../../../public/fonts/untitled-serif-regular-italic.otf',
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

const sansSerifFont = fetch(
  new URL('../../../../public/fonts/basiercircle-regular.otf', import.meta.url),
).then((res) => res.arrayBuffer());

const og = async (req: NextRequest) => {
  const [serif, sans] = await Promise.all([serifFont, sansSerifFont]);

  try {
    const { searchParams } = req.nextUrl;

    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Hunter Jennings';

    // ?subtitle=<subtitle>
    const hasSubTitle = searchParams.has('subtitle');
    const subTitle = hasSubTitle
      ? searchParams.get('subtitle')?.slice(0, 100)
      : `Frontend ui engineer interested in design systems, component architectures, and React.`;

    return new ImageResponse(
      (
        <div
          tw='flex bg-black h-full justify-center w-full'
          style={{ padding: 45 }}
        >
          <span
            tw='absolute text-white'
            style={{
              fontSize: 30,
              top: 45,
              lineHeight: 1,
              left: 45,
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
                  marginBottom: 45,
                }}
              >
                {title}
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
                {subTitle}
              </p>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Untitled',
            data: serif,
            weight: 400,
            style: 'italic',
          },
          {
            name: 'Basier',
            data: sans,
            weight: 400,
            style: 'normal',
          },
        ],
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return new Response(`Failed to generate the image`, { status: 500 });
  }
};

export default og;
