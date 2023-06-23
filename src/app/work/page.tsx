import { RichText } from '@graphcms/rich-text-react-renderer';
import { PATHS } from '@/app/_utils/constants/paths.constants';
import { grid, linkBox, linkOverlay, stack } from 'ds/patterns';
import { Metadata } from 'next';
import { BackToLink } from '../_components/back-to-link';
import { css } from 'ds/css';
import Link from 'next/link';
import { token } from 'ds/tokens';
import { RichTextContent } from '@graphcms/rich-text-types';
import { ProjectCard } from '../_components/project-card';
import { Media } from '../_components/media';
import { getProjects } from '../_utils/helpers/projects.helpers';
import { ProjectInfoFragment } from '@/graphql/generated/cms.generated';

const title = 'Work';
const description = 'A curated collection of my work throughout the years.';
const url = new URL(`${PATHS.base}${PATHS.work}`);

export const metadata: Metadata = {
  title,
  description,
  robots: 'follow, index',
  openGraph: {
    url,
    type: 'website',
    locale: 'en_US',
    title,
    description,
  },
};

export default async function Work() {
  const { projects } = await getProjects();

  const featuredProject = projects.filter((project) =>
    Boolean(project.featured),
  )[0];

  return (
    <div className={stack({ gap: 'xl' })}>
      <div>
        <BackToLink href={PATHS.home}>Back to home</BackToLink>
        <h1 className={css({ textStyle: 'heading' })}>Work</h1>
      </div>
      {featuredProject ? <FeaturedProject project={featuredProject} /> : null}
      <div className={stack({ gap: 'm' })}>
        <h2
          className={css({
            textStyle: 'base',
            fontSize: '2',
            lineHeight: 'tight',
          })}
        >
          All Work
        </h2>
        <ul
          className={grid({ columnGap: 's', rowGap: 'm' })}
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          }}
        >
          {projects.map((project) => {
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
  );
}

interface FeaturedProjectProps {
  project: ProjectInfoFragment;
}
const FeaturedProject = ({ project }: FeaturedProjectProps) => {
  const { featureMediaWide, slug, name, description } = project;
  return (
    <div className={stack({ gap: 'm' })}>
      <h2
        className={css({
          textStyle: 'base',
          fontSize: '2',
          lineHeight: 'tight',
        })}
      >
        Featured
      </h2>
      <div className={linkBox()}>
        <div
          className={css({
            px: 's',
            pt: 's',
            pb: 'm',
            bgColor: 'slate3',
          })}
          style={{
            borderRadius: `calc(${token('spacing.s')} + ${token(
              'radii.card',
            )})`,
          }}
        >
          <div className={stack({ gap: 'm' })}>
            {featureMediaWide.mediaType != null && (
              <div
                className={css({
                  rounded: 'card',
                  h: 'full',
                  bgColor: 'slate8',
                })}
                style={{ overflow: 'hidden', isolation: 'isolate' }}
              >
                <Media
                  type={featureMediaWide.mediaType}
                  url={featureMediaWide.url}
                  width={460}
                  height={275}
                  sizes='(max-width) 100vw, 460px'
                />
              </div>
            )}
            <div>
              <Link className={linkOverlay()} href={`${PATHS.work}/${slug}`}>
                <p
                  className={css({
                    textStyle: 'base',
                    fontSize: '1',
                    display: 'inline-block',
                  })}
                >
                  {name}
                </p>
              </Link>
              <RichText
                renderers={{
                  p: ({ children }) => (
                    <p
                      className={css({
                        fontSize: '1',
                        color: 'text2',
                        pt: '3xs',
                      })}
                    >
                      {children}
                    </p>
                  ),
                }}
                content={description.raw as RichTextContent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
