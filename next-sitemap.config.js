/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.hunterjennings.dev',
  generateRobotsTxt: true,
  exclude: ['/writing/element-test', '**/opengraph-image'],
};
