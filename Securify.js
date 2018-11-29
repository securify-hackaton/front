import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import Navigation from './Navigation'
import Login from './Login';

export default class Securify extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  componentWillMount() {
    this.isLoggedIn()
  }

  async callLoginApi(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('http://137.74.194.236:3004/login', {
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
      this.setState({isLoggedIn: true})
    } catch (error) {
      console.warn(error.message)
    }
  }

  async isLoggedIn() {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn') || false
      this.setState({isLoggedIn})
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

  render() {
    if (this.state.isLoggedIn) {
      return (
        <View style={styles.container}>
          <Navigation screenProps={{
            onLogOut:this.signOut.bind(this)
          }}/>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Login onLogin={this.loginUser.bind(this)}/>
      </View>
    );
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