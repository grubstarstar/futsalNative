import React, { Component } from 'react'

import {
  TextInput
} from 'react-native'

class AddFixtureModal extends Component {

  constructor(props) {
    super(props)
  }

  render() {
      return (
        <View>
          <TextInput
    				style={{ marginVertical: 5, backgroundColor: 'red', height: 40 }}
    				onChangeText={ (val) => this.setState({ teamAtext: val }) }
    				value={ this.state.teamAtext }
    			/>
    			<TextInput
    				style={{ marginVertical: 5, backgroundColor: 'red', height: 40 }}
    				onChangeText={ (val) => this.setState({ teamBtext: val }) }
    				value={ this.state.teamBtext }
    			/>
        </View>
      )
  }

}
