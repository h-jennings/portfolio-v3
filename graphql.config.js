const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

module.exports = {
  projects: {
    app: {
      schema: ['./schema.generated.graphql'],
      documents: ['src/**/*.tsx', '!node_modules', '!src/graphql/**/*'],
      extensions: {
        endpoints: {
          default: {
            url: `https://api-us-east-1.hygraph.com/v2/${process.env.CMS_SPACE}/${process.env.CMS_ENV}`,
            headers: { Authorization: `Bearer ${process.env.CMS_PROD_TOKEN}` },
          },
        },
      },
    },
  },
};
