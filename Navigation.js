// Navigation/Navigation.js

import { createStackNavigator, createAppContainer } from 'react-navigation'
import Connections from './Connections'
import Stats from './Stats'

const AppStackNavigator = createStackNavigator({
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
  }
},
{
  initialRouteName: "Connections"
})

const AppContainer = createAppContainer(AppStackNavigator);

export default AppContainer