// react stuff
import React, { Component } from 'react'

// react native stuff
import {
  TabBarIOS
} from 'react-native'

// the initial action for loading data
import * as LeagueTableActions from 'futsalNative/js/actions/LeagueTable'
import * as FixturesActions from 'futsalNative/js/actions/Fixtures'
import * as ResultsActions from 'futsalNative/js/actions/Results'

// import the scenes
import LeagueTable from 'futsalNative/js/components/containers/LeagueTable'
import Fixtures from 'futsalNative/js/components/containers/Fixtures'
import Results from 'futsalNative/js/components/containers/Results'
import Teams from 'futsalNative/js/components/containers/Teams'
import Leagues from 'futsalNative/js/components/containers/Leagues'

class LoggedInApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'login'
    }
    // initial actions to carry out. Prepopulate some stuff.
    // props.store.dispatch(LeagueTableActions.populateLeagueTable())
    // props.store.dispatch(FixturesActions.populateFixtures())
    // props.store.dispatch(ResultsActions.populateResults())
  }

  render() {
    return (
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
    )
  }

  _renderContent(Component) {
    return <Component />
  }

}

export default LoggedInApp
