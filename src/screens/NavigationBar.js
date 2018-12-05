import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { StackActions, withNavigation } from 'react-navigation';

class NavigationBar extends React.Component {

  changeRoute(routeName) {
    //this.props.navigation.navigate(routeName)
    const replaceAction = StackActions.replace({routeName});
    this.props.navigation.dispatch(replaceAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.youSpeedMyHeadRightRound}></View>
        <TouchableOpacity onPress={this.changeRoute.bind(this, 'Account')}>
          <Image source={require('../../assets/account.png')} style={Object.assign({}, styles.icon, styles.accountIcon)}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.changeRoute.bind(this, 'Stats')}>
          <Image source={require('../../assets/stats.png')} style={Object.assign({}, styles.icon, styles.statsIcon)}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.changeRoute.bind(this, 'Connections')}>
          <Image source={require('../../assets/securify.png')} style={Object.assign({}, styles.icon, styles.securifyIcon)}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.changeRoute.bind(this, 'Pendings')}>
          <Image source={require('../../assets/asking.png')} style={Object.assign({}, styles.icon, styles.askingIcon)}/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/share.png')} style={Object.assign({}, styles.icon, styles.shareIcon)}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#0F0F11',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  icon: {
    height: 30,
  },
  accountIcon: {
    aspectRatio: 66 / 66,
  },
  statsIcon: {
    aspectRatio: 59 / 59,
  },
  securifyIcon: {
    height: 50,
    top: -25,
    left: -6,
    aspectRatio: 90 / 102,
  },
  askingIcon: {
    aspectRatio: 40 / 62,
  },
  shareIcon: {
    aspectRatio: 52 / 57,
  },
  youSpeedMyHeadRightRound: {
    position: 'absolute',
    width: 80,
    height: 80,
    backgroundColor: "#0F0F11",
    top: -35,
    left: '50%',
    transform: [{'translateX': -40}], // Half width
    borderRadius: 40
  },
  dev: {
  }
});

export default withNavigation(NavigationBar);