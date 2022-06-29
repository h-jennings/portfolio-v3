import { PATHS } from '@utils/common/constants/paths.constants';
import { ProjectIdentifiers } from '@utils/work/types/projects';

export interface ProjectMeta {
  tags: string[];
  project: string;
  client: string;
  images: [string, string];
  description: string;
  path: `${typeof PATHS.work}/${string}`;
}

const SHARED_PROJECT_DATA: Record<
  ProjectIdentifiers,
  Pick<ProjectMeta, 'client' | 'project' | 'path' | 'images'>
> = {
  'portfolio-v2': {
    client: 'Personal',
    path: PATHS.portfolioV2,
    project: 'Portfolio V2',
    images: [
      '/images/work/portfolio-v2/portfolio-v2-desktop-wide.jpg',
      '/images/work/portfolio-v2/portfolio-v2-phone-narrow.jpg',
    ],
  },
  dwr: {
    client: 'Department of Defense',
    path: PATHS.dwr,
    project: 'Digital War Room',
    images: [
      '/images/work/dwr/dwr-phones-wide.jpg',
      '/images/work/dwr/dwr-logo-narrow.jpg',
    ],
  },
  nfip: {
    project: 'NFIP',
    client: 'FEMA',
    path: PATHS.nfip,
    images: [
      '/images/work/nfip/nfip-laptop-wide.jpg',
      '/images/work/nfip/nfip-logo-narrow.jpg',
    ],
  },
};

export const PROJECT_METADATA: Record<ProjectIdentifiers, ProjectMeta> = {
  dwr: {
    ...SHARED_PROJECT_DATA.dwr,
    description:
      'A supply chain management application which provided insights and analysis for the U.S. Department of Defense.',
    tags: ['Development', 'Design'],
  },
  nfip: {
    ...SHARED_PROJECT_DATA.nfip,
    description:
      "An expansive suite of microservices for FEMA's National Flood Insurance Program.",
    tags: ['Development'],
  },
  'portfolio-v2': {
    ...SHARED_PROJECT_DATA['portfolio-v2'],
    description:
      "Hunter's previous portfolio of work. Built with TypeScript and React on Next.js",
    tags: ['Development', 'Design'],
  },
};

export type ProjectPageData = Pick<
  ProjectMeta,
  'client' | 'project' | 'path' | 'images'
> & {
  details: string;
  tech: string[];
  contributions: string[];
  metaImage?: string;
  dates: string;
  url?: string;
};
export const PROJECT_PAGE_DATA: Record<ProjectIdentifiers, ProjectPageData> = {
  dwr: {
    ...SHARED_PROJECT_DATA.dwr,
    contributions: ['Development', 'Design Systems', 'Architecture', 'Tooling'],
    metaImage: '/images/work/dwr/dwr-phones-wide.jpg',
    details:
      'The F-35 Joint Strike Fighter Program needed a way to make sense of data disseminated across a massive, multi-decade long project to create the next generation of defense technology. Using interactive visualizations and world class design the application cuts through the noise and provides stakeholders with a single source of truth about the aircraft they need insights on.',
    dates: '02/2020 - 02/2021',
    tech: [
      'Angular',
      'TypeScript',
      'NgRx',
      'Jest',
      'RxJs',
      'Testing Library',
      'SCSS',
      'D3',
      'Azure AD',
    ],
  },
  nfip: {
    ...SHARED_PROJECT_DATA.nfip,
    contributions: ['Development', 'Design Systems', 'Architecture', 'Tooling'],
    metaImage: '/images/work/nfip/nfip-laptop-wide.jpg',
    details: `The National Flood Insurance Program's (NFIP) PIVOT is an expansive suite of web-based microservices that, collectively, facilitate how insurance companies work with the federal government and assist flood victims across the country—faced with the disaster of loosing their home.`,
    dates: '02/2021 - 11/2021',
    tech: [
      'Angular',
      'TypeScript',
      'NgRx',
      'RxJs',
      'Jest',
      'Testing Library',
      'SCSS',
    ],
  },
  'portfolio-v2': {
    ...SHARED_PROJECT_DATA['portfolio-v2'],
    contributions: ['Development', 'Design', 'Design System'],
    metaImage: '/images/work/portfolio-v2/portfolio-v2-desktop-wide.jpg',
    dates: '2019 - 2021',
    details: `This was the second version of my portfolio built on Next.js with React, and TypeScript. When starting a fresh project, I always search for a challenge—an excuse to learn something new and feel uncomfortable. For this project it was motion design. Using the amazing library framer-motion, I created a suite of declarative, reusable animations in React. Everything from page transitions to revealing text and images on scroll—all orchestrated to enhance the overall design aesthetic of the site.
`,
    url: PATHS.portfolioV2Url,
    tech: [
      'React',
      'Next.js',
      'TypeScript',
      'XState',
      'Framer Motion',
      'Testing Library',
      'Cypress',
    ],
  },
};
