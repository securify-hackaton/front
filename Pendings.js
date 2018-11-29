import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import NavigationBar from './NavigationBar';
import Gradient from './Gradient';

export default class Pendings extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pendings: []
    }
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
          <View>
            <Image source={require('./assets/pending-logo.png')} style={{width: 100, height: 100, borderRadius: 50}}/>
            <Image source={{uri: pending.company.image}} style={{width: 100, height: 100, borderRadius: 50}}/>
          </View>
          <Text style={{color:'#fff', marginTop:25}}>{pending.company.name} souhaite vous authentifier</Text>
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