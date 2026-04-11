import { AspectRatioRoot } from '@/app/_components/aspect-ratio';
import { BackToLink } from '@/app/_components/back-to-link';
import { ProjectCard } from '@/app/_components/project-card';
import { ProjectImage } from '@/app/_components/project-image';
import { PATHS } from '@/app/_utils/constants/paths.constants';
import { getAllProjects, type Project } from '@/app/_utils/content';
import { css } from 'ds/css';
import { grid, linkBox, linkOverlay, stack } from 'ds/patterns';
import { token } from 'ds/tokens';
import { Metadata } from 'next';
import Link from 'next/link';

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

export default function Work() {
  const projects = getAllProjects();

  const featuredProject = projects.find((project) => project.featured);

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
              <li key={project.slug}>
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
  project: Project;
}
const FeaturedProject = ({ project }: FeaturedProjectProps) => {
  const { featuredMediaWide, slug, name, description } = project;
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
            {featuredMediaWide.mediaType === 'IMAGE' ? (
              <div
                className={css({
                  rounded: 'card',
                  h: 'full',
                  bgColor: 'slate8',
                })}
                style={{ overflow: 'hidden', isolation: 'isolate' }}
              >
                <AspectRatioRoot ratio={460 / 275}>
                  <ProjectImage
                    src={featuredMediaWide.url}
                    alt={featuredMediaWide.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    quality={100}
                    sizes='(max-width) 100vw, 460px'
                  />
                </AspectRatioRoot>
              </div>
            ) : (
              <div
                className={css({
                  rounded: 'card',
                  h: 'full',
                  bgColor: 'slate8',
                })}
                style={{ overflow: 'hidden', isolation: 'isolate' }}
              >
                <AspectRatioRoot ratio={460 / 275}>
                  <video
                    src={featuredMediaWide.url}
                    style={{ objectFit: 'cover', height: '100%' }}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={false}
                  />
                </AspectRatioRoot>
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
              <p
                className={css({
                  fontSize: '1',
                  color: 'text2',
                  pt: '3xs',
                })}
              >
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
