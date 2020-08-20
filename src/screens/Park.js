import React from 'react';
import { View, Button, ScrollView, Text, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';


export default class Park extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            destination: null,
            origin: null,
            region: null,
            showDestination: false,
            showDirection: false,
        };
    }

    componentDidMount() {
        Geolocation.watchPosition(
            (position) => {
                console.log(position);

                this.setState({ origin: position.coords })
            },
            (error) => {
                console.log(error.code, error.message)
            },
            {
                enableHighAccuracy: true, timeout: 15000, maximumAge: 10000
            }
        )
    }

    handleLokasi(item) {
        console.log(item);
        this.setState({ lokasi: item.name })
    }


    render() {
        const { region, origin, destination, showDestination, showDirection } = this.state;
        return (
            <View style={styles.container}>
                {/* <MapView
                    style={{ flex: 1, ...StyleSheet.absoluteFillObject }}
                    region={region}
                /> */}
                <Button title='Show panel' onPress={() => this._panel.show()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    panel: {
        height: 400,
        backgroundColor: '#efefef'
    }
})