import { graphql } from '@/graphql/generated';
import { cmsRequest } from '@/graphql/client';
import { ds } from '@/styles/ds.css';
import { grid } from '@/styles/primitives/grid.css';
import { stack } from '@/styles/primitives/stack.css';
import { pageHeader, text } from '@/styles/primitives/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import { BackToLink } from '@components/common/BackToLink';
import { LinkBox } from '@components/common/LinkBox/LinkBox';
import { Media } from '@components/common/Media';
import { ProjectCard } from '@components/common/ProjectCard';
import { Seo } from '@components/common/Seo';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { RichTextContent } from '@graphcms/rich-text-types';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { PATHS } from '@utils/common/constants/paths.constants';
import { calc } from '@vanilla-extract/css-utils';
import clsx from 'clsx';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';

const QUERY_KEY = 'GetProjects';

const GET_PROJECTS_QUERY = graphql(`
  query GetProjects($count: Int = 25) {
    projects(orderBy: date_DESC, first: $count) {
      id
      name
      featured
      slug
      category
      description {
        raw
      }
      featureMediaWide {
        url
        mediaType
      }
      featureMediaNarrow {
        url
        mediaType
      }
    }
  }
`);

const Work = ({
  preview,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const { data } = useQuery(
    [QUERY_KEY],
    cmsRequest({ query: GET_PROJECTS_QUERY, preview }),
    {
      staleTime: Infinity,
    },
  );

  const { projects } = data ?? {};

  const featuredProject = projects
    ?.filter((project) => Boolean(project.featured))
    .map((project) => project)[0];
  const title = 'Work';
  const description = 'A curated collection of my work throughout the years.';

  return (
    <>
      <Seo
        title={title}
        description={description}
        url={`${PATHS.base}${PATHS.work}`}
        image={`${PATHS.og}?title=${title}&subtitle=${description}`}
      />
      <div className={stack({ gap: 'xl' })}>
        <div>
          <BackToLink href={PATHS.home}>Back to home</BackToLink>
          <h1 className={pageHeader}>Work</h1>
        </div>
        {featuredProject ? (
          <div className={stack({ gap: 'm' })}>
            <h2 className={text({ size: '2', leading: 'tight' })}>Featured</h2>
            <LinkBox.Root>
              <div
                className={sprinkles({
                  paddingX: 's',
                  paddingTop: 's',
                  paddingBottom: 'm',
                  backgroundColor: 'slate3',
                })}
                style={{
                  borderRadius: calc(ds.tokens.space.s)
                    .add(ds.tokens.radii.card)
                    .toString(),
                }}
              >
                <div className={stack({ gap: 'm' })}>
                  {featuredProject.featureMediaWide.mediaType != null && (
                    <div
                      className={sprinkles({
                        borderRadius: 'card',
                        height: 'full',
                        backgroundColor: 'slate8',
                      })}
                      style={{ overflow: 'hidden', isolation: 'isolate' }}
                    >
                      <Media
                        type={featuredProject.featureMediaWide.mediaType}
                        url={featuredProject.featureMediaWide.url}
                        width={460}
                        height={275}
                        sizes='(max-width) 100vw, 460px'
                      />
                    </div>
                  )}
                  <div>
                    <LinkBox.Target
                      href={`${PATHS.work}/[project]`}
                      as={`${PATHS.work}/${featuredProject.slug}`}
                    >
                      <p
                        className={text({ size: '1' })}
                        style={{ display: 'inline-block' }}
                      >
                        {featuredProject.name}
                      </p>
                    </LinkBox.Target>
                    <RichText
                      renderers={{
                        p: ({ children }) => (
                          <p
                            className={clsx(
                              sprinkles({ paddingTop: '3xs' }),
                              text({ size: '1', color: '2' }),
                            )}
                          >
                            {children}
                          </p>
                        ),
                      }}
                      content={
                        featuredProject.description.raw as RichTextContent
                      }
                    />
                  </div>
                </div>
              </div>
            </LinkBox.Root>
          </div>
        ) : null}
        <div className={stack({ gap: 'm' })}>
          <h2 className={text({ size: '2', leading: 'tight' })}>All Work</h2>
          <ul
            className={grid({ gap: 's', gapY: 'm' })}
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            }}
          >
            {projects?.map((project) => {
              return (
                <li key={project.id}>
                  <ProjectCard
                    project={project}
                    sizes='(max-width: 449px) 100vw, (max-width: 767px) 50vw, 220px'
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<{ preview: boolean }> = async ({
  preview = false,
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  const initialData = await queryClient.fetchQuery({
    queryKey: [QUERY_KEY],
    queryFn: cmsRequest({
      preview,
      query: GET_PROJECTS_QUERY,
    }),
  });

  if (initialData.projects.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      preview,
    },
  };
};

export default Work;
