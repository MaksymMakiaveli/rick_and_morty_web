import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://rickandmortyapi.com/graphql',
  documents: '**/*.{graphql,gql,svelte}',
  ignoreNoDocuments: true, // for better experience with the watcher
  overwrite: true,
  generates: {
    './src/shared/api/gql/types.ts': {
      config: {
        useTypeImports: true,
        avoidOptionals: true,
      },
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
    },
  },
};

export default config;
