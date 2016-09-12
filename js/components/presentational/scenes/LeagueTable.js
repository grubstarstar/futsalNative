import React, { Component, PropTypes } from 'react'

import uuid from 'react-native-uuid'

import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableHighlight,
	ListView,
	InteractionManager
} from 'react-native'

import { connect } from 'react-redux'

import NavigableScene from './NavigableScene'

function LeagueTableRowHeader(props) {
	return (
		<View style={ styles.row }>
			<View style={ styles.column }><Text>Pos</Text></View>
			<View style={ styles.columnTeam }><Text>Team</Text></View>
			<View style={ styles.column }><Text>P</Text></View>
			<View style={ styles.column }><Text>Pts</Text></View>
			<View style={ styles.column }><Text>GF</Text></View>
			<View style={ styles.column }><Text>GA</Text></View>
		</View>
	)
}

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
					<View style={ styles.columnTeam }><Text>{ this.props.name }</Text></View>
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
		table: PropTypes.arrayOf(
			PropTypes.shape(LeagueTableRow.propTypes)
		)
	}

	constructor(props) {
		super(props)
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => {
				console.log('rowHasChanged: r1, r2', r1, r2)
				r1.points !== r2.points
			}
		})
		this.state = {
			dataSource: ds.cloneWithRows(this.props.table),
			renderPlaceholderOnly: true
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(nextProps.table)
		})
	}

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.setState({
				renderPlaceholderOnly: false
			})
		});
	}

	_renderHeader() {
		return <LeagueTableRowHeader/>
	}

	_renderRow(rowData) {
		return <LeagueTableRow {...rowData}/>
	}

	emptyRender() {
		return <View><Text>EMPTY!</Text></View>
	}

	placeholderRender() {
		return <View><Text>Placeholder render!</Text></View>
	}

	normalRender() {
		return <ScrollView contentContinerStyle={ styles.leagueTable }>
			<ListView
				enableEmptySections={ true }
				dataSource={ this.state.dataSource }
				renderHeader={ this._renderHeader }
				renderRow={ this._renderRow }
				initialListSize={ 25 }
				pageSize={ 1 }
				scrollRenderAheadDistance={ 200 }
			/>
		</ScrollView>
	}

	render() {
		let content = this.state.placeholderRender
			? this.placeholderRender()
			: this.props.table.length
				? this.normalRender()
				: this.emptyRender()

		return <NavigableScene { ...this.props }>
			{ content }
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

export default LeagueTable
