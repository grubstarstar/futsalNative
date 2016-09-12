// @flow

// react stuff
import React, { Component } from 'react'
import {
  Navigator,
  TabBarIOS,
  Text
} from 'react-native'

// redux + middleware
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

// import the initial scene
import LeagueTable from 'futsalNative/js/components/containers/LeagueTable'
import Fixtures from 'futsalNative/js/components/containers/Fixtures'
import Results from 'futsalNative/js/components/containers/Results'
import Teams from 'futsalNative/js/components/containers/Teams'
import Leagues from 'futsalNative/js/components/containers/Leagues'

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
    this.state = {
      selectedTab: 'table'
    }
  }

  render() {
    return (
      <Provider store={ store }>
        <TabBarIOS>
          <TabBarIOS.Item
            title="League Table"
            icon={ require("futsalNative/icons/png2/news.png") }
            badge={ 4 }
            selected={ this.state.selectedTab === 'table' }
            onPress={ () => {
              console.log('onPress')
              this.setState({ selectedTab: 'table' })
            }} >
            { this._renderContent(LeagueTable) }
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Fixtures"
            icon={ require("futsalNative/icons/png2/football2.png") }
            selected={ this.state.selectedTab === 'fixtures' }
            onPress={ () => {
              this.setState({ selectedTab: 'fixtures' })
            }} >
            { this._renderContent(Fixtures) }
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Results"
            icon={ require("futsalNative/icons/png2/line_chart.png") }
            selected={ this.state.selectedTab === 'results' }
            onPress={ () => {
              this.setState({ selectedTab: 'results' })
            }} >
            { this._renderContent(Results) }
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Teams"
            icon={ require("futsalNative/icons/png2/update.png") }
            selected={ this.state.selectedTab === 'teams' }
            onPress={ () => {
              this.setState({ selectedTab: 'teams' })
            }} >
            { this._renderContent(Teams) }
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Leagues"
            icon={ require("futsalNative/icons/png2/football.png") }
            selected={ this.state.selectedTab === 'leagues' }
            onPress={ () => {
              this.setState({ selectedTab: 'leagues' })
            }} >
            { this._renderContent(Leagues) }
          </TabBarIOS.Item>
        </TabBarIOS>
      </Provider>
    )
  }

  _renderContent(Component) {
    return <Component />
  }

}

store.dispatch(LeagueTableActions.populateLeagueTable())
