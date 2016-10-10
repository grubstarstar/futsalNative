// @flow

import React, { Component, PropTypes } from 'react'

import {
  View,
  Modal
} from 'react-native'

import { connect } from 'react-redux'

const {
  AccessToken,
  LoginManager
} = require('react-native-fbsdk');

import * as Form from 'futsalNative/js/ui/Form'
import RegistrationForm from 'RegistrationForm'
import FacebookLoginButton from 'futsalNative/js/ui/facebook/LoginButton'

import { Dispatch } from 'futsalNative/js/actions/types.js'
import * as LoginActions from 'futsalNative/js/actions/Login'

import Styles from 'futsalNative/js/common/Styles'

/* Presentation */

class Login extends Component {

  // static propTypes = {
    // fixtures: PropTypes.arrayOf(PropTypes.shape({
    //  teamA: PropTypes.string.isRequired,
    //  teamB: PropTypes.string.isRequired,
    //  kickOffAt: PropTypes.instanceOf(moment),
    // })),
    // isFetching: PropTypes.bool,
    // refreshFixtures: PropTypes.func,
    // updateFixture: PropTypes.func,
    // createFixture: PropTypes.func
  // };

  constructor(props) {
    super(props)
    this.state = {
      textInputEmail: null,
      textInputPassword: null,
      registerFormVisible: false
    }
    // bind the methods
    this.onSubmit = this.onSubmit.bind(this)
    this.facebookLogin = this.facebookLogin.bind(this)
    this.toggleRegisterForm = this.toggleRegisterForm.bind(this)
  }

  onSubmit() {
    this.props.onCredentialLogin(
      this.state.textInputEmail,
      this.state.textInputPassword
    )
  }

  facebookLogin() {
    LoginManager
      .logInWithReadPermissions(this.props.readPermissions)
      .then((result) => result.isCancelled ? Promise.reject(Error('Login was cancelled')) : result )
      .then(result => AccessToken.getCurrentAccessToken())
      .catch((error) => {
        console.log('Login failed with error: ' + error.message)
        this.props.onFacebookLoginError(error.message)
      })
      .then((accessToken) => {
        console.log('accessToken', accessToken.accessToken)
        this.props.onFacebookLoginFinished(accessToken.accessToken)
      })
  }

  toggleRegisterForm() {
    console.log('toggleRegisterForm')
    this.setState({
      registerFormVisible: !this.state.registerFormVisible
    })
  }

  render() {
    return (
      <View style={ Styles.pageCentered }>
        <Form.Header>
          Jumpers for Goalposts
        </Form.Header>
        <FacebookLoginButton
          onLoggedIn={ this.facebookLogin }
        />
        <Form.DividerText>
          Or
        </Form.DividerText>
        <Form.InputField
          onChangeText={(textInputEmail) => this.setState({textInputEmail})}
          value={this.state.textInputEmail}
          placeholder='email address'
        />
        <Form.InputField
          onChangeText={(textInputPassword) => this.setState({textInputPassword})}
          value={this.state.textInputPassword}
          placeholder='password'
        />
        <Form.Button
          onPress={ this.onSubmit }
          text='Login'
        />
        <Form.DividerText>
          Or
        </Form.DividerText>
        <Form.Button
          onPress={ this.toggleRegisterForm }
          text='Register'
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.registerFormVisible}
          onRequestClose={() => { console.log("Modal has been closed.") }}
          >
            <RegistrationForm
              closeRegistrationForm={ this.toggleRegisterForm } />
        </Modal>
      </View>
    );
  }
}

/* Container */

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

/* exports */

export Login

export const CreateContainer = (PresentationComponent) => connect(
  select,
  actions
)(PresentationComponent)

export default CreateContainer(Login)
