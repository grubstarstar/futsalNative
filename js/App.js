// @flow

// react stuff
import React, { Component } from 'react'

// redux + middleware
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

// the combined reducer
import combinedReducer from 'futsalNative/js/reducers'

// import the initial scenes
import LoginOrRegister from 'futsalNative/js/components/containers/LoginOrRegister'
import LoggedInApp from 'futsalNative/js/components/containers/LoggedInApp'

let store = createStore(
  combinedReducer,
  applyMiddleware(
    thunk,
    createLogger()
  )
)
// console.log('store',store)
// define the React component
class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={ store }>
        { this.props.userIsLoggedIn
          ? <LoggedInApp />
          : <LoginOrRegister /> }
      </Provider>
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

// connect react container components select and action functions and export
export default connect(
  select,
  actions
)(App)
