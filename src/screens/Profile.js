import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';


import { auth, db } from '../config';


export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }

    componentDidMount() {
        const id = auth.currentUser.uid;
        db.ref(`/users/${id}`).on('value', (snap) => {
            console.log(snap.val())
            this.setState({ user: snap.val() })
        })
    }

    handleSignOut = () => {
        console.log("Back")
        auth
            .signOut()
            .then(() => this.props.navigation.navigate('Login'))
            .catch(err => console.log(err))

    }

    render() {
        const { user } = this.state;
        if (user == null) {
            return null;
        }
        return (
            <View>
                <Text>{user.name}</Text>
                <Button
                    onPress={() => this.handleSignOut()}
                    buttonSyle={styles.loginBtn}
                    text="Logout"
                />

            </View>
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