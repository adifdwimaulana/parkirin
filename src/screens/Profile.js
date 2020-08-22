import React from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import Button from '../components/Button';
import { auth, db } from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            history: null,
            bill: 0
        }
    }

    componentDidMount() {
        const id = auth.currentUser.uid;
        db.ref(`/users/${id}`).on('value', (snap) => {
            console.log(snap.val())
            this.setState({ user: snap.val() })
        })

        db.ref(`/users/${id}/history`).on('value', (snap) => {
            console.log(snap.val())
            let historyArr = []
            let currentBill = 0;
            snap.forEach((item) => {
                let itemVal = item.val();
                let itemKey = item.key;

                console.log(itemVal)
                currentBill += itemVal.cost;
                // Object.assign(item, { key: itemKey })
                historyArr.push(itemVal)
                this.setState({ history: historyArr, bill: currentBill })
            })
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
        const { user, history, bill } = this.state;
        if (user == null) {
            return null;
        }
        return (
            <View style={styles.container}>
                <Text style={styles.title}>User's Profile & History</Text>
                <View style={styles.profileContainer}>
                    <Text style={styles.smallText}>Nama</Text>
                    <Text style={styles.bigText}>{user.name}</Text>
                </View>
                <View style={styles.profileContainer}>
                    <Text style={styles.smallText}>Email</Text>
                    <Text style={styles.bigText}>{user.email}</Text>
                </View>
                <View style={styles.profileContainer}>
                    <Text style={styles.smallText}>No. HP</Text>
                    <Text style={styles.bigText}>{user.phone}</Text>
                </View>
                <View style={styles.profileContainer}>
                    <Text style={styles.smallText}>Tagihan</Text>
                    <Text style={styles.bigText}>Rp. {bill}</Text>
                </View>
                <Button
                    onPress={() => this.handleSignOut()}
                    buttonSyle={styles.logoutBtn}
                    textStyle={styles.logoutText}
                    text="Logout"
                />
                <View
                    style={{
                        borderBottomColor: '#efefef',
                        borderBottomWidth: 1,
                        elevation: 2,
                        marginHorizontal: 24,
                        marginBottom: 16
                    }}
                >

                </View>

                {
                    history ?
                        history.map(item =>
                            <View style={styles.blockContainer}>
                                <View style={styles.content}>
                                    <Text style={styles.date}>{item.date}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Icon style={[{ color: '#fff', marginTop: 8 }]} size={18} name={'map-marker'} />
                                        <Text style={styles.name}>{item.name}</Text>
                                    </View>
                                    <Text style={styles.cost}>Rp. {item.cost}</Text>
                                </View>
                            </View>
                        ) : <Text style={{ fontSize: 32, color: '#bbb', fontWeight: '700', textAlign: 'center', marginTop: 100 }}>Belum Ada History</Text>
                }

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 26,
        color: '#5c5a5a',
        fontFamily: 'Montserrat',
        letterSpacing: 0.8,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20
    },
    profileContainer: {
        marginTop: 12,
        marginHorizontal: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    smallText: {
        fontSize: 12,
        color: '#5c5a5a',
        fontFamily: 'Montserrat',
        letterSpacing: 0.8,
        fontWeight: '400',
        textAlign: 'center',
    },
    bigText: {
        fontSize: 20,
        color: '#5c5a5a',
        fontFamily: 'Montserrat',
        letterSpacing: 1.2,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 4
    },
    logoutBtn: {
        marginHorizontal: 24,
        marginTop: 20,
        marginBottom: 40,
        height: 40,
        // backgroundColor: "#6861CF",
        backgroundColor: '#d13560',
        borderRadius: 4,
        elevation: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    logoutText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 1.2
    },
    blockContainer: {
        flexDirection: 'row',
        marginHorizontal: 24,
        marginVertical: 20,
        height: 120,
        borderRadius: 8,
        elevation: 8,
        backgroundColor: '#d13560',
    },
    content: {
        marginHorizontal: 16,
        marginTop: 12
    },
    date: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        letterSpacing: 0.8
    },
    name: {
        marginTop: 8,
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
        letterSpacing: 0.2
    },
    cost: {
        marginTop: 8,
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        letterSpacing: 0.2
    }
})