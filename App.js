import React from 'react';
import Login from './Login';
import Securify from './Securify';

// TO DO : export to register
// import { Notifications } from 'expo';

// import registerForPushNotificationsAsync from './registerForPushNotificationsAsync';

export default class App extends React.Component {

  // componentDidMount() {
  //   registerForPushNotificationsAsync()
  //     .then(() => {
  //       // Handle notifications that are received or selected while the app
  //       // is open. If the app was closed and then opened by tapping the
  //       // notification (rather than just tapping the app icon to open it),
  //       // this function will fire on the next tick after the app starts
  //       // with the notification data.
  //       this._notificationSubscription = Notifications.addListener(this._handleNotification);
  //     }).catch((error) => {
  //       console.log(error.message)
  //     })
  // }

  // _handleNotification = (notification) => {
  //   this.setState({ notification: notification });
  // }

  render() {
    return (
      <Securify></Securify>
    );
  }
}