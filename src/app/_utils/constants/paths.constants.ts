export const PATHS = {
  github: 'https://github.com/h-jennings',
  twitter: 'https://twitter.com/jennings_hunter',
  cv: 'https://read.cv/hunterjennings',
  breakline: 'https://breakline.org/',
  email: 'mailto:jenningsdhunter@gmail.com',
  base: process.env.NEXT_PUBLIC_URL ?? 'https://www.hunterjennings.dev', // TODO: might want to make this VERCEL_URL
  home: '/',
  writing: '/writing',
  now: '/now',
  work: '/work',
} as const;
