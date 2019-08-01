export enum ActionTypes {
  INCREMENT_LIKES = "INCREMENT_LIKES",
}
export interface IncrementAction {
  type: ActionTypes.INCREMENT_LIKES,
  index: number
}

export const actionCreators = {
  increment: (index: number) : IncrementAction=> {
    return {
      type: ActionTypes.INCREMENT_LIKES,
      index: index
    }
  }
}