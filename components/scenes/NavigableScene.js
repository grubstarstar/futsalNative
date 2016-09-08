import React, { Component, PropTypes } from 'react'
import uuid from 'react-native-uuid'
import {
	Navigator,
	View,
	Text,
	TouchableOpacity
} from 'react-native'

export default class extends Component {

	static propTypes = {
		navigator: PropTypes.instanceOf(Navigator),
		navBack: PropTypes.shape({
			label: PropTypes.string.isRequired,
			action: PropTypes.func.isRequired
		}),
		navForward: PropTypes.shape({
			label: PropTypes.string.isRequired,
			action: PropTypes.func.isRequired
		}),
	}

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 10 }}>
					{ this.getNavButtons() }
				</View>
				<View style={{ flex: 20 }}>
					{ this.props.children }
				</View>
			</View>
		)
	}

	getNavButtons() {
		return ['navBack', 'navForward']
			.filter( (navButton) => this.props[navButton] )
			.map( (navButton) => {
				return (
					<TouchableOpacity key={ uuid.v4() }
						onPress={ this.props[navButton].action }>
						<Text>{ this.props[navButton].label }</Text>
					</TouchableOpacity>
				)
			})
	}
}