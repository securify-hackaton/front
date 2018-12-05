import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import NavigationBar from './NavigationBar';
import Gradient from '../components/Gradient';
import themes from '../../config/theme.config';

export default class Account extends React.Component {

  goToCamera(routeName) {
    this.props.navigation.navigate(routeName, {
      httpUrl: '/image',
      onSuccess: 'Account'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Gradient theme={themes.mainTheme.background}/>
        <Text style={{color: '#fff'}}>Hello {this.props.screenProps.currentUser.firstName} {this.props.screenProps.currentUser.lastName}</Text>
        <Button
          onPress={this.goToCamera.bind(this, 'Camera')}
          title="Add picture of yourself"
          color="#509F7E"
        />
        <Button
          onPress={this.props.screenProps.onLogOut}
          title="Sign Out"
          color="#509F7E"
          style={styles.signOut}
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
  },
  signOut: {
    marginTop: '20px'
  }
});