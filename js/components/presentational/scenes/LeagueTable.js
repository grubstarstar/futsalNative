import React, { Component, PropTypes } from 'react'

import uuid from 'react-native-uuid'

import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableHighlight,
	Navigator,
	ListView,
	InteractionManager
} from 'react-native'

import { connect } from 'react-redux'

function LeagueTableRowHeader(props) {
	return (
		<View style={ styles.row }>
			<View style={ styles.column }><Text style={ styles.columnHeaderText }>Pos</Text></View>
			<View style={ styles.columnTeam }><Text style={ styles.columnHeaderText }>Team</Text></View>
			<View style={ styles.column }><Text style={ styles.columnHeaderText }>P</Text></View>
			<View style={ styles.column }><Text style={ styles.columnHeaderText }>GF</Text></View>
			<View style={ styles.column }><Text style={ styles.columnHeaderText }>GA</Text></View>
			<View style={ styles.column }><Text style={ styles.columnHeaderText }>Pts</Text></View>
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
					<View style={ styles.column }><Text>{ this.props.goalsFor }</Text></View>
					<View style={ styles.column }><Text>{ this.props.points }</Text></View>
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
		return <ScrollView
			style={ styles.page }
			contentContinerStyle={ styles.leagueTable }>
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
		return (
			<Navigator
				initialRoute={{ name: 'table' }}
				renderScene={ (route, navigator) => {
					return (
							<View style={{ marginTop: 65 }}>
								{ this.state.placeholderRender
									? this.placeholderRender()
									: this.props.table.length
										? this.normalRender()
										: this.emptyRender() }
							</View>
					)
				}}
				navigationBar={
				 <Navigator.NavigationBar
					 routeMapper={{
						 LeftButton: (route, navigator, index, navState) =>
							{ return (<Text></Text>); },
						 RightButton: (route, navigator, index, navState) =>
							 { return (<Text></Text>); },
						 Title: (route, navigator, index, navState) =>
							 { return (<Text>League Table</Text>); },
					 }}
					 style={{ backgroundColor: '#ddd' }}
				 />
				}
			/>
		)
	}

}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		marginBottom: 40
	},
	leagueTable: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'stretch'
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch',
		borderTopWidth: 1,
		borderStyle: 'solid',
		borderColor: '#DDDDDD'
	},
	column: {
		flex: 1,
		padding: 12,
		alignItems: 'center'
	},
	columnHeaderText: {
		color: '#666666'
	},
	columnTeam: {
		flex: 6,
		padding: 10
	}
})

export default LeagueTable
