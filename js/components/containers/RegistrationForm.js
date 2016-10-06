import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import * as Form from 'futsalNative/js/components/presentational/common/Form'

import Styles from 'futsalNative/js/common/Styles'
import * as Colors from 'futsalNative/js/common/Colors'

class RegistrationForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
			textInputEmail: null,
			textInputPassword: null,
			textInputConfirmPassword: null
		}
  }

  render() {
    return (
      <View style={ Styles.pageCentered }>
				<Form.Header>
					Register a new user profile
				</Form.Header>
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
        <Form.InputField
          onChangeText={(textInputConfirmPassword) => this.setState({textInputConfirmPassword})}
          value={this.state.textInputConfirmPassword}
          placeholder='confirm password'
        />
        <Form.Button
					onPress={ () => alert('yet to implement') }
					text='Create Profile'
				/>
				<Form.Button
					onPress={ this.props.closeRegistrationForm }
					text='Close'
				/>
			</View>
    )
  }

}

export default RegistrationForm

const styles = StyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: 30,
		paddingVertical: 50,
		alignItems: 'stretch',
		justifyContent: 'center'
	},
	textInputWrapper: {
		borderColor: Colors.LIGHT_GRAY,
		borderWidth: 1,
		marginVertical: 5,
		borderRadius: 2,
	},
	textInput: {
		backgroundColor: Colors.ALMOST_WHITE,
		height: 40,
		paddingHorizontal: 10,
		borderRadius: 2,
	}
})
