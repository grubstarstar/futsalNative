import { REQUEST_FIXTURES, RECEIVE_FIXTURES } from 'futsalNative/js/actions/Fixtures'

export function fixtures(state = {
  data: [],
  isFetching: false
}, action) {
  switch(action.type) {
    case REQUEST_FIXTURES:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_FIXTURES:
      return {
        data: action.data,
        isFetching: false
      }
    default:
      return state
  }
}
