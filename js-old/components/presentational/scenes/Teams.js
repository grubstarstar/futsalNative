/* @flow */

import React, { Component } from 'react'

import {
	View,
	Text
} from 'react-native'

class Teams extends Component {

	constructor(props: Object) {
		super(props)
		this.state = {
			thing: 'example'
		}
	}

	render() {
		return <View><Text>Teams</Text></View>
	}
}

export default Teams
