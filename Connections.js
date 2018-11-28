import React from 'react';
import { StyleSheet, View } from 'react-native';

export default class Connections extends React.Component {

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FF0000'
  },
  mainText: {
    color: '#fff'
  }
});