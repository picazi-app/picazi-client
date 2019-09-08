import { StateProps } from "../store/types";

export function getSessionStateProps( stateProps: StateProps) {
  return stateProps.user_session
}