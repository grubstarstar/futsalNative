export type Action =
  { type: 'DO_SOMETHING', payload: Array<number> }

export type Dispatch = (action: Action | ThunkAction) => any;
