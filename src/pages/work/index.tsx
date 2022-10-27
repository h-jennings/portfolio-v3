/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import {
  GetProjectsDocument,
  GetProjectsQuery,
  useGetProjectsQuery,
} from '@/graphql/generated/types.generated';
import { spawnHygraphCMSClientInstance, withUrqlSSR } from '@/graphql/urql';
import { grid } from '@/styles/elements/grid.css';
import { stack } from '@/styles/elements/stack.css';
import { pageHeader, text } from '@/styles/elements/text.css';
import { sprinkles } from '@/styles/sprinkles.css';
import { tokenVars } from '@/styles/tokens.css';
import { BackToLink } from '@components/common/BackToLink';
import { LinkBox } from '@components/common/LinkBox/LinkBox';
import { Media } from '@components/common/Media';
import { ProjectCard } from '@components/common/ProjectCard';
import { Seo } from '@components/common/Seo';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { RichTextContent } from '@graphcms/rich-text-types';
import { PATHS } from '@utils/common/constants/paths.constants';
import { calc } from '@vanilla-extract/css-utils';
import clsx from 'clsx';
import { GetStaticProps } from 'next';

const Work = () => {
  const [{ data }] = useGetProjectsQuery();
  const { projects } = data ?? {};

  const featuredProject = projects
    ?.filter((project) => Boolean(project.featured))
    .map((project) => project)[0];

  return (
    <>
      <Seo
        title='Work'
        description='A curated collection of my work throughout the years.'
        url={`${PATHS.base}${PATHS.work}`}
      />
      <div className={stack({ gap: 'xl' })}>
        <div>
          <BackToLink href={PATHS.home}>Back to home</BackToLink>
          <h1 className={pageHeader}>Work</h1>
        </div>
        {featuredProject ? (
          <div className={stack({ gap: 'm' })}>
            <h2 className={text({ size: 2, leading: 'tight' })}>Featured</h2>
            <LinkBox.Root>
              <div
                className={sprinkles({
                  paddingX: 's',
                  paddingTop: 's',
                  paddingBottom: 'm',
                  backgroundColor: 'slate3',
                })}
                style={{
                  borderRadius: calc(tokenVars.space.s)
                    .add(tokenVars.radii.card)
                    .toString(),
                }}
              >
                <div className={stack({ gap: 'm' })}>
                  {featuredProject.featureMediaWide.mediaType ? (
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
                  ) : null}
                  <div>
                    <LinkBox.Target
                      href={`${PATHS.work}/[project]`}
                      as={`${PATHS.work}/${featuredProject.slug}`}
                    >
                      <p
                        className={text({ size: 1 })}
                        style={{ display: 'inline-block' }}
                      >
                        {featuredProject.name}
                      </p>
                    </LinkBox.Target>
                    {featuredProject.description ? (
                      <RichText
                        renderers={{
                          p: ({ children }) => (
                            <p
                              className={clsx(
                                sprinkles({ paddingTop: '3xs' }),
                                text({ size: 1, color: 2 }),
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
                    ) : null}
                  </div>
                </div>
              </div>
            </LinkBox.Root>
          </div>
        ) : null}
        <div className={stack({ gap: 'm' })}>
          <h2 className={text({ size: 2, leading: 'tight' })}>All Work</h2>
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

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const { client, ssrCache } = spawnHygraphCMSClientInstance(preview);
  const projectsData = await client
    ?.query<GetProjectsQuery>(GetProjectsDocument, {})
    .toPromise();

  if (!projectsData?.data?.projects) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};

export default withUrqlSSR(Work);
