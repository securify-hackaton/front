import React from 'react';
import { StyleSheet, View } from 'react-native';
import NavigationBar from './NavigationBar';
import Navigation from './Navigation'

export default class Securify extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Navigation/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  mainText: {
    color: '#fff'
  }
});