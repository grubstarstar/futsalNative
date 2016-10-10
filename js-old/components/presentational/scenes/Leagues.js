/* @flow */

import React, { Component } from 'react'

import {
	View,
	Text
} from 'react-native'

class Leagues extends Component {

	constructor(props: Object) {
		super(props)
		this.state = {
			thing: 'example'
		}
	}

	render() {
		return <View><Text>Leagues</Text></View>
	}
}

export default Leagues
