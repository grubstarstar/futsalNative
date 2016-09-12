// @flow

import { connect } from 'react-redux'
import { Dispatch } from 'futsalNative/js/actions/types.js'
import Fixtures from 'futsalNative/js/components/presentational/scenes/Fixtures'
import * as navigationActions from 'futsalNative/js/actions/Navigation'

import moment from 'moment'

import * as fixtures from 'futsalNative/js/actions/Fixtures'

function select(store, ownProps) {
  return {
    ...ownProps,
    isFetching: store.fixtures.isFetching,
    fixtures: store.fixtures.data
    // fixtures: [
    //   {
    //     teamA: "Derby County",
    //     teamB: "Newcastle United",
    //     kickOffAt: moment('2016-07-01T12:30:00')
    //   },
    //   {
    //     teamA: "Burton Albion",
    //     teamB: "Newcastle United",
    //     kickOffAt: moment('2016-08-03T13:30:00')
    //   },
    //   {
    //     teamA: "Burton Albion",
    //     teamB: "Derby County",
    //     kickOffAt: moment('2016-08-03T13:00:00')
    //   }
    // ]
  }
}

function actions(dispatch: Dispatch, ownProps) {
  return {
    refreshFixtures: () => { dispatch(fixtures.populateFixtures()) },
    saveFixture: (callback) => setTimeout(() => {
      console.log('Fixtures:saveFixture called')
    }, 1000),
  }
}

export default connect(
  select,
  actions
)(Fixtures)
