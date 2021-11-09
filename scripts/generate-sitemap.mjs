import * as fs from 'fs';
import { globby } from 'globby';
import prettier from 'prettier';

(async () => {
  const prettierConfig = await prettier.resolveConfig('../.prettierrc');

  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    './src/pages/**/*{.js,.jsx,.ts,.tsx,.mdx}',
    '!./src/pages/_*{.js,.jsx,.ts,.tsx,.mdx}',
    '!./src/pages/work/[project].tsx',
    '!./src/pages/404*{.js,.jsx,.ts,.tsx,.mdx}',
    `!./src/pages/writing`,
    '!./src/pages/api',
  ]).then((pages) => {
    const cleaned = pages.map((page) => {
      return page.replace('./src/pages', '');
    });
    return cleaned;
  });

  // const writings = await globby(['./src/writing/**/*{.md,.mdx}']).then(
  //   (writings) => writings.map((writing) => writing.replace('./src', '')),
  // );

  const content = [...pages, '/work/dwr', '/work/nfip', '/work/portfolio-v2'];

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${content
              .map((page) => {
                // Removing file extensions
                const path = page
                  .replace('.tsx', '')
                  .replace('.mdx', '')
                  .replace('/index', '');
                const route = path === '/index' ? '' : path;

                console.log(route);

                return `
                        <url>
                            <loc>${`https://www.hunterjennings.dev${route}`}</loc>
                        </url>
                    `;
              })
              .join('')}
        </urlset>
    `;

  // If you're not using Prettier, you can remove this.
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  fs.writeFileSync('public/sitemap.xml', formatted);
})();
