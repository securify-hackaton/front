import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Gradient from './Gradient';
import env from './config/env.config'


export default class WaitingAuthenticate extends React.Component {

	componentDidMount() {
		const { navigation } = this.props;
		console.log("requestID = " + navigation.getParam('requestId', 'toto'));
		const data = new FormData();
		data.append('requestId', navigation.getParam('requestId', null));
		data.append('image', {
			uri: navigation.getParam('photo', null).uri,
			type: 'image/jpeg',
			name: 'photo'
		})
		return fetch(env.BASE_URL + '/authenticate', {
			method: 'POST',
			headers: {
				'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YmZmYmIyMjQ0ZWQwZTRlNTQ1MTIwYjciLCJpYXQiOjE1NDM0ODYyNDJ9.gF_FwjTbjgA5J2LPU-1kTiPEq7mgK2oPIuymZKsWKQc'
			},
			body: data
		}).then((response) => {
			console.log(response);
		}).catch((error) => {
			console.warn(error);
		})
	}

	render() {
		const { navigation } = this.props;

		return (
			<View style={styles.container}>
				<Gradient />
				<ActivityIndicator size="large"/>
				{/* <Image source=(na) */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	mainText: {
		color: '#fff'
	}
});