// @flow

// react stuff
import React, { Component } from 'react'
import {
  Navigator,
} from 'react-native'

// redux + middleware
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

// import the initial scene
import Splash from 'futsalNative/js/components/containers/Splash'

// the combined reducer
import combinedReducer from 'futsalNative/js/reducers'

// the initial action for loading data
import * as LeagueTableActions from 'futsalNative/js/actions/LeagueTable'

let store = createStore(
  combinedReducer,
  applyMiddleware(
    thunk,
    createLogger()
  )
)
export default class extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={ store }>
        <Navigator
          configureScene={ this.configureScene }
          style={{ flex: 1, paddingTop: 20 }}
          initialRoute={{ component: Splash }}
          renderScene={ this.renderScene }
        />
      </Provider>
    )
  }

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.PushFromRight
  }

  renderScene(route, navigator) {
    return <route.component navigator={ navigator } />
  }

}

store.dispatch(LeagueTableActions.populateLeagueTable())
