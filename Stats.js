import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Gradient from './Gradient';

export default class Stats extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Gradient/>
        <Text style={{color: '#fff'}}>Hello I'm The Stats Tab</Text>
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