import React, {Component} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import { logoutUser } from '../actions/forms';

class Logout extends Component {

	componentWillMount() {
		this.props.logoutUser();
	}

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text h4>Logging out...</Text>
			</View>
		);
	}
}

export default connect(null, {
	logoutUser
})(Logout);