import React from 'react';
import { StyleSheet, View, Text, Button, AsyncStorage } from 'react-native';
import NavigationBar from './NavigationBar';
import Gradient from './Gradient';

export default class Account extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Gradient/>
        <Text style={{color: '#fff'}}>Hello {this.props.screenProps.currentUser.firstName} {this.props.screenProps.currentUser.lastName}</Text>
        <Button
          onPress={this.props.screenProps.onLogOut}
          title="Sign Out"
          color="#841584"
          accessibilityLabel="Sign Out"
        />
        <NavigationBar/>
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