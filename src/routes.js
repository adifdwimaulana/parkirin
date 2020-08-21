import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';


import Home from './screens/Home';
import Profile from './screens/Profile';
import HomeRoute from './homeRoutes';


class HomeScreen extends React.Component {
    render() {
        return (
            <View>
                <HomeRoute />
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
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View>
                    <Icon style={[{ color: tintColor }]} size={25} name={'user'} />
                </View>
            ),
            activeColor: '#ffffff',
            inactiveColor: '#ebaabd',
            barStyle: { backgroundColor: '#d13560' },
        }
    },
},
    {
        initialRouteName: 'Home',
        activeColor: '#ffffff',
        inactiveColor: '#ebaabd',
        barStyle: { backgroundColor: '#d13560' },
    })

export default createAppContainer(TabNvigator)

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});