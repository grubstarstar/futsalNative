// @flux

import { connect } from 'react-redux'

import RegistrationForm from 'futsalNative/js/components/presentational/modals/RegistrationForm'

import * as RegistrationActions from 'futsalNative/js/actions/Registration'

function select(state, ownProps) {
  return {
      ...ownProps
  }
}

function actions(dispatch, ownProps) {
  return {
      ...ownProps,

      registerUser: (details) => {
        dispatch(RegistrationActions.registerUser(details))
      }
  }
}

export default connect(
  select,
  actions
)(RegistrationForm)
