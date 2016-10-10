// react stuff
import React, { Component } from 'react'

// react native stuff
import {
  View,
  Modal
} from 'react-native'

// import the initial scenes
import LoginRegister from 'futsalNative/js/login-register'
import MainPlayer from 'futsalNative/js/main-player'

// the react-redux stuff
import { connect } from 'react-redux'

class Main extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MainPlayer />
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={!this.props.userIsLoggedIn}
          onRequestClose={() => { console.log("Modal has been closed.") }}
          >
            <LoginRegister />
        </Modal>
      </View>
    )
  }

}

/* Container */

function select(state, ownProps) {
  return {
    ...ownProps,
    userIsLoggedIn: state.user.isLoggedInUsingCredentials || state.user.isLoggedInUsingFacebook
  }
}

function actions(dispatch, ownProps) {
  return {
    ...ownProps
  }
}

/* exports */

export default connect(
  select,
  actions
)(Main)
