import React, { Component } from 'react'

import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableHighlight
} from 'react-native'

import { connect } from 'react-redux'

import NavigableScene from './NavigableScene'

class LeagueTableRow extends Component {

	static propTypes = {
		position: PropTypes.number,
		played: PropTypes.number,
		points: PropTypes.number,
		goalsFor: PropTypes.number,
		goalsAgainst: PropTypes.number
	}

	render() {
		return (
			<TouchableHighlight underlayColor='#ddd' onPress={ this.props.onRowPress }>
				<View style={ styles.row }>
					<View style={ styles.column }><Text>{ this.props.position }</Text></View>
					<View style={ styles.columnTeam }><Text>{ this.props.team }</Text></View>
					<View style={ styles.column }><Text>{ this.props.played }</Text></View>
					<View style={ styles.column }><Text>{ this.props.points }</Text></View>
					<View style={ styles.column }><Text>{ this.props.goalsFor }</Text></View>
					<View style={ styles.column }><Text>{ this.props.goalsAgainst }</Text></View>
				</View>
			</TouchableHighlight>
		)
	}
}

class LeagueTable extends Component {

	static propTypes = {
		data: PropTypes.arrayOf(
			PropTypes.shape(LeagueTableRow.propTypes)
		)

	}
	
	constructor(props) {
		super(props)
	}

	render() {
		return <NavigableScene { ...this.props }>

			<ScrollView contentContinerStyle={ styles.leagueTable }>
				<View style={ styles.row }>
					<View style={ styles.column }><Text style={{ fontWeight: 'bold' }}>Pos</Text></View>
					<View style={ styles.columnTeam }><Text style={{ fontWeight: 'bold' }}>Team</Text></View>
					<View style={ styles.column }><Text style={{ fontWeight: 'bold' }}>Played</Text></View>
					<View style={ styles.column }><Text style={{ fontWeight: 'bold' }}>Pts</Text></View>
					<View style={ styles.column }><Text style={{ fontWeight: 'bold' }}>GF</Text></View>
					<View style={ styles.column }><Text style={{ fontWeight: 'bold' }}>GA</Text></View>
				</View>
				
				<View style={ styles.row }>
					<View style={ styles.column }><Text>2</Text></View>
					<View style={ styles.columnTeam }><Text>Leeds</Text></View>
					<View style={ styles.column }><Text>GF</Text></View>
					<View style={ styles.column }><Text>GF</Text></View>
					<View style={ styles.column }><Text>GA</Text></View>
				</View>
				<View style={ styles.row }>
					<View style={ styles.column }><Text>3</Text></View>
					<View style={ styles.columnTeam }><Text>Burton Albion</Text></View>
					<View style={ styles.column }><Text>GF</Text></View>
					<View style={ styles.column }><Text>GA</Text></View>
					<View style={ styles.column }><Text>GA</Text></View>
				</View>
			</ScrollView>

		</NavigableScene>
	}
}

const styles = StyleSheet.create({
	leagueTable: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'stretch',		
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch'
	},
	column: {
		flex: 1,
		borderColor: '#ddd',
		borderStyle: 'solid',
		borderWidth: 2,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		padding: 10
	},
	columnTeam: {
		flex: 3,
		borderColor: '#ddd',
		borderStyle: 'solid',
		borderWidth: 2,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		padding: 10
	}
})

import * as navigationActions from '../../actions/Navigation'

export default connect(
  (state, ownProps) => {
    return {
    	...ownProps
    	table: state.leagueTable.table
    }
  },
  (dispatch, ownProps) => {
    return {
      navBack: {
        label: 'Back to menu',
        action: () => dispatch(navigationActions.navigateBack(ownProps.navigator))
      },
      onRowPress: (event) => {
      	alert('row pressed')
      }
    }
  }  
)(LeagueTable)