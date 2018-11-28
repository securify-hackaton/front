import React from 'react';
import { LinearGradient } from 'expo';

export default class Gradient extends React.Component {

  render() {
    return (
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
    );
  }
}