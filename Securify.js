import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import Navigation from './Navigation'
import Login from './Login';
import Register from './Register';
import env from './config/env.config'

export default class Securify extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      user: {},
      userToken: null,
      whichPage: 'login'
    }
  }

  componentWillMount() {
    this.isLoggedIn()
  }

  async callLoginApi(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(env.BASE_URL + '/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
        const responseJson = await response.json()
        if (response.status >= 400) {
          throw new Error(responseJson.message)
        }
        resolve(responseJson)
      } catch (error) {
        reject(error)
      }
    })
  }

  async loginUser(email, password) {
    try {
      const response = await this.callLoginApi(email, password)
      await AsyncStorage.setItem('isLoggedIn', 'true')
      await AsyncStorage.setItem('currentUser', JSON.stringify(response.user))
      await AsyncStorage.setItem('userToken', JSON.stringify(response.token))
      this.setState({
        isLoggedIn: true,
        user: response.user,
        userToken: response.token
      })
    } catch (error) {
      console.warn(error.message)
    }
  }

  async isLoggedIn() {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn') || false
      if (isLoggedIn) {
        const user = await AsyncStorage.getItem('currentUser')
        const token = await AsyncStorage.getItem('userToken')
        this.setState({
          isLoggedIn,
          user: JSON.parse(user),
          userToken: JSON.parse(token)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async signOut() {
    try {
      await AsyncStorage.multiRemove(['isLoggedIn', 'currentUser', 'userToken'])
      this.setState({isLoggedIn: !this.isLoggedIn})
    } catch (error) {
      console.log(error)
    }
  }

  goToRegister(){
    this.state.whichPage = 'register';
    console.log('go To register');
    this.forceUpdate();
  }

  goToLogin(){
    this.state.whichPage = 'login';
    console.log('go To login');
    this.forceUpdate();
  }

  render() {
    let whichPage = this.state.whichPage;  

    if (this.state.isLoggedIn) {
      return (
        <View style={styles.container}>
          <Navigation screenProps={{
            onLogOut: this.signOut.bind(this),
            currentUser: this.state.user,
            userToken: this.state.userToken 
          }}/>
        </View>
      );
    }
    if(whichPage === 'login') {
      return (
        <View style={styles.container}>
          <Login onLogin={this.loginUser.bind(this)} goToRegister={this.goToRegister.bind(this)}/>
        </View>
      );
    } else if (whichPage === 'register') {
      return (
        <View style={styles.container}>
          <Register goToLogin={this.goToLogin.bind(this)}/>
        </View>
      );
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  mainText: {
    color: '#fff'
  }
});