import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './screens/Home';
import Payment from './screens/Payment';

const Stack = createSwitchNavigator({
    Home,
    Payment
}, {
    initialRouteName: 'Home'
})

export default createAppContainer(Stack)