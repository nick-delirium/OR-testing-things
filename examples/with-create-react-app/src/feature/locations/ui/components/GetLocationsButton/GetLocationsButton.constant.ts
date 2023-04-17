import { ButtonStatus } from "./useViewModel";

export const stylesMap: Record<ButtonStatus, string> = {
  [ButtonStatus.Success]: "success",
  [ButtonStatus.Error]: "error",
  [ButtonStatus.Unknown]: "unknown",
}
