// @flow

import { connect } from 'react-redux'
import { Dispatch } from 'futsalNative/js/actions/types.js'
import EditFixture from 'futsalNative/js/components/presentational/modals/EditFixture'

function select(store, ownProps) {
  return ownProps
}

function actions(dispatch: Dispatch, ownProps) {
  return ownProps;
  // return {
    // saveFixture: () => console.log('saveFixture called')
  // }
}

export default connect(
  select,
  actions
)(EditFixture)
