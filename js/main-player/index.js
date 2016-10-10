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
import LeagueTable from 'futsalNative/js/league-table'
import Fixtures from 'futsalNative/js/fixtures'
import Results from 'futsalNative/js/results'
import Teams from 'futsalNative/js/teams'
import Divisions from 'futsalNative/js/divisions'

/* Presentation */

class MainPlayer extends Component {

  constructor(props) {
    
    super(props)
    this.state = {
      selectedTab: 'login'
    }

    this.props.onLoad()
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="League Table"
          icon={ require("images/news.png") }
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
          icon={ require("images/football2.png") }
          selected={ this.state.selectedTab === 'fixtures' }
          onPress={ () => {
            this.setState({ selectedTab: 'fixtures' })
          }} >
          { this._renderContent(Fixtures) }
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Results"
          icon={ require("images/line_chart.png") }
          selected={ this.state.selectedTab === 'results' }
          onPress={ () => {
            this.setState({ selectedTab: 'results' })
          }} >
          { this._renderContent(Results) }
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Teams"
          icon={ require("images/update.png") }
          selected={ this.state.selectedTab === 'teams' }
          onPress={ () => {
            this.setState({ selectedTab: 'teams' })
          }} >
          { this._renderContent(Teams) }
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Divisions"
          icon={ require("images/football.png") }
          selected={ this.state.selectedTab === 'divisions' }
          onPress={ () => {
            this.setState({ selectedTab: 'divisions' })
          }} >
          { this._renderContent(Divisions) }
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }

  _renderContent(Component) {
    return <Component />
  }

}

/* Container */

function select(state, ownProps) {
  return {
      ...ownProps,
  }
}

function actions(dispatch, ownProps) {
  return {
      ...ownProps,

      onLoad: () => {
        dispatch(LeagueTableActions.populateLeagueTable())
        dispatch(FixturesActions.populateFixtures())
        dispatch(ResultsActions.populateResults())
      }

  }
}

/* exports */

export default connect(
  select,
  actions
)(MainPlayer)
