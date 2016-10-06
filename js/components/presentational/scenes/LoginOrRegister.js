/* @flow */

import React, { Component, PropTypes } from 'react'

import {
	Text,
	TextInput,
	Navigator,
	View,
	ListView,
	TouchableHighlight,
	TouchableOpacity,
	StyleSheet,
	Modal,
	RefreshControl,
	Image
} from 'react-native'

const FBSDK = require('react-native-fbsdk');
const {
  AccessToken,
  LoginManager
} = FBSDK;

import RegistrationForm from 'futsalNative/js/components/containers/RegistrationForm'
import * as Form from 'futsalNative/js/components/presentational/common/Form'
import FacebookLoginButton from 'futsalNative/js/components/presentational/common/FacebookLoginButton'

import Styles from 'futsalNative/js/common/Styles'
import * as Colors from 'futsalNative/js/common/Colors'

class LoginOrRegister extends Component {

	// static propTypes = {
		// fixtures: PropTypes.arrayOf(PropTypes.shape({
		// 	teamA: PropTypes.string.isRequired,
		// 	teamB: PropTypes.string.isRequired,
		// 	kickOffAt: PropTypes.instanceOf(moment),
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
					Login or Register
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

export default LoginOrRegister
