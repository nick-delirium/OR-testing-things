import { gql } from '@apollo/client';
import { failResult, okResult, Result } from '../../../../lib/result';
import { graphQlClient } from '../../../../service/graphQL';
import { LocationDto, LocationsDto } from '../dto/locations';

export const GET_LOCATIONS_GQL = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

export async function getLocationsHandler(): Promise<LocationsDto> {
  const response = await graphQlClient.query({
    query: GET_LOCATIONS_GQL,
  });

  return locationsApiMapper(response);
}

export function locationsApiMapper(rawData: any): LocationsDto {
  return rawData.data.locations.map((location: LocationDto) => ({
    id: location.id,
    name: location.name,
    description: location.description,
    photo: location.photo,
  }));
}

export const getLocations = async (
  handler: () => Promise<LocationsDto>
): Promise<Result<LocationsDto>> => {
  try {
    const locations = await handler();

    return okResult(locations);
  } catch (error: any) {
    const defaultError = {
      code: error.code || 'ERROR_GET_LOCATIONS',
      message: error.message || 'Error getting locations',
    };

    return failResult(defaultError);
  }
};
