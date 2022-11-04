import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
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
  documents: ['src/**/*.graphql', '!node_modules'],
  hooks: {
    afterAllFileWrite: 'prettier --write',
  },
  generates: {
    'src/graphql/generated/types-new.generated.ts': {
      plugins: [
        {
          add: {
            content: `
            /* eslint-disable */
            // DO NOT EDIT
            // This file is automatically generated, run yarn run gen to update
        `,
          },
        },
        'typescript',
        'typescript-operations',
        'typescript-document-nodes',
      ],
    },
    './schema.generated.graphql': {
      plugins: ['schema-ast'],
    },
  },
};

export default config;
