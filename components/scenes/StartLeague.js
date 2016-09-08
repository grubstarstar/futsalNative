import React, { Component } from 'react'

import {
	Text
} from 'react-native'

import { connect } from 'react-redux'

import NavigableScene from './NavigableScene'

class StartLeague extends Component {
	
	constructor(props) {
		super(props)
	}

	render() {
		return <NavigableScene { ...this.props }>
			<Text>Start League...</Text>
		</NavigableScene>
	}
}

import * as navigationActions from '../../actions/Navigation'

export default connect(
  (store, ownProps) => {
    return ownProps
  },
  (dispatch, ownProps) => {
    return ownProps
  }  
)(StartLeague)