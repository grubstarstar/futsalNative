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
	RefreshControl
} from 'react-native'

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} = FBSDK;

import Button from 'futsalNative/js/components/presentational/micro/Button'

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
			email: '',
			password: '',
			textInputEmail: '',
			textInputPassword: ''
		}
	}

	onSubmit() {
		this.props.onCredentialLogin(
			this.state.textInputEmail,
			this.state.textInputPassword
		)
	}

	render() {
		return (
			<View>
				<Text>{ this.state.email }</Text>
				<Text>{ this.state.name }</Text>
				<LoginButton
					readPermissions={ this.props.readPermissions }
					onLoginFinished={ this.props.onFacebookLoginFinished }
					onLogoutFinished={ this.props.onFacebookLogoutFinished } />
				<TextInput
					style={{height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 5}}
					onChangeText={(textInputEmail) => this.setState({textInputEmail})}
					value={this.state.textInputEmail}
				/>
				<TextInput
					style={{height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 5}}
					onChangeText={(textInputPassword) => this.setState({textInputPassword})}
					value={this.state.textInputPassword}
				/>
				<TouchableOpacity
					onPress={ this.onSubmit.bind(this) }>
					<Text>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		marginBottom: 40
	},
	listItem: {
		height: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	listSection: {
		height: 50,
		backgroundColor: '#bbb',
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default LoginOrRegister
