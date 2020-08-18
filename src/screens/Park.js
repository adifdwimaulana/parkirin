import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default class Park extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            destination: null,
            origin: null,
            region: null,
            showDestination: false,
            showDirection: false
        };
    }



    render() {
        const { region, origin, destination, showDestination, showDirection } = this.state;
        return (
            <>
                <MapView
                    style={{ flex: 1, ...StyleSheet.absoluteFillObject }}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </>
        )
    }
}