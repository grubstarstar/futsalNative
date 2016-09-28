import { React, Component } from 'react'
import { FBLogin, FBLoginManager } from 'react-native-facebook-login'

class Login extends Component {

  constructor(props) {

  }

  render() {
    return <View>
      <FBLogin/>
    </View>
  }

}
