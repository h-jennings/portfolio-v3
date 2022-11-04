import { projectSlugs } from '@/api/cms.api';
import { GetProjectQuery } from '@/graphql/generated/types.generated';
import {
  prefetchProject,
  QUERY_KEY,
  useGetProjectQuery,
} from '@/graphql/queries/get-project';
import { buttonLink } from '@/styles/elements/button.css';
import * as sc from '@/styles/elements/scrollContainer.css';
import * as s from '@/styles/pages/project.css';
import { flex } from '@/styles/primitives/flex.css';
import { grid } from '@/styles/primitives/grid.css';
import { stack } from '@/styles/primitives/stack.css';
import { pageHeader, text } from '@/styles/primitives/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import { BackToLink } from '@components/common/BackToLink';
import { ArrowTopRightIcon } from '@components/common/icons/ArrowTopRightIcon';
import { Media } from '@components/common/Media';
import { RichText } from '@components/common/RichText/RichText';
import { Seo } from '@components/common/Seo';
import { ProjectLinks } from '@components/work/ProjectLinks/ProjectLinks';
import { RichTextContent } from '@graphcms/rich-text-types';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { dehydrate } from '@tanstack/react-query';
import { PATHS } from '@utils/common/constants/paths.constants';
import clsx from 'clsx';
import { getYear } from 'date-fns';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Project = ({
  projectIndex,
  slug,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { query } = useRouter();
  const { project: path } = query;
  const { data } = useGetProjectQuery(
    preview,
    { slug },
    { staleTime: 20 * 1000 },
  );
  const { project, projectsMeta } = data ?? {};
  const projectDataCMS = project?.[0];
  const {
    name,
    client,
    seo,
    media,
    contribution,
    date,
    link,
    descriptionLong,
  } = projectDataCMS ?? {};

  return (
    <>
      <Seo
        title={seo?.title}
        url={`${PATHS.base}/work/${path}`}
        description={seo?.description ?? undefined}
        image={seo?.image?.url}
      />
      <div className={stack({ gap: '3xl' })}>
        <div className={stack({ gap: 'xl' })}>
          <div>
            <BackToLink href={PATHS.work}>Back to work</BackToLink>
            <div
              className={clsx(
                flex({
                  wrap: 'wrap',
                  gap: '3xs',
                  justify: 'between',
                  align: 'baseline',
                }),
                sprinkles({ flexDirection: { initial: 'column', bp2: 'row' } }),
              )}
            >
              <h1 className={pageHeader}>{name}</h1>
              {client?.name ? (
                <h2 className={text({ color: 2, size: 1 })}>{client.name}</h2>
              ) : null}
            </div>
          </div>
          <ScrollAreaPrimitive.Root className={sc.scrollContainer.area}>
            <ScrollAreaPrimitive.Scrollbar
              className={sc.scrollContainer.scrollBar}
              orientation='horizontal'
            >
              <ScrollAreaPrimitive.Thumb
                className={sc.scrollContainer.scrollThumb}
              />
            </ScrollAreaPrimitive.Scrollbar>
            <ScrollAreaPrimitive.Viewport
              className={sc.scrollContainer.viewPort}
            >
              <div className={s.imageGrid}>
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
                    <div className={s.mediaContainer({ item })} key={idx}>
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
            </ScrollAreaPrimitive.Viewport>
          </ScrollAreaPrimitive.Root>
          <div className={stack({ gap: 'xs' })}>
            <h3 className={text({ color: 2, size: 1, leading: 'tight' })}>
              Description
            </h3>
            {descriptionLong ? (
              <RichText content={descriptionLong.raw as RichTextContent} />
            ) : null}
          </div>
          <div className={grid({ gap: 'm', columns: 3 })}>
            <div
              className={stack({ gap: 'xs' })}
              style={{ height: 'fit-content' }}
            >
              <h3 className={text({ color: 2, size: 1, leading: 'tight' })}>
                Contributions
              </h3>
              <div>
                <ul className={flex({ gap: '2xs', wrap: 'wrap' })}>
                  {contribution?.map((c, i) => (
                    <li
                      className={s.chip({
                        variant: i % 2 === 0 ? 'default' : 'darker',
                      })}
                      key={c}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className={stack({ gap: 'm', justify: 'left' })}
              style={{ gridColumn: 'span 2 / -1' }}
            >
              <div className={stack({ gap: 'xs' })}>
                <h3 className={text({ color: 2, size: 1, leading: 'tight' })}>
                  Dates
                </h3>
                <p className={text({ leading: 'tight', size: 1 })}>
                  {date?.map((d, i) => {
                    return (
                      <span
                        className={text({ leading: 'tight', size: 1 })}
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
                {link ? (
                  <Link
                    className={buttonLink}
                    title={`Visit ${link}`}
                    href={link}
                  >
                    <span>Visit Site</span>
                    <ArrowTopRightIcon />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className={stack({ gap: 's' })}>
          <h3 className={text({ color: 2, size: 1, leading: 'tight' })}>
            Other Projects
          </h3>
          <ProjectLinks
            projectIndex={projectIndex}
            projectsMeta={projectsMeta}
          />
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await projectSlugs.fetch();

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    await projectSlugs.cache.set(data);
  }

  const paths = data.projects.map((p) => {
    const { slug } = p;
    return {
      params: { project: slug },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<{
  projectIndex: number;
  preview: boolean;
  slug: string;
}> = async ({ params, preview = false }) => {
  const slug = params?.project;

  const queryClient = await prefetchProject(preview, { slug: slug as string });
  const data = queryClient.getQueryData<GetProjectQuery>([
    QUERY_KEY,
    { slug: slug as string },
    preview,
  ]);

  if (!data?.project[0]) {
    return {
      notFound: true,
    };
  }

  let p = await projectSlugs.cache.get();

  if (!p) {
    p = await projectSlugs.fetch();
  }

  const slugs = p.projects.map((proj) => proj.slug);
  const projectIndex = slugs.indexOf(slug as string);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      projectIndex,
      preview,
      slug: slug as string,
    },
  };
};

export default Project;
