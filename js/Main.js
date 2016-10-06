// react stuff
import React, { Component } from 'react'

// react native stuff
import {
  View,
  Text,
  Modal
} from 'react-native'

// import the initial scenes
import LoginOrRegister from 'futsalNative/js/components/containers/LoginOrRegister'
import LoggedInApp from 'futsalNative/js/components/containers/LoggedInApp'

// the react-redux stuff
import { connect } from 'react-redux'

class Main extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LoggedInApp />
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={!this.props.userIsLoggedIn}
          onRequestClose={() => { console.log("Modal has been closed.") }}
          >
            <LoginOrRegister />
        </Modal>
      </View>
    )
  }

}

// defined the container components select and action functions
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

export default connect(
  select,
  actions
)(Main)
