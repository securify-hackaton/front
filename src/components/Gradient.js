import React from 'react';
import { LinearGradient } from 'expo';

export default class Gradient extends React.Component {

  render() {
    var theme = this.props.theme;
    return (
      <LinearGradient
        colors={[theme.color1, theme.color2]}
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
    );
  }
}