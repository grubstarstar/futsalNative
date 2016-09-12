import React, { Component, PropTypes } from 'react'
import {
  Navigator,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import { connect } from 'react-redux'
import uuid from 'react-native-uuid'

import NavigableScene from './NavigableScene'

class MainMenu extends Component {

    static propTypes = {
      ...NavigableScene.propTypes,
      title: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          onPress: PropTypes.func.isRequired
        })
      )
    }

    constructor(props) {
        super(props)
    }

    render() {
      return (
        <NavigableScene { ...this.props }>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <Text style={{ fontSize: 25 }}>{ this.props.title }</Text>
            { this.props.options.map((option) => {
              return (
                <TouchableOpacity key={ uuid.v4() } style={{ paddingVertical: 20, paddingHorizontal: 30, backgroundColor: 'skyblue', borderRadius: 40 }}
                  onPress={ option.onPress }>
                  <Text style={{ fontSize: 20 }}>{ option.title }</Text>
                </TouchableOpacity>
              )
            }) }
          </View>
        </NavigableScene>
      )
    }

}

class FutsalMainMenu extends Component {

    static propTypes = {
      ...NavigableScene.propTypes,
      onPressLeagueTable: PropTypes.func.isRequired,
      onPressFixtures: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
    }

    render() {
      return (
        <MainMenu
          title={ 'Menu' }
          options={[
            { title: 'League Table', onPress: this.props.onPressLeagueTable },
            { title: 'Fixtures & Results', onPress: this.props.onPressFixtures }
          ]}
          {...this.props}
        />
      )
    }

}

export default FutsalMainMenu
