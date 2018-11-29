import React from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native';
import Gradient from './Gradient';
import env from './config/env.config'


export default class WaitingAuthenticate extends React.Component {

	async componentDidMount() {
		const { navigation } = this.props;
		const fieldName = navigation.getParam('fieldName', null);
		const fieldValue = navigation.getParam('fieldValue', null);
		const userToken = this.props.screenProps.userToken;
		console.log('user token : ' + userToken);
		const data = new FormData();
		if(fieldName !== null && fieldValue !== null) data.append(fieldName, fieldValue);
		data.append('image', {
			uri: navigation.getParam('photo', null).uri,
			type: 'image/jpeg',
			name: 'photo'
		})
		try {
			const response = await fetch(env.BASE_URL + navigation.getParam('httpUrl', null), {
				method: 'POST',
				headers: {
					'Authorization': userToken
				},
				body: data
			});
			console.log(response);
		}
		catch (error) {
			console.warn(error);
		}
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