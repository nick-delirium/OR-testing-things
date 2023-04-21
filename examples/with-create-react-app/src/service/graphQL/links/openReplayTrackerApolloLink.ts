import { ApolloLink } from '@apollo/client';
import { recordGraphQL } from '../../../tracker';

export const openReplayTrackerApolloLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((result) => {
    const operationDefinition = operation.query.definitions[0];
    return recordGraphQL(
      operationDefinition.kind === 'OperationDefinition'
        ? operationDefinition.operation
        : 'unknown?',
      operation.operationName,
      operation.variables,
      result
    );
  });
});
