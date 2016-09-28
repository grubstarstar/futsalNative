import {
  REQUEST_FIXTURES,
  RECEIVE_FIXTURES,
  START_CREATING_FIXTURE,
  FINISH_CREATING_FIXTURE
} from 'futsalNative/js/actions/Fixtures'

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
    case START_CREATING_FIXTURE:
      return state
    case FINISH_CREATING_FIXTURE:
      return {
        data: state.data.concat(action.data),
        isFetching: false
      }
    default:
      return state
  }
}
