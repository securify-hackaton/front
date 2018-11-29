import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Camera, Permissions, FaceDetector } from 'expo';
import env from './config/env.config'

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
    pictureTaken: false,
  };

  async componentDidMount() {
		const { navigation } = this.props;    
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ 
      hasCameraPermission: status === 'granted',
      requestId: navigation.getParam('requestId', null)
    });
    console.log(this.state);
  }

  handleFaceDetected = ({ faces }) => {
    if (this.camera && faces.length > 0 && !this.state.pictureTaken) {
      console.log("FACE DETECTED");
      this.state.pictureTaken = true;
      this.camera.takePictureAsync()
        .then((photo) => {
          console.log(photo)
          this.props.navigation.navigate('WaitingAuthenticate', {
            photo: photo,
            requestId: this.state.requestId
          });
        })
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => { this.camera = ref }}
            style={{ flex: 1 }}
            type={this.state.type}
            onFacesDetected={this.handleFaceDetected}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Mode.none,
              runClassifications: FaceDetector.Constants.Mode.none,
            }}>
          </Camera>
        </View>
      );
    }
  }
}