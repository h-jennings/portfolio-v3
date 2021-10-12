import { PATHS } from '@/constants/paths';
import { ProjectIdentifiers } from '@/types/projects';

export interface ProjectMeta {
  tags: string[];
  project: string;
  client: string;
  description: string;
  path: `${typeof PATHS.work}/${string}`;
}

const sharedProjectData: Record<
  ProjectIdentifiers,
  Pick<ProjectMeta, 'client' | 'project' | 'path'>
> = {
  'portfolio-v2': {
    client: 'Personal',
    path: PATHS.portfolioV2,
    project: 'Portfolio V2',
  },
  dwr: {
    client: 'Department of Defense',
    path: PATHS.dwr,
    project: 'Digital War Room',
  },
  nfip: {
    project: 'National Flood Insurance Program',
    client: 'FEMA',
    path: PATHS.nfip,
  },
};

export const projectMetaData: Record<ProjectIdentifiers, ProjectMeta> = {
  dwr: {
    ...sharedProjectData.dwr,
    description:
      'A supply chain management application which provided insights and analysis for the U.S. Department of Defense.',
    tags: ['DEVELOPMENT', 'DESIGN SYSTEM'],
  },
  nfip: {
    ...sharedProjectData.nfip,
    description:
      "An expansive suite of microservices for FEMA's National Flood Insurance Program.",
    tags: ['DEVELOPMENT'],
  },
  'portfolio-v2': {
    ...sharedProjectData['portfolio-v2'],
    description:
      "Hunter's previous portfolio of work. Built with TypeScript and React on Next.js",
    tags: ['DEVELOPMENT', 'DESIGN SYSTEM', 'UI DESIGN'],
  },
};

export type ProjectPageData = Pick<
  ProjectMeta,
  'client' | 'project' | 'path'
> & {
  details: string;
  tech: string[];
  contribution: string[];
  images: string[];
};
export const projectPageData: Record<ProjectIdentifiers, ProjectPageData> = {
  dwr: {
    ...sharedProjectData.dwr,
    images: [''],
    contribution: [
      'Frontend Development',
      'Design Systems',
      'Application Architecture',
      'Build Tooling',
    ],
    details:
      'The F-35 Joint Strike Fighter Program needed a way to make sense of data disseminated across a massive, multi-decade long project to create the next generation of defense technology. Using interactive visualizations and world class design the application cuts through the noise and provides stakeholders with a single source of truth about the aircraft they need insights on.',
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
    ...sharedProjectData.nfip,
    images: [''],
    contribution: [
      'Frontend Development',
      'Design Systems',
      'Application Architecture',
      'Build Tooling',
    ],
    details: `The National Flood Insurance Program's (NFIP) PIVOT is an expansive suite of web-based microservices that, collectively, facilitate how insurance companies work with the federal government and assist flood victims across the country—faced with the disaster of loosing their home.`,
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
    ...sharedProjectData['portfolio-v2'],
    images: [''],
    contribution: ['Frontend Development', 'UI Design'],
    details: `This was the second version of my portfolio built on Next.js with React, and TypeScript. When starting a fresh project, I always search for a challenge—an excuse to learn something new and feel uncomfortable. For this project it was motion design. Using the amazing library framer-motion, I created a suite of declarative, reusable animations in React. Everything from page transitions to revealing text and images on scroll—all orchestrated to enhance the overall design aesthetic of the site.
`,
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
