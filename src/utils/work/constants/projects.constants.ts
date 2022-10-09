import { PATHS } from '@utils/common/constants/paths.constants';
import { ProjectIdentifiers } from '@utils/work/types/projects';

type ProjectMedia = {
  url: string;
} & (
  | {
      type: 'IMAGE';
    }
  | {
      type: 'VIDEO';
    }
);

export interface ProjectData {
  client: string;
  path: `${typeof PATHS.work}/${string}`;
  project: string;
  featured?: boolean;
  featureImageNarrow: string;
  featureMediaWide: ProjectMedia;
  seoImage: string;
  media: ProjectMedia[];
  contributions: string[];
  description: string;
  tags: string[];
  details: string;
  dates: string;
  url?: string;
}

export const PROJECT_DATA: Record<ProjectIdentifiers, ProjectData> = {
  'audible-quiz': {
    client: 'Audible',
    path: PATHS['audible-quiz'],
    project: 'Audible Lite Quiz',
    featured: true,
    featureImageNarrow: '/images/work/audible-quiz/audible-quiz-narrow.jpg',
    featureMediaWide: {
      type: 'VIDEO',
      url: '/videos/work/audible-quiz/audible-quiz-video.mp4',
    },
    media: [
      {
        type: 'IMAGE',
        url: '/images/work/audible-quiz/audible-quiz-desktop-wide.jpg',
      },
      {
        type: 'IMAGE',
        url: '/images/work/audible-quiz/audible-quiz-narrow.jpg',
      },
      {
        type: 'VIDEO',
        url: '/videos/work/audible-quiz/audible-quiz-video.mp4',
      },
    ],
    seoImage: '/images/work/audible-quiz/audible-quiz-desktop-wide.jpg',
    contributions: [
      'Development',
      'Design Systems',
      'Architecture',
      'Contentful',
    ],
    description:
      'A hands-free, all-purpose quiz creation platform powered by Contentful for the Audible Marketing Team.',
    tags: ['Development'],
    details: `An interactive quiz creation tool for Audible's marketing team. With this tool, their team was able to rapidly launch engaging quizzes—all without any internal design or development support. Built with Next.js and powered by Contentful.`,
    dates: '11/2021',
    url: PATHS.audibleQuizUrl,
  },
  katy: {
    client: 'Katy Pentz',
    path: PATHS.katy,
    project: 'Katy Site V2',
    featureImageNarrow: '/images/work/katy/katy-phone-narrow.jpg',
    featureMediaWide: {
      type: 'IMAGE',
      url: '/images/work/katy/katy-desktop-wide.jpg',
    },
    media: [
      {
        type: 'IMAGE',
        url: '/images/work/katy/katy-desktop-wide.jpg',
      },
      {
        type: 'IMAGE',
        url: '/images/work/katy/katy-phone-narrow.jpg',
      },
    ],
    seoImage: '/images/work/katy/katy-desktop-wide.jpg',
    contributions: ['Development', 'Design', 'Next.js', 'GraphCMS'],
    description:
      'New personal site for Katy Pentz, a privacy professional based in Richmond, VA.',
    tags: ['Development', 'Design'],
    details: `A simple, but powerful personal site powered by GraphCMS, Next.js, and Stitches. The site is fully CMS-able and allows Katy to quickly and seemlessly update her site without any development involvement whatsoever.`,
    dates: '07/2022',
    url: PATHS.katyUrl,
  },
  dwr: {
    client: 'Department of Defense',
    path: PATHS.dwr,
    project: 'Digital War Room',
    featureImageNarrow: '/images/work/dwr/dwr-logo-narrow.jpg',
    featureMediaWide: {
      type: 'IMAGE',
      url: '/images/work/dwr/dwr-phones-wide.jpg',
    },
    media: [
      {
        type: 'IMAGE',
        url: '/images/work/dwr/dwr-phones-wide.jpg',
      },
      {
        type: 'IMAGE',
        url: '/images/work/dwr/dwr-logo-narrow.jpg',
      },
    ],
    seoImage: '/images/work/dwr/dwr-phones-wide.jpg',
    contributions: ['Development', 'Design Systems', 'Architecture', 'Tooling'],
    description:
      'A supply chain management application which provided insights and analysis for the U.S. Department of Defense.',
    tags: ['Development', 'Design'],
    details:
      'The F-35 Joint Strike Fighter Program needed a way to make sense of data disseminated across a massive, multi-decade long project to create the next generation of defense technology. Using interactive visualizations and world class design the application cuts through the noise and provides stakeholders with a single source of truth about the aircraft they need insights on.',
    dates: '02/2020 - 02/2021',
  },
  'portfolio-v2': {
    client: 'Personal',
    path: PATHS.portfolioV2,
    project: 'Portfolio V2',
    featureImageNarrow:
      '/images/work/portfolio-v2/portfolio-v2-phone-narrow.jpg',
    featureMediaWide: {
      type: 'IMAGE',
      url: '/images/work/portfolio-v2/portfolio-v2-desktop-wide.jpg',
    },
    media: [
      {
        type: 'IMAGE',
        url: '/images/work/portfolio-v2/portfolio-v2-desktop-wide.jpg',
      },
      {
        type: 'IMAGE',
        url: '/images/work/portfolio-v2/portfolio-v2-phone-narrow.jpg',
      },
    ],
    seoImage: '/images/work/portfolio-v2/portfolio-v2-desktop-wide.jpg',
    contributions: ['Development', 'Design', 'Design System'],
    description:
      "Hunter's previous portfolio of work. Built with TypeScript and React on Next.js",
    tags: ['Development', 'Design'],
    dates: '2019 - 2021',
    details: `This was the second version of my portfolio built on Next.js with React, and TypeScript. When starting a fresh project, I always search for a challenge—an excuse to learn something new and feel uncomfortable. For this project it was motion design. Using the amazing library framer-motion, I created a suite of declarative, reusable animations in React. Everything from page transitions to revealing text and images on scroll—all orchestrated to enhance the overall design aesthetic of the site.
`,
    url: PATHS.portfolioV2Url,
  },
  nfip: {
    project: 'NFIP',
    client: 'FEMA',
    path: PATHS.nfip,
    featureImageNarrow: '/images/work/nfip/nfip-logo-narrow.jpg',
    featureMediaWide: {
      type: 'IMAGE',
      url: '/images/work/nfip/nfip-laptop-wide.jpg',
    },
    media: [
      {
        type: 'IMAGE',
        url: '/images/work/nfip/nfip-laptop-wide.jpg',
      },
      {
        type: 'IMAGE',
        url: '/images/work/nfip/nfip-logo-narrow.jpg',
      },
    ],
    seoImage: '/images/work/nfip/nfip-laptop-wide.jpg',
    contributions: ['Development', 'Design Systems', 'Architecture', 'Tooling'],
    description:
      "An expansive suite of microservices for FEMA's National Flood Insurance Program.",
    tags: ['Development'],
    details: `The National Flood Insurance Program's (NFIP) PIVOT is an expansive suite of web-based microservices that, collectively, facilitate how insurance companies work with the federal government and assist flood victims across the country—faced with the disaster of loosing their home.`,
    dates: '02/2021 - 11/2021',
  },
};
