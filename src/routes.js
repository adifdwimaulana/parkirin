import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';


import Home from './screens/Home';
import Park from './screens/Park';
import Profile from './screens/Profile';


class HomeScreen extends React.Component {
    render() {
        return (
            <ScrollView>
                <Home />
            </ScrollView>
        )
    }
}

class ParkScreen extends React.Component {
    render() {
        return (
            <View>
                <Park />
            </View>
        )
    }
}

class ProfileScreen extends React.Component {
    render() {
        return (
            <View>
                <Profile />
            </View>
        )
    }
}

const TabNvigator = createMaterialBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View>
                    <Icon style={[{ color: tintColor }]} size={25} name={'home'} />
                </View>
            )
        }
    },
    Park: {
        screen: ParkScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View>
                    <Icon style={[{ color: tintColor }]} size={25} name={'map-marker'} />
                </View>
            ),
            activeColor: '#ffffff',
            inactiveColor: '#ebaabd',
            barStyle: { backgroundColor: '#d13560' },
        }
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View>
                    <Icon style={[{ color: tintColor }]} size={25} name={'user'} />
                </View>
            ),
            activeColor: '#ffffff',
            inactiveColor: '#92c5c2',
            barStyle: { backgroundColor: '#2c6d6a' },
        }
    },
},
    {
        initialRouteName: 'Home',
        activeColor: '#ffffff',
        inactiveColor: '#bda1f7',
        barStyle: { backgroundColor: '#6948f4' },
    })

export default createAppContainer(TabNvigator)