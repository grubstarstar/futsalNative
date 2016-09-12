import React, { Component } from 'react'

import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

export default (props) => {
  return (
    <TouchableOpacity
      style={ styles.container }
      onPress={ props.onPress }>
      <Text>{ props.text }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'skyblue',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  }
})
