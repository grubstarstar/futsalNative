import { REQUEST_RESULTS, RECEIVE_RESULTS } from 'futsalNative/js/actions/Results'

export function results(state = {
  data: [],
  isFetching: false
}, action) {
  switch(action.type) {
    case REQUEST_RESULTS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_RESULTS:
      return {
        data: action.data,
        isFetching: false
      }
    default:
      return state
  }
}
