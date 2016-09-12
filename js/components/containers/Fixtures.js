// @flow

import { connect } from 'react-redux'
import { Dispatch } from 'futsalNative/js/actions/types.js'
import Fixtures from 'futsalNative/js/components/presentational/scenes/Fixtures'
import * as navigationActions from 'futsalNative/js/actions/Navigation'

function select(store, ownProps) {
  return ownProps
}

function actions(dispatch: Dispatch, ownProps) {
  return {
    navBack: {
      label: 'Back to menu',
      action: () => dispatch(navigationActions.navigateBack(ownProps.navigator))
    }
  }
}

export default connect(
  select,
  actions
)(Fixtures)
