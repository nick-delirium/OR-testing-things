import { ApolloLink } from '@apollo/client';
import { recordGraphQL } from '../../../tracker';

export const openReplayTrackerApolloLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const operationDefinition = operation.query.definitions[0];

    const operationKind =
      operationDefinition.kind === 'OperationDefinition'
        ? operationDefinition.operation
        : 'unknown?';

    const { operationName, variables, getContext } = operation;
    const { duration } = getContext();

    return recordGraphQL(operationKind, operationName, variables, response, duration);
  });
});
