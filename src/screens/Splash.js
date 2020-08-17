import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { auth } from '../config';
import firebase from 'firebase';

export default class Splash extends React.Component {
    componentDidMount() {
        auth.onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "Home" : "Login")
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/top-circle.png')}
                    style={styles.topCircle}
                />
                <Image
                    source={require('../assets/car-solid.png')}
                    style={styles.icon}
                />
                <Text style={styles.title}>Parkirin</Text>
                <Image
                    source={require('../assets/bot-circle.png')}
                    style={styles.botCircle}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 24,
        fontWeight: "bold",
        textAlign: 'center',
        color: '#725E5E',
        letterSpacing: 2,
        marginTop: 10
    },
    icon: {
        width: 40,
        height: 40,
        marginTop: -40
    },
    topCircle: {
        position: "absolute",
        top: 0,
        right: 0,
        marginTop: -140,
        marginRight: -90
    },
    botCircle: {
        position: "absolute",
        bottom: 0,
        left: 0,
        marginBottom: -120,
        marginLeft: -70
    }
})
