import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config: CodegenConfig = {
  schema: [
    {
      [process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL as string]: {
        headers: {
          'x-hasura-role': process.env.NEXT_PUBLIC_HASURA_ROLE as string,
        },
      },
    },
  ],
  documents: './src/lib/*.ts',
  generates: {
    './src/types/graphql.d.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        scalars: {
          bigint: 'bigint',
          numeric: 'bigint | number',
          jsonb: 'unknown',
        },
      },
    },
  },
};
export default config;
