import React from 'react'

import {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

export const FB_WHITE = '#FFFFFF'
export const FB_BLUE = '#3B5998'

export default ({ onLoggedIn }) => {
  return(
    <TouchableOpacity
      style={ styles.facebookLoginButton }
      onPress={ onLoggedIn }>
      <Image
        style={{ height: 25, width: 25, marginRight: 50 }}
        source={ require('images/facebook.png') } />
      <Text style={ styles.buttonText }>Continue with Facebook</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
	buttonText: {
		color: FB_WHITE
	},
	facebookLoginButton: {
		backgroundColor: FB_BLUE,
		flexDirection: 'row',
		height: 40,
		padding: 8,
		alignItems: 'center',
		marginVertical: 5,
		borderRadius: 2,
	}
})
