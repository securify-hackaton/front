import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Camera, Permissions, FaceDetector, ImageManipulator } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log("camera onsuccess : " + navigation.getParam('onSuccess', null))
    this.setState({
      hasCameraPermission: status === 'granted',
      httpUrl: navigation.getParam('httpUrl', null),
      fieldName: navigation.getParam('fieldName', null),
      fieldValue: navigation.getParam('fieldValue', null),
      onSuccess: navigation.getParam('onSuccess', null),
      pictureTaken: false
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
          const { height, width } = Dimensions.get('window');
          ImageManipulator.manipulateAsync(photo.uri, [{width, height}], {compress: 0.15, format: 'jpeg'})
            .then((compressedPhoto) => {
              console.log('compressed : ');
              console.log(compressedPhoto);
              this.props.navigation.navigate('WaitingAuthenticate', {
                photo: compressedPhoto,
                httpUrl: this.state.httpUrl,
                fieldName: this.state.fieldName,
                fieldValue: this.state.fieldValue,
                onSuccess: this.state.onSuccess
              });
            })
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