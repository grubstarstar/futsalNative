// @flow

import { connect } from 'react-redux'
import { Dispatch } from 'futsalNative/js/actions/types.js'
import LoginOrRegister from 'futsalNative/js/components/presentational/scenes/LoginOrRegister'

import * as LoginActions from 'futsalNative/js/actions/Login'

function select(store, ownProps) {
  return {
  	...ownProps,
  	readPermissions: ["public_profile", "email"]
  }
}

function actions(dispatch: Dispatch, ownProps) {
  return {

    onCredentialLogin: (email, password) => {
      console.log('onCredentialLogin', email, password)
      dispatch(LoginActions.loginUsingCredentials(email, password))
    },

  	onFacebookLoginFinished: (accessToken) => {
      console.log('onFacebookLoginFinished - accessToken', accessToken)
  	   dispatch(LoginActions.loginUsingFacebook(accessToken))
  	},

    onFacebookLoginError: (error) => {
      alert('onFacebookLoginError', error)
    }
    
  }
}

export default connect(
  select,
  actions
)(LoginOrRegister)
