import { ApolloClient, InMemoryCache } from '@apollo/client';

const GQL_SERVER_URL = 'https://flyby-router-demo.herokuapp.com/';

export const graphQlClient = new ApolloClient({
  uri: GQL_SERVER_URL,
  cache: new InMemoryCache(),
});
