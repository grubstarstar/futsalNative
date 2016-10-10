// @flow

import { connect } from 'react-redux'
import { Dispatch } from 'futsalNative/js/actions/types.js'
import Teams from 'futsalNative/js/components/presentational/scenes/Teams'

function select(store, ownProps) {
  return ownProps
}

function actions(dispatch: Dispatch, ownProps) {
  return {
    actionProp: () => {}
  }
}

export default connect(
  select,
  actions
)(Teams)
