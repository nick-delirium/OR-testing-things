import { HttpLink } from '@apollo/client';

const GQL_SERVER_URL = 'https://flyby-router-demo.herokuapp.com/';

export const httpApolloLink = new HttpLink({ uri: GQL_SERVER_URL });
