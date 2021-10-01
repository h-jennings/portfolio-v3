export interface HomepageProject {
  tags: string[];
  title: string;
  body: string;
}

export const homepageProjects: HomepageProject[] = [
  {
    title: 'Digital War Room — Department of Defense',
    body: 'A supply chain management application which provided insights and analysis for the U.S. Department of Defense.',
    tags: ['DEVELOPMENT', 'DESIGN SYSTEM'],
  },
  {
    title: 'National Flood Insurance Program — FEMA',
    body: "An expansive suite of microservices for FEMA's National Flood Insurance Program.",
    tags: ['DEVELOPMENT'],
  },
  {
    title: 'Portfolio V2',
    body: "Hunter's previous portfolio of work. Built with TypeScript and React on Next.js",
    tags: ['DEVELOPMENT', 'DESIGN SYSTEM', 'UI DESIGN'],
  },
];
