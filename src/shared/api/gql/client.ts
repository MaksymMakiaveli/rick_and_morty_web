import type { AnyVariables } from '@urql/core';
import {
  cacheExchange,
  Client,
  fetchExchange,
  setContextClient,
  getContextClient as getContext,
  queryStore,
  type QueryArgs,
} from '@urql/svelte';

const gqlClient = new Client({
  url: 'https://rickandmortyapi.com/graphql',
  exchanges: [cacheExchange, fetchExchange],
});

export const createContextGqlClient = () => setContextClient(gqlClient);

export const getContextGqlClient = () => getContext();

export const getQueryStore = <Data = unknown, Variables extends AnyVariables = AnyVariables>(
  args: Omit<QueryArgs<Data, Variables>, 'client'>,
) => {
  const options: QueryArgs<Data, Variables> = {
    client: getContextGqlClient(),
    ...args,
  } as QueryArgs<Data, Variables>;

  return queryStore(options);
};
