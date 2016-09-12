// @flow

import { connect } from 'react-redux'
import { Dispatch } from 'futsalNative/js/actions/types.js'

import MainMenu from 'futsalNative/js/components/presentational/scenes/MainMenu'

import LeagueTable from 'futsalNative/js/components/containers/LeagueTable'
import Fixtures from 'futsalNative/js/components/containers/Fixtures'

import { navigateTo, navigateBack } from 'futsalNative/js/actions/Navigation'

function select(store, ownProps) {
  return ownProps
}

function actions(dispatch, ownProps) {
  return {

    navBack: {
      label: 'Back to splash',
      action: () => dispatch(navigateBack(ownProps.navigator))
    },

    navForward: {
      label: 'Forward to League Table',
      action: () => dispatch(navigateTo(ownProps.navigator, LeagueTable))
    },

    onPressLeagueTable: () => {
      dispatch(navigateTo(ownProps.navigator, LeagueTable))
    },

    onPressFixtures: () => {
      dispatch(navigateTo(ownProps.navigator, Fixtures))
    }

  }
}

export default connect(
  select,
  actions
)(MainMenu)
