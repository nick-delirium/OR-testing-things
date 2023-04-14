import React from 'react';
import { getLocations, getLocationsHandler } from '../../../data/request/getLocations';

export enum ButtonStatus {
  Success = 'Success',
  Error = 'Error',
  Unknown = 'Unknown',
}

export interface ViewModel {
  status: ButtonStatus;
  handleGetLocations: () => void;
}

export const useViewModel = (): ViewModel => {
  const [status, setStatus] = React.useState(ButtonStatus.Unknown);

  const handleGetLocations = React.useCallback(() => {
    void getLocations(getLocationsHandler).then((locations) => {
      if (locations.ok) {
        setStatus(ButtonStatus.Success);
        console.log(locations.value);
      } else {
        setStatus(ButtonStatus.Error);
        console.error(locations.error);
      }
    });
  }, []);

  return { status, handleGetLocations };
};
