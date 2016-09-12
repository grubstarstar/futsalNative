/* @flow */

import React, { Component } from 'react'

import {
	Text,
	TextInput,
	Navigator,
	View,
	ListView,
	TouchableHighlight,
	TouchableOpacity,
	StyleSheet,
	Modal
} from 'react-native'

import EditFixture from 'futsalNative/js/components/containers/EditFixture'
import AddFixture from 'futsalNative/js/components/containers/AddFixture'
import Button from 'futsalNative/js/components/presentational/micro/Button'

class Fixtures extends Component {

	constructor(props) {
		super(props)
		this._onListItemPress = this._onListItemPress.bind(this)
		this._renderListItem = this._renderListItem.bind(this)
		this._onAddFixturePress = this._onAddFixturePress.bind(this)
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
			sectionHeaderHasChanged:  (s1, s2) => s1 !== s2
		})
		this.state = {
			dataSource: ds.cloneWithRowsAndSections({
				"1st Aug 2016": [
					[ 'dd', 'two', 'three'],
					[ 'rr', 'two', 'three'],
					[ 'ff', 'two', 'three']
				],
				"8th Aug 2016": [
					[ 'Derby County', 'Newcastle United', '12:00pm'],
					[ 'ddd', 'two', 'three'],
					[ 'ddd', 'two', 'three']
				]
			}),
			teamAtext: 'team A',
			teamBtext: 'team B'
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

	_onListItemPress() {
		this.refs.navigator.push({
			id: 'edit',
			title: "Edit Fixture"
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
				onPress={ this._onListItemPress }>
				<Text>{ teamA } vs. { teamB } @ { kickOffAt }</Text>
			</TouchableHighlight>
		)
	}

	_render() {
		console.log('this1', this)
		return (
			<View
				style={ styles.page } >
				<ListView
					dataSource={ this.state.dataSource }
					renderRow={ this._renderListItem }
					renderSectionHeader={ this._renderSectionHeader} />
				<Button
					onPress={ this._onAddFixturePress }
					text="Add Fixture" />
			</View>
		)
	}

	_renderEditDialog() {
		return (
			<EditFixture />
		)
	}

	_renderAddDialog() {
		return (
			<EditFixture />
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
									<View style={{ marginTop: 65, backgroundColor: 'white', flex: 1 }}>
										{ this._renderEditDialog() }
									</View>
								)
							case 'add':
								return (
									<View style={{ marginTop: 65, backgroundColor: 'white', flex: 1 }}>
										{ this._renderAddDialog() }
									</View>
								)
							default:
								return (
									<View style={{ marginTop: 65, backgroundColor: 'white', flex: 1 }}>
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
		flex: 1
	},
	listItem: {
		height: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	listSection: {
		height: 50,
		backgroundColor: '#ddd',
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default Fixtures
