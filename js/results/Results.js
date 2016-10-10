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

import EditResult from 'futsalNative/js/components/containers/EditResult'
import AddResult from 'futsalNative/js/components/containers/AddResult'
import Button from 'futsalNative/js/components/presentational/common/Button'

import moment from 'moment'

class Results extends Component {

	static propTypes = {
		results: PropTypes.arrayOf(PropTypes.shape({
			teamA: PropTypes.string.isRequired,
			teamA_Goals: PropTypes.string.isRequired,
			teamB: PropTypes.string.isRequired,
			teamB_Goals: PropTypes.string.isRequired,
			kickOffAt: PropTypes.instanceOf(moment),
		})),
		isFetching: PropTypes.bool,
		refreshResults: PropTypes.func,
		saveResult: PropTypes.func
	};

	_formatDataForList(props) {

		let resultsByDay = {}
		props.results.map((result) => {
				const { teamA, teamB, teamA_Goals, teamB_Goals, kickOffAt } = result
				let time = result.kickOffAt.format('h:mm a')
				let day = result.kickOffAt.format('MMMM Do YYYY')
				resultsByDay[day] = resultsByDay[day] || []
				resultsByDay[day].push([teamA, teamA_Goals, teamB, teamB_Goals, time])
		})

		console.log(resultsByDay)

		return resultsByDay
	}

	constructor(props) {
		super(props)
		this._onListItemPress = this._onListItemPress.bind(this)
		this._renderListItem = this._renderListItem.bind(this)
		this._onAddResultPress = this._onAddResultPress.bind(this)
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
		this.props.refreshResults();
	}

	_onListItemPress() {
		this.refs.navigator.push({
			id: 'edit',
			title: "Edit Result"
		})
	}

	_onAddResultPress() {
		this.refs.navigator.push({
			id: 'add',
			title: "Add Result"
		})
	}

	_renderListItem(rowData, sectionId, rowID, highlightRow) {
		const [ teamA, teamA_Goals, teamB, teamB_Goals, kickOffAt ] = rowData
		return (
			<TouchableHighlight
				style={ styles.listItem }
				onPress={ this._onListItemPress }>
				<Text>{ teamA } { teamA_Goals } - { teamB_Goals } { teamB } @ { kickOffAt }</Text>
			</TouchableHighlight>
		)
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRowsAndSections(this._formatDataForList(nextProps))
		})
	}

	_render() {
		console.log('this1', this)
		return (
			<View
				style={ styles.page }>
				<ListView
					dataSource={ this.state.dataSource }
					renderRow={ this._renderListItem }
					renderSectionHeader={ this._renderSectionHeader}
					refreshControl={
	          <RefreshControl
	            refreshing={ this.props.isFetching }
	            onRefresh={ this._onRefresh.bind(this) } /> }
					/>
			</View>
		)
	}

	_renderEditDialog() {
		return (
			<EditResult
				onSaveFixture={ this.props.saveFixture }/>
		)
	}

	_renderAddDialog() {
		return (
			<EditResult
				onSaveFixture={ this.props.saveFixture }/>
		)
	}

	render() {
		return (
			<Navigator ref="navigator"
				initialRoute={{ id: 'results', title: "Results" }}
				renderScene={ (route, navigator) => {
						switch(route.id) {
							case 'edit':
								return (
									<View style={{ marginTop: 44, backgroundColor: 'white', flex: 1 }}>
										{ this._renderEditDialog() }
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

export default Results
