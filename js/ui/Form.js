import React, { Component } from 'react'

import * as Colors from 'futsalNative/js/common/Colors'

import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

export const InputField = ({ onChangeText, value, placeholder }) => {
  return (
    <View style={ styles.textInputWrapper }>
      <TextInput
        style={ styles.textInput }
        onChangeText={ onChangeText }
        value={ value }
        placeholder={ placeholder }
      />
    </View>
  )
}

export const Button = ({ onPress, text }) => {
  return (
    <TouchableOpacity
      style={ styles.button }
      onPress={ onPress }>
      <Text style={ styles.buttonText }>{ text }</Text>
    </TouchableOpacity>
  )
}

export const Header = ({ children }) =>
  <View style={ styles.header }>
    <Text style={ styles.headerText }>{ children }</Text>
  </View>

export const DividerText = ({ children }) =>
  <View style={ styles.info }>
    <Text>{ children }</Text>
  </View>

const styles = StyleSheet.create({
  // InputField
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
	},
  // Button
  button: {
    backgroundColor: Colors.BLACK,
    height: 40,
    padding: 10,
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 2,
  },
  buttonText: {
    color: Colors.WHITE,
  },
  // DividerText
	info: {
		alignItems: 'center',
		marginVertical: 10
	},
  // Header
	header: {
		alignItems: 'center',
		marginVertical: 10
	},
	headerText: {
    fontSize: 20
	}
})
