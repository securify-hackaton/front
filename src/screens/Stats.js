import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Gradient from '../components/Gradient';
import NavigationBar from './NavigationBar';
import themes from '../../config/theme.config';

export default class Stats extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Gradient theme={themes.mainTheme.background}/>
        <Text style={{color: '#fff'}}>Hello I'm The Stats Tab</Text>
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