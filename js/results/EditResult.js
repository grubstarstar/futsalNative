/* @flow */

import React, { Component } from 'react'

import {
	View,
	Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  DatePickerIOS
} from 'react-native'

import Button from 'futsalNative/js/components/presentational/common/Button'

class EditResult extends Component {

	constructor(props: Object) {
		super(props)
    this.state = {
      teamAtext: "Team A",
      teamBtext: "Team B",
      kickOffAt: new Date(),
      timeZoneOffsetInHours: 9
    }
	}

	render() {
		return <View>
			<View style={ styles.page }>
	      <View style={ styles.label }><Text>Team A</Text></View>
	      <TextInput
	        style={ styles.textInput }
	        onChangeText={ (text) => this.setState({ teamAtext: text }) }
	        value={ this.state.teamAtext } />
	      <View style={ styles.label }><Text>Team B</Text></View>
	      <TextInput
	        style={ styles.textInput }
	        onChangeText={ (text) => this.setState({ teamBtext: text }) }
	        value={ this.state.teamBtext } />
	      <View style={ styles.label }><Text>Kick off @</Text></View>
	      <DatePickerIOS
	          date={this.state.kickOffAt}
	          mode="datetime"
	          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
	          onDateChange={ (date) => this.setState({ kickOffAt: date }) }
	        />
				</View>
      <Button
        onPress={ () => { console.log('button pressed') } }
        text="Save" />
      <Button
        onPress={ () => { console.log('button pressed') } }
        text="Delete" />
		</View>
	}
}

export default EditResult

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
