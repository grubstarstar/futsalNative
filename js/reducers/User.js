export function user(state = {
  isLoggedInUsingCredentials: false,
  isLoggedInUsingFacebook: false,
  profile: {}
}, action) {
  switch(action.type) {
    case 'LOGGED_IN_USING_CREDENTIALS':
      return Object.assign({}, state, {
        isLoggedInUsingCredentials: true
      })
    case 'LOGGED_IN_USING_FACEBOOK':
      return Object.assign({}, state, {
        isLoggedInUsingFacebook: true
      })
    case 'RECEIVED_PROFILE':
      return Object.assign({}, state, {
        profile: action.profile,
      })
    default:
      return state
  }
}
