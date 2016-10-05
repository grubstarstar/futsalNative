// @flow

import { connect } from 'react-redux'
import { Dispatch } from 'futsalNative/js/actions/types.js'
import LoginOrRegister from 'futsalNative/js/components/presentational/scenes/LoginOrRegister'

import * as LoginActions from 'futsalNative/js/actions/Login'

const FBSDK = require('react-native-fbsdk');
const {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} = FBSDK;

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

  	onFacebookLoginFinished: (error, result) => {
  		console.log('onLoginFinished')
  		if (error) {
  			console.log("login has error: " + error.message);
  		} else if (result.isCancelled) {
  			console.log("login is cancelled.");
  		} else {
        console.log('result', result)
  			AccessToken.getCurrentAccessToken()
  				.then((data) => {
  					console.log('currentAccessToken', data.accessToken)
  					dispatch(LoginActions.loginUsingFacebook(data.accessToken))
  				})
  		}
  	},

  	onFacebookLogoutFinished: () => {
  		// dispatch(LoginActions.logoutUsingFacebook(accessToken))
  	}

  }
}

export default connect(
  select,
  actions
)(LoginOrRegister)
