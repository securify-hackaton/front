import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Gradient from './Gradient';
import env from './config/env.config'


export default class WaitingAuthenticate extends React.Component {

	componentDidMount() {
		const { navigation } = this.props;
		const data = new FormData();
		data.append(
			navigation.getParam('fieldName', null),
			navigation.getParam('fieldValue', null)
		);
		data.append('image', {
			uri: navigation.getParam('photo', null).uri,
			type: 'image/jpeg',
			name: 'photo'
		})
		return fetch(env.BASE_URL + navigation.getParam('httpUrl', null), {
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
		return (
			<View style={styles.container}>
				<Gradient />
				<ActivityIndicator size="large" />
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