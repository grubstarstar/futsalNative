import React, { Component, PropTypes } from 'react'
import {
  Animated,
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native'

import { connect } from 'react-redux'

class Splash extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      animationFinished: false,
      ballSize: new Animated.Value(0.01),
      headerSize: new Animated.Value(0),
      footerSize: new Animated.Value(0),
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
          onPress={
            this.state.animationFinished
              ? this.props.onPress
              : () => {} }>
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-around' }}>
          <Animated.Text
            style={{
              fontSize: 40,
              transform: [
                { scale: this.state.headerSize }
              ]
            }}>
            Futsal
          </Animated.Text>
          <Animated.Image
            source={ require('futsalNative/images/futsal-ball.jpg') }
            style={{
              height: 100,
              width: 100,
              transform: [
                { scale: this.state.ballSize }
              ]
            }}
          />
          <Animated.Text
            style={{
              fontSize: 40,
              transform: [
                { scale: this.state.footerSize }
              ]
            }}>
            Scorekeeper
          </Animated.Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  componentDidMount() {

    Animated.stagger(
      50,
      [
        Animated.spring(
          this.state.headerSize,
          {
            toValue: 1,
            tension: 70,
            friction: 5
          }
        ),
        Animated.spring(
          this.state.ballSize,
          {
              toValue: 1,
              tension: 70,
              friction: 6
            }
        ),
        Animated.spring(
          this.state.footerSize,
          {
            toValue: 1,
            tension: 70,
            friction: 5
          }
        )
    ]).start(() => this.setState({
      animationFinished: true
    }))
  }

}

export default Splash
