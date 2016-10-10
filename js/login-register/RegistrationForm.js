import React, { Component } from 'react'
import {
  View
} from 'react-native'

import { connect } from 'react-redux'

import * as Form from 'futsalNative/js/ui/Form'

import * as RegistrationActions from 'futsalNative/js/actions/Registration'

import Styles from 'futsalNative/js/common/Styles'

/* Presentation */

class RegistrationForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
			textInputEmail: null,
			textInputPassword: null,
			textInputConfirmPassword: null
		}
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    this.props.registerUser({
      email: this.state.textInputEmail,
      password: this.state.textInputPassword
    })
    this.props.closeRegistrationForm()
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
					onPress={ this.onSubmit }
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

/* Container */

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

/* exports */

export RegistrationForm

export const CreateContainer = (PresentationComponent) => connect(
  select,
  actions
)(PresentationComponent)

export default CreateContainer(RegistrationForm)

