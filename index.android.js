/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Splash from './components/Splash'
import MainMenu from './components/MainMenu'

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Navigator
        style={{ flex: 1, paddingTop: 20 }}
        initialRoute={{ index: 0, title: 'Splash' }}
        renderScene={ (route, navigator) => {
          let onForward = () => {
            navigator.push({
              index: 1,
              title: "Main Menu"
            })
          }
          let onBack = () => {
            navigator.pop()
          }
          switch(route.index) {
            case 10:
              return <View style={{ flex: 1, backgroundColor: 'green' }}><TouchableOpacity onPress={ onForward }><Text>Go Forward</Text></TouchableOpacity></View>
            case 0:
              return <Splash onFinishAnimation={ onForward } />
            case 1:
              return  <MainMenu navBack={ onBack } />
          }
        } } />  
    )
  }

  navToMainMenu(navigator) {
    navigator.push({
      index: 1,
      title: "Main Menu"
    })
  }

  renderScene(route, navigator) {
    switch(route.index) {
      case 0:
        return <Splash
          onFinishAnimation={ this.navToMainMenu.bind(this, navigator) } />
      case 1:
        return <MainMenu title={ route.title }/>
    }
  }

}

const styles = StyleSheet.create({
  header: {
    fontSize: 30
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  button: {
    // backgroundColor: '#39D',
    // borderRadius: 30,
    // paddingVertical: 15,
    // paddingHorizontal: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('futsalNative', () => App);
