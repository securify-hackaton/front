import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import NavigationBar from './NavigationBar';
import Gradient from './Gradient';

export default class Connections extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Gradient />
        <Text style={{ color: '#fff' }}>Hello I'm The Connections Tab</Text>
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