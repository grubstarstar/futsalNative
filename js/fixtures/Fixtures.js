/* @flow */

import React, { Component, PropTypes } from 'react'

import {
	Text,
	TextInput,
	Navigator,
	View,
	ListView,
	TouchableHighlight,
	TouchableOpacity,
	StyleSheet,
	Modal,
	RefreshControl
} from 'react-native'

import EditFixture from 'futsalNative/js/components/containers/EditFixture'
import AddFixture from 'futsalNative/js/components/containers/AddFixture'
import Button from 'futsalNative/js/components/presentational/common/Button'

import moment from 'moment'

class Fixtures extends Component {

	static propTypes = {
		fixtures: PropTypes.arrayOf(PropTypes.shape({
			teamA: PropTypes.string.isRequired,
			teamB: PropTypes.string.isRequired,
			kickOffAt: PropTypes.instanceOf(moment),
		})),
		isFetching: PropTypes.bool,
		refreshFixtures: PropTypes.func,
		updateFixture: PropTypes.func,
		createFixture: PropTypes.func
	};

	_formatDataForList(props) {

		let fixturesByDay = {}
		props.fixtures.map((fixture) => {
				const { teamA, teamB, kickOffAt } = fixture
				let time = fixture.kickOffAt.format('h:mm a')
				let day = fixture.kickOffAt.format('MMMM Do YYYY')
				fixturesByDay[day] = fixturesByDay[day] || []
				fixturesByDay[day].push([teamA, teamB, time])
		})

		console.log(fixturesByDay)

		return fixturesByDay
	}

	constructor(props) {
		super(props)
		this._onListItemPress = this._onListItemPress.bind(this)
		this._renderListItem = this._renderListItem.bind(this)
		this._onAddFixturePress = this._onAddFixturePress.bind(this)
		this._formatDataForList = this._formatDataForList.bind(this)
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
			sectionHeaderHasChanged:  (s1, s2) => s1 !== s2
		})

		this.state = {
			dataSource: ds.cloneWithRowsAndSections(this._formatDataForList(this.props))
		}
	}

	_renderSectionHeader(sectionData, sectionId) {
		return (
			<View
				style={ styles.listSection }>
				<Text>{ sectionId }</Text>
			</View>
		)
	}

	_onRefresh() {
		this.props.refreshFixtures();
	}

	_onListItemPress(fixture) {
		this.refs.navigator.push({
			id: 'edit',
			title: "Edit Fixture",
			fixture: fixture
		})
	}

	_onAddFixturePress() {
		this.refs.navigator.push({
			id: 'add',
			title: "Add Fixture"
		})
	}

	_renderListItem(rowData, sectionId, rowID, highlightRow) {
		const [ teamA, teamB, kickOffAt ] = rowData
		return (
			<TouchableHighlight
				style={ styles.listItem }
				onPress={ () => this._onListItemPress(rowData) }>
				<Text>{ teamA } vs. { teamB } @ { kickOffAt }</Text>
			</TouchableHighlight>
		)
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRowsAndSections(this._formatDataForList(nextProps))
		})
	}

	_render() {
		return (
			<View
				style={ styles.page } >
				<ListView
					dataSource={ this.state.dataSource }
					renderRow={ this._renderListItem }
					renderSectionHeader={ this._renderSectionHeader}
					refreshControl={
	          <RefreshControl
	            refreshing={ this.props.isFetching }
	            onRefresh={ this._onRefresh.bind(this) } /> }
					/>
				<Button
					onPress={ this._onAddFixturePress }
					text="Add Fixture" />
			</View>
		)
	}

	_renderEditDialog(fixture) {
		const [ teamA, teamB, kickOffAt ] = fixture
		console.log(fixture)
		console.log(teamA, teamB, kickOffAt)
		return (
			<EditFixture
				mode="edit"
				teamA={ teamA }
				teamB={ teamB }
				kickOffAt={ kickOffAt }
				onSaveFixture={ this.props.updateFixture }/>
		)
	}

	_renderAddDialog() {
		return (
			<EditFixture
				mode="create"
				onSaveFixture={ this.props.createFixture }/>
		)
	}

	render() {
		return (
			<Navigator ref="navigator"
				initialRoute={{ id: 'fixtures', title: "Fixtures" }}
				renderScene={ (route, navigator) => {
						switch(route.id) {
							case 'edit':
								return (
									<View style={{ marginTop: 44, backgroundColor: 'white', flex: 1 }}>
										{ this._renderEditDialog(route.fixture) }
									</View>
								)
							case 'add':
								return (
									<View style={{ marginTop: 44, backgroundColor: 'white', flex: 1 }}>
										{ this._renderAddDialog() }
									</View>
								)
							default:
								return (
									<View style={{ marginTop: 44, backgroundColor: 'white', flex: 1 }}>
										{ this._render() }
									</View>
								)
						}
				}}
				navigationBar={
				 <Navigator.NavigationBar
					 routeMapper={{
						 LeftButton: (route, navigator, index, navState) =>
							{
								switch(route.id) {
									case 'edit':
									case 'add':
										return (
											<TouchableOpacity
												onPress={ () => this.refs.navigator.pop() }>
												<Text>Back</Text>
											</TouchableOpacity>
										)
									default:
										return (<Text></Text>)
								}
							},
						 RightButton: (route, navigator, index, navState) =>
							 { return (<Text></Text>); },
						 Title: (route, navigator, index, navState) =>
							 { return (<Text>{ route.title }</Text>); },
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
	listItem: {
		height: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	listSection: {
		height: 50,
		backgroundColor: '#bbb',
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default Fixtures
