import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    {
      'http://localhost:8080/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': 'myadminsecretkey',
        },
      },
    },
  ],
  documents: './src/lib/*.ts',
  generates: {
    './src/generated/types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        scalars: {
          bigint: 'bigint',
          numeric: 'bigint | number',
        },
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
export default config;
