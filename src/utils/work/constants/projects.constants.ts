import { PATHS } from '@utils/common/constants/paths.constants';
import { ProjectIdentifiers } from '@utils/work/types/projects';

type ProjectMedia = {
  url: string;
} & (
  | {
      type: 'image';
    }
  | {
      type: 'video';
    }
);

export interface ProjectMeta {
  tags: string[];
  project: string;
  client: string;
  featured?: boolean;
  featureImageNarrow: string;
  featureImageWide: ProjectMedia;
  media: ProjectMedia[];
  description: string;
  path: `${typeof PATHS.work}/${string}`;
}

const SHARED_PROJECT_DATA: Record<
  ProjectIdentifiers,
  Pick<
    ProjectMeta,
    | 'client'
    | 'project'
    | 'featured'
    | 'path'
    | 'featureImageNarrow'
    | 'featureImageWide'
    | 'media'
  >
> = {
  'audible-quiz': {
    client: 'Audible',
    path: PATHS['audible-quiz'],
    project: 'Audible Lite Quiz',
    featured: true,
    featureImageNarrow: '/images/work/audible-quiz/audible-quiz-narrow.jpg',
    featureImageWide: {
      type: 'video',
      url: '/videos/work/audible-quiz/audible-quiz-video.mp4',
    },
    media: [
      {
        type: 'image',
        url: '/images/work/audible-quiz/audible-quiz-desktop-wide.jpg',
      },
      {
        type: 'image',
        url: '/images/work/audible-quiz/audible-quiz-narrow.jpg',
      },
      {
        type: 'video',
        url: '/videos/work/audible-quiz/audible-quiz-video.mp4',
      },
    ],
  },
  'portfolio-v2': {
    client: 'Personal',
    path: PATHS.portfolioV2,
    project: 'Portfolio V2',
    featureImageNarrow:
      '/images/work/portfolio-v2/portfolio-v2-phone-narrow.jpg',
    featureImageWide: {
      type: 'image',
      url: '/images/work/portfolio-v2/portfolio-v2-desktop-wide.jpg',
    },
    media: [
      {
        type: 'image',
        url: '/images/work/portfolio-v2/portfolio-v2-desktop-wide.jpg',
      },
      {
        type: 'image',
        url: '/images/work/portfolio-v2/portfolio-v2-phone-narrow.jpg',
      },
    ],
  },
  dwr: {
    client: 'Department of Defense',
    path: PATHS.dwr,
    project: 'Digital War Room',
    featureImageNarrow: '/images/work/dwr/dwr-logo-narrow.jpg',
    featureImageWide: {
      type: 'image',
      url: '/images/work/dwr/dwr-phones-wide.jpg',
    },
    media: [
      {
        type: 'image',
        url: '/images/work/dwr/dwr-phones-wide.jpg',
      },
      {
        type: 'image',
        url: '/images/work/dwr/dwr-logo-narrow.jpg',
      },
    ],
  },
  nfip: {
    project: 'NFIP',
    client: 'FEMA',
    path: PATHS.nfip,
    featureImageNarrow: '/images/work/nfip/nfip-logo-narrow.jpg',
    featureImageWide: {
      type: 'image',
      url: '/images/work/nfip/nfip-laptop-wide.jpg',
    },
    media: [
      {
        type: 'image',
        url: '/images/work/nfip/nfip-laptop-wide.jpg',
      },
      {
        type: 'image',
        url: '/images/work/nfip/nfip-logo-narrow.jpg',
      },
    ],
  },
};

export const PROJECT_METADATA: Record<ProjectIdentifiers, ProjectMeta> = {
  'audible-quiz': {
    ...SHARED_PROJECT_DATA['audible-quiz'],
    description:
      'A hands-free, all-purpose quiz creation platform powered by Contentful for the Audible Marketing Team.',
    tags: ['Development'],
  },
  dwr: {
    ...SHARED_PROJECT_DATA.dwr,
    description:
      'A supply chain management application which provided insights and analysis for the U.S. Department of Defense.',
    tags: ['Development', 'Design'],
  },
  'portfolio-v2': {
    ...SHARED_PROJECT_DATA['portfolio-v2'],
    description:
      "Hunter's previous portfolio of work. Built with TypeScript and React on Next.js",
    tags: ['Development', 'Design'],
  },
  nfip: {
    ...SHARED_PROJECT_DATA.nfip,
    description:
      "An expansive suite of microservices for FEMA's National Flood Insurance Program.",
    tags: ['Development'],
  },
};

export type ProjectPageData = Pick<
  ProjectMeta,
  'client' | 'project' | 'path' | 'media'
> & {
  details: string;
  contributions: string[];
  metaImage?: string;
  dates: string;
  url?: string;
};

export const PROJECT_PAGE_DATA: Record<ProjectIdentifiers, ProjectPageData> = {
  'audible-quiz': {
    ...SHARED_PROJECT_DATA['audible-quiz'],
    contributions: [
      'Development',
      'Design Systems',
      'Architecture',
      'Contentful',
    ],
    metaImage: '/images/work/audible-quiz/audible-quiz-desktop-wide.jpg',
    details: `An interactive quiz creation tool for Audible's marketing team. With this tool, their team was able to rapidly launch engaging quizzes—all without any internal design or development support. Built with Next.js and powered by Contentful.`,
    dates: '11/2021',
    url: PATHS.audibleQuizUrl,
  },
  dwr: {
    ...SHARED_PROJECT_DATA.dwr,
    contributions: ['Development', 'Design Systems', 'Architecture', 'Tooling'],
    metaImage: '/images/work/dwr/dwr-phones-wide.jpg',
    details:
      'The F-35 Joint Strike Fighter Program needed a way to make sense of data disseminated across a massive, multi-decade long project to create the next generation of defense technology. Using interactive visualizations and world class design the application cuts through the noise and provides stakeholders with a single source of truth about the aircraft they need insights on.',
    dates: '02/2020 - 02/2021',
  },
  'portfolio-v2': {
    ...SHARED_PROJECT_DATA['portfolio-v2'],
    contributions: ['Development', 'Design', 'Design System'],
    metaImage: '/images/work/portfolio-v2/portfolio-v2-desktop-wide.jpg',
    dates: '2019 - 2021',
    details: `This was the second version of my portfolio built on Next.js with React, and TypeScript. When starting a fresh project, I always search for a challenge—an excuse to learn something new and feel uncomfortable. For this project it was motion design. Using the amazing library framer-motion, I created a suite of declarative, reusable animations in React. Everything from page transitions to revealing text and images on scroll—all orchestrated to enhance the overall design aesthetic of the site.
`,
    url: PATHS.portfolioV2Url,
  },
  nfip: {
    ...SHARED_PROJECT_DATA.nfip,
    contributions: ['Development', 'Design Systems', 'Architecture', 'Tooling'],
    metaImage: '/images/work/nfip/nfip-laptop-wide.jpg',
    details: `The National Flood Insurance Program's (NFIP) PIVOT is an expansive suite of web-based microservices that, collectively, facilitate how insurance companies work with the federal government and assist flood victims across the country—faced with the disaster of loosing their home.`,
    dates: '02/2021 - 11/2021',
  },
};
