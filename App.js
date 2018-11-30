import React from 'react';
import Securify from './Securify';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(["Require cycle:"]);

export default class App extends React.Component {

  constructor (props) {
    super(props);
    this.state =  {
      fromNotification: false
    }
  }

  render() {
    return (
      <Securify fromNotification={this.state.fromNotification}></Securify>
    );
  }
}