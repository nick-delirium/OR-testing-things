import { ApolloLink } from '@apollo/client';

export const startRecordingDurationLink = new ApolloLink((operation, forward) => {
  operation.setContext({ startRecordingDurationTime: new Date().getTime() });
  return forward(operation);
});

export const logDurationLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((data) => {
    const duration = new Date().getTime() - operation.getContext().startRecordingDurationTime;
    operation.setContext({ duration });
    return data;
  });
});
