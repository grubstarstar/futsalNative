// @flow

import { connect } from 'react-redux'
import { Dispatch } from 'futsalNative/js/actions/types.js'
import EditResult from 'futsalNative/js/components/presentational/modals/EditResult'

function select(store, ownProps) {
  return ownProps
}

function actions(dispatch: Dispatch, ownProps) {
  return {
    saveResult: () => console.log('saveResult called')
  }
}

export default connect(
  select,
  actions
)(EditResult)
