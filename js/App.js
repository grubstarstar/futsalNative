// @flow

// react stuff
import React, { Component } from 'react'

// redux + middleware
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

// the Main scene entry point
import Main from 'futsalNative/js/Main'

// the combined reducer
import combinedReducer from 'futsalNative/js/reducers'

let store = createStore(
  combinedReducer,
  applyMiddleware(
    thunk,
    createLogger()
  )
)

// define the React component
class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={ store }>
        <Main />
      </Provider>
    )
  }

}

export default App
