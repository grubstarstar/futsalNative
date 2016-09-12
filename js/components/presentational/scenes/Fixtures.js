/* @flow */

import React, { Component } from 'react'

import {
	Text,
	TextInput
} from 'react-native'

import NavigableScene from './NavigableScene'

class Fixtures extends Component {

	constructor(props) {
		super(props)
		this.state = {
			teamAtext: 'team A',
			teamBtext: 'team B'
		}
	}

	render() {
		return <NavigableScene { ...this.props }>
			<Text>Fixtureseses</Text>
			<TextInput
				style={{ marginVertical: 5, backgroundColor: 'red', height: 40 }}
				onChangeText={ (val) => this.setState({ teamAtext: val }) }
				value={ this.state.teamAtext }
			/>
			<TextInput
				style={{ marginVertical: 5, backgroundColor: 'red', height: 40 }}
				onChangeText={ (val) => this.setState({ teamBtext: val }) }
				value={ this.state.teamBtext }
			/>
		</NavigableScene>
	}
}

export default Fixtures
