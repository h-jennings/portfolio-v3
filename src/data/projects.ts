import { PATHS } from '@/constants/paths';
import { ProjectIdentifiers } from '@/types/projects';

export interface Project {
  tags: string[];
  project: string;
  client: string;
  description: string;
  path: `${typeof PATHS.work}/${string}`;
}

export const projectMetaData: Record<ProjectIdentifiers, Project> = {
  dwr: {
    project: 'Digital War Room',
    client: 'Department of Defense',
    description:
      'A supply chain management application which provided insights and analysis for the U.S. Department of Defense.',
    tags: ['DEVELOPMENT', 'DESIGN SYSTEM'],
    path: PATHS.dwr,
  },
  nfip: {
    project: 'National Flood Insurance Program',
    client: 'FEMA',
    description:
      "An expansive suite of microservices for FEMA's National Flood Insurance Program.",
    tags: ['DEVELOPMENT'],
    path: PATHS.nfip,
  },
  'portfolio-v2': {
    project: 'Portfolio V2',
    client: 'Personal',
    description:
      "Hunter's previous portfolio of work. Built with TypeScript and React on Next.js",
    tags: ['DEVELOPMENT', 'DESIGN SYSTEM', 'UI DESIGN'],
    path: PATHS.portfolioV2,
  },
};
