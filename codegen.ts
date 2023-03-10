import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  ignoreNoDocuments: true,
  schema: [
    {
      [`https://api-us-east-1.hygraph.com/v2/${process.env.CMS_SPACE}/${process.env.CMS_ENV}`]:
        {
          headers: {
            Authorization: `Bearer ${process.env.CMS_PROD_TOKEN!}`,
          },
        },
    },
  ],
  documents: [
    'src/**/*.tsx',
    'src/**/*.ts',
    '!node_modules',
    '!src/graphql/**/*',
  ],
  hooks: {
    afterAllFileWrite: 'prettier --write',
  },
  generates: {
    'src/graphql/generated/': {
      config: {
        avoidOptionals: true,
        skipTypename: true,
      },
      preset: 'client',
    },
    './schema.generated.graphql': {
      plugins: ['schema-ast'],
    },
  },
};

export default config;
