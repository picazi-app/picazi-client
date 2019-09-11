import { StateProps } from "../store/types";

export function getSessionStateProps( stateProps: StateProps) {
  return stateProps.user_session
}

export function getAppErrorsStateProps( stateProps: StateProps) {
  return stateProps.app_errors
}