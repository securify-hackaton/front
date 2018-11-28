import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Notifications, LinearGradient } from 'expo';

import registerForPushNotificationsAsync from './registerForPushNotificationsAsync';


export default class App extends React.Component {
  componentDidMount() {
    registerForPushNotificationsAsync()
      .then(() => {
        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
      }).catch((error) => {
        console.log(error.message)
      })
  }

  _handleNotification = (notification) => {
    this.setState({ notification: notification });
  };

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
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
