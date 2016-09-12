// @flow

import { connect } from 'react-redux'
import { Dispatch } from 'futsalNative/js/actions/types.js'
import Fixtures from 'futsalNative/js/components/presentational/scenes/Fixtures'
import * as navigationActions from 'futsalNative/js/actions/Navigation'

function select(store, ownProps) {
  return {...ownProps
    // fixtures: store.fixtures.items
  }
}

function actions(dispatch: Dispatch, ownProps) {
  return {
    refreshFixtures: () => console.log('Fixtures:refreshFixtures called'),
    saveFixture: () => console.log('Fixtures:saveFixture called')
  }
}

export default connect(
  select,
  actions
)(Fixtures)
