import React from 'react';
import Securify from './Securify';
import { YellowBox } from 'react-native';
import { Notifications } from 'expo';

YellowBox.ignoreWarnings(["Require cycle:"]);

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fromNotification: false
    }
  }

  async componentDidMount() {
    Notifications.getExpoPushTokenAsync()
      .then(() => {
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
      })
  }

  _handleNotification = (notification) => {
    this.setState({ fromNotification: true });
  }

  render() {
    return (
      <Securify fromNotification={this.state.fromNotification}></Securify>
    );
  }
}