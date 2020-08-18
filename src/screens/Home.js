import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';

import { auth } from '../config';


export default class Home extends React.Component {

    handleSignOut = () => {
        console.log("Back")
        auth
            .signOut()
            .then(() => this.props.navigation.navigate('Login'))
            .catch(err => console.log(err))

    }

    render() {
        const { navigation } = this.props;
        return (
            <>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => this.handleSignOut()}
                >
                    <Text>
                        Logout
                </Text>
                </TouchableOpacity>
            </>
        )
    }
}

const styles = StyleSheet.create({
    loginBtn: {
        height: 40,
        backgroundColor: "#6861CF",
        borderRadius: 4,
        marginTop: -4,
        elevation: 2,
        alignItems: "center",
        justifyContent: "center"
    },
})