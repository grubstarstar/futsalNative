// @flow

import { connect } from 'react-redux'
import { Dispatch } from 'futsalNative/js/actions/types.js'
import Splash from 'futsalNative/js/components/presentational/scenes/Splash'

import MainMenu from 'futsalNative/js/components/containers/MainMenu'
import * as navigationActions from 'futsalNative/js/actions/Navigation'

function select(store, ownProps) {
  return ownProps
}

function actions(dispatch: Dispatch, ownProps) {
  return {
    onPress: () => dispatch(navigationActions.navigateTo(ownProps.navigator, MainMenu))
  }
}

export default connect(
  select,
  actions
)(Splash)
