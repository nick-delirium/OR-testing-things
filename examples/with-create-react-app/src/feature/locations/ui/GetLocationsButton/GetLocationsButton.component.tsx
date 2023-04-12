import { useViewModel } from "./useViewModel";
import "./GetLocationsButton.styles.css";
import cx from "classnames";
import { stylesMap } from "./GetLocationsButton.constant";

export const GetLocationsButton = () => {
  const { status, handleGetLocations } = useViewModel();

  return (
    <button
      className={cx("button", stylesMap[status])}
      onClick={handleGetLocations}
    >
      test Apollo
    </button>
  )
}
