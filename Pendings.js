import React from 'react';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import NavigationBar from './NavigationBar';
import Gradient from './Gradient';

export default class Pendings extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pendings: []
    }
  }

  autoriser(pendingId) {
    console.log('Autoriser')
    this.props.navigation.navigate('Camera', {
      httpUrl: '/authenticate',
      fieldName: 'requestId',
      fieldValue: pendingId,
      onSuccess: 'Connections'
    })
  }

  refuser() {
    console.log('Refuser')
  }

  async getPendings() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('https://securify-server.herokuapp.com/tokens/pending', {
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

  async componentDidMount() {
    const pendings = await this.getPendings()
    this.setState({
      pendings
    })
  }

  render() {
    RenderPendings = () => {
      console.log(this.state.pendings)
      const pendings = this.state.pendings.sort((a, b) => a.createdDate > b.createdDate).map((pending, index) => (
        <View key={pending._id}
          style={{
            position: 'absolute',
            zIndex: index,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            flex: 1
          }}
        >
          <Gradient style={{position: 'absolute'}}></Gradient>
          <View style={{flex: 0.4, alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
            <View style={{
              width: 140,
              height: 140,
              borderRadius: 75,
              backgroundColor: '#0F0F11',
              position: 'absolute',
              zIndex: 1,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{'translateX': -40}, {'translateY': -20}]
            }}>
              <Image source={{uri: pending.company.image}} style={{width: 80, height: 80}}/>
            </View>
            <View style={{
              width: 120,
              height: 120,
              borderRadius: 75,
              backgroundColor: '#0F0F11',
              position: 'absolute',
              zIndex: 0,
              transform: [{'translateX': 40}, {'translateY': 20}]
            }}>
            </View>
            <Image source={require('./assets/pending-logo.png')} style={{
              width: 60,
              height: 60,
              position: 'absolute',
              zIndex: 3,
              transform: [{'translateX': 40}, {'translateY': 20}]
            }}/>
          </View>
          <View style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#fff', fontSize: 30, padding: 10, textAlign: 'center', width: '80%'}}>{pending.company.name} souhaite vous authentifier</Text>
          </View>
          <View style={{flex: 0.2, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column'}}>
            <TouchableOpacity style={{ height: 60, width: '70%', marginTop: 10, backgroundColor: '#509F7E', alignItems: 'center', justifyContent: 'center', borderRadius: 4}} onPress={this.autoriser.bind(this, pending._id)}>
              <Text style={{color: '#fff', fontSize: 20}}>Autoriser</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.2, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column'}}>
            <TouchableOpacity style={{ height: 60, width: '70%', marginTop: 10, backgroundColor: '#BD413A', alignItems: 'center', justifyContent: 'center', borderRadius: 4}} onPress={this.refuser}>
              <Text style={{color: '#fff', fontSize: 20}}>Refuser</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))
      return pendings
      /*
      <FlatList
            data={this.state.pendings}
            renderItem={this.renderPendings}
            keyExtractor={item => item._id}
          />
      */
    }

    return (
      <View style={styles.container}>
        <Gradient/>
        <RenderPendings></RenderPendings>
        <NavigationBar/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainText: {
    color: '#fff'
  }
});