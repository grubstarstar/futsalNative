/* @flow */

import React, { Component } from 'react'

import {
	View,
	Text
} from 'react-native'

class Example extends Component {

	constructor(props: Object) {
		super(props)
		this.state = {
			thing: 'example'
		}
	}

	render() {
		return <View><Text>Example</Text></View>
	}
}

export default Example
