import React from 'react';
import { StyleSheet, View, Image, TextInput, Button, Text } from 'react-native';
import { LinearGradient } from 'expo';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  username = ''
  password = ''
  message = 'LOGING'

  login() {
    this.props.onLogin(this.username, this.password)
  }

  handleTextChange(type, text) {
    this[type] = text
  }

  redirectToRegister() {
    this.props.goToRegister()
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#3D393A', '#10101D']}
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
        <Image source={require('../../assets/logo.png')} style={{ position: 'absolute', top: -5, left: -70 }} />
        <View style={styles.loginForm}>
          <TextInput
            style={Object.assign({}, styles.loginFormInputs, styles.firstInput)}
            placeholder="Login"
            blurOnSubmit={true}
            onChangeText={this.handleTextChange.bind(this, 'username')}
          ></TextInput>
          <TextInput
            style={styles.loginFormInputs}
            textContentType="password"
            secureTextEntry={true}
            placeholder="Password"
            blurOnSubmit={true}
            onChangeText={this.handleTextChange.bind(this, 'password')}
          ></TextInput>
          <Button
            onPress={this.login.bind(this)}
            title="Log to your account"
            color="#509F7E"
            accessibilityLabel="login"
          />
          <Text style={styles.title}>You don't have an account yet ?</Text>
          <Button
            onPress={this.redirectToRegister.bind(this)}
            title="Register"
            color="#509F7E"
            accessibilityLabel="register"
            style={styles.redirectButton}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    color: 'white',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10
  },
  redirectButton: {
    alignItems: 'flex-start'
  },
  loginForm: {
    marginTop: 50,
    height: 250,
    flex: 0.8,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  loginFormInputs: {
    padding: 10,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    flex: 1,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    marginBottom: 15
  },
  firstInput: {
    marginBottom: 1,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  mainText: {
    color: '#fff'
  }
});
