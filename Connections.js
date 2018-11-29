import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import NavigationBar from './NavigationBar';
import Gradient from './Gradient';

export default class Connections extends React.Component {

  goToCamera(routeName) {
    this.props.navigation.navigate(routeName, {
      httpUrl: '/authenticate',
      fieldName: 'requestId',
      fieldValue: '5bffebf394aed70016ff7445',
      onSuccess: 'Connections'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Gradient />
        <Text style={{ color: '#fff' }}>Hello I'm The Connections Tab</Text>
        <Button
          onPress={this.goToCamera.bind(this, 'Camera')}
          title="Camera"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <NavigationBar />
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