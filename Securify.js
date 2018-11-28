import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo';
import NavigationBar from './NavigationBar';

export default class Securify extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#3D393A', '#10101D']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        />
        <NavigationBar></NavigationBar>
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