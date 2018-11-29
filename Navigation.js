// Navigation/Navigation.js

import { createStackNavigator, createAppContainer } from 'react-navigation'
import Connections from './Connections'
import Stats from './Stats'
import Pendings from './Pendings'
import Camera from './Camera'
import Account from './Account'

const AppStackNavigator = createStackNavigator({
  Account: {
    screen: Account,
    navigationOptions: {
      header: null
    }
  },
  Connections: {
    screen: Connections,
    navigationOptions: {
      header: null
    }
  },
  Stats: {
    screen: Stats,
    navigationOptions: {
      header: null
    }
  },
  Pendings: {
    screen: Pendings,
    navigationOptions: {
      header: null
    }
  },
  Camera: {
    screen: Camera,
    navigationOptions: {
      header: null
    }
  }
},
{
  initialRouteName: "Connections",
  transitionConfig : () => ({
  	transitionSpec: {
  		duration: 0
  	},
  })
},
)

const AppContainer = createAppContainer(AppStackNavigator);

export default AppContainer