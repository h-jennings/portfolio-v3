import { ArrowTopRightIcon } from '@/app/_components/icons/ArrowTopRightIcon';
import { PATHS } from '@/app/_utils/constants/paths.constants';
import { getAllProjects, getProjectBySlug } from '@/app/_utils/content';
import { getYear } from 'date-fns';
import { css, cva } from 'ds/css';
import { flex, grid, stack } from 'ds/patterns';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BackToLink } from '../../_components/back-to-link';
import { MoreProjects } from './_components/more-projects';
import { ProjectGallery } from './_components/project-gallery';

export const generateStaticParams = () => {
  return getAllProjects().map((p) => ({ project: p.slug }));
};

export const generateMetadata = async (props: {
  params: Promise<{ project: string }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const project = getProjectBySlug(params.project);

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
    openGraph: {
      url,
      type: 'article',
      authors: ['https://twitter.com/jennings_hunter'],
      locale: 'en_US',
      images:
        seo.image != null
          ? [
              {
                url: seo.image,
              },
            ]
          : undefined,
      title,
      description,
    },
  };
};

export default async function Project(props: {
  params: Promise<{ project: string }>;
}) {
  const params = await props.params;
  const project = getProjectBySlug(params.project);

  if (!project) {
    return notFound();
  }

  const { name, client, contribution, date, link, media } = project;

  const { default: Content } = (await import(
    `@/data/projects/${params.project}.mdx`
  )) as { default: () => React.ReactNode };

  return (
    <div className={stack({ gap: '3xl' })}>
      <div className={stack({ gap: 'xl' })}>
        <ProjectHeader name={name} client={client} />
        <ProjectGallery media={media} />
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
          <Content />
        </div>
        <div className={grid({ gap: 'm', columns: { base: 2, bp1: 3 } })}>
          <ProjectContributions contribution={contribution} />
          <div
            className={stack({
              gap: 'm',
              justify: 'left',
              gridColumn: { bp1: 'span 2 / -1' },
            })}
          >
            <ProjectDates date={date} />
            {link != null && <ProjectLink link={link} />}
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
        <MoreProjects current={params.project} />
      </div>
    </div>
  );
}

interface ProjectHeaderProps {
  name: string;
  client: string | null;
}
const ProjectHeader = ({ name, client }: ProjectHeaderProps) => {
  return (
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
        {client != null && (
          <h2
            className={css({
              textStyle: 'base',
              color: 'text2',
              fontSize: '1',
            })}
          >
            {client}
          </h2>
        )}
      </div>
    </div>
  );
};

interface ProjectContributionsProps {
  contribution: string[];
}
const ProjectContributions = ({ contribution }: ProjectContributionsProps) => {
  return (
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
        {contribution.map((c, i) => (
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
  );
};

interface ProjectDatesProps {
  date: string[];
}
const ProjectDates = ({ date }: ProjectDatesProps) => {
  return (
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
        {date.map((d, i) => {
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
              {getYear(new Date(d))}
            </span>
          );
        })}
      </p>
    </div>
  );
};

interface ProjectLinkProps {
  link: string;
}
const ProjectLink = ({ link }: ProjectLinkProps) => {
  return (
    <div>
      <Link className={buttonLink} title={`Visit ${link}`} href={link}>
        <span>Visit Site</span>
        <ArrowTopRightIcon />
      </Link>
    </div>
  );
};

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
        color: 'gold12',
      },
      default: {
        backgroundColor: 'gold7',
        color: 'gold12',
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
