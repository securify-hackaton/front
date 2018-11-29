import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import NavigationBar from './NavigationBar';
import Gradient from './Gradient';

export default class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  getUserInfos() {

  }

  goToCamera(routeName) {
    this.props.navigation.navigate(routeName, {
      httpUrl: '/image'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Gradient/>
        <Text style={{color: '#fff'}}>Hello I'm The Account Tab</Text>
        <Button
          onPress={this.props.screenProps.onLogOut}
          title="Sign Out"
          color="#841584"
          accessibilityLabel="Sign Out"
        />
        <Button
          onPress={this.goToCamera.bind(this, 'Camera')}
          title="Add picture of yourself"
          color="#841584"
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