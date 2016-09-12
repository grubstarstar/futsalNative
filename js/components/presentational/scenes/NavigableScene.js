import React, { Component, PropTypes } from 'react'
import uuid from 'react-native-uuid'
import {
	Navigator,
	View,
	Text,
	TouchableOpacity,
	TabBarIOS,
	StatusBar,
	Switch,
	Picker,
	DatePickerIOS,
	MapView
} from 'react-native'

class NavigableScene extends Component {

	static propTypes = {
		navigator: PropTypes.instanceOf(Navigator),
		navBack: PropTypes.shape({
			label: PropTypes.string.isRequired,
			action: PropTypes.func.isRequired
		}),
		navForward: PropTypes.shape({
			label: PropTypes.string.isRequired,
			action: PropTypes.func.isRequired
		}),
	}

	constructor(props) {
		super(props)
		this.state = {
			selectedTab: 'table',
			date: new Date()
		}
	}

	_renderContent(viewName) {
		return <View style={{ flex: 1, backgroundColor: 'white' }}>
			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 10 }}>
				{ this.getNavButtons() }
			</View>
			<View style={{ flex: 20 }}>
				<Text>{ viewName }</Text>
				<Switch
          onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
          value={this.state.trueSwitchIsOn} />
					<MapView
						style={{height: 200, margin: 40}}
						showsUserLocation={true}
						mapType='satellite'
					/>
					<DatePickerIOS
						date={this.state.date}
						mode="datetime"
						timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
						onDateChange={this.onDateChange}
					/>
					<Text>Team A</Text>
					<Picker
					  selectedValue={this.state.teamA}
					  onValueChange={(lang) => this.setState({teamA: lang})}>
					  <Picker.Item label="Derby County" value="java" />
					  <Picker.Item label="Leeds" value="leeds" />
					  <Picker.Item label="Burton Albion" value="burton" />
					  <Picker.Item label="Newcastle" value="newcastle" />
					</Picker>
					<Text>Team B</Text>
					<Picker
					  selectedValue={this.state.teamB}
					  onValueChange={(lang) => this.setState({teamB: lang})}>
					  <Picker.Item label="Derby County" value="java" />
					  <Picker.Item label="Leeds" value="leeds" />
					  <Picker.Item label="Burton Albion" value="burton" />
					  <Picker.Item label="Newcastle" value="newcastle" />
					</Picker>
				{ this.props.children }
			</View>
		</View>
	}

	render() {
		return (

				<TabBarIOS>
					<TabBarIOS.Item
						title="League Table"
						systemIcon="recents"
						badge={ 4 }
						selected={ this.state.selectedTab === 'table' }
						onPress={ () => {
							console.log('onPress')
							this.setState({ selectedTab: 'table' })
						}}
					>
						{ this._renderContent('table') }
					</TabBarIOS.Item>
					<TabBarIOS.Item
						title="Fixtures"
						systemIcon="favorites"
						selected={ this.state.selectedTab === 'fixtures' }
						onPress={ () => {
							console.log('onPress')
							this.setState({ selectedTab: 'fixtures' })
						}}
					>
						{ this._renderContent('fixtures') }
					</TabBarIOS.Item>
				</TabBarIOS>

		)
	}

	getNavButtons() {
		return ['navBack', 'navForward']
			.filter( (navButton) => this.props[navButton] )
			.map( (navButton) => {
				return (
					<TouchableOpacity key={ uuid.v4() }
						onPress={ this.props[navButton].action }>
						<Text>{ this.props[navButton].label }</Text>
					</TouchableOpacity>
				)
			})
	}
}

export default NavigableScene
