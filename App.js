import React from 'react';
import { PermissionsAndroid } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Splash from './src/screens/Splash';
import Route from './src/routes';


console.disableYellowBox = true;

if (Platform.OS === 'ios') {
  Geolocation.requestAuthorization();
  Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
  });
}

if (Platform.OS === 'android') {
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
}

const Stack = createStackNavigator({
  Login,
  Register
})

const Switch = createSwitchNavigator({
  Route,
  Splash,
  Stack,
},
  {
    initialRouteName: 'Splash'
  }
)

export default createAppContainer(Switch)