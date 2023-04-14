import { ApolloClient, InMemoryCache, from, ApolloLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { recordGraphQL } from '../../tracker';

const GQL_SERVER_URL = 'https://flyby-router-demo.herokuapp.com/';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const trackerApolloLink = new ApolloLink((operation, forward) => {
  console.log('operation :>> ', operation);
  return forward(operation).map((result) => {
    const operationDefinition = operation.query.definitions[0];
    return recordGraphQL(
      operationDefinition.kind === 'OperationDefinition' ? operationDefinition.operation : 'unknown?',
      operation.operationName,
      operation.variables,
      result
    );
  });
});

export const graphQlClient = new ApolloClient({
  uri: GQL_SERVER_URL,
  cache: new InMemoryCache(),
  link: from([errorLink, trackerApolloLink]),
});
