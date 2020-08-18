import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { auth, fs, db } from '../config';
import firebase from 'firebase';

import Button from '../components/Button';

export default class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            name: '',
            phone: '',
            errorMessage: null
        }

    }

    static navigationOptions = { header: null }

    handleSignUp = () => {
        const { email, password, name, phone } = this.state

        auth
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log(auth.currentUser.uid)
                db.ref(`/users/${auth.currentUser.uid}`).update({
                    name,
                    email,
                    password,
                    phone
                }).then(() => console.log("Push Data Berhasil"))
                Alert.alert("Registrasi Berhasil")
                this.props.navigation.navigate('Login')
            })
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        const { email, password, name, phone, errorMessage } = this.state;
        return (
            <ScrollView style={styles.container}>
                <Image
                    source={require('../assets/top-circle.png')}
                    style={styles.topCircle}
                />
                <Text style={styles.greeting}>{`Getting Started,\nWith Parkirin`}</Text>
                {errorMessage &&
                    <Text style={styles.errorMessage}>
                        {errorMessage}
                    </Text>}
                <View style={styles.form}>
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={email => this.setState({ email })}
                        value={email}
                    />
                    <Text style={styles.inputTitle}>Name</Text>
                    <TextInput
                        placeholder="Full Name"
                        autoCapitalize="true"
                        style={styles.textInput}
                        onChangeText={name => this.setState({ name })}
                        value={name}
                    />
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput
                        secureTextEntry
                        placeholder="Password"
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={password => this.setState({ password })}
                        value={password}
                    />
                    <Text style={styles.inputTitle}>Phone</Text>
                    <TextInput
                        placeholder="Phone Number"
                        autoCapitalize="true"
                        style={styles.textInput}
                        onChangeText={phone => this.setState({ phone })}
                        value={phone}
                    />
                    <Button
                        buttonSyle={styles.loginBtn}
                        onPress={this.handleSignUp}
                        text="Register"
                        textStyle={styles.loginText}
                    />
                    <TouchableOpacity
                        style={styles.registerBtn}
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        <Text style={styles.registerTop}>Already have an account?
                            <Text style={styles.registerBot}> Sign In</Text>
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        fontFamily: "Montserrat",
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center",
        color: "#000",
        letterSpacing: 1.2,
        marginTop: 130,
        marginBottom: 30,
        lineHeight: 24
    },
    errorMessage: {
        textAlign: "center",
        marginHorizontal: 30,
        color: "red",
        marginBottom: 20,
        marginTop: -10
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#000",
        fontSize: 10,
        textTransform: "uppercase"
    },
    textInput: {
        borderBottomColor: "#000",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F30",
        marginBottom: 24
    },
    loginBtn: {
        height: 40,
        backgroundColor: "#6861CF",
        borderRadius: 4,
        marginTop: -4,
        elevation: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    loginText: {
        fontFamily: "Montserrat",
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "600",
    },
    registerBtn: {
        alignSelf: "center", marginTop: 16
    },
    registerTop: {
        color: "#414959",
        fontSize: 14,
        fontFamily: "Montserrat"
    },
    registerBot: {
        color: "#6861CF",
        fontSize: 14,
        fontFamily: "Montserrat",
        fontWeight: "bold"
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
        bottom: -160,
        left: -80,
        // marginBottom: -120,
        // marginLeft: -70
    }
});