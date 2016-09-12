// @flow

import { connect } from 'react-redux'
import { Dispatch } from 'futsalNative/js/actions/types.js'
import LeagueTable from 'futsalNative/js/components/presentational/scenes/LeagueTable'
import * as navigationActions from 'futsalNative/js/actions/Navigation'
import * as LeagueTableActions from 'futsalNative/js/actions/LeagueTable'

function select(state, ownProps) {
  return {
    ...ownProps,
    table: state.leagueTable.table
  }
}

function actions(dispatch, ownProps) {
  return {

    navBack: {
      label: 'Back to menu',
      action: () => dispatch(navigationActions.navigateBack(ownProps.navigator))
    },

    onRowPress: (event) => {
      alert('row pressed')
    },

    loadTable: () => {
      // dispatch(LeagueTableActions.populateLeagueTable())
    }

  }
}

export default connect(
  select,
  actions
)(LeagueTable)
