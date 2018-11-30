import React from 'react';
import { StyleSheet, View, Image, TextInput, Button, Text } from 'react-native';
import { LinearGradient } from 'expo';

export default class Register extends React.Component {

  constructor(props) {
    super(props);
  }

  username =  ''
  password = ''
  message = 'REGISTER'

  redirectToLogin(){
    this.props.goToLogin()
  }

  register(){
    this.props.onRegister(this.username, this.password, this.firstName, this.lastName)    
  }

  handleTextChange(type, text) {
    this[type] = text
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
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        />
        <Image source={require('./assets/logo.png')} style={{position: 'absolute', top: -5, left: -70}}/>
        <View style={styles.loginForm}>
          <Text style={styles.title}>Create your account</Text>          
          <TextInput 
            style={Object.assign({}, styles.loginFormInputs, styles.firstInput)}
            placeholder="Insert your email"
            blurOnSubmit={true}
            onChangeText={this.handleTextChange.bind(this, 'username')}
          ></TextInput>
          <TextInput 
            style={Object.assign({}, styles.loginFormInputs, styles.firstInput)}
            placeholder="Insert your firstname"
            blurOnSubmit={true}
            onChangeText={this.handleTextChange.bind(this, 'firstName')}
          ></TextInput>
          <TextInput 
            style={Object.assign({}, styles.loginFormInputs, styles.firstInput)}
            placeholder="Insert your lastname"
            blurOnSubmit={true}
            onChangeText={this.handleTextChange.bind(this, 'lastName')}
          ></TextInput>
          <TextInput
            style={styles.loginFormInputs}
            textContentType="password"
            secureTextEntry={true}
            placeholder="Insert your password"
            blurOnSubmit={true}
            onChangeText={this.handleTextChange.bind(this, 'password')}
          ></TextInput>
          <Button
            onPress={this.register.bind(this)}
            title="Register"
            color="#509F7E"
            accessibilityLabel="register"
          />
          <Button
            onPress={this.redirectToLogin.bind(this)}
            title="Back to login"
            color="#509F7E"
            accessibilityLabel="login"
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
  loginForm: {
    marginTop: 50,
    height: 400,
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
