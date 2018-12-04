import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import NavigationBar from './NavigationBar';
import Gradient from '../components/Gradient';
import env from '../../config/env.config';
import themes from '../../config/theme.config';

export default class Connections extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      actives: [],
      loading: true
    }
  }

  async getActives() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('https://securify-server.herokuapp.com/tokens/active', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.props.screenProps.userToken
          }
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

  async disconnect(tokenId) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(env.BASE_URL + '/tokens/revoke', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.props.screenProps.userToken
          },
          body: JSON.stringify({
            tokenId
          }),
        })
        const responseJson = await response.json()
        if (response.status >= 400) {
          throw new Error(responseJson.message)
        }
        const actives = await this.getActives()
        this.setState({
          actives
        })
        resolve(responseJson)
      } catch (error) {
        reject(error)
      }
    })
  }

  async componentDidMount() {
    const actives = await this.getActives()
    this.setState({
      actives,
      loading: false
    })
  }

  formatDate(dateStr) {
    var date = new Date(dateStr)
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
  }

  render() {
    Activity = () => {
      if (this.state.loading) {
        return <ActivityIndicator size="large" color="#509F7E" />
      }
      if (this.state.actives.length > 0) {
        return null
      }
      return <Text style={{color: "#fff"}}>You have no connections available 😅</Text>
    }

    RenderActives = () => {
      const actives = this.state.actives.map((active, index) => (
        <View key={active._id} style={{
          width: '85%',
          height: 80,
          marginTop: 30,
          marginBotton: 30,
          flexDirection: 'row'
        }}>
          <View style={{
            height: 100,
            width: 100,
            top: -10,
            backgroundColor: '#0F0F11',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4
          }}>
            <Image source={{uri: active.company.image}} style={{width: 50, height: 50}}/>
          </View>
          <View style={{flex: 1, padding: 10}}>
            <Gradient theme={themes.theme2}></Gradient>
            <Text style={{color:'#fff'}}>{active.company.name} : {active.deviceName}</Text>
            <Text style={{color:'#ffffff8a'}}>{this.formatDate(active.createdDate)} - {this.formatDate(active.expirationDate)}</Text>
            <TouchableOpacity style={{
                position: 'absolute',
                height: 30,
                width: 100,
                backgroundColor: '#FFF',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 3,
                bottom: -10,
                right: 10
              }} onPress={this.disconnect.bind(this, active._id)}>
              <Text style={{color: '#59D168', fontSize: 16, fontWeight: 'bold'}}>Disconnect</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))
      return actives
    }

    return (
      <View style={styles.container}>
        <Gradient theme={themes.theme1}/>
        <View style={{marginTop: 10, flex:1, alignSelf: 'stretch', alignItems: 'center', justifyContent: (this.state.actives.length > 0)?'flex-start':'center'}}>
          <RenderActives></RenderActives>
          <Activity></Activity>
        </View>
        <NavigationBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  mainText: {
    color: '#fff'
  }
});