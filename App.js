import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';


console.disableYellowBox = true;

const Stack = createStackNavigator({
  Login,
  Register
})

const Switch = createSwitchNavigator({
  Home,
  Splash,
  Stack,
},
  {
    initialRouteName: 'Splash'
  }
)

export default createAppContainer(Switch)