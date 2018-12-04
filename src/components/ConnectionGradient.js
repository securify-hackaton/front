import React from 'react';
import { LinearGradient } from 'expo';

export default class ConnectionGradient extends React.Component {

  render() {
    return (
        <LinearGradient
            colors={['#509F7E', '#59D168']}
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
    );
  }
}