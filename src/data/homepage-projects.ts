import { PATHS } from '@/constants/paths';

export interface HomepageProject {
  tags: string[];
  title: string;
  body: string;
  path: `${typeof PATHS.work}/${string}`;
}

export const homepageProjects: HomepageProject[] = [
  {
    title: 'Digital War Room — Department of Defense',
    body: 'A supply chain management application which provided insights and analysis for the U.S. Department of Defense.',
    tags: ['DEVELOPMENT', 'DESIGN SYSTEM'],
    path: PATHS.dwr,
  },
  {
    title: 'National Flood Insurance Program — FEMA',
    body: "An expansive suite of microservices for FEMA's National Flood Insurance Program.",
    tags: ['DEVELOPMENT'],
    path: PATHS.nfip,
  },
  {
    title: 'Portfolio V2',
    body: "Hunter's previous portfolio of work. Built with TypeScript and React on Next.js",
    tags: ['DEVELOPMENT', 'DESIGN SYSTEM', 'UI DESIGN'],
    path: PATHS.portfolioV2,
  },
];
