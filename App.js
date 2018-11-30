import React from 'react';
import Login from './Login';
import Securify from './Securify';
import { YellowBox } from 'react-native';
// TO DO : export to register
import { Notifications } from 'expo';
import registerForPushNotificationsAsync from './registerForPushNotificationsAsync';

YellowBox.ignoreWarnings(["Require cycle:"]);

export default class App extends React.Component {

  constructor (props) {
    super(props);
    this.state =  {
      fromNotification: false
    }
  }

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
        console.log(error.message);
      })
  }

  _handleNotification = (notification) => {
    // The user is coming from a notification (100% chance that there is a pending token)
    this.setState({fromNotification: true})
  }

  render() {
    return (
      <Securify fromNotification={this.state.fromNotification}></Securify>
    );
  }
}