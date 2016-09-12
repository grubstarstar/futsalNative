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

import Button from 'futsalNative/js/components/presentational/micro/Button'

class EditFixture extends Component {

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
      <Text>Team A</Text>
      <TextInput
        style={ styles.textInput }
        onChangeText={ (text) => this.setState({ teamAtext: text }) }
        value={ this.state.teamAtext } />
      <Text>Team B</Text>
      <TextInput
        style={ styles.textInput }
        onChangeText={ (text) => this.setState({ teamBtext: text }) }
        value={ this.state.teamBtext } />
      <Text>Kick off @</Text>
      <TouchableHighlight
        onPress={ () => {} }>
        <Text>{ JSON.stringify(this.state.kickOffAt) }</Text>
      </TouchableHighlight>
      <DatePickerIOS
          date={this.state.kickOffAt}
          mode="datetime"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={ (date) => this.setState({ kickOffAt: date }) }
        />
      <Button
        onPress={ () => { console.log('button pressed') } }
        text="Save" />
      <Button
        onPress={ () => { console.log('button pressed') } }
        text="Delete" />
    </View>
	}
}

export default EditFixture

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
})
