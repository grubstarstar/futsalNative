/* @flow */

import React, { Component, PropTypes } from 'react'

import {
	View,
	Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  DatePickerIOS
} from 'react-native'

import Button from 'futsalNative/js/components/presentational/common/Button'

import moment from 'moment'

class EditFixture extends Component {

	static propTypes = {
		mode: PropTypes.oneOf(['create', 'edit']),
		onSaveFixture: PropTypes.func.isRequired,
		teamA: PropTypes.string,
		teamB: PropTypes.string,
		kickOffAt: PropTypes.instanceOf(Date),
	};

	constructor(props: Object) {
		super(props)
    this.state = {
      teamA: this.props.teamA || "Team A",
      teamB: this.props.teamB || "Team B",
      kickOffAt: this.props.kickOffAt || new Date(),
      timeZoneOffsetInHours: 9
    }
	}

	_buttons() {
		let buttons = [
			<Button
				onPress={ () => {
						return this.props.onSaveFixture({
							id: this.props.fixtureId,
							teamA: this.props.teamA,
							teamB: this.props.teamB,
							kickOffAt: this.props.kickOffAt
						})
					}
				}
				text="Save" />
		]
		if(this.props.mode === 'edit') {
			buttons.push(
				<Button
					onPress={ () => { console.log('button pressed') } }
					text="Delete" />
			)
		}
		return buttons
	}

	render() {
		return <View>
			<View style={ styles.page }>
	      <View style={ styles.label }><Text>Team A</Text></View>
	      <TextInput
	        style={ styles.textInput }
	        onChangeText={ (text) => this.setState({ teamA: text }) }
	        value={ this.state.teamA } />
	      <View style={ styles.label }><Text>Team B</Text></View>
	      <TextInput
	        style={ styles.textInput }
	        onChangeText={ (text) => this.setState({ teamB: text }) }
	        value={ this.state.teamB } />
	      <View style={ styles.label }><Text>Kick off @</Text></View>
	      <DatePickerIOS
	          date={this.state.kickOffAt}
	          mode="datetime"
	          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
	          onDateChange={ (date) => this.setState({ kickOffAt: date }) }
	        />
	    </View>
			{ this._buttons() }
		</View>
	}
}

export default EditFixture

const styles = StyleSheet.create({
	page: {
		flex: 1,
		marginBottom: 40,
		marginTop: 20
	},
  label: {
    height: 40,
    backgroundColor: '#bbb',
		justifyContent: 'center',
		alignItems: 'center'
  },
	textInput: {
    height: 40,
    backgroundColor: 'white',
		justifyContent: 'center',
  }
})
