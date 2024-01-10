import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { logDurationLink, startRecordingDurationLink } from './links/durationRecordLink';
import { httpApolloLink } from './links/httpApolloLink';
import { openReplayTrackerApolloLink } from './links/openReplayTrackerApolloLink';

export const graphQlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    openReplayTrackerApolloLink,
    logDurationLink,
    startRecordingDurationLink,
    httpApolloLink,
  ]),
});
