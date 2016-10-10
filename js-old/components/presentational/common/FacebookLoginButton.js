import React from 'react'

import * as Colors from 'futsalNative/js/common/Colors'

import {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

export default ({ onLoggedIn }) => {
  return(
    <TouchableOpacity
      style={ styles.facebookLoginButton }
      onPress={ onLoggedIn }>
      <Image
        style={{ height: 25, width: 25, marginRight: 50 }}
        source={ require('futsalNative/images/facebook.png') } />
      <Text style={ styles.buttonText }>Continue with Facebook</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
	buttonText: {
		color: Colors.WHITE,
	},
	facebookLoginButton: {
		backgroundColor: Colors.FB_BLUE,
		flexDirection: 'row',
		height: 40,
		padding: 8,
		alignItems: 'center',
		marginVertical: 5,
		borderRadius: 2,
	}
})
