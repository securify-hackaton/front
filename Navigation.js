// Navigation/Navigation.js

import { createStackNavigator } from 'react-navigation'

const AppStackNavigator = createStackNavigator({
  Connections: {
    screen: Connections,
    navigationOptions: {
      title: 'Connections'
    }
  },

})

export default AppStackNavigator