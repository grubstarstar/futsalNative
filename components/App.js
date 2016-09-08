import React, { Component } from 'react'
import {
  Navigator,
} from 'react-native'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import Splash from './scenes/Splash'
import MainMenu from './scenes/MainMenu'
import LeagueTable from './scenes/LeagueTable'
import Fixtures from './scenes/Fixtures'
import Testing from './scenes/Testing'

import reducers from '../reducers'

const logger = createLogger();

let store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    logger
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