import BundleAnalyzer from '@next/bundle-analyzer';
import createMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkFrontmatter from 'remark-frontmatter';

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('rehype-pretty-code').Options} */
const rehypePrettyCodeOptions = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  tokensMap: {
    fn: 'entity.name.function',
    objKey: 'meta.object-literal.key',
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  outputFileTracingIncludes: {
    '/writing/[slug]': ['./src/data/writings/**/*.mdx'],
    '/notes/[note]': ['./src/data/notes/**/*.mdx'],
    '/components/[slug]': ['./src/data/components/**/*.mdx'],
    '/work/[project]': ['./src/data/projects/**/*.mdx'],
  },
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
  images: {
    qualities: [75, 95, 100],
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      {
        source: '/dod',
        destination: '/work/dwr',
        permanent: true,
      },
      {
        source: '/portfolio-v1',
        destination: 'https://v2.hunterjennings.dev/portfolio-v1',
        permanent: true,
      },
      {
        source: '/caffeinator',
        destination: 'https://v2.hunterjennings.dev/caffeinator',
        permanent: true,
      },
      {
        source: '/now',
        destination: '/notes',
        permanent: true,
      },
      {
        source: '/now/:path*',
        destination: '/notes/:path*',
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(withMDX(nextConfig));
