import React, { Component } from 'react'

import {
	Text
} from 'react-native'

import { connect } from 'react-redux'

import NavigableScene from './NavigableScene'

class LeagueTable extends Component {
	
	constructor(props) {
		super(props)
	}

	render() {
		return <NavigableScene { ...this.props }>
			<Text>Fixtures</Text>
		</NavigableScene>
	}
}

import * as navigationActions from '../../actions/Navigation'

export default connect(
  (store, ownProps) => {
    return ownProps
  },
  (dispatch, ownProps) => {
    return {
      navBack: {
        label: 'Back to menu',
        action: () => dispatch(navigationActions.navigateBack(ownProps.navigator))
      }
    }
  }  
)(LeagueTable)