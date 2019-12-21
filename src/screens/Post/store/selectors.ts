import { StateProps } from "../../../store/types";

export function getPostInfoStateProps( stateProps: StateProps) {
  console.log("postInfo_screen state", stateProps)
  return stateProps.postInfo_screen;
}
