// @flow

import { connect } from 'react-redux'
import { Dispatch } from 'futsalNative/js/actions/types.js'
import Results from 'futsalNative/js/components/presentational/scenes/Results'

import moment from 'moment'

import * as results from 'futsalNative/js/actions/Results'

function select(store, ownProps) {
  return {
    ...ownProps,
    isFetching: store.results.isFetching,
    results: store.results.data
    // results: [
    //   {
    //     teamA: "Derby County",
    //     teamB: "Newcastle United",
    //     teamA_Goals: 1,
    //     teamB_Goals: 1,
    //     kickOffAt: moment('2016-07-01T12:30:00')
    //   },
    //   {
    //     teamA: "Burton Albion",
    //     teamB: "Newcastle United",
    //     teamA_Goals: 2,
    //     teamB_Goals: 3,
    //     kickOffAt: moment('2016-08-03T13:30:00')
    //   },
    // ]
  }
}

function actions(dispatch: Dispatch, ownProps) {
  return {
    refreshResults: () => { dispatch(results.populateResults()) },
    saveResult: (callback) => setTimeout(() => {
      console.log('Results:saveResult called')
    }, 1000),
  }
}

export default connect(
  select,
  actions
)(Results)
