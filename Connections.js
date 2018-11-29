import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import NavigationBar from './NavigationBar';
import Gradient from './Gradient';

export default class Connections extends React.Component {

  changeRoute(routeName) {
    this.props.navigation.navigate(routeName)
  }

  render() {
    return (
      <View style={styles.container}>
        <Gradient />
        <Text style={{ color: '#fff' }}>Hello I'm The Connections Tab</Text>
        <Button
          onPress={this.changeRoute.bind(this, 'Camera')}
          title="Learn More"
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