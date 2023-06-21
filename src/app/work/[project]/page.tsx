import { PATHS } from '@utils/common/constants/paths.constants';
import { flex, grid, stack } from 'ds/patterns';
import { Metadata } from 'next';
import { BackToLink } from '../../_components/back-to-link';
import { css, cva } from 'ds/css';
import { getYear } from 'date-fns';
import Link from 'next/link';
import { ArrowTopRightIcon } from '@components/common/icons/ArrowTopRightIcon';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { RichTextContent } from '@graphcms/rich-text-types';
import { Media } from '@/app/_components/media';
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@/app/_components/scroll-area';
import { MoreProjects } from './_components/more-projects';
import { getProject } from '../_helpers/projects';

export const generateMetadata = async ({
  params,
}: {
  params: { project: string };
}): Promise<Metadata> => {
  const data = await getProject(params.project);

  const { project } = data;

  if (!project) {
    return {};
  }

  const { seo } = project;

  const url = new URL(`${PATHS.base}${PATHS.work}/${params.project}`);
  const title = seo.title;
  const description = seo.description ?? undefined;

  return {
    title,
    description,
    metadataBase: url,
    openGraph: {
      url,
      type: 'article',
      authors: ['https://twitter.com/jennings_hunter'],
      locale: 'en_US',
      images:
        seo.image?.url != null
          ? [
              {
                url: seo.image.url,
              },
            ]
          : undefined,
      title,
      description,
    },
  };
};

