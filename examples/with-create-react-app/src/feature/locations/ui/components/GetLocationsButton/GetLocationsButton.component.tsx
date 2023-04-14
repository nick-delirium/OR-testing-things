import React from 'react';
import cx from 'classnames';
import { useViewModel } from './useViewModel';
import { stylesMap } from './GetLocationsButton.constant';
import './GetLocationsButton.styles.css';

export const GetLocationsButton: React.FC = () => {
  const { status, handleGetLocations } = useViewModel();

  return (
    <button className={cx('button', stylesMap[status])} onClick={handleGetLocations}>
      test Apollo
    </button>
  );
};
