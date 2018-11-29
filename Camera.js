import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Camera, Permissions, FaceDetector } from 'expo';
import env from './config/env.config'

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
    loading: false,
    photo: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleFaceDetected = ({ faces }) => {
    if (this.camera && faces.length > 0) {
      console.log("FACE DETECTED");
      this.camera.takePictureAsync()
        .then((photo) => {
          this.state.loading = true;
          this.state.photo = photo;
          // return fetch(env.BASE_URL + '/authenticate', {
          //   method: 'POST',
          //   headers: {
          //     Accept: 'application/json',
          //     'Content-Type': 'application/json',
          //     'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YmZmYmIyMjQ0ZWQwZTRlNTQ1MTIwYjciLCJpYXQiOjE1NDM0ODYyNDJ9.gF_FwjTbjgA5J2LPU-1kTiPEq7mgK2oPIuymZKsWKQc'
          //   },
          //   body: JSON.stringify({
          //     image: {
          //       uri: photo.uri,
          //       type: 'image/jpeg',
          //       name: 'photo'
          //     },
          //     requestId: "TO CHANGE"
          //   })
          // })
        })
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    } else {
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
}