export default async function Project({
  params,
}: {
  params: { project: string };
}) {
  const data = await getProject(params.project);

  const { project } = data;

  const { name, client, contribution, date, link, media, descriptionLong } =
    project ?? {};

  return (
    <div className={stack({ gap: '3xl' })}>
      <div className={stack({ gap: 'xl' })}>
        <div>
          <BackToLink href={PATHS.work}>Back to work</BackToLink>
          <div
            className={flex({
              wrap: 'wrap',
              gap: '3xs',
              justify: 'space-between',
              align: 'baseline',
              direction: { base: 'column', bp2: 'row' },
            })}
          >
            <h1 className={css({ textStyle: 'heading' })}>{name}</h1>
            {client?.name != null && (
              <h2
                className={css({
                  textStyle: 'base',
                  color: 'text2',
                  fontSize: '1',
                })}
              >
                {client.name}
              </h2>
            )}
          </div>
        </div>
        <ScrollAreaRoot
          className={css({
            h: 'full',
            w: 'full',
            overflow: 'hidden',
          })}
        >
          <ScrollAreaScrollbar
            className={flex({
              bgColor: 'uiBg',
              userSelect: 'none',
              touchAction: 'none',
              p: 2,
              h: SCROLLBAR_SIZE,
              transition: 'background-color 160ms ease-out',
              '&[data-orientation="horizontal"]': {
                flexDirection: 'column',
              },
              _hover: {
                bgColor: 'slate4',
              },
            })}
            orientation='horizontal'
          >
            <ScrollAreaThumb
              className={css({
                backgroundColor: 'surface2',
                pos: 'relative',
                flex: '1',
                borderRadius: SCROLLBAR_SIZE,
                _before: {
                  content: '',
                  pos: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  w: '100%',
                  h: '100%',
                  minW: 44,
                  minH: 44,
                },
              })}
            />
          </ScrollAreaScrollbar>
          <ScrollAreaViewport
            className={css({
              h: 'full',
              w: 'full',
              borderRadius: 'inherit',
            })}
          >
            <div
              className={css({
                mb: { bp1Down: 'l' },
                display: 'grid',
                gap: 's',
                gridTemplateColumns: 'repeat(3, 40%)',
                bp1: {
                  gridTemplateColumns: 'repeat(3, 1fr)',
                },
              })}
            >
              {media?.map(({ mediaType, url }, idx) => {
                if (mediaType == null) return null;
                const isEven = (idx + 1) % 2 === 0;
                const width = isEven ? 220 : 460;
                const height = 275;

                const item = (idx % 3) as 0 | 1 | 2;
                const sizes = [
                  '(max-width: 519px) 78vw, (max-width: 740px) 60vw, 460px',
                  '(max-width: 519px) 38vw, (max-width: 740px) 30vw, 220px',
                  '(max-width: 519px) 120vw, (max-width: 740px) 100vw, 418px',
                ] as const;

                return (
                  <div className={mediaContainer({ item })} key={idx}>
                    <Media
                      type={mediaType}
                      url={url}
                      width={width}
                      height={height}
                      sizes={sizes[item]}
                    />
                  </div>
                );
              })}
            </div>
          </ScrollAreaViewport>
        </ScrollAreaRoot>
        <div className={stack({ gap: 'xs' })}>
          <h3
            className={css({
              textStyle: 'base',
              color: 'text2',
              fontSize: '1',
              lineHeight: 'tight',
            })}
          >
            Description
          </h3>
          {descriptionLong ? (
            <RichText
              renderers={{
                p: ({ children }) => (
                  <p
                    className={css({
                      textStyle: 'body',
                      mb: 'm',
                    })}
                  >
                    {children}
                  </p>
                ),
              }}
              content={descriptionLong.raw as RichTextContent}
            />
          ) : null}
        </div>
        <div className={grid({ gap: 'm', columns: { base: 2, bp1: 3 } })}>
          <div className={stack({ gap: 'xs' })}>
            <h3
              className={css({
                textStyle: 'base',
                color: 'text2',
                fontSize: '1',
                lineHeight: 'tight',
              })}
            >
              Contributions
            </h3>
            <ul className={flex({ gap: '2xs', wrap: 'wrap' })}>
              {contribution?.map((c, i) => (
                <li
                  className={chip({
                    variant: i % 2 === 0 ? 'default' : 'darker',
                  })}
                  key={c}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={stack({
              gap: 'm',
              justify: 'left',
              gridColumn: { bp1: 'span 2 / -1' },
            })}
          >
            <div className={stack({ gap: 'xs' })}>
              <h3
                className={css({
                  textStyle: 'base',
                  color: 'text2',
                  fontSize: '1',
                  lineHeight: 'tight',
                })}
              >
                Dates
              </h3>
              <p
                className={css({
                  textStyle: 'base',
                  lineHeight: 'tight',
                  fontSize: '1',
                })}
              >
                {date?.map((d, i) => {
                  return (
                    <span
                      className={css({
                        textStyle: 'base',
                        lineHeight: 'tight',
                        fontSize: '1',
                      })}
                      key={i}
                    >
                      {i > 0 ? ' - ' : ''}
                      {getYear(new Date(d as string))}
                    </span>
                  );
                })}
              </p>
            </div>
            <div>
              {link != null && (
                <Link
                  className={buttonLink}
                  title={`Visit ${link}`}
                  href={link}
                >
                  <span>Visit Site</span>
                  <ArrowTopRightIcon />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={stack({ gap: 's' })}>
        <h3
          className={css({
            color: 'text2',
            fontSize: '1',
            lineHeight: 'tight',
          })}
        >
          Other Projects
        </h3>
        {/* @ts-expect-error - Async Server Component */}
        <MoreProjects current={params.project} />
      </div>
    </div>
  );
}

const chip = cva({
  base: {
    whiteSpace: 'nowrap',
    fontSize: 12,
    px: '2xs',
    py: '3xs',
    rounded: 'pill',
    lineHeight: 'tight',
  },
  variants: {
    variant: {
      darker: {
        backgroundColor: 'gold5',
        color: 'gold10',
      },
      default: {
        backgroundColor: 'gold7',
        color: 'gold10',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const buttonLink = css({
  display: 'inline-flex',
  gap: '2xs',
  lineHeight: 'tight',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1',
  px: 's',
  transition: 'default',
  bgColor: 'surface1',
  rounded: 5,
  border: '1px solid',
  borderColor: 'surface2',
  minW: 90,
  minH: 40,
  transitionProperty: 'backgroundColor, opacity',
  _hover: {
    bgColor: 'slate4',
  },
});

const SCROLLBAR_SIZE = 10;

const mediaContainer = cva({
  base: {
    isolation: 'isolate',
    overflow: 'hidden',
    rounded: 'card',
    h: 'full',
    bgColor: 'slate8',
  },
  variants: {
    item: {
      0: {
        gridColumn: '1 / span 2',
      },
      1: {
        gridColumn: '3 / -1',
      },
      2: {
        gridColumn: '1 / -1',
      },
    },
  },
});
